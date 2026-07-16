import { NextResponse } from 'next/server';

import { requireCurrentUser } from '@/auth/current-user';
import { completeOnboarding } from '@/db/users';
import { getPreferences } from '@/features/preferences/preferences-repository';
import { onboardingPreferencesSchema } from '@tech-brief-ai/validation';

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const preferences = await getPreferences(user.id);

    return NextResponse.json({ preferences });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown preferences error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = onboardingPreferencesSchema.parse(await request.json());
    await completeOnboarding(user.clerkUserId, input);

    return NextResponse.json({ saved: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown preferences error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
