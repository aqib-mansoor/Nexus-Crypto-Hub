import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Activity } from 'lucide-react';

export const FloatingSystemStatus = () => {
  const [latency, setLatency] = useState(12);
  const [load, setLoad] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(10 + Math.floor(Math.random() * 8));
      setLoad(2 + Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[60] hidden xl:flex items-center gap-4 bg-zinc-950/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3 pr-4 border-r border-white/10">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">System Online</span>
      </div>
      
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-0.5">Latency</span>
          <span className="text-xs font-black text-[#c4ff00]">{latency}ms</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-0.5">Network Load</span>
          <span className="text-xs font-black text-white">{load}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-0.5">Hash Rate</span>
          <span className="text-xs font-black text-white">4.2 EH/s</span>
        </div>
      </div>
      
      <div className="ml-4 pl-4 border-l border-white/10">
        <Shield className="w-4 h-4 text-emerald-500/50" />
      </div>
    </div>
  );
};
