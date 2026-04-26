import React, { useState } from 'react';
import { useCryptoData } from '@/hooks/useNexusData';
import { Search, TrendingUp, TrendingDown, ChevronRight, BarChart3, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';

export const PriceTracker = () => {
  const { data: coins, isLoading } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState('all');

  const filteredCoins = coins?.filter((coin: any) => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (rankFilter === '10') return matchesSearch && coin.market_cap_rank <= 10;
    if (rankFilter === '50') return matchesSearch && coin.market_cap_rank <= 50;
    if (rankFilter === '100') return matchesSearch && coin.market_cap_rank <= 100;
    
    return matchesSearch;
  }).slice(0, 15);

  return (
    <Card className="bg-black shadow-2xl rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10">
      <CardHeader className="p-4 md:p-5 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 border-b border-white/5">
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <div className="bg-[#c4ff00] p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Market Pulse</CardTitle>
            <p className="text-[8px] font-black text-[#c4ff00] uppercase tracking-[0.3em] leading-none">Live Alpha Stream</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-3.5 h-3.5 pointer-events-none" />
            <Input 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border-none rounded-lg h-9 md:h-10 pl-10 pr-4 font-bold text-xs md:text-sm text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#c4ff00]"
            />
          </div>
          
          <Select value={rankFilter} onValueChange={setRankFilter}>
            <SelectTrigger className="w-full md:w-[120px] h-9 md:h-10 bg-white/10 border-none rounded-lg font-bold text-white text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#c4ff00]" />
                <SelectValue placeholder="All Ranks" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border border-white/10 shadow-2xl">
              <SelectItem value="all" className="font-bold">All Assets</SelectItem>
              <SelectItem value="10" className="font-bold text-[#c4ff00]">Top 10</SelectItem>
              <SelectItem value="50" className="font-bold text-[#c4ff00]">Top 50</SelectItem>
              <SelectItem value="100" className="font-bold text-[#c4ff00]">Top 100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto scrollbar-hide">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="w-[50px] md:w-[80px] pl-4 md:pl-8 xl:pl-12 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500 py-3 md:py-4">#</TableHead>
                <TableHead className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500">Asset</TableHead>
                <TableHead className="text-right text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Price</TableHead>
                <TableHead className="text-right text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500">24h Change</TableHead>
                <TableHead className="hidden md:table-cell text-right text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500">7D Trace</TableHead>
                <TableHead className="w-12 md:w-[80px] pr-4 md:pr-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(10).fill(0).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell className="pl-4 md:pl-10 h-16 md:h-24"><Skeleton className="w-6 md:w-10 h-4 md:h-6 bg-white/10" /></TableCell>
                    <TableCell><div className="flex gap-2 md:gap-4"><Skeleton className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-full bg-white/10" /><Skeleton className="w-20 md:w-32 h-4 md:h-6 bg-white/10" /></div></TableCell>
                    <TableCell className="text-right"><Skeleton className="w-16 md:w-24 h-4 md:h-6 ml-auto bg-white/10" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="w-12 md:w-20 h-6 md:h-8 ml-auto rounded-lg bg-white/10" /></TableCell>
                    <TableCell className="hidden md:table-cell text-right"><Skeleton className="w-24 h-12 ml-auto bg-white/10" /></TableCell>
                    <TableCell className="pr-4 md:pr-10"></TableCell>
                  </TableRow>
                ))
              ) : (
                filteredCoins?.map((coin: any, idx: number) => (
                  <motion.tr 
                    key={coin.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ 
                      scale: 1.01, 
                      backgroundColor: "rgba(196, 255, 0, 0.05)",
                      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
                      zIndex: 10
                    }}
                    transition={{ 
                      layout: { duration: 0.2 },
                      opacity: { duration: 0.2 }
                    }}
                    className={`group border-white/[0.03] transition-all h-12 md:h-14 relative select-none ${
                      coin.price_change_percentage_24h >= 0 
                        ? 'bg-[#c4ff00]/[0.01]' 
                        : 'bg-rose-500/[0.01]'
                    }`}
                  >
                    <TableCell className="pl-4 md:pl-8 xl:pl-12 font-black text-white/10 text-[10px] md:text-xs">#{coin.market_cap_rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-white/5 p-1 rounded-lg">
                          <img 
                            src={coin.image} 
                            referrerPolicy="no-referrer"
                            alt={coin.name} 
                            className="w-full h-full rounded-sm" 
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-white uppercase tracking-tight text-[10px] md:text-xs">{coin.symbol.toUpperCase()}</span>
                          <span className="hidden sm:inline text-[7px] text-[#c4ff00] font-black tracking-widest uppercase opacity-60 leading-none">{coin.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-black text-white text-[11px] md:text-sm whitespace-nowrap">
                      ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (coin.current_price < 1 ? 6 : 2) })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`rounded px-1.5 py-0.5 font-black text-[8px] md:text-[9px] border-none gap-0.5 ${coin.price_change_percentage_24h >= 0 ? 'bg-[#c4ff00]/10 text-[#c4ff00]' : 'bg-rose-500/10 text-rose-500'}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">
                      <div className="w-16 md:w-20 h-6 md:h-8 ml-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={coin.sparkline_in_7d.price.map((p: number, i: number) => ({ p, i }))}>
                            <Line 
                              type="monotone" 
                              dataKey="p" 
                              stroke={coin.price_change_percentage_24h >= 0 ? '#c4ff00' : '#f43f5e'} 
                              strokeWidth={2} 
                              dot={false} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </TableCell>
                    <TableCell className="pr-4 md:pr-10 text-right">
                      <motion.div 
                        whileHover={{ x: 3 }}
                        onClick={() => {
                          toast.success(`Trade interface for ${coin.symbol.toUpperCase()} initiated`);
                          document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#c4ff00] hover:text-black"
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {!isLoading && filteredCoins && filteredCoins.length >= 15 && (
          <div className="p-8 flex justify-center border-t border-white/5 bg-white/5">
            <Button 
              className="rounded-full px-10 h-14 font-black uppercase tracking-widest bg-white/10 text-white hover:bg-[#c4ff00] hover:text-black transition-all shadow-xl"
              onClick={() => toast.success('Premium Market Access Required for Full List')}
            >
              View All 250+ Assets
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
