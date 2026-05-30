import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, news, InsertNews } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// News queries
export async function getPublishedNews() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(news)
      .where(eq(news.isPublished, 1))
      .orderBy(desc(news.publishedAt))
      .limit(100);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get published news:", error);
    return [];
  }
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get news by id:", error);
    return undefined;
  }
}

export async function createNews(data: InsertNews) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create news: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(news).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create news:", error);
    throw error;
  }
}

export async function updateNews(id: number, data: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update news: database not available");
    return undefined;
  }

  try {
    const result = await db.update(news).set(data).where(eq(news.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update news:", error);
    throw error;
  }
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete news: database not available");
    return undefined;
  }

  try {
    const result = await db.delete(news).where(eq(news.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete news:", error);
    throw error;
  }
}
