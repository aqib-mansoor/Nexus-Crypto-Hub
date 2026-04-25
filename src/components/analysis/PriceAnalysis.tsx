import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCoinHistory } from '@/services/api';
import { useCryptoData } from '@/hooks/useNexusData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, TrendingUp, TrendingDown, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'react-hot-toast';

export const PriceAnalysis = () => {
  const { data: coins } = useCryptoData();
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin');
  const [timeRange, setTimeRange] = useState('7');

  const { data: history, isLoading } = useQuery({
    queryKey: ['coinHistory', selectedCoinId, timeRange],
    queryFn: () => getCoinHistory(selectedCoinId, timeRange),
  });

  const chartData = history?.prices?.map(([time, price]: [number, number], index: number) => ({
    time: new Date(time).toLocaleDateString(),
    price: price,
    marketCap: history?.market_caps?.[index]?.[1],
    volume: history?.total_volumes?.[index]?.[1],
  }));

  const coin = coins?.find((c: any) => c.id === selectedCoinId);

  // Calculate if the trend is up or down to determine chart color
  const getChartColor = (data: any[], key: string = 'price') => {
    if (!data || data.length < 2) return '#c4ff00';
    const start = data[0][key];
    const end = data[data.length - 1][key];
    return end >= start ? '#c4ff00' : '#ef4444'; // Neon Lime if up, Red if down
  };

  const priceColor = getChartColor(chartData || []);
  const marketCapColor = getChartColor(chartData || [], 'marketCap');
  const volumeColor = getChartColor(chartData || [], 'volume');

  return (
    <Card className="bg-black shadow-2xl rounded-[3rem] overflow-hidden border border-white/5 backdrop-blur-xl" id="analysis">
      <CardHeader className="p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/5">
        <div className="flex items-center gap-5">
          <div className="bg-[#c4ff00] p-3 rounded-2xl shadow-[0_0_15px_rgba(196,255,0,0.3)]">
            <Maximize2 className="w-8 h-8 text-black" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">Market Intelligence</CardTitle>
            <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.3em] mt-1">Institutional Flow Analysis</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Select value={selectedCoinId} onValueChange={setSelectedCoinId}>
            <SelectTrigger className="w-[180px] h-12 bg-white/5 border border-white/10 rounded-xl text-lg font-bold text-white transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/10 text-white">
              {coins?.slice(0, 50).map((c: any) => (
                <SelectItem key={c.id} value={c.id} className="font-bold text-white hover:bg-[#c4ff00] hover:text-black transition-colors cursor-pointer">{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList className="bg-white/5 h-12 rounded-xl p-1 gap-1 border border-white/5">
              <TabsTrigger value="1" className="rounded-lg font-bold px-4 text-white/40 data-[state=active]:bg-[#c4ff00] data-[state=active]:text-black">1D</TabsTrigger>
              <TabsTrigger value="7" className="rounded-lg font-bold px-4 text-white/40 data-[state=active]:bg-[#c4ff00] data-[state=active]:text-black">7D</TabsTrigger>
              <TabsTrigger value="30" className="rounded-lg font-bold px-4 text-white/40 data-[state=active]:bg-[#c4ff00] data-[state=active]:text-black">1M</TabsTrigger>
              <TabsTrigger value="365" className="rounded-lg font-bold px-4 text-white/40 data-[state=active]:bg-[#c4ff00] data-[state=active]:text-black">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-12">
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#c4ff00] uppercase tracking-widest ml-4">Price Performance</h4>
          <div className="h-[350px] w-full">
            {isLoading || !chartData ? (
              <Skeleton className="h-full w-full rounded-2xl bg-white/5" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={priceColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={priceColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff11" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }} 
                  />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: `1px solid ${priceColor}44`, borderRadius: '16px', color: '#fff', fontWeight: 'bold', padding: '12px' }}
                    itemStyle={{ color: priceColor }}
                  />
                  <Area type="monotone" dataKey="price" stroke={priceColor} strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest ml-4">Market Cap Evolution</h4>
            <div className="h-[250px] bg-white/5 rounded-3xl p-6 border border-white/5 group">
              {isLoading || !chartData ? (
                <Skeleton className="h-full w-full rounded-2xl bg-white/5" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px' }}
                      formatter={(val: number) => [`$${(val / 1000000000).toFixed(2)}B`, 'Market Cap']}
                    />
                    <Area type="monotone" dataKey="marketCap" stroke={marketCapColor} fill={`${marketCapColor}22`} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest ml-4">Trading Volume (24h)</h4>
            <div className="h-[250px] bg-white/5 rounded-3xl p-6 border border-white/5 group">
              {isLoading || !chartData ? (
                <Skeleton className="h-full w-full rounded-2xl bg-white/5" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: `1px solid ${volumeColor}22`, borderRadius: '12px', color: '#fff', fontSize: '10px' }}
                      itemStyle={{ color: volumeColor }}
                      formatter={(val: number) => [`$${(val / 1000000).toFixed(2)}M`, 'Volume']}
                    />
                    <Area type="monotone" dataKey="volume" stroke={volumeColor} fill={`${volumeColor}22`} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
          <MetricBox 
            label="Current Price" 
            value={`$${coin?.current_price.toLocaleString()}`} 
            sub={coin?.price_change_percentage_24h >= 0 ? `+${coin?.price_change_percentage_24h.toFixed(2)}%` : `${coin?.price_change_percentage_24h.toFixed(2)}%`}
            isPositive={coin?.price_change_percentage_24h >= 0}
          />
          <MetricBox label="Market Cap" value={`$${(coin?.market_cap / 1000000000).toFixed(2)}B`} sub="Institutional Presence" />
          <MetricBox label="24h Volume" value={`$${(coin?.total_volume / 1000000000).toFixed(2)}B`} sub="Liquidity Depth" />
        </div>

        {/* Real-time Suggestions Feature */}
        <div className="mt-12 p-10 bg-black rounded-[3rem] border border-[#c4ff00]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4ff00]/5 blur-[80px] rounded-full group-hover:bg-[#c4ff00]/10 transition-all" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="bg-[#c4ff00] p-3 rounded-2xl w-fit shadow-[0_0_15px_rgba(196,255,0,0.3)]">
                <LayoutDashboard className="w-8 h-8 text-black" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg md:text-2xl font-black text-white uppercase tracking-tighter leading-tight sm:leading-[0.9]">Nexus Market Strategies</h3>
                <p className="text-[8px] sm:text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.1em] sm:tracking-[0.3em] mt-1">Institutional Entry/Exit Signals</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coins?.slice(0, 3).map((c: any, i: number) => {
                const isUp = c.price_change_percentage_24h > 0;
                const recommendation = i === 0 ? "STRONG BUY" : i === 1 ? "HOLD" : "EXIT POSITION";
                const color = i === 0 ? "text-[#c4ff00]" : i === 1 ? "text-amber-500" : "text-rose-500";
                
                return (
                  <motion.div 
                    key={c.id} 
                    whileHover={{ scale: 1.02 }}
                    className="p-5 md:p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-row items-center gap-4 group/suggest cursor-pointer"
                    onClick={() => toast.success(`Deep technical report for ${c.symbol.toUpperCase()} requested`)}
                  >
                    <img 
                      src={c.image} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl shrink-0" 
                      alt="" 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <p className="text-white font-black uppercase text-sm tracking-widest truncate">{c.symbol}</p>
                        {isUp ? <TrendingUp className="w-4 h-4 text-[#c4ff00] shrink-0" /> : <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <p className={`text-[9px] md:text-[10px] font-black ${color} tracking-widest whitespace-nowrap`}>{recommendation}</p>
                        <div className="flex items-center gap-1">
                            <span className="text-white/30 text-[8px] md:text-[9px] font-black uppercase tracking-widest hidden sm:inline">Confidence</span>
                            <span className="text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{90 - i * 5}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-8 text-center text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">Algorithm updated 2 minutes ago based on order book depth</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricBox = ({ label, value, sub, isPositive }: any) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.3em]">{label}</p>
    <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
    <p className={`text-[10px] font-black uppercase tracking-widest ${isPositive === undefined ? 'text-white/40' : isPositive ? 'text-[#c4ff00]' : 'text-rose-500'}`}>
      {sub}
    </p>
  </div>
);
