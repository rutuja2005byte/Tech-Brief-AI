import { NextResponse } from 'next/server';

import { completeOnboarding } from '@/db/users';
import { requireClerkUserId, syncCurrentUserProfile } from '@/auth/clerk';
import { onboardingPreferencesSchema } from '@tech-brief-ai/validation';

export async function POST(request: Request) {
  try {
    const clerkUserId = await requireClerkUserId();
    await syncCurrentUserProfile();

    const body: unknown = await request.json();
    const preferences = onboardingPreferencesSchema.parse(body);
    const user = await completeOnboarding(clerkUserId, preferences);

    return NextResponse.json({
      user: {
        id: user.id,
        onboardingCompletedAt: user.onboardingCompletedAt
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
