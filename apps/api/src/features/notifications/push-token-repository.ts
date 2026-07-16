import type { PushTokenInput } from '@tech-brief-ai/validation';

const registeredTokens = new Map<string, PushTokenInput>();

export function registerPushToken(userId: string, input: PushTokenInput) {
  registeredTokens.set(`${userId}:${input.token}`, input);

  return {
    registered: true,
    token: input.token,
    platform: input.platform
  };
}
