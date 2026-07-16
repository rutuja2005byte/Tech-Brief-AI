import { NextResponse } from 'next/server';

import { requireCurrentUser } from '@/auth/current-user';
import { registerPushToken } from '@/features/notifications/push-token-repository';
import { pushTokenSchema } from '@tech-brief-ai/validation';

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = pushTokenSchema.parse(await request.json());
    const result = registerPushToken(user.id, input);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown notification error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
