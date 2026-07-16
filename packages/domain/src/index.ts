export type BriefCadence = 'daily' | 'weekly' | 'monthly';

export type NewsSourceKind =
  | 'rss'
  | 'api'
  | 'github'
  | 'hacker-news'
  | 'reddit'
  | 'youtube';

export type BriefCategory =
  | 'ai'
  | 'cloud'
  | 'developer-tools'
  | 'frontend'
  | 'infrastructure'
  | 'mobile'
  | 'product'
  | 'security'
  | 'startups';

export interface NewsSource {
  readonly id: string;
  readonly name: string;
  readonly kind: NewsSourceKind;
  readonly homepageUrl: string;
  readonly enabled: boolean;
}

export interface NormalizedArticle {
  readonly id: string;
  readonly sourceId: string;
  readonly title: string;
  readonly url: string;
  readonly summary: string;
  readonly authorName: string | null;
  readonly imageUrl: string | null;
  readonly publishedAt: Date;
  readonly categories: readonly BriefCategory[];
  readonly importanceScore: number;
}

export interface Brief {
  readonly id: string;
  readonly cadence: BriefCadence;
  readonly title: string;
  readonly summary: string;
  readonly articleIds: readonly string[];
  readonly audioUrl: string | null;
  readonly publishedAt: Date;
}

export interface UserPreferences {
  readonly categories: readonly BriefCategory[];
  readonly notificationHourLocal: number;
  readonly podcastVoice: string;
  readonly briefCadence: BriefCadence;
  readonly darkMode: 'system' | 'light' | 'dark';
  readonly pushNotificationsEnabled: boolean;
}
