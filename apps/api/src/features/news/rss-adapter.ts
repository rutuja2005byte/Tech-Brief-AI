import Parser from 'rss-parser';

import { inferCategories } from './categorize';
import { normalizeUrl } from './hash';
import type { FetchedArticle, SourceAdapter } from './types';

const parser = new Parser<unknown, Record<string, unknown>>();

export function createRssAdapter(feedUrl: string): SourceAdapter {
  return {
    async fetch() {
      const feed = await parser.parseURL(feedUrl);

      return feed.items
        .map((item) => toFetchedArticle(item))
        .filter((article): article is FetchedArticle => article !== null);
    }
  };
}

function toFetchedArticle(item: Record<string, unknown>) {
  const link = getString(item.link) ?? getString(item.guid);
  const title = getString(item.title);

  if (!link || !title) {
    return null;
  }

  const summary =
    getString(item.contentSnippet) ?? getString(item.summary) ?? getString(item.content) ?? title;
  const publishedAt = parseDate(getString(item.isoDate) ?? getString(item.pubDate));
  const textForCategory = `${title} ${summary}`;

  return {
    externalId: getString(item.guid),
    title,
    url: normalizeUrl(link),
    summary: stripHtml(summary).slice(0, 2000),
    authorName: getString(item.creator) ?? getString(item.author),
    imageUrl: extractImageUrl(item),
    publishedAt,
    categories: inferCategories(textForCategory),
    rawPayload: item
  };
}

function getString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

function parseDate(value: string | null) {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractImageUrl(item: Record<string, unknown>) {
  const enclosure = item.enclosure;

  if (typeof enclosure === 'object' && enclosure !== null && 'url' in enclosure) {
    return getString(enclosure.url);
  }

  return null;
}
