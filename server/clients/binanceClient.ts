import { fetchJson } from '../http.ts';

const CLIENT_HEADERS = { clienttype: 'web' } as const;

export async function fetchBinanceLaunchpoolProjects(): Promise<unknown> {
  const url =
    'https://www.binance.com/bapi/earn/v1/public/launchpool/project/list?status=ALL&page=1&pageSize=50';
  return fetchJson(url, { headers: CLIENT_HEADERS });
}

export async function fetchBinanceEarnProducts(): Promise<unknown> {
  const url =
    'https://www.binance.com/bapi/earn/v1/public/simple-earn/product/list?type=ALWAYS&currency=&page=1&pageSize=50';
  return fetchJson(url, { headers: CLIENT_HEADERS });
}

export async function fetchBinanceStakingProducts(): Promise<unknown> {
  const url =
    'https://www.binance.com/bapi/earn/v1/public/staking/project/list?page=1&pageSize=50&type=all';
  return fetchJson(url, { headers: CLIENT_HEADERS });
}
