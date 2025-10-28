export const exchanges = ['Binance', 'Bybit', 'OKX', 'Kraken'];

export const stakingTerms = ['Гнучкий', '30 днів', '60 днів', '90 днів'];

export const earnProducts = [
  {
    id: 'bnb-flex',
    exchange: 'Binance',
    asset: 'BNB',
    apy: 5.2,
    term: 'Гнучкий',
    tvl: 320,
    risk: 'Низький'
  },
  {
    id: 'sol-locked',
    exchange: 'Binance',
    asset: 'SOL',
    apy: 8.7,
    term: '30 днів',
    tvl: 210,
    risk: 'Середній'
  },
  {
    id: 'eth-stake',
    exchange: 'Kraken',
    asset: 'ETH',
    apy: 4.5,
    term: 'Гнучкий',
    tvl: 150,
    risk: 'Низький'
  },
  {
    id: 'dot-lock',
    exchange: 'OKX',
    asset: 'DOT',
    apy: 12.1,
    term: '60 днів',
    tvl: 95,
    risk: 'Середній'
  },
  {
    id: 'avax-earn',
    exchange: 'Bybit',
    asset: 'AVAX',
    apy: 14.5,
    term: '90 днів',
    tvl: 120,
    risk: 'Високий'
  },
  {
    id: 'usdt-flex',
    exchange: 'OKX',
    asset: 'USDT',
    apy: 6.3,
    term: 'Гнучкий',
    tvl: 400,
    risk: 'Низький'
  }
];
