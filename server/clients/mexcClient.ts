import { fetchJson, fetchJsonFromAny } from '../http.ts';

export async function fetchMexcLaunchpoolProjects(): Promise<unknown> {
  const urls = [
    'https://www.mexc.com/open/api/v2/launchpad/project/list?pageNum=1&pageSize=50&status=ALL',
    'https://www.mexc.com/open/api/v2/launchpad/project/list?page=1&page_size=50&status=ALL',
    'https://www.mexc.com/open/api/v3/launchpad/project/list?page=1&pageSize=50&status=ALL'
  ];
  return fetchJsonFromAny(urls);
}

export async function fetchMexcEarnProducts(): Promise<unknown> {
  const url =
    'https://www.mexc.com/open/api/v2/earn/product/list?page=1&page_size=50&status=ALL';
  return fetchJson(url);
}
