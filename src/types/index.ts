/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface FiatRates {
  [key: string]: number;
}

export interface CryptoHistory {
  prices: [number, number][];
}

export interface PortfolioCoin {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
}
