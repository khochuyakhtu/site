const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export async function fetchJson(url: string, options: RequestInit = {}): Promise<unknown> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json, text/plain, */*',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch (parseError) {
    const error = new Error('Unable to parse JSON response');
    error.cause = parseError as Error;
    throw error;
  }
}
