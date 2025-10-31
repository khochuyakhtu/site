import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

export async function fetchKrakenStakingProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('KRAKEN_STAKING_ENDPOINTS');
}
