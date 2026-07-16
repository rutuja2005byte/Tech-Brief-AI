import { z } from 'zod';

export const appConfig = {
  name: 'Tech Brief AI',
  supportEmail: 'support@techbriefai.app',
  defaultLocale: 'en-US'
} as const;

export const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  EDGE_TTS_VOICE: z.string().default('en-US-AriaNeural'),
  GROQ_API_KEY: z.string().min(1),
  INNGEST_EVENT_KEY: z.string().min(1),
  INNGEST_SIGNING_KEY: z.string().min(1),
  POSTHOG_KEY: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_STORAGE_BUCKET: z.string().default('tech-brief-ai'),
  SUPABASE_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url()
});

export const mobileEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  EXPO_PUBLIC_POSTHOG_KEY: z.string().optional(),
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional()
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type MobileEnv = z.infer<typeof mobileEnvSchema>;
