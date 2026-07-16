import type { SourceDefinition } from './sources';
import { createHackerNewsAdapter } from './hacker-news-adapter';
import { createRssAdapter } from './rss-adapter';
import type { SourceAdapter } from './types';

export function createSourceAdapter(source: SourceDefinition): SourceAdapter | null {
  if (source.kind === 'hacker-news') {
    return createHackerNewsAdapter();
  }

  if (source.feedUrl) {
    return createRssAdapter(source.feedUrl);
  }

  return null;
}
