import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * News/Events table for dynamic content management
 * Stores news articles and events posted by admin users
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'Evento', 'Projeto', 'Institucional', 'Desenvolvimento'
  icon: varchar("icon", { length: 50 }).default("📰").notNull(), // emoji or icon identifier
  imageUrl: varchar("imageUrl", { length: 500 }), // optional image URL
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy").notNull(), // user id who created
  isPublished: int("isPublished").default(1).notNull(), // 1 = published, 0 = draft
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * Content sections table for managing dynamic text content
 * Stores editable content for each section of the website
 */
export const contentSections = mysqlTable("content_sections", {
  id: int("id").autoincrement().primaryKey(),
  sectionKey: varchar("sectionKey", { length: 100 }).notNull().unique(), // 'hero', 'diferenciais', 'galeria', etc
  sectionName: varchar("sectionName", { length: 255 }).notNull(), // Display name
  content: text("content").notNull(), // Main content/text
  subtitle: text("subtitle"), // Optional subtitle
  description: text("description"), // Optional description
  cta: varchar("cta", { length: 255 }), // Call-to-action text
  ctaLink: varchar("ctaLink", { length: 500 }), // CTA link
  imageUrl: varchar("imageUrl", { length: 500 }), // Optional image URL
  metadata: text("metadata"), // JSON metadata for additional fields
  updatedBy: int("updatedBy").notNull(), // user id who last updated
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContentSection = typeof contentSections.$inferSelect;
export type InsertContentSection = typeof contentSections.$inferInsert;

/**
 * User permissions table for role-based access control
 * Defines which users can edit which sections
 */
export const userPermissions = mysqlTable("user_permissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // user id
  sectionKey: varchar("sectionKey", { length: 100 }).notNull(), // section identifier
  permission: mysqlEnum("permission", ["view", "edit", "manage"]).default("view").notNull(), // view, edit, manage
  grantedBy: int("grantedBy").notNull(), // user id who granted permission
  grantedAt: timestamp("grantedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"), // Optional expiration date
});

export type UserPermission = typeof userPermissions.$inferSelect;
export type InsertUserPermission = typeof userPermissions.$inferInsert;

/**
 * Gallery images table for managing uploaded images
 * Stores image metadata and storage references
 */
export const galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(), // Original filename
  storageKey: varchar("storageKey", { length: 500 }).notNull(), // S3 storage key
  storageUrl: varchar("storageUrl", { length: 500 }).notNull(), // Public URL
  mimeType: varchar("mimeType", { length: 50 }).notNull(), // image/jpeg, image/png, etc
  fileSize: int("fileSize").notNull(), // File size in bytes
  width: int("width"), // Image width in pixels
  height: int("height"), // Image height in pixels
  alt: text("alt"), // Alt text for accessibility
  sectionKey: varchar("sectionKey", { length: 100 }), // Associated section (optional)
  tags: text("tags"), // JSON array of tags for organization
  uploadedBy: int("uploadedBy").notNull(), // user id who uploaded
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;


/**
 * Documents table for managing public documents (editais, estatutos, regulamentos, etc.)
 * Stores document metadata, file references, and categorization
 */
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(), // Document title
  description: text("description"), // Optional description
  category: varchar("category", { length: 100 }).notNull(), // 'edital', 'estatuto', 'regulamento', 'relatorio', 'ata', 'outros'
  subcategory: varchar("subcategory", { length: 100 }), // Optional subcategory
  year: int("year").notNull(), // Year of the document
  month: int("month"), // Optional month
  referenceDate: varchar("referenceDate", { length: 50 }), // Reference period (e.g., "Abril 2022")
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(), // URL to the PDF/document file
  fileKey: varchar("fileKey", { length: 500 }), // S3 storage key (if uploaded)
  fileSize: int("fileSize"), // File size in bytes
  mimeType: varchar("mimeType", { length: 100 }).default("application/pdf"), // MIME type
  isPublished: int("isPublished").default(1).notNull(), // 1 = published, 0 = draft
  downloadCount: int("downloadCount").default(0).notNull(), // Track downloads
  tags: text("tags"), // JSON array of tags
  metadata: text("metadata"), // JSON metadata for additional fields
  uploadedBy: int("uploadedBy").notNull(), // user id who uploaded
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
