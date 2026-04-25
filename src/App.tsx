import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { PriceTracker } from './components/tracker/PriceTracker';
import { CurrencyConverter } from './components/tracker/CurrencyConverter';
import { PriceAnalysis } from './components/analysis/PriceAnalysis';
import { MarketPulse } from './components/analysis/MarketPulse';
import { GlobalPulse } from './components/analysis/GlobalPulse';
import { PortfolioTracker } from './components/portfolio/PortfolioSimulator';
import { MarketWidgets } from './components/widgets/MarketWidgets';
import { LiveNetworkFeed } from './components/widgets/LiveNetworkFeed';
import { NewsSection } from './components/layout/NewsSection';
import { Footer } from './components/layout/Footer';
import { FloatingSystemStatus } from './components/ui/FloatingSystemStatus';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import { DocsPortal } from './components/layout/DocsPortal';

const queryClient = new QueryClient();

import { BookmarksPage } from './components/news/BookmarksPage';
import { ProtocolsPage } from './components/protocols/ProtocolsPage';

const HomePage = () => (
  <main>
    <Hero />
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-16 md:space-y-32">
      <section id="market" data-aos="fade-up">
        <PriceTracker />
      </section>
      
      <section data-aos="fade-up">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
          <div className="xl:col-span-2">
            <MarketWidgets />
          </div>
          <LiveNetworkFeed />
        </div>
      </section>

      <section data-aos="fade-up" className="max-w-4xl mx-auto">
        <CurrencyConverter />
      </section>
      
      <section data-aos="fade-up">
        <NewsSection />
      </section>
    </div>
  </main>
);

const PulsePage = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20 space-y-32">
    <TypographySection title="Global Pulse" subtitle="Real-time Stream Integration" transition />
    <MarketPulse />
    <PriceAnalysis />
  </div>
);

const GlobalPulsePage = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20 space-y-32">
    <TypographySection title="Macro Dynamics" subtitle="Cross-Sector Intelligence Stream" transition />
    <GlobalPulse />
  </div>
);

const NewsPage = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20">
    <TypographySection title="Intelligence" subtitle="Market Alpha & Energy Reports" transition />
    <NewsSection />
  </div>
);

const PortfolioPage = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20">
    <TypographySection title="Portfolio" subtitle="Asset Simulation Terminal" transition />
    <PortfolioTracker />
  </div>
);

const TypographySection = ({ title, subtitle, transition }: any) => (
  <div className={`${transition ? 'mb-12 md:mb-16' : ''}`}>
    <h1 className="text-3xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase mb-4 leading-[1.1]">{title}</h1>
    <p className="text-[#c4ff00] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs underline decoration-2 underline-offset-8">{subtitle}</p>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [docsState, setDocsState] = useState<{ isOpen: boolean; slug?: string }>({ isOpen: false });

  const openDocs = (slug?: string) => setDocsState({ isOpen: true, slug });
  const closeDocs = () => setDocsState({ isOpen: false });

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out-cubic', once: false });
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    setIsLoaded(true);
    return () => lenis.destroy();
  }, []);

  if (!isLoaded) return null;

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-black selection:bg-[#c4ff00] selection:text-black">
          <Navbar onOpenDocs={openDocs} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pulse" element={<PulsePage />} />
            <Route path="/global-pulse" element={<GlobalPulsePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
          </Routes>
          <Footer onOpenDocs={openDocs} />
          <DocsPortal isOpen={docsState.isOpen} onClose={closeDocs} initialSlug={docsState.slug} />
          <FloatingSystemStatus />
          <Toaster position="bottom-right" />
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
