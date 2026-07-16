import Groq from 'groq-sdk';
import { z } from 'zod';

import type { GeneratedBriefContent, GenerateBriefInput } from './types';

export const groqModel = 'llama-3.3-70b-versatile';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generatedBriefSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  keyTakeaways: z.array(z.string().min(1)).min(3).max(8),
  podcastScript: z.string().min(1)
});

export async function generateBriefContent(input: GenerateBriefInput): Promise<GeneratedBriefContent> {
  if (input.articles.length === 0) {
    throw new Error('Cannot generate a brief without articles.');
  }

  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.35,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are Tech Brief AI, a concise senior technology analyst. Return only valid JSON.'
      },
      {
        role: 'user',
        content: buildPrompt(input)
      }
    ]
  });

  const content = completion.choices[0]?.message.content;

  if (!content) {
    throw new Error('Groq returned an empty response.');
  }

  return generatedBriefSchema.parse(JSON.parse(content));
}

function buildPrompt(input: GenerateBriefInput) {
  const articleLines = input.articles
    .map(
      (article, index) =>
        `${index + 1}. ${article.title}\nSource: ${article.sourceName}\nPublished: ${article.publishedAt.toISOString()}\nURL: ${article.url}\nSummary: ${article.summary}`,
    )
    .join('\n\n');

  return `Generate a ${input.cadence} technology brief from these articles.

Audience: software engineers, mobile architects, AI engineers, startup builders.
Style: high-signal, crisp, practical, no hype.

Return JSON with:
- title: short editorial title
- summary: 4-7 paragraphs covering major developments and why they matter
- keyTakeaways: 3-8 concise bullet strings
- podcastScript: a 3-5 minute spoken script with a natural intro and outro

Articles:
${articleLines}`;
}
