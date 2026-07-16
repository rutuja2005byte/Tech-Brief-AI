import { desc, eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { articles, briefArticles, briefs, newsSources } from '@/db/schema';
import { getStorageBucketName, supabaseAdmin } from '@/storage/supabase';
import type { BriefCadence } from '@tech-brief-ai/domain';

import { groqModel } from './groq-client';
import type { BriefCandidateArticle, GeneratedBriefContent } from './types';

export async function createGeneratedBrief(
  cadence: BriefCadence,
  content: GeneratedBriefContent,
  articles: readonly BriefCandidateArticle[],
) {
  const [brief] = await db
    .insert(briefs)
    .values({
      cadence,
      title: content.title,
      summary: content.summary,
      keyTakeaways: content.keyTakeaways,
      podcastScript: content.podcastScript,
      model: groqModel,
      publishedAt: new Date()
    })
    .returning();

  if (!brief) {
    throw new Error('Failed to create generated brief.');
  }

  for (const [index, article] of articles.entries()) {
    await db
      .insert(briefArticles)
      .values({
        briefId: brief.id,
        articleId: article.id,
        rank: index + 1
      })
      .onConflictDoNothing();
  }

  return brief;
}

export async function attachAudioToBrief(briefId: string, audioPath: string) {
  await db.update(briefs).set({ audioPath }).where(eq(briefs.id, briefId));
}

export async function getLatestBrief() {
  const [brief] = await db.select().from(briefs).orderBy(desc(briefs.publishedAt)).limit(1);

  if (!brief) {
    return null;
  }

  const relatedArticles = await db
    .select({
      id: articles.id,
      title: articles.title,
      url: articles.url,
      summary: articles.summary,
      sourceName: newsSources.name,
      rank: briefArticles.rank
    })
    .from(briefArticles)
    .innerJoin(articles, eq(briefArticles.articleId, articles.id))
    .innerJoin(newsSources, eq(articles.sourceId, newsSources.id))
    .where(eq(briefArticles.briefId, brief.id))
    .orderBy(briefArticles.rank);

  const audioUrl = brief.audioPath
    ? supabaseAdmin.storage.from(getStorageBucketName()).getPublicUrl(brief.audioPath).data.publicUrl
    : null;

  return {
    id: brief.id,
    cadence: brief.cadence,
    title: brief.title,
    summary: brief.summary,
    keyTakeaways: brief.keyTakeaways,
    podcastScript: brief.podcastScript,
    audioUrl,
    publishedAt: brief.publishedAt,
    articles: relatedArticles
  };
}
