import { fetchFromConfiguredEndpoints } from '../config/endpoints.ts';

const CLIENT_HEADERS = { clienttype: 'web' } as const;

export async function fetchBinanceLaunchpoolProjects(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BINANCE_LAUNCHPOOL_ENDPOINTS', {
    headers: CLIENT_HEADERS
  });
}

export async function fetchBinanceEarnProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BINANCE_EARN_ENDPOINTS', {
    headers: CLIENT_HEADERS
  });
}

export async function fetchBinanceStakingProducts(): Promise<unknown> {
  return fetchFromConfiguredEndpoints('BINANCE_STAKING_ENDPOINTS', {
    headers: CLIENT_HEADERS
  });
}
