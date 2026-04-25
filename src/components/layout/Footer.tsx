import React, { useEffect, useRef } from 'react';
import { Zap, Twitter, Github, Linkedin, MessageSquare, ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export const Footer = ({ onOpenDocs }: { onOpenDocs: (slug: string) => void }) => {
  const footerRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = e;
      gsap.to(blobRef.current, {
        x: clientX * 0.05,
        y: clientY * 0.05,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#161311] dark:bg-black pt-32 pb-16 overflow-hidden">
      {/* Interactive Background Blob */}
      <div 
        ref={blobRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#c4ff00]/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-[#c4ff00] p-2 rounded-xl">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">NEXUS<span className="text-[#c4ff00]">.</span></span>
            </div>
            <p className="text-white/40 font-medium leading-relaxed mb-10 max-w-xs">
              Redefining the relationship between institutional finance and digital liquidity. Advanced execution for the modern age.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Twitter />} />
              <SocialIcon icon={<Github />} />
              <SocialIcon icon={<Linkedin />} />
              <SocialIcon icon={<MessageSquare />} />
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.4em] mb-10">Ecosystem</h4>
            <ul className="space-y-6">
              <FooterLink onClick={() => onOpenDocs('exchange-api')}>Exchange API</FooterLink>
              <FooterLink onClick={() => onOpenDocs('wallet-protocol')}>Wallet Protocol</FooterLink>
              <FooterLink onClick={() => onOpenDocs('nexus-ledger')}>Nexus Ledger</FooterLink>
              <FooterLink onClick={() => onOpenDocs('deep-analysis')}>Deep Analysis</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.4em] mb-10">Company</h4>
            <ul className="space-y-6">
              <FooterLink onClick={() => onOpenDocs('security-audit')}>Security Audit</FooterLink>
              <FooterLink onClick={() => onOpenDocs('privacy-policy')}>Privacy Policy</FooterLink>
              <FooterLink onClick={() => onOpenDocs('terms-of-service')}>Terms of Service</FooterLink>
              <FooterLink onClick={() => onOpenDocs('press-kit')}>Press Kit</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-[#c4ff00] dark:text-white uppercase tracking-[0.4em] mb-10">Network</h4>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 group">
              <p className="text-white font-black text-xl mb-4 group-hover:text-[#c4ff00] transition-colors tracking-tight">Global Presence.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-white/40">
                  <span>New York</span>
                  <span className="text-[#c4ff00]">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-white/40">
                  <span>London</span>
                  <span className="text-[#c4ff00]">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-white/40">
                  <span>Singapore</span>
                  <span className="text-[#c4ff00]">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/5 gap-8">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            &copy; 2026 NEXUS CORE. ALL PERFORMANCE METRICS ARE AUDITED.
          </p>
          <div className="flex gap-10">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Mainnet Live
            </span>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Version 4.2.0-stable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-[#c4ff00] hover:text-black transition-all hover:-translate-y-1">
    {icon}
  </a>
);

const FooterLink = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <li>
    <button 
      onClick={onClick}
      className="text-white/40 font-bold text-sm hover:text-white transition-colors flex items-center gap-0 hover:gap-2 group text-left"
    >
      <div className="w-0 group-hover:w-4 h-[2px] bg-[#c4ff00] transition-all" />
      {children}
    </button>
  </li>
);
