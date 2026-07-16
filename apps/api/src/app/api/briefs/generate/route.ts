import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireClerkUserId } from '@/auth/clerk';
import { generateBrief } from '@/features/ai/brief-generation-service';

const requestSchema = z.object({
  cadence: z.enum(['daily', 'weekly', 'monthly']).default('daily')
});

export async function POST(request: Request) {
  try {
    await requireClerkUserId();
    const body: unknown = await request.json().catch(() => ({}));
    const { cadence } = requestSchema.parse(body);
    const result = await generateBrief(cadence);

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown generation error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
