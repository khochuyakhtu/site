import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchBitgetLaunchpoolProjects(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BITGET_LAUNCHPOOL_ENDPOINTS');
}

export async function fetchBitgetEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BITGET_EARN_ENDPOINTS');
}
