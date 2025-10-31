import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchMexcLaunchpoolProjects(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('MEXC_LAUNCHPOOL_ENDPOINTS');
}

export async function fetchMexcEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('MEXC_EARN_ENDPOINTS');
}
