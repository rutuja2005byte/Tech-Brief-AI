import { desc, eq, ilike, or } from 'drizzle-orm';

import { db } from '@/db/client';
import { articles, newsSources } from '@/db/schema';

export async function searchArticles(query: string, limit: number) {
  const pattern = `%${query}%`;

  return db
    .select({
      id: articles.id,
      title: articles.title,
      url: articles.url,
      summary: articles.summary,
      sourceName: newsSources.name,
      publishedAt: articles.publishedAt,
      importanceScore: articles.importanceScore
    })
    .from(articles)
    .innerJoin(newsSources, eq(newsSources.id, articles.sourceId))
    .where(or(ilike(articles.title, pattern), ilike(articles.summary, pattern)))
    .orderBy(desc(articles.importanceScore), desc(articles.publishedAt))
    .limit(limit);
}
