import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Activity, Globe, Shield } from 'lucide-react';
import { useCryptoData } from '@/hooks/useNexusData';

interface Event {
  id: string;
  type: 'SETTLEMENT' | 'LIQUIDITY' | 'NODE' | 'ALERT';
  message: string;
  time: string;
  status: 'SUCCESS' | 'WARNING' | 'CRITICAL';
}

export const LiveNetworkFeed = () => {
  const { data: coins } = useCryptoData();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const generateEvent = () => {
      const types: Event['type'][] = ['SETTLEMENT', 'LIQUIDITY', 'NODE', 'ALERT'];
      const statuses: Event['status'][] = ['SUCCESS', 'WARNING', 'CRITICAL'];
      const type = types[Math.floor(Math.random() * types.length)];
      const status = Math.random() > 0.9 ? statuses[Math.floor(Math.random() * statuses.length)] : 'SUCCESS';
      
      let message = '';
      const coin = coins?.[Math.floor(Math.random() * (coins?.length || 0))];
      const amount = (Math.random() * 50).toFixed(4);
      const val = (Math.random() * 1000000).toLocaleString();

      switch(type) {
        case 'SETTLEMENT':
          message = `Executed ${amount} ${coin?.symbol.toUpperCase()} bridge to ETH-Mainnet ($${val})`;
          break;
        case 'LIQUIDITY':
          message = `Nexus LP injection: +$${val} to ${coin?.symbol.toUpperCase()}/USDT pool`;
          break;
        case 'NODE':
          message = `Singapore Node Cluster synchronized with London Hub (latency: 14ms)`;
          break;
        case 'ALERT':
          message = `Whale movement detected: ${coin?.symbol.toUpperCase()} transaction > $10M`;
          break;
      }

      const newEvent: Event = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        message,
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        status
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 5));
    };

    const interval = setInterval(generateEvent, 3000);
    return () => clearInterval(interval);
  }, [coins]);

  return (
    <div className="bg-black p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group min-h-[450px] md:h-full flex flex-col w-full">
      <div className="absolute top-0 right-0 p-4 md:p-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-ping" />
          <div className="w-2 h-2 bg-[#c4ff00] rounded-full" />
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="bg-[#c4ff00]/20 p-2 rounded-xl">
            <Activity className="w-5 h-5 text-[#c4ff00]" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Live Execution Feed</h3>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Real-time Transaction Stream</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto scrollbar-hide pr-1">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5 group/event hover:border-[#c4ff00]/20 transition-all"
              >
                <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${
                  event.status === 'SUCCESS' ? 'bg-emerald-500' : 
                  event.status === 'WARNING' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{event.time}</span>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${
                      event.type === 'SETTLEMENT' ? 'text-blue-400' :
                      event.type === 'LIQUIDITY' ? 'text-emerald-400' :
                      event.type === 'NODE' ? 'text-purple-400' : 'text-amber-400'
                    }`}>{event.type}</span>
                  </div>
                  <p className="text-[11px] font-medium text-white/70 leading-relaxed group-hover/event:text-white transition-colors">
                    {event.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-white/20" />
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Nexus Global Mesh v4.2</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-emerald-500/50" />
            <span className="text-[8px] font-black text-emerald-500/50 uppercase tracking-widest">End-to-End Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
