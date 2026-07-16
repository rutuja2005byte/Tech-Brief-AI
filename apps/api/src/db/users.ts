import { eq } from 'drizzle-orm';

import type { OnboardingPreferencesInput } from '@tech-brief-ai/validation';

import { db } from './client';
import { userPreferences, users } from './schema';

export interface ClerkUserSnapshot {
  readonly clerkUserId: string;
  readonly email: string;
  readonly displayName: string | null;
  readonly avatarUrl: string | null;
}

export async function upsertUserFromClerk(snapshot: ClerkUserSnapshot) {
  const [user] = await db
    .insert(users)
    .values({
      clerkUserId: snapshot.clerkUserId,
      email: snapshot.email,
      displayName: snapshot.displayName,
      avatarUrl: snapshot.avatarUrl,
      updatedAt: new Date()
    })
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: {
        email: snapshot.email,
        displayName: snapshot.displayName,
        avatarUrl: snapshot.avatarUrl,
        updatedAt: new Date()
      }
    })
    .returning();

  if (!user) {
    throw new Error('Failed to upsert user.');
  }

  return user;
}

export async function findUserByClerkId(clerkUserId: string) {
  const [user] = await db.select().from(users).where(eq(users.clerkUserId, clerkUserId)).limit(1);
  return user ?? null;
}

export async function completeOnboarding(
  clerkUserId: string,
  preferences: OnboardingPreferencesInput,
) {
  const user = await findUserByClerkId(clerkUserId);

  if (!user) {
    throw new Error('User profile has not been created.');
  }

  await db
    .insert(userPreferences)
    .values({
      userId: user.id,
      categories: preferences.categories,
      notificationHourLocal: preferences.notificationHourLocal,
      podcastVoice: preferences.podcastVoice,
      briefCadence: preferences.briefCadence,
      darkMode: preferences.darkMode,
      pushNotificationsEnabled: preferences.pushNotificationsEnabled,
      updatedAt: new Date()
    })
    .onConflictDoUpdate({
      target: userPreferences.userId,
      set: {
        categories: preferences.categories,
        notificationHourLocal: preferences.notificationHourLocal,
        podcastVoice: preferences.podcastVoice,
        briefCadence: preferences.briefCadence,
        darkMode: preferences.darkMode,
        pushNotificationsEnabled: preferences.pushNotificationsEnabled,
        updatedAt: new Date()
      }
    });

  const [updatedUser] = await db
    .update(users)
    .set({
      onboardingCompletedAt: new Date(),
      updatedAt: new Date()
    })
    .where(eq(users.id, user.id))
    .returning();

  if (!updatedUser) {
    throw new Error('Failed to complete onboarding.');
  }

  return updatedUser;
}
