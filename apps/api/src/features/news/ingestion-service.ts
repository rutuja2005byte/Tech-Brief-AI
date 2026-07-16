import type { SourceDefinition } from './sources';
import { sourceDefinitions } from './sources';
import { createSourceAdapter } from './source-adapters';
import {
  completeIngestionRun,
  createIngestionRun,
  persistFetchedArticles,
  seedNewsSources,
  upsertSource
} from './repository';

export interface IngestionResult {
  readonly sourceSlug: string;
  readonly fetchedCount: number;
  readonly insertedCount: number;
  readonly status: 'completed' | 'failed' | 'skipped';
  readonly errorMessage: string | null;
}

export async function ingestAllEnabledSources() {
  await seedNewsSources();
  const enabledDefinitions = sourceDefinitions.filter((source) => source.enabled);
  const results: IngestionResult[] = [];

  for (const source of enabledDefinitions) {
    results.push(await ingestSource(source));
  }

  return results;
}

export async function ingestSourceBySlug(sourceSlug: string) {
  await seedNewsSources();
  const source = sourceDefinitions.find((definition) => definition.slug === sourceSlug);

  if (!source) {
    throw new Error(`Unknown source: ${sourceSlug}.`);
  }

  return ingestSource(source);
}

async function ingestSource(source: SourceDefinition): Promise<IngestionResult> {
  const sourceRow = await upsertSource(source);
  const adapter = createSourceAdapter(source);

  if (!adapter) {
    return {
      sourceSlug: source.slug,
      fetchedCount: 0,
      insertedCount: 0,
      status: 'skipped',
      errorMessage: 'No adapter configured for this source.'
    };
  }

  const run = await createIngestionRun(sourceRow.id);

  try {
    const fetchedArticles = await adapter.fetch();
    const insertedCount = await persistFetchedArticles(sourceRow.id, fetchedArticles);
    await completeIngestionRun(run.id, 'completed', fetchedArticles.length, insertedCount, null);

    return {
      sourceSlug: source.slug,
      fetchedCount: fetchedArticles.length,
      insertedCount,
      status: 'completed',
      errorMessage: null
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown ingestion error.';
    await completeIngestionRun(run.id, 'failed', 0, 0, message);

    return {
      sourceSlug: source.slug,
      fetchedCount: 0,
      insertedCount: 0,
      status: 'failed',
      errorMessage: message
    };
  }
}
