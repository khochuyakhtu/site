import { fetchJson } from '../http.ts';

export async function fetchKrakenStakingProducts(): Promise<unknown> {
  const url = 'https://www.kraken.com/api/internal/staking/list';
  return fetchJson(url);
}
