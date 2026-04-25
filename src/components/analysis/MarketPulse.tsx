import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp, TrendingDown, Clock, Globe, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface PulseData {
  symbol: string;
  price: number;
  change: number;
  marketCap: number;
  lastUpdated: string;
}

export const MarketPulse = () => {
  const [data, setData] = useState<PulseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 5,
            page: 1,
            sparkline: false
          }
        });
        
        setData(response.data.map((coin: any) => ({
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change: coin.price_change_percentage_24h,
          marketCap: coin.market_cap,
          lastUpdated: new Date().toLocaleTimeString()
        })));
        setLoading(true);
      } catch (error) {
        console.error('Pulse fetch failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // 30s updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Market<br/>Pulse</h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c4ff00] animate-pulse" />
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Institutional Data Feed Active</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
             <Clock className="w-6 h-6 text-[#c4ff00] mb-2" />
             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Last Block</p>
             <p className="text-xl font-black text-white tracking-tighter">#21.4M</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
             <Globe className="w-6 h-6 text-blue-400 mb-2" />
             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Nodes</p>
             <p className="text-xl font-black text-white tracking-tighter">9,842</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && data.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse border border-white/5" />
          ))
        ) : data.map((item, idx) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-black backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-[#c4ff00]/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8">
              {item.change >= 0 ? 
                <TrendingUp className="w-8 h-8 text-[#c4ff00] opacity-20 group-hover:opacity-50 transition-opacity" /> : 
                <TrendingDown className="w-8 h-8 text-red-500 opacity-20 group-hover:opacity-50 transition-opacity" />
              }
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.4em] mb-4 block">{item.symbol}/USD</span>
              <h3 className="text-4xl font-black text-white tracking-tighter mb-2">
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.change >= 0 ? 'bg-[#c4ff00]/10 text-[#c4ff00]' : 'bg-red-500/10 text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Market Cap</p>
                   <p className="text-sm font-black text-white">${(item.marketCap / 1e9).toFixed(1)}B</p>
                </div>
                <div className="text-right">
                   <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Updated</p>
                   <p className="text-[10px] font-black text-white/60">{item.lastUpdated}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c4ff00] group-hover:bg-[#c4ff00] group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Decorative background pulse */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-[80px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${item.change >= 0 ? 'bg-[#c4ff00]' : 'bg-red-500'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
