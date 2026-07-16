import { serve } from 'inngest/next';

import { inngest } from '@/inngest/client';
import { newsInngestFunctions } from '@/inngest/functions/news-ingestion';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: newsInngestFunctions
});
