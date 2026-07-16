import { NextResponse } from 'next/server';

import { requireCurrentUser } from '@/auth/current-user';
import {
  addArticleToCollection,
  createCollection,
  listCollections
} from '@/features/library/library-repository';
import { collectionArticleSchema, collectionCreateSchema } from '@tech-brief-ai/validation';

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const collections = await listCollections(user.id);

    return NextResponse.json({ collections });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown collection error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const input = collectionCreateSchema.parse(await request.json());
    const collection = await createCollection(user.id, input.name);

    return NextResponse.json({ collection });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown collection error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    await requireCurrentUser();
    const input = collectionArticleSchema.parse(await request.json());
    await addArticleToCollection(input.collectionId, input.articleId);

    return NextResponse.json({ saved: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown collection error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
