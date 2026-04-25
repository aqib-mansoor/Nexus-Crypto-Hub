import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Shield, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const Features = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-[#ff771c]" />,
      title: "Bank-Grade Security",
      desc: "Multi-sig vaulting and 256-bit encryption for every transaction."
    },
    {
      icon: <Zap className="w-10 h-10 text-[#ff771c]" />,
      title: "Instant Execution",
      desc: "Proprietary order routing ensures the best prices in milliseconds."
    },
    {
      icon: <Globe className="w-10 h-10 text-[#ff771c]" />,
      title: "Global Liquidity",
      desc: "Connect to over 100+ fiat pairs and global exchanges instantly."
    },
    {
      icon: <Lock className="w-10 h-10 text-[#ff771c]" />,
      title: "Self-Custody",
      desc: "Your keys, your crypto. Total control over your digital legacy."
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-[#161311]/5 rounded-[2rem] md:rounded-[3rem]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <div className="lg:w-1/2 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#161311] leading-tight uppercase">
                BUILT FOR THE <br />
                <span className="text-[#ff771c]">NEXT DECADE.</span>
              </h2>
              <p className="text-lg md:text-xl text-[#546877] mt-4 md:mt-6 max-w-lg font-medium leading-relaxed">
                NEXUS isn't just a dashboard. it's a financial engine designed for institutional performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-[#161311]/5">
                <p className="text-3xl md:text-4xl font-black text-[#161311]">0.1s</p>
                <p className="text-[8px] md:text-[10px] font-black text-[#ff771c] uppercase tracking-widest mt-2">Latency</p>
              </div>
              <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-[#161311]/5">
                <p className="text-3xl md:text-4xl font-black text-[#161311]">100%</p>
                <p className="text-[8px] md:text-[10px] font-black text-[#ff771c] uppercase tracking-widest mt-2">Uptime</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-sm md:max-w-md mx-auto">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 3000 }}
              className="w-full h-[320px] md:h-[400px]"
            >
              {features.map((f, i) => (
                <SwiperSlide key={i} className="rounded-[1.5rem] md:rounded-[2.5rem] bg-[#161311] p-8 md:p-10 flex flex-col justify-center text-center">
                  <div className="mx-auto bg-white/10 p-4 rounded-xl mb-6 md:mb-8">
                    {React.isValidElement(f.icon) && React.cloneElement(f.icon as any, { className: "w-8 h-8 md:w-10 md:h-10 text-[#ff771c]" })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase mb-4 leading-tight">{f.title}</h3>
                  <p className="text-sm md:text-base text-white/60 font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
