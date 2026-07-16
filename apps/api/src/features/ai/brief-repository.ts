import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { briefArticles, briefs } from '@/db/schema';
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
