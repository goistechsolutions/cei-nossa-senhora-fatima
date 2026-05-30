import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  getPublishedNews, getNewsById, createNews, updateNews, deleteNews,
  getAllContentSections, getContentSectionByKey, createOrUpdateContentSection,
  getUserPermissionForSection, getUserPermissionsForAllSections, grantUserPermission, revokeUserPermission,
  getAllGalleryImages, getGalleryImageById, createGalleryImage, updateGalleryImage, deleteGalleryImage
} from "./db";
import { storagePut } from "./storage";
import { compressImage, calculateCompressionRatio } from "./imageCompression";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  news: router({
    list: publicProcedure.query(async () => {
      return await getPublishedNews();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getNewsById(input.id);
      }),

    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(255),
          description: z.string().min(1),
          category: z.enum(["Evento", "Projeto", "Institucional", "Desenvolvimento"]),
          icon: z.string().default("📰"),
          imageUrl: z.string().optional(),
          isPublished: z.number().default(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await createNews({
          ...input,
          createdBy: ctx.user.id,
          publishedAt: new Date(),
        });
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(255).optional(),
          description: z.string().min(1).optional(),
          category: z.enum(["Evento", "Projeto", "Institucional", "Desenvolvimento"]).optional(),
          icon: z.string().optional(),
          imageUrl: z.string().optional(),
          isPublished: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateNews(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteNews(input.id);
      }),
  }),

  content: router({
    // Get all sections (public)
    getAllSections: publicProcedure.query(async () => {
      return await getAllContentSections();
    }),

    // Get specific section (public)
    getSection: publicProcedure
      .input(z.object({ sectionKey: z.string() }))
      .query(async ({ input }) => {
        return await getContentSectionByKey(input.sectionKey);
      }),

    // Update section content (requires edit permission)
    updateSection: adminProcedure
      .input(
        z.object({
          sectionKey: z.string().min(1),
          sectionName: z.string().min(1).max(255),
          content: z.string().min(1),
          subtitle: z.string().optional(),
          description: z.string().optional(),
          cta: z.string().optional(),
          ctaLink: z.string().optional(),
          imageUrl: z.string().optional(),
          metadata: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check if user has edit permission for this section
        const permission = await getUserPermissionForSection(ctx.user.id, input.sectionKey);
        
        if (!permission && ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You do not have permission to edit this section',
          });
        }

        return await createOrUpdateContentSection({
          ...input,
          updatedBy: ctx.user.id,
        });
      }),

    // Get user permissions for all sections
    getUserPermissions: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in',
        });
      }

      return await getUserPermissionsForAllSections(ctx.user.id);
    }),

    // Grant permission to user (admin only)
    grantPermission: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          sectionKey: z.string(),
          permission: z.enum(['view', 'edit', 'manage']),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await grantUserPermission({
          userId: input.userId,
          sectionKey: input.sectionKey,
          permission: input.permission,
          grantedBy: ctx.user.id,
        });
      }),

    // Revoke permission from user (admin only)
    revokePermission: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          sectionKey: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await revokeUserPermission(input.userId, input.sectionKey);
      }),
  }),

  gallery: router({
    list: publicProcedure
      .input(z.object({ sectionKey: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getAllGalleryImages(input?.sectionKey);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getGalleryImageById(input.id);
      }),

    upload: adminProcedure
      .input(
        z.object({
          filename: z.string(),
          fileData: z.string(),
          mimeType: z.string(),
          alt: z.string().optional(),
          sectionKey: z.string().optional(),
          tags: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const originalBuffer = Buffer.from(input.fileData, 'base64');
          const originalSize = originalBuffer.length;

          const { compressed, width, height } = await compressImage(
            input.fileData,
            { maxWidth: 2000, maxHeight: 2000, quality: 85, format: 'webp' }
          );

          const compressedSize = compressed.length;
          const compressionRatio = calculateCompressionRatio(originalSize, compressedSize);
          const timestamp = Date.now();
          const storageKey = `gallery/${timestamp}-${input.filename.replace(/\.[^/.]+$/, '')}.webp`;

          const { url } = await storagePut(storageKey, compressed, 'image/webp');

          await createGalleryImage({
            filename: input.filename,
            storageKey,
            storageUrl: url,
            mimeType: 'image/webp',
            fileSize: compressedSize,
            width,
            height,
            alt: input.alt,
            sectionKey: input.sectionKey,
            tags: input.tags,
            uploadedBy: ctx.user.id,
            metadata: JSON.stringify({ originalSize, compressedSize, compressionRatio: `${compressionRatio}%` }),
          });

          return { success: true, url, storageKey, compression: { originalSize, compressedSize, ratio: compressionRatio } };
        } catch (error) {
          console.error('Upload error:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to upload image' });
        }
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          alt: z.string().optional(),
          sectionKey: z.string().optional(),
          tags: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateGalleryImage(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteGalleryImage(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
