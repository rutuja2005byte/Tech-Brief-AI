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
  darkMode: z.enum(['system', 'light', 'dark'])
});

export type OnboardingPreferencesInput = z.infer<typeof onboardingPreferencesSchema>;
