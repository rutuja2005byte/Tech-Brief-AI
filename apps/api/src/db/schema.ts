import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';

export const briefCadenceEnum = pgEnum('brief_cadence', ['daily', 'weekly', 'monthly']);
export const darkModeEnum = pgEnum('dark_mode', ['system', 'light', 'dark']);
export const sourceKindEnum = pgEnum('source_kind', [
  'rss',
  'api',
  'github',
  'hacker-news',
  'reddit',
  'youtube'
]);
export const briefCategoryEnum = pgEnum('brief_category', [
  'ai',
  'cloud',
  'developer-tools',
  'frontend',
  'infrastructure',
  'mobile',
  'product',
  'security',
  'startups'
]);

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: text('clerk_user_id').notNull(),
    email: text('email').notNull(),
    displayName: text('display_name'),
    avatarUrl: text('avatar_url'),
    onboardingCompletedAt: timestamp('onboarding_completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    clerkUserIdIdx: uniqueIndex('users_clerk_user_id_idx').on(table.clerkUserId),
    emailIdx: index('users_email_idx').on(table.email)
  })
);

export const userPreferences = pgTable('user_preferences', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  categories: jsonb('categories').$type<readonly string[]>().notNull(),
  notificationHourLocal: integer('notification_hour_local').notNull(),
  podcastVoice: text('podcast_voice').notNull(),
  briefCadence: briefCadenceEnum('brief_cadence').default('daily').notNull(),
  darkMode: darkModeEnum('dark_mode').default('system').notNull(),
  pushNotificationsEnabled: boolean('push_notifications_enabled').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const newsSources = pgTable('news_sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  kind: sourceKindEnum('kind').notNull(),
  homepageUrl: text('homepage_url').notNull(),
  feedUrl: text('feed_url'),
  enabled: boolean('enabled').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const articles = pgTable(
  'articles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    sourceId: uuid('source_id')
      .notNull()
      .references(() => newsSources.id, { onDelete: 'cascade' }),
    externalId: text('external_id'),
    title: text('title').notNull(),
    url: text('url').notNull(),
    summary: text('summary').notNull(),
    authorName: text('author_name'),
    imageUrl: text('image_url'),
    contentHash: text('content_hash').notNull(),
    importanceScore: doublePrecision('importance_score').default(0).notNull(),
    rawPayload: jsonb('raw_payload').$type<Record<string, unknown>>(),
    publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    contentHashIdx: uniqueIndex('articles_content_hash_idx').on(table.contentHash),
    urlIdx: uniqueIndex('articles_url_idx').on(table.url),
    sourcePublishedAtIdx: index('articles_source_published_at_idx').on(table.sourceId, table.publishedAt)
  })
);

export const ingestionRuns = pgTable(
  'ingestion_runs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    sourceId: uuid('source_id').references(() => newsSources.id, { onDelete: 'set null' }),
    status: text('status').notNull(),
    fetchedCount: integer('fetched_count').default(0).notNull(),
    insertedCount: integer('inserted_count').default(0).notNull(),
    errorMessage: text('error_message'),
    startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true })
  },
  (table) => ({
    sourceStartedAtIdx: index('ingestion_runs_source_started_at_idx').on(
      table.sourceId,
      table.startedAt
    )
  })
);

export const articleCategories = pgTable(
  'article_categories',
  {
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    category: briefCategoryEnum('category').notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.articleId, table.category] })
  })
);

export const briefs = pgTable('briefs', {
  id: uuid('id').defaultRandom().primaryKey(),
  cadence: briefCadenceEnum('cadence').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  podcastScript: text('podcast_script'),
  audioPath: text('audio_path'),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const briefArticles = pgTable(
  'brief_articles',
  {
    briefId: uuid('brief_id')
      .notNull()
      .references(() => briefs.id, { onDelete: 'cascade' }),
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    rank: integer('rank').notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.briefId, table.articleId] })
  })
);

export const bookmarks = pgTable(
  'bookmarks',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.articleId] })
  })
);

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const collectionArticles = pgTable(
  'collection_articles',
  {
    collectionId: uuid('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.collectionId, table.articleId] })
  })
);

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type UserPreferencesRow = typeof userPreferences.$inferSelect;
