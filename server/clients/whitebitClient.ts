import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchWhitebitLaunchpadProjects(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('WHITEBIT_LAUNCHPOOL_ENDPOINTS');
}

export async function fetchWhitebitEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('WHITEBIT_EARN_ENDPOINTS');
}
