import { NextResponse } from 'next/server';

import { requireClerkUserId } from '@/auth/clerk';
import { searchArticles } from '@/features/search/search-repository';
import { newsSearchSchema } from '@tech-brief-ai/validation';

export async function GET(request: Request) {
  try {
    await requireClerkUserId();
    const url = new URL(request.url);
    const input = newsSearchSchema.parse({
      query: url.searchParams.get('q'),
      limit: url.searchParams.get('limit') ?? undefined
    });
    const articles = await searchArticles(input.query, input.limit);

    return NextResponse.json({ articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown search error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
