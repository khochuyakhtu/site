import { fetchJson } from '../http.ts';

export async function fetchWhitebitLaunchpadProjects(): Promise<unknown> {
  const url = 'https://whitebit.com/api/v4/public/launchpad';
  return fetchJson(url);
}

export async function fetchWhitebitEarnProducts(): Promise<unknown> {
  const url = 'https://whitebit.com/api/v4/public/earn';
  return fetchJson(url);
}
