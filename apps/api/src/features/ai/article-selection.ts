import { and, desc, eq, gte } from 'drizzle-orm';

import { db } from '@/db/client';
import { articles, newsSources } from '@/db/schema';
import type { BriefCadence } from '@tech-brief-ai/domain';

import type { BriefCandidateArticle } from './types';

const cadenceWindowsInDays: Record<BriefCadence, number> = {
  daily: 1,
  weekly: 7,
  monthly: 31
};

export async function selectBriefCandidateArticles(cadence: BriefCadence, limit = 30) {
  const since = new Date(Date.now() - cadenceWindowsInDays[cadence] * 24 * 60 * 60 * 1000);
  const rows = await db
    .select({
      id: articles.id,
      title: articles.title,
      url: articles.url,
      summary: articles.summary,
      sourceName: newsSources.name,
      publishedAt: articles.publishedAt
    })
    .from(articles)
    .innerJoin(newsSources, and(gte(articles.publishedAt, since), eq(articles.sourceId, newsSources.id)))
    .orderBy(desc(articles.importanceScore), desc(articles.publishedAt))
    .limit(limit);

  return rows satisfies BriefCandidateArticle[];
}
