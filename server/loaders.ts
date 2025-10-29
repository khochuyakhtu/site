import { randomUUID } from 'node:crypto';
import {
  fallbackEarnProducts,
  type EarnProduct
} from './data/earn.ts';
import {
  fallbackLaunchpoolCampaigns,
  type LaunchpoolCampaign
} from './data/launchpool.ts';
import {
  fallbackStakingPrograms,
  type StakingProgram
} from './data/staking.ts';

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function fetchJson(url: string, options: RequestInit = {}): Promise<unknown> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json, text/plain, */*',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch (parseError) {
    const error = new Error('Unable to parse JSON response');
    error.cause = parseError as Error;
    throw error;
  }
}

function ensureIsoDate(value: unknown): string | null {
  if (!value) {
    return null;
  }

  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && asNumber > 0) {
    if (asNumber < 10_000_000_000) {
      return new Date(asNumber * 1000).toISOString();
    }
    return new Date(asNumber).toISOString();
  }

  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function normaliseLaunchpoolItem(raw: Record<string, unknown>, exchange: string): LaunchpoolCampaign {
  const id = String(
    raw.projectId ?? raw.id ?? raw.uid ?? raw.projectName ?? randomUUID()
  );
  const project =
    String(raw.projectName ?? raw.tokenName ?? raw.project ?? raw.name ?? exchange);
  const startDate = ensureIsoDate(
    raw.startTime ?? raw.startDate ?? raw.subscribeStartTime
  );
  const endDate = ensureIsoDate(
    raw.endTime ?? raw.endDate ?? raw.subscribeEndTime
  );
  const roi = Number(
    raw.roi ?? raw.apy ?? raw.annualRate ?? raw.estimatedApy ?? raw.rate ?? raw.apr ?? 0
  );
  const lockAssets = Array.isArray(raw.lockAssets)
    ? (raw.lockAssets as string[])
    : raw.rewardAssets
    ? ([] as string[]).concat(raw.rewardAssets as string[])
    : raw.stakeAssets
    ? ([] as string[]).concat(raw.stakeAssets as string[])
    : raw.tokens
    ? (raw.tokens as Array<{ symbol?: string; asset?: string } | string>).map((token) =>
        typeof token === 'string'
          ? token
          : (token.symbol ?? token.asset ?? exchange)
      )
    : raw.asset ?? raw.assets
    ? ([] as string[]).concat(raw.asset ?? (raw.assets as string[]))
    : [];
  const statusValue = String(raw.statusText ?? raw.status ?? raw.phase ?? '').toLowerCase();
  let status: LaunchpoolCampaign['status'] = 'Активні';
  if (statusValue.includes('end') || statusValue.includes('close')) {
    status = 'Завершені';
  } else if (statusValue.includes('coming') || statusValue.includes('future')) {
    status = 'Майбутні';
  }

  return {
    id,
    exchange,
    project,
    roi: Number.isFinite(roi) ? Number(roi.toFixed(2)) : 0,
    status,
    startDate,
    endDate,
    lockAssets: lockAssets.map((value) => String(value)),
    source: `${exchange} Launchpool`,
    sourceUrl: (raw.projectUrl ?? raw.url ?? raw.detailUrl ?? raw.link ?? null) as
      | string
      | null
  };
}

function normaliseEarnProduct(raw: Record<string, unknown>, exchange: string): EarnProduct {
  const id = String(
    raw.productId ?? raw.productCode ?? raw.id ?? raw.asset ?? `${exchange}-${randomUUID()}`
  );
  const asset = String(
    raw.asset ?? raw.token ?? raw.currency ?? raw.productName ?? raw.symbol ?? 'TBD'
  );
  const apyValue =
    Number(
      raw.apy ?? raw.apr ?? raw.annualRate ?? raw.annualInterestRate ?? raw.rewardRate ?? 0
    );
  const term =
    (raw.term ?? raw.duration ?? raw.period ?? (raw.flexible ? 'Гнучкий' : null)) as
      | string
      | null;
  const tvlValue = Number(
    raw.tvl ?? raw.totalAmount ?? raw.remainingAmount ?? raw.quota ?? 0
  );
  const riskLevel = raw.riskLevel ?? raw.risk ?? null;

  return {
    id,
    exchange,
    asset,
    apy: Number.isFinite(apyValue) ? Number(apyValue.toFixed(2)) : 0,
    term: term ?? 'Гнучкий',
    tvl: Number.isFinite(tvlValue) ? Math.round(tvlValue / 1000) : 0,
    risk:
      typeof riskLevel === 'string'
        ? riskLevel
        : riskLevel === 0
        ? 'Низький'
        : 'Середній',
    category: (raw.category as string | undefined) ?? (term === 'Гнучкий' ? 'Flexible' : 'Locked'),
    source: (raw.source as string | undefined) ?? `${exchange} Earn`,
    sourceUrl: (raw.detailUrl ?? raw.url ?? raw.learnMoreUrl ?? raw.link ?? null) as string | null
  };
}

function normaliseStakingItem(raw: Record<string, unknown>, exchange: string): StakingProgram {
  const id = String(raw.id ?? raw.productId ?? raw.programId ?? `${exchange}-${randomUUID()}`);
  const asset = String(raw.asset ?? raw.currency ?? raw.token ?? raw.symbol ?? 'TBD');
  const apyValue = Number(
    raw.apy ?? raw.apr ?? raw.rewardRate ?? raw.annualRate ?? 0
  );
  const lockPeriodDays = Number(
    raw.lockPeriodDays ?? raw.lockDays ?? raw.period ?? raw.duration ?? 0
  );
  const rewardAsset = String(raw.rewardAsset ?? raw.rewardCurrency ?? asset);
  const tvl = Number(raw.tvl ?? raw.totalDeposit ?? raw.quota ?? 0);

  return {
    id,
    exchange,
    asset,
    apy: Number.isFinite(apyValue) ? Number(apyValue.toFixed(2)) : 0,
    lockPeriodDays,
    rewardAsset,
    tvl: Number.isFinite(tvl) ? Math.round(tvl / 1000) : 0,
    source: (raw.source as string | undefined) ?? `${exchange} Staking`,
    sourceUrl: (raw.detailUrl ?? raw.url ?? raw.link ?? null) as string | null
  };
}

interface ApiMeta {
  updatedAt: string;
  total: number;
  [key: string]: unknown;
}

export interface ApiWarning {
  exchange: string;
  message: string;
  status?: number | null;
}

export interface ApiResult<T> {
  items: T[];
  warnings: ApiWarning[];
  meta: ApiMeta;
}

type ExchangeEntity = { exchange: string };

type Source<T extends ExchangeEntity> = {
  exchange: string;
  fetch: () => Promise<T[]>;
};

function createResult<T extends ExchangeEntity>(
  items: T[],
  warnings: ApiWarning[] = [],
  meta: Partial<ApiMeta> = {}
): ApiResult<T> {
  return {
    items,
    warnings,
    meta: {
      updatedAt: new Date().toISOString(),
      total: items.length,
      ...meta
    }
  };
}

async function loadFromSources<T extends ExchangeEntity>(
  sources: Source<T>[],
  fallbackFilter: (exchange: string) => T[]
): Promise<ApiResult<T>> {
  const items: T[] = [];
  const warnings: ApiWarning[] = [];

  for (const source of sources) {
    const fallbackItems = fallbackFilter(source.exchange);
    try {
      const remoteItems = await source.fetch();
      if (Array.isArray(remoteItems) && remoteItems.length > 0) {
        items.push(
          ...remoteItems.map((item) => ({
            ...item,
            exchange: item.exchange ?? source.exchange
          }))
        );
        continue;
      }
      warnings.push({
        exchange: source.exchange,
        message: 'API did not return data. Using cached fallback.'
      });
      items.push(...fallbackItems);
    } catch (error) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? (error as { status?: number }).status ?? null
          : null;
      warnings.push({
        exchange: source.exchange,
        message:
          error instanceof Error ? error.message : 'Failed to load data from API',
        status
      });
      items.push(...fallbackItems);
    }
  }

  return createResult(items, warnings);
}

export async function loadLaunchpoolData({
  exchange
}: {
  exchange?: string;
} = {}): Promise<ApiResult<LaunchpoolCampaign>> {
  const sources: Source<LaunchpoolCampaign>[] = [
    {
      exchange: 'Binance',
      fetch: async () => {
        const url =
          'https://www.binance.com/bapi/earn/v1/public/launchpool/project/list?status=ALL&page=1&pageSize=50';
        const json = await fetchJson(url, { headers: { clienttype: 'web' } });
        const data = json as Record<string, any>;
        const rawList =
          data?.data?.projectList ??
          data?.data?.projects ??
          data?.data?.list ??
          data?.data ??
          [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseLaunchpoolItem(item as Record<string, unknown>, 'Binance'));
      }
    },
    {
      exchange: 'Bybit',
      fetch: async () => {
        const url = 'https://api2.bybit.com/spot/api/earn/launchpool/product/list';
        const json = (await fetchJson(url)) as Record<string, any>;
        const rawList = json?.result?.list ?? json?.data ?? [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseLaunchpoolItem(item as Record<string, unknown>, 'Bybit'));
      }
    },
    {
      exchange: 'OKX',
      fetch: async () => {
        const url =
          'https://www.okx.com/priapi/v5/earn/financial/launchpool/project?status=all&limit=50';
        const json = (await fetchJson(url)) as Record<string, any>;
        const list = Array.isArray(json?.data) ? json.data : [];
        return list.map((item) => normaliseLaunchpoolItem(item as Record<string, unknown>, 'OKX'));
      }
    }
  ];

  const activeSources = exchange
    ? sources.filter((item) => item.exchange.toLowerCase() === exchange.toLowerCase())
    : sources;

  if (exchange && activeSources.length === 0) {
    const fallbackItems = fallbackLaunchpoolCampaigns.filter(
      (item) => item.exchange.toLowerCase() === exchange.toLowerCase()
    );
    return createResult(fallbackItems, [
      {
        exchange,
        message: 'API source is not configured. Using cached fallback.'
      }
    ]);
  }

  return loadFromSources(activeSources, (sourceExchange) =>
    fallbackLaunchpoolCampaigns.filter((item) => item.exchange === sourceExchange)
  );
}

export async function loadEarnData({
  exchange
}: {
  exchange?: string;
} = {}): Promise<ApiResult<EarnProduct>> {
  const sources: Source<EarnProduct>[] = [
    {
      exchange: 'Binance',
      fetch: async () => {
        const url =
          'https://www.binance.com/bapi/earn/v1/public/simple-earn/product/list?type=ALWAYS&currency=&page=1&pageSize=50';
        const json = await fetchJson(url, { headers: { clienttype: 'web' } });
        const data = json as Record<string, any>;
        const rawList =
          (Array.isArray(data?.data) ? data?.data : data?.data?.items) ??
          data?.data?.products ??
          data?.data ??
          [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseEarnProduct(item as Record<string, unknown>, 'Binance'));
      }
    },
    {
      exchange: 'OKX',
      fetch: async () => {
        const url = 'https://www.okx.com/api/v5/finance/staking-defi/offers?protocolType=defi';
        const json = (await fetchJson(url)) as Record<string, any>;
        const list = Array.isArray(json?.data) ? json.data : [];
        return list.map((item) => normaliseEarnProduct(item as Record<string, unknown>, 'OKX'));
      }
    },
    {
      exchange: 'Bybit',
      fetch: async () => {
        const url =
          'https://api2.bybit.com/spot/api/earn/defi/product/list?status=AVAILABLE&page=1&size=50';
        const json = (await fetchJson(url)) as Record<string, any>;
        const rawList = json?.result?.list ?? json?.data ?? [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseEarnProduct(item as Record<string, unknown>, 'Bybit'));
      }
    }
  ];

  const activeSources = exchange
    ? sources.filter((item) => item.exchange.toLowerCase() === exchange.toLowerCase())
    : sources;

  if (exchange && activeSources.length === 0) {
    const fallbackItems = fallbackEarnProducts.filter(
      (item) => item.exchange.toLowerCase() === exchange.toLowerCase()
    );
    return createResult(fallbackItems, [
      {
        exchange,
        message: 'API source is not configured. Using cached fallback.'
      }
    ]);
  }

  return loadFromSources(activeSources, (sourceExchange) =>
    fallbackEarnProducts.filter((item) => item.exchange === sourceExchange)
  );
}

export async function loadStakingData({
  exchange
}: {
  exchange?: string;
} = {}): Promise<ApiResult<StakingProgram>> {
  const sources: Source<StakingProgram>[] = [
    {
      exchange: 'Binance',
      fetch: async () => {
        const url =
          'https://www.binance.com/bapi/earn/v1/public/staking/project/list?page=1&pageSize=50&type=all';
        const json = await fetchJson(url, { headers: { clienttype: 'web' } });
        const data = json as Record<string, any>;
        const rawList =
          (Array.isArray(data?.data) ? data?.data : data?.data?.items) ??
          data?.data?.projects ??
          data?.data ??
          [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseStakingItem(item as Record<string, unknown>, 'Binance'));
      }
    },
    {
      exchange: 'OKX',
      fetch: async () => {
        const url =
          'https://www.okx.com/api/v5/finance/staking-defi/orders?productType=staking&limit=50';
        const json = (await fetchJson(url)) as Record<string, any>;
        const list = Array.isArray(json?.data) ? json.data : [];
        return list.map((item) => normaliseStakingItem(item as Record<string, unknown>, 'OKX'));
      }
    },
    {
      exchange: 'Kraken',
      fetch: async () => {
        const url = 'https://www.kraken.com/api/internal/staking/list';
        const json = (await fetchJson(url)) as Record<string, any>;
        const rawList = json?.result ?? json?.data ?? [];
        const list = Array.isArray(rawList) ? rawList : [];
        return list.map((item) => normaliseStakingItem(item as Record<string, unknown>, 'Kraken'));
      }
    }
  ];

  const activeSources = exchange
    ? sources.filter((item) => item.exchange.toLowerCase() === exchange.toLowerCase())
    : sources;

  if (exchange && activeSources.length === 0) {
    const fallbackItems = fallbackStakingPrograms.filter(
      (item) => item.exchange.toLowerCase() === exchange.toLowerCase()
    );
    return createResult(fallbackItems, [
      {
        exchange,
        message: 'API source is not configured. Using cached fallback.'
      }
    ]);
  }

  return loadFromSources(activeSources, (sourceExchange) =>
    fallbackStakingPrograms.filter((item) => item.exchange === sourceExchange)
  );
}
