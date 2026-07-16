import { NextResponse } from 'next/server';

import { requireClerkUserId } from '@/auth/clerk';
import { getLatestBrief } from '@/features/ai/brief-repository';

export async function GET() {
  try {
    await requireClerkUserId();
    const brief = await getLatestBrief();

    return NextResponse.json({ brief });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown brief error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
