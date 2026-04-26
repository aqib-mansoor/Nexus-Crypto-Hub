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

      setEvents(prev => [newEvent, ...prev].slice(0, 4));
    };

    const interval = setInterval(generateEvent, 3000);
    return () => clearInterval(interval);
  }, [coins]);

  return (
    <div className="bg-black p-4 md:p-6 rounded-2xl border border-white/5 relative overflow-hidden group min-h-[300px] md:h-full flex flex-col w-full">
      <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1.5">
          <div className="w-1 h-1 bg-[#c4ff00] rounded-full animate-ping" />
          <div className="w-1 h-1 bg-[#c4ff00] rounded-full" />
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <div className="bg-[#c4ff00]/10 p-2 rounded-lg">
            <Activity className="w-4 h-4 text-[#c4ff00]" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Protocol Feed</h3>
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1.5">Live Sync active</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-1 lg:pr-2">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/[0.03] group/event hover:border-[#c4ff00]/20 hover:bg-white/[0.04] transition-all relative overflow-hidden"
              >
                <div className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${
                  event.status === 'SUCCESS' ? 'bg-emerald-500' : 
                  event.status === 'WARNING' ? 'bg-amber-500' : 'bg-rose-500'
                } shadow-[0_0_8px_currentColor]`} />
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[8px] font-black uppercase tracking-widest ${
                      event.type === 'SETTLEMENT' ? 'text-blue-400' :
                      event.type === 'LIQUIDITY' ? 'text-emerald-400' :
                      event.type === 'NODE' ? 'text-purple-400' : 'text-amber-400'
                    }`}>{event.type}</span>
                    <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">{event.time}</span>
                  </div>
                  <p className="text-[11px] md:text-sm font-medium text-white/70 leading-relaxed group-hover/event:text-white transition-colors">
                    {event.message}
                  </p>
                </div>

                {/* Subtle side indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover/event:opacity-100 transition-opacity ${
                  event.type === 'SETTLEMENT' ? 'bg-blue-400' :
                  event.type === 'LIQUIDITY' ? 'bg-emerald-400' :
                  event.type === 'NODE' ? 'bg-purple-400' : 'bg-amber-400'
                }`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-2.5 h-2.5 text-white/20" />
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.3em]">Nexus Mesh v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
