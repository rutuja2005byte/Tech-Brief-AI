import { ingestAllEnabledSources, ingestSourceBySlug } from '@/features/news/ingestion-service';

import { inngest } from '../client';

export const ingestNewsSources = inngest.createFunction(
  { id: 'ingest-news-sources', name: 'Ingest news sources' },
  [{ cron: '*/30 * * * *' }, { event: 'news/ingest.requested' }],
  async ({ event, step }) => {
    const sourceSlug =
      typeof event.data.sourceSlug === 'string' && event.data.sourceSlug.length > 0
        ? event.data.sourceSlug
        : null;

    return step.run('fetch-and-store-news', async () => {
      if (sourceSlug) {
        return [await ingestSourceBySlug(sourceSlug)];
      }

      return ingestAllEnabledSources();
    });
  },
);

export const newsInngestFunctions = [ingestNewsSources];
