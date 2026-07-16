import { NextResponse } from 'next/server';

import { requireCurrentUser } from '@/auth/current-user';
import { deleteBookmark, listBookmarks, saveBookmark } from '@/features/library/library-repository';
import { articleIdSchema } from '@tech-brief-ai/validation';

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const articles = await listBookmarks(user.id);

    return NextResponse.json({ articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown bookmark error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = articleIdSchema.parse(await request.json());
    await saveBookmark(user.id, input.articleId);

    return NextResponse.json({ saved: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown bookmark error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = articleIdSchema.parse(await request.json());
    await deleteBookmark(user.id, input.articleId);

    return NextResponse.json({ saved: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown bookmark error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
