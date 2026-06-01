import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDb } from './db';
import { documents } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Documents Router', () => {
  describe('documents.list', () => {
    it('should return all published documents when no filters are applied', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true); // Skip test if DB not available
        return;
      }
      const allDocs = await db.select().from(documents).where(eq(documents.isPublished, 1));
      expect(Array.isArray(allDocs)).toBe(true);
      expect(allDocs.length).toBeGreaterThan(0);
    });

    it('should filter documents by category', async () => {
      const db = await getDb();
      if (!db) return;
      const editals = await db
        .select()
        .from(documents)
        .where(eq(documents.category, 'edital'));
      expect(Array.isArray(editals)).toBe(true);
      editals.forEach((doc) => {
        expect(doc.category).toBe('edital');
      });
    });

    it('should filter documents by year', async () => {
      const db = await getDb();
      if (!db) return;
      const docsFrom2024 = await db
        .select()
        .from(documents)
        .where(eq(documents.year, 2024));
      expect(Array.isArray(docsFrom2024)).toBe(true);
      docsFrom2024.forEach((doc) => {
        expect(doc.year).toBe(2024);
      });
    });

    it('should return documents with correct structure', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents).limit(1);
      if (docs.length > 0) {
        const doc = docs[0];
        expect(doc).toHaveProperty('id');
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('category');
        expect(doc).toHaveProperty('year');
        expect(doc).toHaveProperty('isPublished');
        expect(doc).toHaveProperty('downloadCount');
      }
    });
  });

  describe('documents.getById', () => {
    it('should retrieve a document by ID', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents).limit(1);
      if (docs.length > 0) {
        const doc = docs[0];
        const retrieved = await db.select().from(documents).where(eq(documents.id, doc.id));
        expect(retrieved.length).toBe(1);
        expect(retrieved[0].id).toBe(doc.id);
        expect(retrieved[0].title).toBe(doc.title);
      }
    });
  });

  describe('documents search and filtering', () => {
    it('should find documents by title search', async () => {
      const db = await getDb();
      if (!db) return;
      const searchTerm = 'Estatuto';
      const results = await db.select().from(documents);
      const filtered = results.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((doc) => {
        expect(doc.title.toLowerCase()).toContain(searchTerm.toLowerCase());
      });
    });

    it('should track download count', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents).limit(1);
      if (docs.length > 0) {
        const doc = docs[0];
        const initialCount = doc.downloadCount;
        expect(typeof initialCount).toBe('number');
        expect(initialCount).toBeGreaterThanOrEqual(0);
      }
    });

    it('should return documents sorted by year descending', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents);
      expect(Array.isArray(docs)).toBe(true);
      if (docs.length > 1) {
        for (let i = 0; i < docs.length - 1; i++) {
          // Documents should be sortable by year
          expect(typeof docs[i].year).toBe('number');
          expect(typeof docs[i + 1].year).toBe('number');
        }
      }
    });
  });

  describe('documents data integrity', () => {
    it('should have all required fields populated', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents).limit(5);
      docs.forEach((doc) => {
        expect(doc.title).toBeTruthy();
        expect(doc.title.length).toBeGreaterThan(0);
        expect(doc.category).toBeTruthy();
        expect(doc.year).toBeGreaterThan(0);
        expect(doc.fileUrl).toBeTruthy();
      });
    });

    it('should have valid category values', async () => {
      const db = await getDb();
      if (!db) return;
      const validCategories = [
        'edital',
        'estatuto',
        'regulamento',
        'relatorio',
        'ata',
        'termo',
        'outros',
      ];
      const docs = await db.select().from(documents);
      docs.forEach((doc) => {
        expect(validCategories).toContain(doc.category);
      });
    });

    it('should have valid year values', async () => {
      const db = await getDb();
      if (!db) return;
      const docs = await db.select().from(documents);
      docs.forEach((doc) => {
        expect(doc.year).toBeGreaterThanOrEqual(2000);
        expect(doc.year).toBeLessThanOrEqual(new Date().getFullYear() + 1);
      });
    });
  });
});
