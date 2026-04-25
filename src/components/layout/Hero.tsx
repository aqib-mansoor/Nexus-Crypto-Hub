import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Activity, Users, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useCryptoData } from '@/hooks/useNexusData';
import { AnimatedPrice } from '../ui/AnimatedPrice';

export const Hero = () => {
  const { data: coins } = useCryptoData();

  return (
    <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#c4ff00]/10 to-transparent blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#c4ff00]/5 to-transparent blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c4ff00]/10 text-[#c4ff00] border border-[#c4ff00]/20 text-xs font-black uppercase tracking-widest mb-10"
          >
            <Activity className="w-4 h-4" />
            Elite Market Intelligence
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-6xl md:text-[8rem] font-black text-white leading-[0.9] tracking-tighter mb-6 md:mb-10 px-2"
          >
            CURRENCY <br />
            <span className="text-[#c4ff00]">REIMAGINED.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-lg md:text-2xl text-[#161311]/70 dark:text-white/80 max-w-2xl font-medium leading-relaxed mb-10 md:mb-12 px-4"
          >
            The world's most sophisticated crypto-fiat bridge. Built for institutional performance and extreme simplicity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <Button 
              onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 md:h-20 px-8 md:px-12 bg-[#c4ff00] hover:bg-[#c4ff00]/90 text-black text-lg md:text-2xl font-black rounded-xl md:rounded-[2rem] border-b-4 md:border-b-8 border-[#818181]/20 group shadow-xl shadow-[#c4ff00]/20"
            >
              Explore Now
              <ArrowRight className="ml-2 md:ml-4 w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-2 transition-all" />
            </Button>
          </motion.div>
        </div>

        {/* Global Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
          <StatCard icon={<Activity />} label="Daily Vol" value="$2.4B+" delay={0.3} />
          <StatCard icon={<Users />} label="Users" value="1.2M" delay={0.4} />
          <StatCard icon={<Globe />} label="Pairs" value="120+" delay={0.5} />
          <StatCard icon={<ShieldCheck />} label="Uptime" value="99.9%" delay={0.6} />
        </div>

        {/* Trending Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-[#c4ff00] rounded-full animate-ping" />
              <div className="w-3 h-3 bg-[#c4ff00]/50 rounded-full" />
              <div className="w-3 h-3 bg-[#c4ff00]/20 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.4em]">Trending Velocity</span>
            <div className="h-[2px] flex-grow bg-white/5" />
          </div>

          <Splide
            options={{
              type: 'loop',
              perPage: 4,
              gap: '3rem',
              autoplay: true,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              breakpoints: {
                1024: { perPage: 3 },
                768: { perPage: 2 },
                480: { perPage: 1 },
              }
            }}
          >
            {coins?.slice(0, 10).map((coin: any) => (
              <SplideSlide key={coin.id}>
                <div className="flex items-center gap-6 group/coin cursor-pointer">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center group-hover/coin:bg-[#c4ff00]/20 transition-all text-[#c4ff00]">
                    <img 
                      src={coin.image} 
                      referrerPolicy="no-referrer"
                      alt={coin.name} 
                      className="w-10 h-10 grayscale group-hover/coin:grayscale-0 transition-all" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-black uppercase text-sm tracking-widest">{coin.symbol}</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-black ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="p-6 md:p-10 bg-black/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/5 group cursor-default hover:border-[#c4ff00]/30 transition-all shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      {React.isValidElement(icon) && React.cloneElement(icon as any, { className: 'w-24 h-24 md:w-32 md:h-32 text-white' })}
    </div>
    
    <div className="relative z-10">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#c4ff00]/10 text-[#c4ff00] flex items-center justify-center mb-6 md:mb-10 group-hover:bg-[#c4ff00] group-hover:text-black transition-all shadow-[0_0_20px_rgba(196,255,0,0.1)]">
        {React.isValidElement(icon) && React.cloneElement(icon as any, { className: 'w-6 h-6 md:w-8 md:h-8' })}
      </div>
      <p className="text-[10px] md:text-xs font-black text-[#c4ff00] uppercase tracking-[0.3em] mb-2 md:mb-3 drop-shadow-sm">{label}</p>
      <p className="text-2xl md:text-5xl font-black text-white tracking-tighter leading-none">{value}</p>
    </div>
  </motion.div>
);
