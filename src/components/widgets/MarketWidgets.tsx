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
      <Card className="bg-black shadow-2xl rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-xl flex flex-col justify-center h-full">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="bg-[#c4ff00] p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(196,255,0,0.3)]">
              <Gauge className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <div>
              <p className="text-[8px] md:text-[9px] font-black text-[#c4ff00] uppercase tracking-[0.2em] leading-none mb-1">Sentiment</p>
              <p className="text-base md:text-lg font-black text-white uppercase tracking-tighter leading-none">Fear & Greed Index</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full h-2 md:h-3 bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${fng.data?.value || 50}%` }}
                className={`h-full transition-colors ${getSentimentColor(parseInt(fng.data?.value || "50"))}`}
              />
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/10" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10" />
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/10" />
            </div>

            <div className="flex justify-between w-full text-[6px] md:text-[7px] font-black text-white/40 uppercase tracking-widest mb-3">
              <span>Extreme Fear</span>
              <span>Neutral</span>
              <span>Extreme Greed</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className={`text-3xl md:text-5xl font-black tracking-tighter leading-none ${getSentimentTextColor(parseInt(fng.data?.value || "50"))}`}>
                {fng.data?.value || "--"}
              </div>
              <p className="text-[10px] md:text-xs font-black text-white uppercase mt-1 tracking-widest leading-none">{fng.data?.value_classification || "Neutral"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gas Tracker */}
      <Card className="bg-[#161311] dark:bg-black shadow-2xl rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-none text-white h-full flex flex-col justify-center">
        <CardContent className="p-4 md:p-6 lg:p-7">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="bg-emerald-500 p-1.5 md:p-2 rounded-lg md:rounded-xl">
              <Fuel className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <p className="text-[8px] md:text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] leading-none mb-1">Velocity</p>
              <p className="text-sm md:text-base font-black text-white uppercase tracking-tighter leading-none">Gas Tracker</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <GasBox label="Standard" value={gas.data?.average} duration="~3m" icon={<Zap className="w-3.5 h-3.5 text-emerald-400" />} />
            <GasBox label="High" value={gas.data?.fast} duration="~15s" icon={<Zap className="w-3.5 h-3.5 text-orange-400" />} highlight />
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-sm md:text-base font-black leading-none mb-1">{gas.data?.low} G</p>
                <p className="text-[6px] md:text-[7px] font-black text-emerald-400 uppercase tracking-widest">Safe Low</p>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="text-center">
                <p className="text-sm md:text-base font-black leading-none mb-1">99.9%</p>
                <p className="text-[6px] md:text-[7px] font-black text-blue-400 uppercase tracking-widest">Uptime</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GasBox = ({ label, value, duration, icon, highlight }: any) => (
  <div className={`p-3 md:p-4 rounded-xl border ${highlight ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
    <div className="flex justify-between items-start mb-2">
      {icon}
      <span className="text-base md:text-lg font-black tracking-tighter leading-none">{value || "--"}</span>
    </div>
    <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-0.5">{label}</p>
    <p className="text-[8px] md:text-[9px] font-black text-[#c4ff00] leading-none">{duration}</p>
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

export const SimplicitySection = () => {
  const Metric = ({ icon, value, label }: any) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <div className="text-[#c4ff00] scale-[0.65]">{icon}</div>
        <span className="text-xl md:text-2xl xl:text-3xl font-black text-white tracking-tighter leading-none">{value}</span>
      </div>
      <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <section className="py-10 md:py-16" id="features">
      <div className="container mx-auto px-6">
        <div className="bg-black rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 xl:p-14 relative overflow-hidden shadow-2xl border border-white/5">
          {/* Background Mesh */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#c4ff00] to-blue-600 blur-[150px] rounded-full" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/5 text-[8px] font-black uppercase tracking-widest mb-6 md:mb-8">
                <ShieldCheck className="w-3 h-3 text-[#c4ff00]" />
                Institutional Core
              </div>
              <h2 className="text-2xl md:text-4xl xl:text-5xl font-black text-white leading-[1] tracking-tighter mb-6 md:mb-8 uppercase">
                Extreme <br />
                <span className="text-[#c4ff00]">Simplicity.</span>
              </h2>
              <p className="text-sm md:text-base xl:text-lg text-white/40 font-medium leading-relaxed max-w-lg mb-8 md:mb-10">
                Nexus removes the friction between traditional finance and the decentralized world. Deploy assets globally in milliseconds with surgical precision.
              </p>
              <div className="flex flex-wrap gap-8 md:gap-10">
                <Metric icon={<Cpu />} value="0.1s" label="Latency" />
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <Metric icon={<Globe />} value="100%" label="Uptime" />
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <Metric icon={<Zap />} value="Instant" label="Execution" />
              </div>
            </div>
            
            <div className="relative pt-6 lg:pt-0">
              <motion.div 
                initial={{ rotate: -3, y: 30 }}
                whileInView={{ rotate: 0, y: 0 }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-500/50 rounded-full" />
                    <div className="w-2 h-2 bg-yellow-500/50 rounded-full" />
                    <div className="w-2 h-2 bg-green-500/50 rounded-full" />
                  </div>
                  <Badge className="bg-[#c4ff00] text-black text-[7px] px-1.5 py-0 border-none font-black uppercase">Nexus Node</Badge>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 md:h-12 bg-white/5 rounded-xl flex items-center px-4 gap-3 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#c4ff00] animate-pulse" />
                      <div className="flex-grow h-1 bg-white/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SimpleMetric = ({ value, label, icon }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div className="text-[#c4ff00]">{icon}</div>
      <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
    </div>
    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{label}</span>
  </div>
);
