import { NextResponse } from 'next/server';

import { requireClerkUserId } from '@/auth/clerk';
import { getLatestBrief } from '@/features/ai/brief-repository';

export async function GET() {
  try {
    await requireClerkUserId();
    const brief = await getLatestBrief();

    if (!brief) {
      return NextResponse.json({ error: 'No report available.' }, { status: 404 });
    }

    const body = [
      `# ${brief.title}`,
      '',
      brief.summary,
      '',
      '## Key Takeaways',
      ...brief.keyTakeaways.map((takeaway) => `- ${takeaway}`),
      '',
      '## Sources',
      ...brief.articles.map((article) => `- ${article.title} (${article.sourceName}) ${article.url}`)
    ].join('\n');

    return new Response(body, {
      headers: {
        'Content-Disposition': 'attachment; filename="tech-brief-ai-report.md"',
        'Content-Type': 'text/markdown; charset=utf-8'
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown report error.';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
