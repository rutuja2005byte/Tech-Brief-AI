import { desc, eq, ilike, or } from 'drizzle-orm';

import { db } from '@/db/client';
import { articles, newsSources } from '@/db/schema';
import { groq } from '@/features/ai/groq-client';

export async function answerTechBriefQuestion(message: string) {
  const contextArticles = await db
    .select({
      title: articles.title,
      summary: articles.summary,
      url: articles.url,
      sourceName: newsSources.name,
      publishedAt: articles.publishedAt
    })
    .from(articles)
    .innerJoin(newsSources, eq(newsSources.id, articles.sourceId))
    .where(or(ilike(articles.title, `%${message}%`), ilike(articles.summary, `%${message}%`)))
    .orderBy(desc(articles.importanceScore), desc(articles.publishedAt))
    .limit(8);

  const context = contextArticles
    .map(
      (article, index) =>
        `${index + 1}. ${article.title} (${article.sourceName})\n${article.summary}\n${article.url}`,
    )
    .join('\n\n');

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content:
          'You are Tech Brief AI. Answer with concise, sourced technology intelligence. Use only supplied context when possible, and say when fresh ingestion is needed.'
      },
      {
        role: 'user',
        content: `Question: ${message}\n\nContext:\n${context || 'No matching local articles.'}`
      }
    ]
  });

  return {
    answer:
      completion.choices[0]?.message.content ??
      'I could not generate an answer from the current article index.',
    citations: contextArticles.map((article) => ({
      title: article.title,
      url: article.url,
      sourceName: article.sourceName
    }))
  };
}
