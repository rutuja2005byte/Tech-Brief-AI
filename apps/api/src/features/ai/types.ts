import type { BriefCadence } from '@tech-brief-ai/domain';

export interface BriefCandidateArticle {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly summary: string;
  readonly sourceName: string;
  readonly publishedAt: Date;
}

export interface GeneratedBriefContent {
  readonly title: string;
  readonly summary: string;
  readonly keyTakeaways: readonly string[];
  readonly podcastScript: string;
}

export interface GenerateBriefInput {
  readonly cadence: BriefCadence;
  readonly articles: readonly BriefCandidateArticle[];
}
