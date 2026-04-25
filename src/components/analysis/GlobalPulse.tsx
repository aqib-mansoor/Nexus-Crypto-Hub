import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Flame, Coins, Zap, Activity, ShieldAlert, ChevronUp, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchYahooData, fetchOnChainMetrics } from '@/services/macroService';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export const GlobalPulse = () => {
  const { data: energy, isLoading: energyLoading } = useQuery({
    queryKey: ['energyMetrics'],
    queryFn: () => Promise.all([
      fetchYahooData('BZ=F', 'Brent Crude'),
      fetchYahooData('CL=F', 'WTI Crude'),
      fetchYahooData('NG=F', 'Natural Gas'),
    ]),
    refetchInterval: 60000
  });

  const { data: macro, isLoading: macroLoading } = useQuery({
    queryKey: ['macroMetrics'],
    queryFn: () => Promise.all([
      fetchYahooData('GC=F', 'Gold'),
      fetchYahooData('DX-Y.NYB', 'DXY Index'),
      fetchYahooData('^GSPC', 'S&P 500'),
    ]),
    refetchInterval: 120000
  });

  const { data: onChain } = useQuery({
    queryKey: ['onChainMetrics'],
    queryFn: fetchOnChainMetrics,
    refetchInterval: 30000
  });

  const MetricCard = ({ item, icon: Icon, color }: any) => {
    const isPositive = item.change >= 0;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950 border border-white/10 p-6 rounded-[2rem] hover:border-[#c4ff00]/30 transition-all group overflow-hidden relative"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-white/5 ${color} transition-colors group-hover:bg-[#c4ff00]/10`}>
             <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${isPositive ? 'text-[#c4ff00]' : 'text-red-500'}`}>
              {isPositive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {Math.abs(item.change).toFixed(2)}%
            </span>
          </div>
        </div>

        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{item.name}</p>
        <h3 className="text-2xl font-black text-white tracking-tighter mb-4">
          ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>

        <div className="h-10 w-full opacity-30 group-hover:opacity-60 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
             <LineChart data={item.sparkline.map((v: number, i: number) => ({ v, i }))}>
                <Line type="monotone" dataKey="v" stroke={isPositive ? '#c4ff00' : '#ef4444'} strokeWidth={2} dot={false} />
                <YAxis hide domain={['dataMin', 'dataMax']} />
             </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Energy Sector */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#c4ff00]" />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Energy Markets</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {energyLoading ? Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />) :
              energy?.map((item) => <MetricCard key={item.symbol} item={item} icon={Droplets} color="text-amber-500" />)
            }
          </div>
        </div>

        {/* Global Macro */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Macro Metrics</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {macroLoading ? Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />) :
              macro?.map((item) => <MetricCard key={item.symbol} item={item} icon={Coins} color="text-yellow-500" />)
            }
          </div>
        </div>

        {/* On-Chain Network */}
        <div className="space-y-6">

          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Global Network</h2>
          </div>
          <div className="bg-black border border-white/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#c4ff00]/10 blur-3xl rounded-full" />
             
             <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">BTC Hashrate (Network Strength)</p>
                <div className="flex items-end gap-3 text-white">
                  <span className="text-4xl font-black">{onChain?.btcHashrate || '682.4'}</span>
                  <span className="text-sm font-bold text-[#c4ff00] pb-1">EH/s</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div>
                   <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">ETH Gas</p>
                   <p className="text-xl font-black text-[#c4ff00]">{onChain?.ethGas || '12'} Gwei</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Aggregated TPS</p>
                   <p className="text-xl font-black text-white">{onChain?.tps || '124.0'}</p>
                </div>
             </div>

             <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-4 h-4 text-[#c4ff00]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Health: Optimal</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '92%' }}
                    className="h-full bg-gradient-to-r from-[#c4ff00] to-blue-500"
                  />
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
