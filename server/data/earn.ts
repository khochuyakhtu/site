export interface EarnProduct {
  id: string;
  exchange: string;
  asset: string;
  apy: number;
  term: string;
  tvl: number;
  risk: string;
  category: string;
  source: string;
  sourceUrl: string;
}

export const fallbackEarnProducts: EarnProduct[] = [
  {
    id: 'binance-bnb-flex',
    exchange: 'Binance',
    asset: 'BNB',
    apy: 5.2,
    term: 'Гнучкий',
    tvl: 320,
    risk: 'Низький',
    category: 'Flexible',
    source: 'Binance Simple Earn',
    sourceUrl: 'https://www.binance.com/en/earn/simple-earn'
  },
  {
    id: 'binance-sol-locked',
    exchange: 'Binance',
    asset: 'SOL',
    apy: 8.7,
    term: '30 днів',
    tvl: 210,
    risk: 'Середній',
    category: 'Locked',
    source: 'Binance Simple Earn',
    sourceUrl: 'https://www.binance.com/en/earn/simple-earn'
  },
  {
    id: 'okx-usdt-flex',
    exchange: 'OKX',
    asset: 'USDT',
    apy: 6.3,
    term: 'Гнучкий',
    tvl: 400,
    risk: 'Низький',
    category: 'Flexible',
    source: 'OKX Earn',
    sourceUrl: 'https://www.okx.com/earn'
  },
  {
    id: 'okx-dot-lock',
    exchange: 'OKX',
    asset: 'DOT',
    apy: 12.1,
    term: '60 днів',
    tvl: 95,
    risk: 'Середній',
    category: 'Locked',
    source: 'OKX Earn',
    sourceUrl: 'https://www.okx.com/earn'
  },
  {
    id: 'bybit-avax-earn',
    exchange: 'Bybit',
    asset: 'AVAX',
    apy: 14.5,
    term: '90 днів',
    tvl: 120,
    risk: 'Високий',
    category: 'Locked',
    source: 'Bybit Earn',
    sourceUrl: 'https://www.bybit.com/en-US/earn/'
  },
  {
    id: 'kraken-eth-stake',
    exchange: 'Kraken',
    asset: 'ETH',
    apy: 4.5,
    term: 'Гнучкий',
    tvl: 150,
    risk: 'Низький',
    category: 'Staking',
    source: 'Kraken Earn',
    sourceUrl: 'https://www.kraken.com/earn'
  }
];
