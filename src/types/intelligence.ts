export interface WhaleTransaction {
  id: string;
  blockchain: string;
  symbol: string;
  amount: number;
  amountUsd: number;
  from: { address: string; owner?: string };
  to: { address: string; owner?: string };
  timestamp: string;
}

export interface SocialSentiment {
  symbol: string;
  score: number; // -1 to 1
  volume: number;
  trendingWords: string[];
}

export interface StakingAsset {
  symbol: string;
  name: string;
  apy: number;
  minAmount: number;
  lockupDays: number;
}

export interface DEXPool {
  pair: string;
  platform: string;
  tvl: number;
  volume24h: number;
  apr?: number;
}

export interface NFTCollection {
  name: string;
  floorPrice: number;
  currency: string;
  change24h: number;
  volume: number;
  imageUrl?: string;
}

export interface BridgeMetric {
  chain: string;
  volume24h: number;
  share: number;
}

export interface MiningProfitability {
  revenuePerTh: number;
  dailyProfitBtc: number;
  difficulty: number;
  btcPrice: number;
}

export interface RegulatoryStatus {
  country: string;
  status: 'Proposed' | 'Enacted' | 'Enforced' | 'Warning';
  summary: string;
  date: string;
}

export interface FlashLoan {
  id: string;
  protocol: string;
  amount: number;
  symbol: string;
  profit: number;
  timestamp: string;
}
