import { useQuery } from '@tanstack/react-query';
import { getTopCoins, getExchangeRates, getFearAndGreed, getEthGas } from '../services/api';
import { useState, useEffect } from 'react';

export const useCryptoData = () => {
  return useQuery({
    queryKey: ['topCoins'],
    queryFn: () => getTopCoins(250),
    refetchInterval: 60000,
    staleTime: 30000,
  });
};

export const useCurrencyConverter = () => {
  return useQuery({
    queryKey: ['fiatRates'],
    queryFn: () => getExchangeRates('USD'),
    refetchInterval: 300000, // 5 mins
  });
};

export const useMarketWidgets = () => {
  const fng = useQuery({
    queryKey: ['fearGreed'],
    queryFn: getFearAndGreed,
    refetchInterval: 3600000, // 1 hour
  });

  const gas = useQuery({
    queryKey: ['ethGas'],
    queryFn: getEthGas,
    refetchInterval: 15000, // 15s
  });

  return { fng, gas };
};

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>(() => {
    const saved = localStorage.getItem('nexus_portfolio');
    return saved ? JSON.parse(saved) : [];
  });

  const { data: coins } = useCryptoData();

  useEffect(() => {
    localStorage.setItem('nexus_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addAsset = (coin: any, amount: number, purchasePrice: number) => {
    setPortfolio(prev => [...prev, { 
      id: coin.id, 
      symbol: coin.symbol, 
      name: coin.name, 
      amount, 
      purchasePrice,
      image: coin.image,
      addedAt: Date.now()
    }]);
  };

  const removeAsset = (index: number) => {
    setPortfolio(prev => prev.filter((_, i) => i !== index));
  };

  const stats = portfolio.reduce((acc, asset) => {
    const liveCoin = coins?.find((c: any) => c.id === asset.id);
    const currentPrice = liveCoin?.current_price || asset.purchasePrice;
    
    const value = asset.amount * currentPrice;
    const cost = asset.amount * asset.purchasePrice;
    
    acc.totalValue += value;
    acc.totalCost += cost;
    return acc;
  }, { totalValue: 0, totalCost: 0 });

  const totalProfit = stats.totalValue - stats.totalCost;
  const profitPercentage = stats.totalCost > 0 ? (totalProfit / stats.totalCost) * 100 : 0;

  return { portfolio, addAsset, removeAsset, totalValue: stats.totalValue, totalProfit, profitPercentage };
};
