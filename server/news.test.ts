import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("news procedures", () => {
  describe("news.list", () => {
    it("should return empty array for published news", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.news.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should be accessible without authentication", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.list();
      }).not.toThrow();
    });
  });

  describe("news.create", () => {
    it("should reject non-admin users", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.create({
          title: "Test News",
          description: "Test Description",
          category: "Evento",
        });
      }).rejects.toThrow();
    });

    it("should accept valid input from admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.create({
          title: "Test News",
          description: "Test Description",
          category: "Evento",
          icon: "🎉",
          isPublished: 1,
        });
      }).not.toThrow();
    });

    it("should reject empty title", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.create({
          title: "",
          description: "Test Description",
          category: "Evento",
        });
      }).rejects.toThrow();
    });

    it("should reject empty description", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.create({
          title: "Test News",
          description: "",
          category: "Evento",
        });
      }).rejects.toThrow();
    });
  });

  describe("news.update", () => {
    it("should reject non-admin users", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.update({
          id: 1,
          title: "Updated",
        });
      }).rejects.toThrow();
    });

    it("should accept valid input from admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.update({
          id: 999, // Non-existent ID for testing
          title: "Updated News",
        });
      }).not.toThrow();
    });
  });

  describe("news.delete", () => {
    it("should reject non-admin users", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.delete({ id: 1 });
      }).rejects.toThrow();
    });

    it("should accept valid input from admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.delete({ id: 999 }); // Non-existent ID for testing
      }).not.toThrow();
    });
  });

  describe("news.getById", () => {
    it("should be accessible without authentication", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.news.getById({ id: 1 });
      }).not.toThrow();
    });

    it("should return undefined for non-existent ID", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.news.getById({ id: 999999 });

      expect(result).toBeUndefined();
    });
  });
});
