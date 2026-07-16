import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { userPreferences } from '@/db/schema';

export async function getPreferences(userId: string) {
  const [preferences] = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);

  return preferences ?? null;
}
