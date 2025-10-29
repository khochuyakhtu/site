import { fetchJson } from '../http.ts';

export async function fetchBitgetLaunchpoolProjects(): Promise<unknown> {
  const url =
    'https://www.bitget.com/v1/spot/launchpad/launchpool/ongoingList?page=1&pageSize=50';
  return fetchJson(url);
}

export async function fetchBitgetEarnProducts(): Promise<unknown> {
  const url = 'https://www.bitget.com/v1/earn/defi/product/list?page=1&pageSize=50';
  return fetchJson(url);
}
