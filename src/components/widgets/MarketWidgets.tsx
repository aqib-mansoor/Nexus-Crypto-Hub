import React from 'react';
import { useMarketWidgets } from '@/hooks/useNexusData';
import { Gauge, Fuel, Zap, Globe, ShieldCheck, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

export const MarketWidgets = () => {
  const { fng, gas } = useMarketWidgets();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
      {/* Fear & Greed Index */}
      <Card className="bg-black shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 backdrop-blur-xl flex flex-col justify-center">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
            <div className="bg-[#c4ff00] p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_20px_rgba(196,255,0,0.3)]">
              <Gauge className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.2em] md:tracking-[0.3em]">Market Sentiment</p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">Fear & Greed Index</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full h-4 md:h-6 bg-[#f5ede0] dark:bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${fng.data?.value || 50}%` }}
                className={`h-full transition-colors ${getSentimentColor(parseInt(fng.data?.value || "50"))}`}
              />
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-black/10 dark:bg-white/10" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/10 dark:bg-white/10" />
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-black/10 dark:bg-white/10" />
            </div>

            <div className="flex justify-between w-full text-[8px] md:text-[9px] font-black text-[#546877] dark:text-white/40 uppercase tracking-widest mb-6 md:mb-8">
              <span>Extreme Fear</span>
              <span>Neutral</span>
              <span>Extreme Greed</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className={`text-5xl md:text-7xl font-black tracking-tighter leading-none ${getSentimentTextColor(parseInt(fng.data?.value || "50"))}`}>
                {fng.data?.value || "--"}
              </div>
              <p className="text-base md:text-lg font-black text-[#161311] dark:text-white uppercase mt-2 tracking-widest">{fng.data?.value_classification || "Neutral"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gas Tracker */}
      <Card className="bg-[#161311] dark:bg-black shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-none text-white">
        <CardContent className="p-6 md:p-10">
          <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10">
            <div className="bg-emerald-500 p-2 md:p-3 rounded-xl md:rounded-2xl">
              <Fuel className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">Network Velocity</p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">Ethereum Gas Tracker</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <GasBox label="Standard" value={gas.data?.average} duration="~3 Mins" icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />} />
            <GasBox label="High Velocity" value={gas.data?.fast} duration="~15 Secs" icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />} highlight />
          </div>

          <div className="mt-8 md:mt-10 p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5">
            <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2 text-center">Protocol Integrity</p>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-black">{gas.data?.low} Gwei</p>
                <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Safe Low</p>
              </div>
              <div className="h-6 md:h-8 w-[1px] bg-white/10" />
              <div className="text-center">
                <p className="text-xl md:text-2xl font-black">99.9%</p>
                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Network Uptime</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GasBox = ({ label, value, duration, icon, highlight }: any) => (
  <div className={`p-8 rounded-[2rem] border ${highlight ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
    <div className="flex justify-between items-start mb-6">
      {icon}
      <span className="text-3xl font-black tracking-tighter">{value || "--"}</span>
    </div>
    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</p>
    <p className="text-xs font-black text-[#c4ff00] mt-1">{duration}</p>
  </div>
);

const getSentimentColor = (val: number) => {
  if (val <= 25) return 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.3)]';
  if (val <= 45) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
  if (val <= 55) return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
  if (val <= 75) return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
  return 'bg-[#c4ff00] shadow-[0_0_15px_rgba(196,255,0,0.5)]';
};

const getSentimentTextColor = (val: number) => {
  if (val <= 25) return 'text-rose-600';
  if (val <= 45) return 'text-red-500';
  if (val <= 55) return 'text-yellow-500';
  if (val <= 75) return 'text-emerald-500';
  return 'text-[#c4ff00]';
};

export const SimplicitySection = () => (
  <section className="py-20" id="features">
    <div className="container mx-auto px-6">
      <div className="bg-black rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl border border-white/5">
        {/* Background Mesh */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#c4ff00] to-blue-600 blur-[200px] rounded-full" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/10 text-[10px] font-black uppercase tracking-widest mb-10">
              <ShieldCheck className="w-4 h-4 text-[#c4ff00]" />
              Institutional Grade Execution
            </div>
            <h2 className="text-3xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-10 uppercase">
              Extreme <br />
              <span className="text-[#c4ff00]">Simplicity.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-xl mb-12">
              Nexus removes the friction between traditional finance and the decentralized world. Deploy assets globally in milliseconds with 100% precision.
            </p>
            <div className="flex flex-wrap gap-8">
              <SimpleMetric icon={<Cpu />} value="0.1s" label="Latency" />
              <div className="w-[1px] h-16 bg-white/10 hidden md:block" />
              <SimpleMetric icon={<Globe />} value="100%" label="Uptime" />
              <div className="w-[1px] h-16 bg-white/10 hidden md:block" />
              <SimpleMetric icon={<Zap />} value="Instant" label="Execution" />
            </div>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ rotate: -5, y: 50 }}
              whileInView={{ rotate: 0, y: 0 }}
              className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-[3rem] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <Badge className="bg-[#c4ff00] text-black">Nexus Node</Badge>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-white/5 rounded-2xl flex items-center px-6 gap-4 border border-white/5">
                    <div className="w-4 h-4 rounded-full bg-[#c4ff00] animate-pulse" />
                    <div className="flex-grow h-2 bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Floaties */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#c4ff00] blur-[50px] opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600 blur-[70px] opacity-30" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SimpleMetric = ({ value, label, icon }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div className="text-[#c4ff00]">{icon}</div>
      <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
    </div>
    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{label}</span>
  </div>
);
