export interface StakingProgram {
  id: string;
  exchange: string;
  asset: string;
  apy: number;
  lockPeriodDays: number;
  rewardAsset: string;
  tvl: number;
  source: string;
  sourceUrl: string | null;
}

export const fallbackStakingPrograms: StakingProgram[] = [
  {
    id: 'binance-eth-staking',
    exchange: 'Binance',
    asset: 'ETH',
    apy: 4.2,
    lockPeriodDays: 30,
    rewardAsset: 'ETH',
    tvl: 500,
    source: 'Binance Staking',
    sourceUrl: 'https://www.binance.com/en/staking'
  },
  {
    id: 'binance-ada-staking',
    exchange: 'Binance',
    asset: 'ADA',
    apy: 6.8,
    lockPeriodDays: 60,
    rewardAsset: 'ADA',
    tvl: 260,
    source: 'Binance Staking',
    sourceUrl: 'https://www.binance.com/en/staking'
  },
  {
    id: 'okx-atom-staking',
    exchange: 'OKX',
    asset: 'ATOM',
    apy: 15.4,
    lockPeriodDays: 45,
    rewardAsset: 'ATOM',
    tvl: 110,
    source: 'OKX Staking',
    sourceUrl: 'https://www.okx.com/staking'
  },
  {
    id: 'okx-eth-liquid',
    exchange: 'OKX',
    asset: 'ETH',
    apy: 5.9,
    lockPeriodDays: 0,
    rewardAsset: 'ETH',
    tvl: 320,
    source: 'OKX Staking',
    sourceUrl: 'https://www.okx.com/staking'
  },
  {
    id: 'bybit-dot-staking',
    exchange: 'Bybit',
    asset: 'DOT',
    apy: 13.7,
    lockPeriodDays: 30,
    rewardAsset: 'DOT',
    tvl: 140,
    source: 'Bybit Staking',
    sourceUrl: 'https://www.bybit.com/en-US/staking/'
  },
  {
    id: 'kraken-sol-staking',
    exchange: 'Kraken',
    asset: 'SOL',
    apy: 7.5,
    lockPeriodDays: 0,
    rewardAsset: 'SOL',
    tvl: 180,
    source: 'Kraken Staking',
    sourceUrl: 'https://www.kraken.com/staking'
  }
];
