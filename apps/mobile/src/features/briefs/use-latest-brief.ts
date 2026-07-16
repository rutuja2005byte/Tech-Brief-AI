import { useQuery } from '@tanstack/react-query';

import { getJson } from '@/lib/api-client';
import { useAppAuth } from '@/providers/auth-provider';

import type { LatestBriefResponse } from './types';

const demoBriefResponse: LatestBriefResponse = {
  brief: {
    id: 'expo-go-demo-brief',
    audioUrl: null,
    cadence: 'daily',
    publishedAt: new Date().toISOString(),
    title: 'AI infrastructure keeps moving fast',
    summary:
      'Today’s signal is focused on model serving, developer tooling, and mobile AI workflows. The production pipeline will replace this demo brief once backend authentication is connected.',
    keyTakeaways: [
      'Expo Go is running the mobile shell without native auth dependencies.',
      'The feed, podcast, and RAG surfaces are ready for live API data.',
      'Phase 6 can wire bookmarks, offline reading, notifications, and chat.'
    ],
    podcastScript: null,
    articles: [
      {
        id: 'expo-go-demo-article',
        rank: 1,
        sourceName: 'Tech Brief AI',
        summary: 'Local demo content for Expo Go while backend auth is offline.',
        title: 'Mobile shell is ready for live briefs',
        url: 'https://example.com'
      }
    ]
  }
};

export function useLatestBrief() {
  const { getToken, isSignedIn } = useAppAuth();

  return useQuery({
    queryKey: ['briefs', 'latest'],
    enabled: Boolean(isSignedIn),
    async queryFn() {
      const token = await getToken();

      if (!token) {
        return demoBriefResponse;
      }

      return getJson<LatestBriefResponse>('/api/briefs/latest', { token });
    }
  });
}
