import { mobileEnv } from './env';

export interface ApiClientOptions {
  readonly token: string | null;
}

export async function postJson<ResponseBody, RequestBody>(
  path: string,
  body: RequestBody,
  options: ApiClientOptions,
) {
  const response = await fetch(`${mobileEnv.EXPO_PUBLIC_API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  return (await response.json()) as ResponseBody;
}
