import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const EXCHANGE_RATE_BASE_URL = 'https://v6.exchangerate-api.com/v6';

const CG_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const EX_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

export const cryptoApi = axios.create({
  baseURL: COINGECKO_BASE_URL,
  params: {
    x_cg_demo_api_key: CG_KEY,
  },
});

export const fiatApi = axios.create({
  baseURL: `${EXCHANGE_RATE_BASE_URL}/${EX_KEY}`,
});

export const getTopCoins = async (limit = 250) => {
  const { data } = await cryptoApi.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h',
    },
  });
  return data;
};

export const getCoinHistory = async (id: string, days: string) => {
  const { data } = await cryptoApi.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  });
  return data;
};

export const getExchangeRates = async (base = 'USD') => {
  const { data } = await fiatApi.get(`/latest/${base}`);
  return data.conversion_rates;
};

export const getFearAndGreed = async () => {
  const { data } = await axios.get('https://api.alternative.me/fng/');
  return data.data[0];
};

export const getEthGas = async () => {
  // Simple fallback/mock since Etherscan needs more setup for a demo
  return {
    low: 15,
    average: 22,
    fast: 30,
    timestamp: Date.now(),
  };
};
