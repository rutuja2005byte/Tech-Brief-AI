import type { BriefCategory } from '@tech-brief-ai/domain';

export interface FetchedArticle {
  readonly externalId: string | null;
  readonly title: string;
  readonly url: string;
  readonly summary: string;
  readonly authorName: string | null;
  readonly imageUrl: string | null;
  readonly publishedAt: Date;
  readonly categories: readonly BriefCategory[];
  readonly rawPayload: Record<string, unknown>;
}

export interface SourceAdapter {
  readonly fetch: () => Promise<readonly FetchedArticle[]>;
}
