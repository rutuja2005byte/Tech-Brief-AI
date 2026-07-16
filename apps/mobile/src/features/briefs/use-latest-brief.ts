import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from '@tanstack/react-query';

import { getJson } from '@/lib/api-client';

import type { LatestBriefResponse } from './types';

export function useLatestBrief() {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['briefs', 'latest'],
    enabled: Boolean(isSignedIn),
    async queryFn() {
      const token = await getToken();
      return getJson<LatestBriefResponse>('/api/briefs/latest', { token });
    }
  });
}
