import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import {
  articles,
  bookmarks,
  collectionArticles,
  collections,
  newsSources
} from '@/db/schema';

export async function listBookmarks(userId: string) {
  return db
    .select({
      id: articles.id,
      title: articles.title,
      url: articles.url,
      summary: articles.summary,
      sourceName: newsSources.name,
      publishedAt: articles.publishedAt,
      bookmarkedAt: bookmarks.createdAt
    })
    .from(bookmarks)
    .innerJoin(articles, eq(bookmarks.articleId, articles.id))
    .innerJoin(newsSources, eq(articles.sourceId, newsSources.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));
}

export async function saveBookmark(userId: string, articleId: string) {
  await db.insert(bookmarks).values({ userId, articleId }).onConflictDoNothing();
}

export async function deleteBookmark(userId: string, articleId: string) {
  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.articleId, articleId)));
}

export async function listCollections(userId: string) {
  return db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId))
    .orderBy(desc(collections.createdAt));
}

export async function createCollection(userId: string, name: string) {
  const [collection] = await db
    .insert(collections)
    .values({ userId, name, updatedAt: new Date() })
    .returning();

  if (!collection) {
    throw new Error('Failed to create collection.');
  }

  return collection;
}

export async function addArticleToCollection(collectionId: string, articleId: string) {
  await db.insert(collectionArticles).values({ collectionId, articleId }).onConflictDoNothing();
}
