import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

export const Navbar = ({ onOpenDocs }: { onOpenDocs: (slug?: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 md:py-3 bg-black/80 backdrop-blur-xl border-b border-white/10' : 'py-4 md:py-6 bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[#c4ff00] p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg shadow-[#c4ff00]/20 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-black" fill="currentColor" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
            NEXUS<span className="text-[#c4ff00]">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          <NavLink to="/" active={location.pathname === '/'}>Markets</NavLink>
          <NavLink to="/pulse" active={location.pathname === '/pulse'}>Pulse</NavLink>
          <NavLink to="/global-pulse" active={location.pathname === '/global-pulse'}>Global</NavLink>
          <Link 
            to="/protocols" 
            className={`text-xs xl:text-sm font-bold transition-colors uppercase tracking-widest underline-offset-8 hover:underline ${location.pathname === '/protocols' ? 'text-[#c4ff00] underline' : 'text-zinc-200/80 hover:text-[#c4ff00]'}`}
          >
            Protocol
          </Link>
          <NavLink to="/portfolio" active={location.pathname === '/portfolio'}>Portfolio</NavLink>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link to="/news">
            <Button 
              className="bg-[#c4ff00] hover:bg-[#c4ff00]/90 text-black font-bold rounded-full px-4 md:px-6 h-9 md:h-11 text-xs md:text-sm flex items-center gap-1.5 md:gap-2 transition-all shadow-lg shadow-[#c4ff00]/20"
            >
              <Newspaper className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />
              <span className="hidden xl:inline">Latest</span> News
            </Button>
          </Link>
          
          <button className="lg:hidden p-2 text-[#161311] dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-black border-b border-black/5 dark:border-white/10 lg:hidden overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              <MobileNavLink to="/" label="Markets" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/pulse" label="Pulse" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/global-pulse" label="Global" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/protocols" label="Protocol" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/bookmarks" label="Saved" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/portfolio" label="Portfolio" onClick={() => setIsMenuOpen(false)} />
              <div className="h-px bg-white/10 my-2" />
              <Button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full h-14 rounded-2xl bg-[#c4ff00] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#c4ff00]/30 text-black"
              >
                Join Consensus
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link 
    to={to} 
    className={`text-xs xl:text-sm font-bold transition-colors uppercase tracking-widest underline-offset-8 hover:underline ${active ? 'text-[#c4ff00] underline' : 'text-zinc-200/80 hover:text-[#c4ff00]'}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="text-lg font-bold text-white uppercase tracking-[0.1em] hover:text-[#c4ff00] transition-colors"
  >
    {label}
  </Link>
);
