import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Activity, Users, Globe, ShieldCheck, Cpu, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useCryptoData } from '@/hooks/useNexusData';
import { AnimatedPrice } from '../ui/AnimatedPrice';

export const Hero = () => {
  const { data: coins } = useCryptoData();

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden bg-black" id="home">
      {/* Dynamic Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(196,255,0,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.04),transparent_50%)]" />
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.4px, transparent 0.4px)', backgroundSize: '25px 25px' }} />
        
        {/* Moving Grid Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-6 md:mb-8">
                CURRENCY <br />
                <span className="text-[#c4ff00] drop-shadow-[0_0_30px_rgba(196,255,0,0.25)]">REIMAGINED.</span>
              </h1>
              
              <p className="text-[10px] md:text-xs xl:text-sm text-white/40 max-w-lg font-medium leading-relaxed mb-8 md:mb-10 uppercase tracking-[0.2em]">
                "The ultimate institutional benchmark for the digital economy, engineered for sub-millisecond settlement and surgical intelligence."
              </p>

              <div className="flex flex-wrap gap-4 mb-12 md:mb-16">
                <Button 
                  onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 md:h-16 px-8 md:px-12 bg-[#c4ff00] hover:bg-white text-black text-xs md:text-base font-black rounded-xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-[#c4ff00]/10 group"
                >
                  Enter Terminal
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 md:h-16 px-8 md:px-12 border-white/10 hover:bg-white/5 text-white text-xs md:text-base font-black rounded-xl transition-all uppercase tracking-[0.2em]"
                >
                  Read Whitepaper
                </Button>
              </div>
            </motion.div>

            {/* Floating Data Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
              <StatItem icon={<Cpu />} label="CORE LATENCY" value="0.08ms" />
              <StatItem icon={<Activity />} label="THROUGHPUT" value="1.4M TPS" />
              <StatItem icon={<Globe />} label="UPTIME" value="99.99%" />
              <StatItem icon={<ShieldCheck />} label="SECURITY" value="MPC-ZK" />
            </div>
          </div>

          {/* Visual Side - Futuristic Bitcoin/Asset Animation */}
          <div className="hidden lg:block relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-square max-w-[600px] mx-auto"
            >
              {/* Outer Orbital Ring */}
              <div className="absolute inset-0 border border-[#c4ff00]/10 rounded-full animate-[spin_30s_linear_infinite]" />
              {/* Inner Orbital Ring */}
              <div className="absolute inset-10 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Glowing Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#c4ff00]/20 blur-[100px] rounded-full animate-pulse" />
              
              {/* Floating Asset Core */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 180, 360]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center pt-2"
              >
                <div className="relative w-full h-full bg-gradient-to-br from-[#f7931a] to-[#ffab4a] rounded-full shadow-[0_0_80px_rgba(247,147,26,0.3)] p-[3px] group/coin">
                  <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden relative">
                    <img 
                      src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040" 
                      alt="BTC" 
                      className="w-28 h-28 md:w-40 md:h-40 z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] z-20" />
                    
                    {/* Inner Tech Decor */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 z-0" />
                  </div>
                </div>

                {/* Floating labels */}
                <div className="absolute -top-12 -right-8 p-3 bg-zinc-900/80 backdrop-blur-xl border border-[#c4ff00]/30 rounded-xl shadow-2xl">
                  <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-widest mb-1">Asset Hash</p>
                  <p className="text-white text-xs font-mono font-bold">NX-7492-V4</p>
                </div>
                <div className="absolute -bottom-8 -left-8 p-3 bg-zinc-900/80 backdrop-blur-xl border border-blue-400/30 rounded-xl shadow-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Network Verified</p>
                  </div>
                  <p className="text-white text-xs font-mono font-bold">BLOCK-910M</p>
                </div>
              </motion.div>

              {/* Orbital Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div 
                    className="absolute w-2 h-2 bg-[#c4ff00] rounded-full shadow-[0_0_10px_#c4ff00]" 
                    style={{ 
                      top: '50%', 
                      left: `${10 + i * 15}%`,
                      opacity: 0.3 + (i * 0.1)
                    }} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trending Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/5 relative overflow-hidden group mt-8 md:mt-12"
        >
          <div className="absolute top-0 right-0 p-6">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-ping" />
              <div className="w-2 h-2 bg-[#c4ff00]/50 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] font-black text-[#c4ff00] uppercase tracking-[0.4em]">Market Velocity</span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>

          <Splide
            options={{
              type: 'loop',
              perPage: 5,
              gap: '2rem',
              autoplay: true,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              breakpoints: {
                1280: { perPage: 4 },
                1024: { perPage: 3 },
                768: { perPage: 2 },
                480: { perPage: 1 },
              }
            }}
          >
            {coins?.slice(0, 10).map((coin: any) => (
              <SplideSlide key={coin.id}>
                <div className="flex items-center gap-4 group/coin cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover/coin:bg-[#c4ff00]/20 transition-all">
                    <img 
                      src={coin.image} 
                      referrerPolicy="no-referrer"
                      alt={coin.name} 
                      className="w-7 h-7 grayscale group-hover/coin:grayscale-0 transition-all" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-black uppercase text-[10px] tracking-widest">{coin.symbol}</p>
                    <div className="flex items-center gap-1.5">
                      <p className={`text-[10px] font-black ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(1)}%
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

const StatItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-4 md:p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 group hover:border-[#c4ff00]/30 transition-all text-left">
    <div className="text-[#c4ff00] mb-3 group-hover:scale-110 transition-transform origin-left">
      {React.isValidElement(icon) && React.cloneElement(icon as any, { className: 'w-5 h-5 md:w-6 md:h-6' })}
    </div>
    <p className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm md:text-lg font-black text-white tracking-tight uppercase">{value}</p>
  </div>
);

const StatCard = ({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="p-4 md:p-5 xl:p-6 bg-black/40 backdrop-blur-3xl rounded-xl md:rounded-2xl border border-white/5 group cursor-default hover:border-[#c4ff00]/30 transition-all shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      {React.isValidElement(icon) && React.cloneElement(icon as any, { className: 'w-16 h-16 md:w-20 md:h-20 text-white' })}
    </div>
    
    <div className="relative z-10">
      <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#c4ff00]/10 text-[#c4ff00] flex items-center justify-center mb-1.5 md:mb-2 group-hover:bg-[#c4ff00] group-hover:text-black transition-all shadow-[0_0_15px_rgba(196,255,0,0.1)]">
        {React.isValidElement(icon) && React.cloneElement(icon as any, { className: 'w-3 h-3 md:w-3.5 md:h-3.5' })}
      </div>
      <p className="text-[6px] md:text-[7px] font-black text-[#c4ff00] uppercase tracking-[0.2em] mb-0.5 md:mb-1 drop-shadow-sm">{label}</p>
      <p className="text-sm md:text-base xl:text-lg font-black text-white tracking-tighter leading-none">{value}</p>
    </div>
  </motion.div>
);
