import { auth, currentUser } from '@clerk/nextjs/server';

import { upsertUserFromClerk } from '@/db/users';

export async function requireClerkUserId() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  return userId;
}

export async function syncCurrentUserProfile() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error('Unauthorized');
  }

  const primaryEmail = clerkUser.emailAddresses.find(
    (emailAddress) => emailAddress.id === clerkUser.primaryEmailAddressId,
  );

  if (!primaryEmail) {
    throw new Error('Authenticated user does not have a primary email address.');
  }

  return upsertUserFromClerk({
    clerkUserId: clerkUser.id,
    email: primaryEmail.emailAddress,
    displayName: clerkUser.fullName,
    avatarUrl: clerkUser.imageUrl
  });
}
