import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchOkxLaunchpoolProjects(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('OKX_LAUNCHPOOL_ENDPOINTS');
}

export async function fetchOkxEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('OKX_EARN_ENDPOINTS');
}

export async function fetchOkxStakingProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('OKX_STAKING_ENDPOINTS');
}
