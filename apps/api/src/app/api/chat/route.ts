import { NextResponse } from 'next/server';

import { requireClerkUserId } from '@/auth/clerk';
import { answerTechBriefQuestion } from '@/features/chat/chat-service';
import { chatMessageSchema } from '@tech-brief-ai/validation';

export async function POST(request: Request) {
  try {
    await requireClerkUserId();
    const input = chatMessageSchema.parse(await request.json());
    const result = await answerTechBriefQuestion(input.message);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown chat error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
