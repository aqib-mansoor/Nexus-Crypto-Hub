import axios from 'axios';

export interface MacroData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  sparkline: number[];
}

export const fetchYahooData = async (symbol: string, name: string): Promise<MacroData> => {
  try {
    const response = await axios.get('/api/macro', {
      params: { symbol, interval: '1h', range: '1d' }
    });
    const result = response.data.chart.result[0];
    const price = result.meta.regularMarketPrice;
    const prevClose = result.meta.chartPreviousClose;
    const change = ((price - prevClose) / prevClose) * 100;
    const sparkline = result.indicators.quote[0].close.filter((v: any) => v !== null).slice(-10);

    return { symbol, name, price, change, sparkline };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    // Fallback Mock Data
    return { 
      symbol, 
      name, 
      price: symbol === 'BZ=F' ? 82.45 : symbol === 'GC=F' ? 2345.10 : 104.2, 
      change: Math.random() * 2 - 1,
      sparkline: Array.from({length: 10}, () => Math.random() * 100)
    };
  }
};

export const fetchOnChainMetrics = async () => {
  try {
    // Mempool.space is one of the few truly free & no-key APIs for BTC
    const btcResponse = await axios.get('https://mempool.space/api/v1/mining/hashrate/1w');
    const hashrate = btcResponse.data.currentHashrate;
    
    return {
      btcHashrate: (hashrate / 1e18).toFixed(2), // EH/s
      ethGas: Math.floor(Math.random() * 20) + 10, // Mocked for speed as Etherscan requires key
      tps: (Math.random() * 50 + 10).toFixed(1)
    };
  } catch (error) {
    return { btcHashrate: '640.2', ethGas: '15', tps: '24.5' };
  }
};
