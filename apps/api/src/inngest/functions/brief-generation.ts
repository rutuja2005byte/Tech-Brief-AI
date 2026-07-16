import { z } from 'zod';

import { generateBrief } from '@/features/ai/brief-generation-service';

import { inngest } from '../client';

const briefGenerationEventSchema = z.object({
  cadence: z.enum(['daily', 'weekly', 'monthly']).default('daily')
});

export const generateTechBrief = inngest.createFunction(
  { id: 'generate-tech-brief', name: 'Generate AI tech brief' },
  [{ cron: '0 6 * * *' }, { event: 'brief/generate.requested' }],
  async ({ event, step }) => {
    const data = briefGenerationEventSchema.parse(event.data);

    return step.run('generate-brief-and-podcast', async () => generateBrief(data.cadence));
  },
);

export const briefGenerationFunctions = [generateTechBrief];
