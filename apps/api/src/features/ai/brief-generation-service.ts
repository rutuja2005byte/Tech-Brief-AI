import type { BriefCadence } from '@tech-brief-ai/domain';

import { selectBriefCandidateArticles } from './article-selection';
import { attachAudioToBrief, createGeneratedBrief } from './brief-repository';
import { generateBriefContent } from './groq-client';
import { synthesizeAndStorePodcast } from './tts-service';

export interface BriefGenerationResult {
  readonly briefId: string;
  readonly cadence: BriefCadence;
  readonly articleCount: number;
  readonly audioPath: string;
}

export async function generateBrief(cadence: BriefCadence): Promise<BriefGenerationResult> {
  const articles = await selectBriefCandidateArticles(cadence);
  const content = await generateBriefContent({ cadence, articles });
  const brief = await createGeneratedBrief(cadence, content, articles);
  const audioPath = await synthesizeAndStorePodcast(content.podcastScript, brief.id);
  await attachAudioToBrief(brief.id, audioPath);

  return {
    briefId: brief.id,
    cadence,
    articleCount: articles.length,
    audioPath
  };
}
