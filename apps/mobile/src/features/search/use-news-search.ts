import { useQuery } from '@tanstack/react-query';

import { useLatestBrief } from '@/features/briefs/use-latest-brief';

export function useNewsSearch(query: string) {
  const latestBriefQuery = useLatestBrief();
  const normalizedQuery = query.trim().toLowerCase();

  return useQuery({
    queryKey: ['search', normalizedQuery, latestBriefQuery.data?.brief?.id ?? 'demo'],
    enabled: normalizedQuery.length > 0,
    queryFn() {
      const articles = latestBriefQuery.data?.brief?.articles ?? [];

      return articles.filter((article) =>
        [article.title, article.summary, article.sourceName].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      );
    }
  });
}
