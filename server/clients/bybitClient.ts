import { fetchJson, fetchJsonFromAny } from '../http.ts';

export async function fetchBybitLaunchpoolProducts(): Promise<unknown> {
  const urls = [
    'https://api2.bybit.com/earn/launchpool/project/list?status=ALL&page=1&size=50',
    'https://api2.bybit.com/spot/api/earn/launchpool/project/list?status=ALL&page=1&size=50',
    'https://api2.bybit.com/spot/api/earn/launchpool/product/list?status=ALL&page=1&size=50'
  ];
  return fetchJsonFromAny(urls);
}

export async function fetchBybitEarnProducts(): Promise<unknown> {
  const url =
    'https://api2.bybit.com/spot/api/earn/defi/product/list?status=AVAILABLE&page=1&size=50';
  return fetchJson(url);
}
