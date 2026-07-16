import { createHash } from 'node:crypto';

export function createContentHash(input: string) {
  return createHash('sha256').update(input.trim().toLowerCase()).digest('hex');
}

export function normalizeUrl(url: string) {
  const parsedUrl = new URL(url);
  parsedUrl.hash = '';

  for (const key of [...parsedUrl.searchParams.keys()]) {
    if (key.startsWith('utm_') || key === 'ref' || key === 'source') {
      parsedUrl.searchParams.delete(key);
    }
  }

  return parsedUrl.toString();
}
