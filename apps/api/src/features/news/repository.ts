import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { articleCategories, articles, ingestionRuns, newsSources } from '@/db/schema';

import { createContentHash } from './hash';
import type { SourceDefinition } from './sources';
import type { FetchedArticle } from './types';

export async function seedNewsSources() {
  const { sourceDefinitions } = await import('./sources');

  for (const source of sourceDefinitions) {
    await upsertSource(source);
  }
}

export async function upsertSource(source: SourceDefinition) {
  const [row] = await db
    .insert(newsSources)
    .values({
      slug: source.slug,
      name: source.name,
      kind: source.kind,
      homepageUrl: source.homepageUrl,
      feedUrl: source.feedUrl,
      enabled: source.enabled,
      updatedAt: new Date()
    })
    .onConflictDoUpdate({
      target: newsSources.slug,
      set: {
        name: source.name,
        kind: source.kind,
        homepageUrl: source.homepageUrl,
        feedUrl: source.feedUrl,
        enabled: source.enabled,
        updatedAt: new Date()
      }
    })
    .returning();

  if (!row) {
    throw new Error(`Failed to upsert source ${source.slug}.`);
  }

  return row;
}

export async function listEnabledSources() {
  return db.select().from(newsSources).where(eq(newsSources.enabled, true));
}

export async function createIngestionRun(sourceId: string | null) {
  const [run] = await db
    .insert(ingestionRuns)
    .values({
      sourceId,
      status: 'running'
    })
    .returning();

  if (!run) {
    throw new Error('Failed to create ingestion run.');
  }

  return run;
}

export async function completeIngestionRun(
  runId: string,
  status: 'completed' | 'failed',
  fetchedCount: number,
  insertedCount: number,
  errorMessage: string | null,
) {
  await db
    .update(ingestionRuns)
    .set({
      status,
      fetchedCount,
      insertedCount,
      errorMessage,
      completedAt: new Date()
    })
    .where(eq(ingestionRuns.id, runId));
}

export async function persistFetchedArticles(sourceId: string, fetchedArticles: readonly FetchedArticle[]) {
  let insertedCount = 0;

  for (const fetchedArticle of fetchedArticles) {
    const contentHash = createContentHash(`${fetchedArticle.title}:${fetchedArticle.url}`);
    const [article] = await db
      .insert(articles)
      .values({
        sourceId,
        externalId: fetchedArticle.externalId,
        title: fetchedArticle.title,
        url: fetchedArticle.url,
        summary: fetchedArticle.summary,
        authorName: fetchedArticle.authorName,
        imageUrl: fetchedArticle.imageUrl,
        contentHash,
        rawPayload: fetchedArticle.rawPayload,
        publishedAt: fetchedArticle.publishedAt
      })
      .onConflictDoNothing({
        target: articles.contentHash
      })
      .returning();

    if (article) {
      insertedCount += 1;

      for (const category of fetchedArticle.categories) {
        await db.insert(articleCategories).values({ articleId: article.id, category }).onConflictDoNothing();
      }
    }
  }

  return insertedCount;
}
