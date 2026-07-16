import { findUserByClerkId } from '@/db/users';

import { requireClerkUserId, syncCurrentUserProfile } from './clerk';

export async function requireCurrentUser() {
  const clerkUserId = await requireClerkUserId();
  const existingUser = await findUserByClerkId(clerkUserId);

  return existingUser ?? syncCurrentUserProfile();
}
