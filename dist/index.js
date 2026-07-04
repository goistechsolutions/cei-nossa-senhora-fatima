// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { desc, eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
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
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  // 'Evento', 'Projeto', 'Institucional', 'Desenvolvimento'
  icon: varchar("icon", { length: 50 }).default("\u{1F4F0}").notNull(),
  // emoji or icon identifier
  imageUrl: varchar("imageUrl", { length: 500 }),
  // optional image URL
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy").notNull(),
  // user id who created
  isPublished: int("isPublished").default(1).notNull()
  // 1 = published, 0 = draft
});
var contentSections = mysqlTable("content_sections", {
  id: int("id").autoincrement().primaryKey(),
  sectionKey: varchar("sectionKey", { length: 100 }).notNull().unique(),
  // 'hero', 'diferenciais', 'galeria', etc
  sectionName: varchar("sectionName", { length: 255 }).notNull(),
  // Display name
  content: text("content").notNull(),
  // Main content/text
  subtitle: text("subtitle"),
  // Optional subtitle
  description: text("description"),
  // Optional description
  cta: varchar("cta", { length: 255 }),
  // Call-to-action text
  ctaLink: varchar("ctaLink", { length: 500 }),
  // CTA link
  imageUrl: varchar("imageUrl", { length: 500 }),
  // Optional image URL
  metadata: text("metadata"),
  // JSON metadata for additional fields
  updatedBy: int("updatedBy").notNull(),
  // user id who last updated
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var userPermissions = mysqlTable("user_permissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // user id
  sectionKey: varchar("sectionKey", { length: 100 }).notNull(),
  // section identifier
  permission: mysqlEnum("permission", ["view", "edit", "manage"]).default("view").notNull(),
  // view, edit, manage
  grantedBy: int("grantedBy").notNull(),
  // user id who granted permission
  grantedAt: timestamp("grantedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt")
  // Optional expiration date
});
var galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  // Original filename
  storageKey: varchar("storageKey", { length: 500 }).notNull(),
  // S3 storage key
  storageUrl: varchar("storageUrl", { length: 500 }).notNull(),
  // Public URL
  mimeType: varchar("mimeType", { length: 50 }).notNull(),
  // image/jpeg, image/png, etc
  fileSize: int("fileSize").notNull(),
  // File size in bytes
  width: int("width"),
  // Image width in pixels
  height: int("height"),
  // Image height in pixels
  alt: text("alt"),
  // Alt text for accessibility
  sectionKey: varchar("sectionKey", { length: 100 }),
  // Associated section (optional)
  tags: text("tags"),
  // JSON array of tags for organization
  uploadedBy: int("uploadedBy").notNull(),
  // user id who uploaded
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  // Document title
  description: text("description"),
  // Optional description
  category: varchar("category", { length: 100 }).notNull(),
  // 'edital', 'estatuto', 'regulamento', 'relatorio', 'ata', 'outros'
  subcategory: varchar("subcategory", { length: 100 }),
  // Optional subcategory
  year: int("year").notNull(),
  // Year of the document
  month: int("month"),
  // Optional month
  referenceDate: varchar("referenceDate", { length: 50 }),
  // Reference period (e.g., "Abril 2022")
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  // URL to the PDF/document file
  fileKey: varchar("fileKey", { length: 500 }),
  // S3 storage key (if uploaded)
  fileSize: int("fileSize"),
  // File size in bytes
  mimeType: varchar("mimeType", { length: 100 }).default("application/pdf"),
  // MIME type
  isPublished: int("isPublished").default(1).notNull(),
  // 1 = published, 0 = draft
  downloadCount: int("downloadCount").default(0).notNull(),
  // Track downloads
  tags: text("tags"),
  // JSON array of tags
  metadata: text("metadata"),
  // JSON metadata for additional fields
  uploadedBy: int("uploadedBy").notNull(),
  // user id who uploaded
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var diretoriaMembers = mysqlTable("diretoria_members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  // Member name
  position: varchar("position", { length: 255 }).notNull(),
  // Position/cargo (Presidente, Vice-Presidente, etc)
  email: varchar("email", { length: 255 }),
  // Optional email
  phone: varchar("phone", { length: 20 }),
  // Optional phone
  bio: text("bio"),
  // Optional biography/description
  photoUrl: varchar("photoUrl", { length: 500 }),
  // Optional photo URL
  order: int("order").default(0).notNull(),
  // Display order
  isActive: int("isActive").default(1).notNull(),
  // 1 = active, 0 = inactive
  updatedBy: int("updatedBy").notNull(),
  // user id who last updated
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

// server/db.ts
import { asc } from "drizzle-orm";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getPublishedNews() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return [];
  }
  try {
    const result = await db.select().from(news).where(eq(news.isPublished, 1)).orderBy(desc(news.publishedAt)).limit(100);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get published news:", error);
    return [];
  }
}
async function getNewsById(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get news by id:", error);
    return void 0;
  }
}
async function createNews(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create news: database not available");
    return void 0;
  }
  try {
    const result = await db.insert(news).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create news:", error);
    throw error;
  }
}
async function updateNews(id, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update news: database not available");
    return void 0;
  }
  try {
    const result = await db.update(news).set(data).where(eq(news.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update news:", error);
    throw error;
  }
}
async function deleteNews(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete news: database not available");
    return void 0;
  }
  try {
    const result = await db.delete(news).where(eq(news.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete news:", error);
    throw error;
  }
}
async function getAllContentSections() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get content sections: database not available");
    return [];
  }
  try {
    const result = await db.select().from(contentSections).orderBy(contentSections.sectionKey);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get content sections:", error);
    return [];
  }
}
async function getContentSectionByKey(sectionKey) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get content section: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(contentSections).where(eq(contentSections.sectionKey, sectionKey)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get content section:", error);
    return void 0;
  }
}
async function createOrUpdateContentSection(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create/update content section: database not available");
    return void 0;
  }
  try {
    const existing = await getContentSectionByKey(data.sectionKey);
    if (existing) {
      const result = await db.update(contentSections).set(data).where(eq(contentSections.sectionKey, data.sectionKey));
      return result;
    } else {
      const result = await db.insert(contentSections).values(data);
      return result;
    }
  } catch (error) {
    console.error("[Database] Failed to create/update content section:", error);
    throw error;
  }
}
async function getUserPermissionForSection(userId, sectionKey) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user permission: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(userPermissions).where(and(eq(userPermissions.userId, userId), eq(userPermissions.sectionKey, sectionKey))).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get user permission:", error);
    return void 0;
  }
}
async function getUserPermissionsForAllSections(userId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user permissions: database not available");
    return [];
  }
  try {
    const result = await db.select().from(userPermissions).where(eq(userPermissions.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user permissions:", error);
    return [];
  }
}
async function grantUserPermission(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot grant permission: database not available");
    return void 0;
  }
  try {
    const result = await db.insert(userPermissions).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to grant permission:", error);
    throw error;
  }
}
async function revokeUserPermission(userId, sectionKey) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot revoke permission: database not available");
    return void 0;
  }
  try {
    const result = await db.delete(userPermissions).where(and(eq(userPermissions.userId, userId), eq(userPermissions.sectionKey, sectionKey)));
    return result;
  } catch (error) {
    console.error("[Database] Failed to revoke permission:", error);
    throw error;
  }
}
async function getAllGalleryImages(sectionKey) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get gallery images: database not available");
    return [];
  }
  try {
    let query = db.select().from(galleryImages);
    if (sectionKey) {
      query = query.where(eq(galleryImages.sectionKey, sectionKey));
    }
    const result = await query.orderBy(desc(galleryImages.uploadedAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get gallery images:", error);
    return [];
  }
}
async function getGalleryImageById(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get gallery image: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get gallery image:", error);
    return void 0;
  }
}
async function createGalleryImage(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create gallery image: database not available");
    return void 0;
  }
  try {
    const result = await db.insert(galleryImages).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create gallery image:", error);
    throw error;
  }
}
async function updateGalleryImage(id, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update gallery image: database not available");
    return void 0;
  }
  try {
    const result = await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update gallery image:", error);
    throw error;
  }
}
async function deleteGalleryImage(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete gallery image: database not available");
    return void 0;
  }
  try {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete gallery image:", error);
    throw error;
  }
}
async function getPublishedDocuments(filters) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get documents: database not available");
    return [];
  }
  try {
    let query = db.select().from(documents).where(eq(documents.isPublished, 1));
    if (filters?.category) {
      query = db.select().from(documents).where(and(eq(documents.isPublished, 1), eq(documents.category, filters.category)));
    }
    if (filters?.year) {
      if (filters?.category) {
        query = db.select().from(documents).where(and(eq(documents.isPublished, 1), eq(documents.category, filters.category), eq(documents.year, filters.year)));
      } else {
        query = db.select().from(documents).where(and(eq(documents.isPublished, 1), eq(documents.year, filters.year)));
      }
    }
    const result = await query.orderBy(desc(documents.year), desc(documents.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get documents:", error);
    return [];
  }
}
async function getAllDocuments() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get all documents: database not available");
    return [];
  }
  try {
    const result = await db.select().from(documents).orderBy(desc(documents.year), desc(documents.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get all documents:", error);
    return [];
  }
}
async function getDocumentById(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get document: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get document:", error);
    return void 0;
  }
}
async function createDocument(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create document: database not available");
    return void 0;
  }
  try {
    const result = await db.insert(documents).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create document:", error);
    throw error;
  }
}
async function updateDocument(id, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update document: database not available");
    return void 0;
  }
  try {
    const result = await db.update(documents).set(data).where(eq(documents.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update document:", error);
    throw error;
  }
}
async function deleteDocument(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete document: database not available");
    return void 0;
  }
  try {
    const result = await db.delete(documents).where(eq(documents.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete document:", error);
    throw error;
  }
}
async function incrementDownloadCount(id) {
  const db = await getDb();
  if (!db) return;
  try {
    const doc = await getDocumentById(id);
    if (doc) {
      await db.update(documents).set({ downloadCount: (doc.downloadCount || 0) + 1 }).where(eq(documents.id, id));
    }
  } catch (error) {
    console.error("[Database] Failed to increment download count:", error);
  }
}
async function getAllDiretoriaMembers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get diretoria members: database not available");
    return [];
  }
  try {
    const result = await db.select().from(diretoriaMembers).where(eq(diretoriaMembers.isActive, 1)).orderBy(asc(diretoriaMembers.order));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get diretoria members:", error);
    return [];
  }
}
async function getDiretoriaMemberById(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get diretoria member: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(diretoriaMembers).where(eq(diretoriaMembers.id, id)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.error("[Database] Failed to get diretoria member:", error);
    return void 0;
  }
}
async function createDiretoriaMember(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create diretoria member: database not available");
    return void 0;
  }
  try {
    const result = await db.insert(diretoriaMembers).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create diretoria member:", error);
    throw error;
  }
}
async function updateDiretoriaMember(id, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update diretoria member: database not available");
    return void 0;
  }
  try {
    const result = await db.update(diretoriaMembers).set(data).where(eq(diretoriaMembers.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update diretoria member:", error);
    throw error;
  }
}
async function deleteDiretoriaMember(id) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete diretoria member: database not available");
    return void 0;
  }
  try {
    const result = await db.delete(diretoriaMembers).where(eq(diretoriaMembers.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete diretoria member:", error);
    throw error;
  }
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { z as z2 } from "zod";

// server/storage.ts
function getForgeConfig() {
  const forgeUrl = ENV.forgeApiUrl;
  const forgeKey = ENV.forgeApiKey;
  if (!forgeUrl || !forgeKey) {
    throw new Error(
      "Storage config missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function appendHashSuffix(relKey) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { forgeUrl, forgeKey } = getForgeConfig();
  const key = appendHashSuffix(normalizeKey(relKey));
  const presignUrl = new URL("v1/storage/presign/put", forgeUrl + "/");
  presignUrl.searchParams.set("path", key);
  const presignResp = await fetch(presignUrl, {
    headers: { Authorization: `Bearer ${forgeKey}` }
  });
  if (!presignResp.ok) {
    const msg = await presignResp.text().catch(() => presignResp.statusText);
    throw new Error(`Storage presign failed (${presignResp.status}): ${msg}`);
  }
  const { url: s3Url } = await presignResp.json();
  if (!s3Url) throw new Error("Forge returned empty presign URL");
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const uploadResp = await fetch(s3Url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: blob
  });
  if (!uploadResp.ok) {
    throw new Error(`Storage upload to S3 failed (${uploadResp.status})`);
  }
  return { key, url: `/manus-storage/${key}` };
}

// server/imageCompression.ts
import sharp from "sharp";
async function compressImage(base64Data, options = {}) {
  const {
    maxWidth = 2e3,
    maxHeight = 2e3,
    quality = 85,
    format = "webp"
  } = options;
  try {
    const buffer = Buffer.from(base64Data, "base64");
    const metadata = await sharp(buffer).metadata();
    const originalWidth = metadata.width || maxWidth;
    const originalHeight = metadata.height || maxHeight;
    let newWidth = originalWidth;
    let newHeight = originalHeight;
    if (originalWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = Math.round(originalHeight * maxWidth / originalWidth);
    }
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = Math.round(originalWidth * maxHeight / originalHeight);
    }
    let pipeline = sharp(buffer).resize(newWidth, newHeight, {
      fit: "inside",
      withoutEnlargement: true
    });
    if (format === "jpeg") {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    } else if (format === "png") {
      pipeline = pipeline.png({ quality });
    } else {
      pipeline = pipeline.webp({ quality });
    }
    const compressed = await pipeline.toBuffer();
    return {
      compressed,
      width: newWidth,
      height: newHeight,
      format
    };
  } catch (error) {
    console.error("Erro ao comprimir imagem:", error);
    throw new Error("Falha ao comprimir imagem");
  }
}
function calculateCompressionRatio(originalSize, compressedSize) {
  return Math.round((originalSize - compressedSize) / originalSize * 100);
}

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  news: router({
    list: publicProcedure.query(async () => {
      return await getPublishedNews();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return await getNewsById(input.id);
    }),
    create: adminProcedure.input(
      z2.object({
        title: z2.string().min(1).max(255),
        description: z2.string().min(1),
        category: z2.enum(["Evento", "Projeto", "Institucional", "Desenvolvimento"]),
        icon: z2.string().default("\u{1F4F0}"),
        imageUrl: z2.string().optional(),
        isPublished: z2.number().default(1)
      })
    ).mutation(async ({ input, ctx }) => {
      return await createNews({
        ...input,
        createdBy: ctx.user.id,
        publishedAt: /* @__PURE__ */ new Date()
      });
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        title: z2.string().min(1).max(255).optional(),
        description: z2.string().min(1).optional(),
        category: z2.enum(["Evento", "Projeto", "Institucional", "Desenvolvimento"]).optional(),
        icon: z2.string().optional(),
        imageUrl: z2.string().optional(),
        isPublished: z2.number().optional()
      })
    ).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateNews(id, data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteNews(input.id);
    })
  }),
  content: router({
    // Get all sections (public)
    getAllSections: publicProcedure.query(async () => {
      return await getAllContentSections();
    }),
    // Get specific section (public)
    getSection: publicProcedure.input(z2.object({ sectionKey: z2.string() })).query(async ({ input }) => {
      return await getContentSectionByKey(input.sectionKey);
    }),
    // Update section content (requires edit permission)
    updateSection: adminProcedure.input(
      z2.object({
        sectionKey: z2.string().min(1),
        sectionName: z2.string().min(1).max(255),
        content: z2.string().min(1),
        subtitle: z2.string().optional(),
        description: z2.string().optional(),
        cta: z2.string().optional(),
        ctaLink: z2.string().optional(),
        imageUrl: z2.string().optional(),
        metadata: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const permission = await getUserPermissionForSection(ctx.user.id, input.sectionKey);
      if (!permission && ctx.user.role !== "admin") {
        throw new TRPCError3({
          code: "FORBIDDEN",
          message: "You do not have permission to edit this section"
        });
      }
      return await createOrUpdateContentSection({
        ...input,
        updatedBy: ctx.user.id
      });
    }),
    // Get user permissions for all sections
    getUserPermissions: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError3({
          code: "UNAUTHORIZED",
          message: "You must be logged in"
        });
      }
      return await getUserPermissionsForAllSections(ctx.user.id);
    }),
    // Grant permission to user (admin only)
    grantPermission: adminProcedure.input(
      z2.object({
        userId: z2.number(),
        sectionKey: z2.string(),
        permission: z2.enum(["view", "edit", "manage"])
      })
    ).mutation(async ({ input, ctx }) => {
      return await grantUserPermission({
        userId: input.userId,
        sectionKey: input.sectionKey,
        permission: input.permission,
        grantedBy: ctx.user.id
      });
    }),
    // Revoke permission from user (admin only)
    revokePermission: adminProcedure.input(
      z2.object({
        userId: z2.number(),
        sectionKey: z2.string()
      })
    ).mutation(async ({ input }) => {
      return await revokeUserPermission(input.userId, input.sectionKey);
    })
  }),
  documents: router({
    // Public: list published documents with filters
    list: publicProcedure.input(z2.object({
      category: z2.string().optional(),
      year: z2.number().optional(),
      search: z2.string().optional()
    }).optional()).query(async ({ input }) => {
      return await getPublishedDocuments(input || void 0);
    }),
    // Public: get single document
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return await getDocumentById(input.id);
    }),
    // Public: track download
    trackDownload: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await incrementDownloadCount(input.id);
      return { success: true };
    }),
    // Admin: list all documents (including drafts)
    listAll: adminProcedure.query(async () => {
      return await getAllDocuments();
    }),
    // Admin: create document
    create: adminProcedure.input(
      z2.object({
        title: z2.string().min(1).max(500),
        description: z2.string().optional(),
        category: z2.enum(["edital", "estatuto", "regulamento", "relatorio", "ata", "termo", "outros"]),
        subcategory: z2.string().optional(),
        year: z2.number().min(2e3).max(2100),
        month: z2.number().min(1).max(12).optional(),
        referenceDate: z2.string().optional(),
        fileUrl: z2.string().min(1),
        fileKey: z2.string().optional(),
        fileSize: z2.number().optional(),
        mimeType: z2.string().optional(),
        isPublished: z2.number().default(1),
        tags: z2.string().optional(),
        metadata: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      return await createDocument({
        ...input,
        uploadedBy: ctx.user.id
      });
    }),
    // Admin: update document
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        title: z2.string().min(1).max(500).optional(),
        description: z2.string().optional(),
        category: z2.enum(["edital", "estatuto", "regulamento", "relatorio", "ata", "termo", "outros"]).optional(),
        subcategory: z2.string().optional(),
        year: z2.number().min(2e3).max(2100).optional(),
        month: z2.number().min(1).max(12).optional(),
        referenceDate: z2.string().optional(),
        fileUrl: z2.string().optional(),
        fileKey: z2.string().optional(),
        fileSize: z2.number().optional(),
        isPublished: z2.number().optional(),
        tags: z2.string().optional(),
        metadata: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateDocument(id, data);
    }),
    // Admin: delete document
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteDocument(input.id);
    }),
    // Admin: upload PDF file
    upload: adminProcedure.input(
      z2.object({
        filename: z2.string(),
        fileData: z2.string(),
        // base64
        mimeType: z2.string().default("application/pdf")
      })
    ).mutation(async ({ input }) => {
      try {
        const buffer = Buffer.from(input.fileData, "base64");
        const timestamp2 = Date.now();
        const storageKey = `documents/${timestamp2}-${input.filename}`;
        const { url } = await storagePut(storageKey, buffer, input.mimeType);
        return { success: true, url, storageKey, fileSize: buffer.length };
      } catch (error) {
        console.error("Document upload error:", error);
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Failed to upload document" });
      }
    })
  }),
  gallery: router({
    list: publicProcedure.input(z2.object({ sectionKey: z2.string().optional() }).optional()).query(async ({ input }) => {
      return await getAllGalleryImages(input?.sectionKey);
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return await getGalleryImageById(input.id);
    }),
    upload: adminProcedure.input(
      z2.object({
        filename: z2.string(),
        fileData: z2.string(),
        mimeType: z2.string(),
        alt: z2.string().optional(),
        sectionKey: z2.string().optional(),
        tags: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      try {
        const originalBuffer = Buffer.from(input.fileData, "base64");
        const originalSize = originalBuffer.length;
        const { compressed, width, height } = await compressImage(
          input.fileData,
          { maxWidth: 2e3, maxHeight: 2e3, quality: 85, format: "webp" }
        );
        const compressedSize = compressed.length;
        const compressionRatio = calculateCompressionRatio(originalSize, compressedSize);
        const timestamp2 = Date.now();
        const storageKey = `gallery/${timestamp2}-${input.filename.replace(/\.[^/.]+$/, "")}.webp`;
        const { url } = await storagePut(storageKey, compressed, "image/webp");
        await createGalleryImage({
          filename: input.filename,
          storageKey,
          storageUrl: url,
          mimeType: "image/webp",
          fileSize: compressedSize,
          width,
          height,
          alt: input.alt,
          sectionKey: input.sectionKey,
          tags: input.tags,
          uploadedBy: ctx.user.id,
          metadata: JSON.stringify({ originalSize, compressedSize, compressionRatio: `${compressionRatio}%` })
        });
        return { success: true, url, storageKey, compression: { originalSize, compressedSize, ratio: compressionRatio } };
      } catch (error) {
        console.error("Upload error:", error);
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Failed to upload image" });
      }
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        alt: z2.string().optional(),
        sectionKey: z2.string().optional(),
        tags: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateGalleryImage(id, data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteGalleryImage(input.id);
    })
  }),
  diretoria: router({
    list: publicProcedure.query(async () => {
      return await getAllDiretoriaMembers();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return await getDiretoriaMemberById(input.id);
    }),
    create: adminProcedure.input(
      z2.object({
        name: z2.string().min(1).max(255),
        position: z2.string().min(1).max(255),
        email: z2.string().email().optional(),
        phone: z2.string().max(20).optional(),
        bio: z2.string().optional(),
        photoUrl: z2.string().optional(),
        order: z2.number().default(0)
      })
    ).mutation(async ({ input, ctx }) => {
      return await createDiretoriaMember({
        ...input,
        updatedBy: ctx.user.id,
        isActive: 1
      });
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        name: z2.string().optional(),
        position: z2.string().optional(),
        email: z2.string().email().optional(),
        phone: z2.string().optional(),
        bio: z2.string().optional(),
        photoUrl: z2.string().optional(),
        order: z2.number().optional(),
        isActive: z2.number().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      return await updateDiretoriaMember(id, {
        ...data,
        updatedBy: ctx.user.id
      });
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteDiretoriaMember(input.id);
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
