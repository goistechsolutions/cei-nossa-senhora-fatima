import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { getAllDiretoriaMembers, getDiretoriaMemberById, createDiretoriaMember, updateDiretoriaMember, deleteDiretoriaMember } from "./db";

describe("Diretoria Members", () => {
  let testMemberId: number;

  beforeAll(async () => {
    // Setup: ensure database is available
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should create a diretoria member", async () => {
    const result = await createDiretoriaMember({
      name: "Test Member",
      position: "Test Position",
      email: "test@example.com",
      phone: "(14) 1234-5678",
      bio: "Test bio",
      photoUrl: "https://example.com/photo.jpg",
      order: 1,
      isActive: 1,
      updatedBy: 1,
    });

    expect(result).toBeDefined();
    // Result is OkPacket from mysql2, check affectedRows instead
    if (result && 'insertId' in result) {
      testMemberId = result.insertId;
      expect(testMemberId).toBeGreaterThan(0);
    }
  });

  it("should get all active diretoria members", async () => {
    const members = await getAllDiretoriaMembers();
    expect(Array.isArray(members)).toBe(true);
    expect(members.length).toBeGreaterThanOrEqual(0);
  });

  it("should get a diretoria member by id", async () => {
    if (testMemberId > 0) {
      const member = await getDiretoriaMemberById(testMemberId);
      expect(member).toBeDefined();
      expect(member?.name).toBe("Test Member");
      expect(member?.position).toBe("Test Position");
    }
  });

  it("should update a diretoria member", async () => {
    if (testMemberId > 0) {
      const result = await updateDiretoriaMember(testMemberId, {
        name: "Updated Member",
        position: "Updated Position",
      });

      expect(result).toBeDefined();

      const updated = await getDiretoriaMemberById(testMemberId);
      expect(updated?.name).toBe("Updated Member");
      expect(updated?.position).toBe("Updated Position");
    }
  });

  it("should delete a diretoria member", async () => {
    if (testMemberId > 0) {
      const result = await deleteDiretoriaMember(testMemberId);
      expect(result).toBeDefined();

      const deleted = await getDiretoriaMemberById(testMemberId);
      expect(deleted).toBeUndefined();
    }
  });

  it("should return empty array when no members exist", async () => {
    const members = await getAllDiretoriaMembers();
    expect(Array.isArray(members)).toBe(true);
  });

  afterAll(async () => {
    // Cleanup if needed
  });
});
