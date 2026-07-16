import { inferCategories } from './categorize';
import { normalizeUrl } from './hash';
import type { FetchedArticle, SourceAdapter } from './types';

interface HackerNewsItem {
  readonly id: number;
  readonly by?: string;
  readonly score?: number;
  readonly time?: number;
  readonly title?: string;
  readonly type?: string;
  readonly url?: string;
}

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export function createHackerNewsAdapter(): SourceAdapter {
  return {
    async fetch() {
      const topStoryIds = await fetchJson<readonly number[]>(`${baseUrl}/topstories.json`);
      const selectedIds = topStoryIds.slice(0, 40);
      const items = await Promise.all(
        selectedIds.map((id) => fetchJson<HackerNewsItem>(`${baseUrl}/item/${id}.json`)),
      );

      return items
        .map((item) => toFetchedArticle(item))
        .filter((article): article is FetchedArticle => article !== null);
    }
  };
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Hacker News request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

function toFetchedArticle(item: HackerNewsItem): FetchedArticle | null {
  if (!item.title || !item.url) {
    return null;
  }

  return {
    externalId: String(item.id),
    title: item.title,
    url: normalizeUrl(item.url),
    summary: `Hacker News discussion with ${item.score ?? 0} points.`,
    authorName: item.by ?? null,
    imageUrl: null,
    publishedAt: item.time ? new Date(item.time * 1000) : new Date(),
    categories: inferCategories(item.title),
    rawPayload: { ...item }
  };
}
