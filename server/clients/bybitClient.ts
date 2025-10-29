import { fetchJson } from '../http.ts';

export async function fetchBybitLaunchpoolProducts(): Promise<unknown> {
  const url = 'https://api2.bybit.com/spot/api/earn/launchpool/product/list';
  return fetchJson(url);
}

export async function fetchBybitEarnProducts(): Promise<unknown> {
  const url =
    'https://api2.bybit.com/spot/api/earn/defi/product/list?status=AVAILABLE&page=1&size=50';
  return fetchJson(url);
}
