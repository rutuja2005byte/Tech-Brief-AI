import { NextResponse } from 'next/server';

import { findUserByClerkId } from '@/db/users';
import { requireClerkUserId, syncCurrentUserProfile } from '@/auth/clerk';

export async function GET() {
  try {
    const clerkUserId = await requireClerkUserId();
    const existingUser = await findUserByClerkId(clerkUserId);
    const user = existingUser ?? (await syncCurrentUserProfile());

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        onboardingCompletedAt: user.onboardingCompletedAt
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'Unauthorized' ? 401 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
