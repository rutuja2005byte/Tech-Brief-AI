import { z } from 'zod';

export const briefCategorySchema = z.enum([
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

export const onboardingPreferencesSchema = z.object({
  categories: z.array(briefCategorySchema).min(1),
  notificationHourLocal: z.number().int().min(0).max(23),
  podcastVoice: z.string().min(1),
  briefCadence: z.enum(['daily', 'weekly', 'monthly']),
  darkMode: z.enum(['system', 'light', 'dark']),
  pushNotificationsEnabled: z.boolean()
});

export const newsSearchSchema = z.object({
  query: z.string().trim().min(1).max(120),
  limit: z.coerce.number().int().min(1).max(50).default(20)
});

export const chatMessageSchema = z.object({
  message: z.string().trim().min(1).max(2_000)
});

export const articleIdSchema = z.object({
  articleId: z.string().uuid()
});

export const collectionCreateSchema = z.object({
  name: z.string().trim().min(1).max(80)
});

export const collectionArticleSchema = z.object({
  collectionId: z.string().uuid(),
  articleId: z.string().uuid()
});

export const pushTokenSchema = z.object({
  token: z.string().trim().min(1),
  platform: z.enum(['ios', 'android', 'web'])
});

export type OnboardingPreferencesInput = z.infer<typeof onboardingPreferencesSchema>;
export type NewsSearchInput = z.infer<typeof newsSearchSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type ArticleIdInput = z.infer<typeof articleIdSchema>;
export type CollectionCreateInput = z.infer<typeof collectionCreateSchema>;
export type CollectionArticleInput = z.infer<typeof collectionArticleSchema>;
export type PushTokenInput = z.infer<typeof pushTokenSchema>;
