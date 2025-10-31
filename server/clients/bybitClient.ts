import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchBybitLaunchpoolProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BYBIT_LAUNCHPOOL_ENDPOINTS');
}

export async function fetchBybitEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BYBIT_EARN_ENDPOINTS');
}
