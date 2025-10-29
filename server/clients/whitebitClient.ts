import { fetchJson, fetchJsonFromAny } from '../http.ts';

export async function fetchWhitebitLaunchpadProjects(): Promise<unknown> {
  const urls = [
    'https://whitebit.com/api/v4/public/launchpad/list',
    'https://whitebit.com/api/v4/public/launchpad',
    'https://whitebit.com/api/v4/public/earn/launchpad'
  ];
  return fetchJsonFromAny(urls);
}

export async function fetchWhitebitEarnProducts(): Promise<unknown> {
  const url = 'https://whitebit.com/api/v4/public/earn';
  return fetchJson(url);
}
