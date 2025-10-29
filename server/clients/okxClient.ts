import { fetchJson } from '../http.ts';

export async function fetchOkxLaunchpoolProjects(): Promise<unknown> {
  const url =
    'https://www.okx.com/priapi/v5/earn/financial/launchpool/project?status=all&limit=50';
  return fetchJson(url);
}

export async function fetchOkxEarnProducts(): Promise<unknown> {
  const url = 'https://www.okx.com/api/v5/finance/staking-defi/offers?protocolType=defi';
  return fetchJson(url);
}

export async function fetchOkxStakingProducts(): Promise<unknown> {
  const url =
    'https://www.okx.com/api/v5/finance/staking-defi/orders?productType=staking&limit=50';
  return fetchJson(url);
}
