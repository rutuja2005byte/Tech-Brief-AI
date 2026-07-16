import { NextResponse } from 'next/server';

import { ingestAllEnabledSources, ingestSourceBySlug } from '@/features/news/ingestion-service';
import { requireClerkUserId } from '@/auth/clerk';

export async function POST(request: Request) {
  try {
    await requireClerkUserId();
    const body = (await request.json().catch(() => ({}))) as { readonly sourceSlug?: unknown };
    const sourceSlug = typeof body.sourceSlug === 'string' ? body.sourceSlug : null;
    const results = sourceSlug ? [await ingestSourceBySlug(sourceSlug)] : await ingestAllEnabledSources();

    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown ingestion error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
