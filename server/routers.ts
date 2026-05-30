import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { getPublishedNews, getNewsById, createNews, updateNews, deleteNews } from "./db";

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
});

export type AppRouter = typeof appRouter;
