import { useQuery } from '@tanstack/react-query';
import * as service from '../services/intelligenceService';

export const useWhaleAlerts = () => {
  return useQuery({
    queryKey: ['whaleAlerts'],
    queryFn: service.fetchWhaleAlerts,
    refetchInterval: 300000, // 5 min
  });
};

export const useSocialSentiment = (symbol: string = 'BTC') => {
  return useQuery({
    queryKey: ['socialSentiment', symbol],
    queryFn: () => service.fetchSocialSentiment(symbol),
    refetchInterval: 120000, // 2 min
  });
};

export const useStakingRates = () => {
  return useQuery({
    queryKey: ['stakingRates'],
    queryFn: service.fetchStakingRates,
    refetchInterval: 600000, // 10 min
  });
};

export const useDEXPools = () => {
  return useQuery({
    queryKey: ['dexPools'],
    queryFn: service.fetchDEXPools,
    refetchInterval: 300000, // 5 min
  });
};

export const useNFTFloor = () => {
  return useQuery({
    queryKey: ['nftFloor'],
    queryFn: service.fetchNFTFloorPrices,
    refetchInterval: 300000, // 5 min
  });
};

export const useBridgeVolume = () => {
  return useQuery({
    queryKey: ['bridgeVolume'],
    queryFn: service.fetchBridgeMetrics,
    refetchInterval: 600000, // 10 min
  });
};

export const useMiningProfit = () => {
  return useQuery({
    queryKey: ['miningProfit'],
    queryFn: service.fetchMiningProfitability,
    refetchInterval: 3600000, // 1 hour
  });
};

export const useRegulatoryTracker = () => {
  return useQuery({
    queryKey: ['regulatoryTracker'],
    queryFn: service.fetchRegulatoryTrack,
    refetchInterval: 86400000, // 24 hours
  });
};

export const useFlashLoans = () => {
  return useQuery({
    queryKey: ['flashLoans'],
    queryFn: service.fetchFlashLoans,
    refetchInterval: 60000, // 1 min
  });
};
