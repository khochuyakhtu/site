export interface LaunchpoolCampaign {
  id: string;
  exchange: string;
  project: string;
  roi: number;
  status: string;
  startDate: string | null;
  endDate: string | null;
  lockAssets: string[];
  source: string;
  sourceUrl: string | null;
}

export const fallbackLaunchpoolCampaigns: LaunchpoolCampaign[] = [
  {
    id: 'binance-not-coin',
    exchange: 'Binance',
    project: 'Notcoin',
    roi: 12.5,
    status: 'Активні',
    startDate: '2024-03-20T00:00:00.000Z',
    endDate: '2024-04-20T00:00:00.000Z',
    lockAssets: ['BNB', 'FDUSD'],
    source: 'Binance Launchpool',
    sourceUrl: 'https://www.binance.com/ru/launchpool'
  },
  {
    id: 'binance-ordinals',
    exchange: 'Binance',
    project: 'ORDI',
    roi: 18.2,
    status: 'Майбутні',
    startDate: '2024-05-10T00:00:00.000Z',
    endDate: '2024-06-10T00:00:00.000Z',
    lockAssets: ['BNB'],
    source: 'Binance Launchpool',
    sourceUrl: 'https://www.binance.com/ru/launchpool'
  },
  {
    id: 'okx-layerzero',
    exchange: 'OKX',
    project: 'LayerZero',
    roi: 10.1,
    status: 'Активні',
    startDate: '2024-04-01T00:00:00.000Z',
    endDate: '2024-04-30T00:00:00.000Z',
    lockAssets: ['USDT', 'USDC'],
    source: 'OKX Jumpstart',
    sourceUrl: 'https://www.okx.com/earn/jumpstart'
  },
  {
    id: 'okx-sui-campaign',
    exchange: 'OKX',
    project: 'SUI',
    roi: 16.4,
    status: 'Завершені',
    startDate: '2024-02-15T00:00:00.000Z',
    endDate: '2024-03-15T00:00:00.000Z',
    lockAssets: ['OKB'],
    source: 'OKX Jumpstart',
    sourceUrl: 'https://www.okx.com/earn/jumpstart'
  },
  {
    id: 'bybit-apes',
    exchange: 'Bybit',
    project: 'Apes',
    roi: 22.3,
    status: 'Активні',
    startDate: '2024-03-05T00:00:00.000Z',
    endDate: '2024-04-05T00:00:00.000Z',
    lockAssets: ['BIT', 'USDT'],
    source: 'Bybit Launchpool',
    sourceUrl: 'https://www.bybit.com/en-US/launchpool/'
  },
  {
    id: 'bitget-neo',
    exchange: 'Bitget',
    project: 'NEO Boost',
    roi: 14.8,
    status: 'Активні',
    startDate: '2024-03-18T00:00:00.000Z',
    endDate: '2024-04-18T00:00:00.000Z',
    lockAssets: ['BGB', 'USDT'],
    source: 'Bitget Launchpool',
    sourceUrl: 'https://www.bitget.com/launchpool'
  },
  {
    id: 'mexc-celestia',
    exchange: 'MEXC',
    project: 'Celestia',
    roi: 19.4,
    status: 'Майбутні',
    startDate: '2024-05-01T00:00:00.000Z',
    endDate: '2024-05-31T00:00:00.000Z',
    lockAssets: ['MX'],
    source: 'MEXC Launchpad',
    sourceUrl: 'https://www.mexc.com/launchpad'
  },
  {
    id: 'whitebit-aptos',
    exchange: 'WhiteBIT',
    project: 'APT Liquidity Mining',
    roi: 11.6,
    status: 'Активні',
    startDate: '2024-03-10T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    lockAssets: ['WBT', 'USDT'],
    source: 'WhiteBIT Earn',
    sourceUrl: 'https://whitebit.com/earn'
  },
  {
    id: 'kraken-staked-eth',
    exchange: 'Kraken',
    project: 'ETH Staking',
    roi: 6.5,
    status: 'Активні',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: null,
    lockAssets: ['ETH'],
    source: 'Kraken Staking',
    sourceUrl: 'https://www.kraken.com/staking'
  }
];
