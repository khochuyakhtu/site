import { fetchJson } from '../http.ts';

export async function fetchMexcLaunchpoolProjects(): Promise<unknown> {
  const url =
    'https://www.mexc.com/api/platform/launchpad/list?pageSize=50&pageNum=1&status=ALL';
  return fetchJson(url);
}

export async function fetchMexcEarnProducts(): Promise<unknown> {
  const url =
    'https://www.mexc.com/open/api/v2/earn/product/list?page=1&page_size=50&status=ALL';
  return fetchJson(url);
}
