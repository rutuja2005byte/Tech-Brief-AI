export interface BriefArticle {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly summary: string;
  readonly sourceName: string;
  readonly rank: number;
}

export interface LatestBrief {
  readonly id: string;
  readonly cadence: 'daily' | 'weekly' | 'monthly';
  readonly title: string;
  readonly summary: string;
  readonly keyTakeaways: readonly string[];
  readonly podcastScript: string | null;
  readonly audioUrl: string | null;
  readonly publishedAt: string;
  readonly articles: readonly BriefArticle[];
}

export interface LatestBriefResponse {
  readonly brief: LatestBrief | null;
}
