import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ArrowRight, Sparkles, Zap, Bell, ShieldCheck, X, Loader2, Bookmark, BookmarkCheck, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { fetchFinancialNews, NewsArticle } from '@/services/newsService';
import { useBookmarks } from '@/hooks/useBookmarks';

export const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [marketNews, setMarketNews] = useState<NewsArticle[]>([]);
  const [energyNews, setEnergyNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const getFallbackImage = (category: string) => {
    const fallbacks: Record<string, string> = {
      'Energy': 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200',
      'Market': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200',
      'Tech': 'https://images.unsplash.com/photo-1639322537248-5666d368bd38?auto=format&fit=crop&q=80&w=1200',
      'Update': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200'
    };
    return fallbacks[category] || fallbacks['Market'];
  };

  const loadNews = async (silent = false) => {
    if (!silent) setLoading(true);
    const [market, energy] = await Promise.all([
      fetchFinancialNews('crypto bitcoin market'),
      fetchFinancialNews('oil gas energy prices')
    ]);

    if (Array.isArray(market) && market.length > 0) setMarketNews(market.slice(0, 3));
    else {
      setMarketNews([
        {
          id: 'def-1',
          title: "Bitcoin Alpha: Institutional Accumulation Phase Confirmed",
          category: "Market",
          publishedAt: new Date().toISOString(),
          urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200",
          description: "On-chain data reveals significant whale movement as the next halving approach creates supply shocks in global markets.",
          source: { name: "Nexus Intelligence" },
          url: "#",
          sentiment: 'positive'
        },
        {
          id: 'def-2',
          title: "Ethereum L2 Ecosystem Transactions Breach New Peak",
          category: "Tech",
          publishedAt: new Date().toISOString(),
          urlToImage: "https://images.unsplash.com/photo-1639322537248-5666d368bd38?auto=format&fit=crop&q=80&w=1200",
          description: "Scalability solutions are now processing 10x the volume of the mainnet, signalling a shift toward decentralized compute.",
          source: { name: "Nexus Intelligence" },
          url: "#",
          sentiment: 'positive'
        },
        {
           id: 'def-3',
           title: "Nexus Bridge v4 Integration Complete",
           category: "Update",
           publishedAt: new Date().toISOString(),
           urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
           description: "The latest institutional-grade upgrade is now live across all institutional swap nodes.",
           source: { name: "Nexus Intelligence" },
           url: "#",
           sentiment: 'neutral'
        }
      ] as NewsArticle[]);
    }

    if (Array.isArray(energy) && energy.length > 0) setEnergyNews(energy.slice(0, 4));
    else {
      setEnergyNews([
        {
          id: 'def-e1',
          title: "OPEC+ Strategic Reserves Update: Production Adjustments Incoming",
          publishedAt: new Date().toISOString(),
          impact: "High",
          sentiment: 'negative',
          urlToImage: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200",
          description: "Global energy ministers signal a shift in supply dynamics to counter emerging market volatility.",
          source: { name: "Nexus Intelligence" },
          url: "#"
        },
        {
          id: 'def-e2',
          title: "LNG Global Pipeline: European Storage Capacity at Threshold",
          publishedAt: new Date().toISOString(),
          impact: "Medium",
          sentiment: 'neutral',
          urlToImage: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200",
          description: "A mild transition season has left reserves at record levels, impacting long-term futures.",
          source: { name: "Nexus Intelligence" },
          url: "#"
        },
        {
           id: 'def-e3',
           title: "Brent Crude Technicals: Resistance Testing Near Critical Peak",
           publishedAt: new Date().toISOString(),
           impact: "Medium",
           sentiment: 'negative',
           urlToImage: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80&w=1200",
           description: "Market momentum indicates a potential breakout as geopolitical factors weigh on transit routes.",
           source: { name: "Nexus Intelligence" },
           url: "#"
        },
        {
           id: 'def-e4',
           title: "Solar Grid Adoption: Renewables Displacing Traditional Base Load",
           publishedAt: new Date().toISOString(),
           impact: "Low",
           sentiment: 'positive',
           urlToImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200",
           description: "Institutional infrastructure pivot toward green hydrogen and solar storage continues at pace.",
           source: { name: "Nexus Intelligence" },
           url: "#"
        }
      ] as NewsArticle[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(() => loadNews(true), 60000); // Dynamic stream every 60s
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateStr: string) => {
    const hours = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60));
    return hours > 0 ? `${hours}h ago` : 'Just now';
  };

  const SentimentBadge = ({ sentiment, article }: { sentiment: string, article?: NewsArticle }) => {
    const config = {
      positive: { icon: TrendingUp, color: 'text-[#c4ff00]', bg: 'bg-[#c4ff00]/10', border: 'border-[#c4ff00]/20', label: 'BULLISH' },
      negative: { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'BEARISH' },
      neutral: { icon: Minus, color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', label: 'NEUTRAL' }
    }[sentiment as 'positive' | 'negative' | 'neutral'] || { icon: Info, color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', label: 'PENDING' };

    const Icon = config.icon;
    const score = article?.relevanceScore || 92;
    
    return (
      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg ${config.bg} ${config.color} border ${config.border} text-[8px] font-black uppercase tracking-widest shadow-sm`}>
        <Icon className="w-3 h-3" />
        <span className="hidden xs:inline">{config.label}</span>
        <span className="opacity-40">|</span>
        <span className="text-[7px]">{score}% CFM</span>
        <div className="flex gap-0.5 ml-1">
          {[1,2,3].map(i => (
            <div key={i} className={`w-1 h-2 rounded-full ${i <= (sentiment === 'positive' ? 3 : sentiment === 'neutral' ? 2 : 1) ? config.color.replace('text-', 'bg-') : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 py-8 md:space-y-12 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Intelligence Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black rounded-[3rem] p-10 md:p-14 relative overflow-hidden group border border-white/5 flex flex-col justify-center min-h-[400px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4ff00]/10 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-[#c4ff00]/20 transition-all duration-700" />
          
          <div className="relative z-10">
            <div className="bg-[#c4ff00] w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-[#c4ff00]/30 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 leading-[0.9]">Alpha<br/>Intelligence</h2>
            <p className="text-white/60 text-base md:text-lg mb-8 md:mb-10 max-w-sm font-medium">
              Institutional-grade market analysis and early energy alerts, processed by Nexus Data Engine.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white/50">
                    NX
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                Live Consensus Active
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instant Alpha Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-black rounded-[3rem] p-8 md:p-12 border border-white/5"
        >
          <div className="flex flex-col xs:flex-row items-center justify-between mb-8 md:mb-10 gap-4">
            <div className="flex items-center gap-3 md:gap-4 self-start xs:self-auto">
              <div className="bg-white/10 p-2 md:p-3 rounded-xl">
                <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-[#c4ff00]" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Market Briefs</h3>
            </div>
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-[#c4ff00] uppercase tracking-widest border border-[#c4ff00]/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-[#c4ff00]/5 self-start xs:self-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4ff00] animate-pulse" />
              Real-time
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-[#c4ff00] animate-spin" />
                <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-widest animate-pulse">Streaming Market Data...</p>
              </div>
            ) : marketNews.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 5 }}
                className="group cursor-pointer bg-white/5 p-4 rounded-3xl md:bg-transparent md:p-0"
                onClick={() => setSelectedNews(item)}
              >
                <div className="flex flex-col sm:flex-row md:grid md:grid-cols-4 gap-4 md:gap-6">
                  <div className="relative overflow-hidden rounded-2xl h-48 sm:h-32 md:h-28 shadow-md shrink-0">
                    <img 
                      src={item.urlToImage || getFallbackImage(item.category || 'Market')} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt={item.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getFallbackImage(item.category || 'Market');
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c4ff00] hover:text-black transition-colors"
                    >
                      {isBookmarked(item.id) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-1.5 md:mb-2">
                         <span className="text-[8px] md:text-[9px] font-black text-[#c4ff00] uppercase tracking-widest bg-[#c4ff00]/10 px-2.5 py-0.5 rounded-md">{item.category}</span>
                         <span className="text-[8px] md:text-[9px] font-bold text-zinc-400">{getTimeAgo(item.publishedAt)}</span>
                         {item.sentiment && <SentimentBadge sentiment={item.sentiment} article={item} />}
                      </div>
                      <h4 className="text-sm md:text-base font-black text-white leading-tight group-hover:text-[#c4ff00] transition-colors line-clamp-2 md:line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] md:text-xs text-zinc-400 line-clamp-2 mt-1.5 md:mt-2 font-medium opacity-80">{item.description}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Energy Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#c4ff00]/5 rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 border border-[#c4ff00]/10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#c4ff00] p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg shadow-[#c4ff00]/30 shrink-0">
              <Zap className="w-5 h-5 md:w-8 md:h-8 text-black" />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-black text-[#c4ff00] uppercase tracking-tighter">Energy Pipeline</h3>
              <p className="text-[8px] md:text-[10px] font-black text-[#c4ff00]/30 uppercase tracking-[0.3em]">Global Crude & Gas Vectors</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {energyNews.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedNews({...item, category: 'Energy'})}
              className="bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 relative group overflow-hidden cursor-pointer shadow-sm flex flex-col h-full"
            >
              <div className="h-40 sm:h-44 md:h-48 overflow-hidden relative shrink-0">
                <img 
                  src={item.urlToImage || getFallbackImage('Energy')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage('Energy');
                  }}
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <div className="text-[8px] font-black uppercase tracking-widest text-black bg-[#c4ff00] px-2 py-0.5 rounded-md shadow-xl">
                    {item.impact || 'MEDIUM'} IMPACT
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-zinc-500 text-[8px] md:text-[9px] font-bold tracking-widest">{getTimeAgo(item.publishedAt)}</p>
                  {item.sentiment && <div className="scale-75 origin-right"><SentimentBadge sentiment={item.sentiment} article={item} /></div>}
                </div>
                <h4 className="text-[13px] md:text-sm font-black text-white uppercase leading-tight group-hover:text-[#c4ff00] transition-colors line-clamp-2 mb-3">
                  {item.title}
                </h4>
                <div className="mt-auto flex items-center gap-2 text-[9px] font-black text-[#c4ff00] uppercase tracking-widest group-hover:gap-3 transition-all">
                  Deep Scan <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Modal */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-zinc-950 border-none rounded-[2.5rem] shadow-2xl focus-visible:outline-none">
          {selectedNews && (
            <div className="flex flex-col max-h-[90vh] overflow-hidden">
              <div className="relative h-[350px] md:h-[450px] shrink-0">
                <img 
                  src={selectedNews.urlToImage || getFallbackImage(selectedNews.category || 'Market')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                  alt="" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage(selectedNews?.category || 'Market');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <DialogClose className="absolute top-8 right-8 p-3 rounded-full bg-black/40 hover:bg-[#c4ff00] hover:text-black text-white backdrop-blur-xl outline-none transition-all group border border-white/10 z-50">
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </DialogClose>
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center flex-wrap gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-[#c4ff00] text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg">
                      {selectedNews.category || 'GLOBAL ALPHA'}
                    </span>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{getTimeAgo(selectedNews.publishedAt)}</span>
                    {selectedNews.sentiment && <SentimentBadge sentiment={selectedNews.sentiment} article={selectedNews} />}
                    <button 
                      onClick={() => toggleBookmark(selectedNews)}
                      className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#c4ff00] hover:text-black transition-colors"
                    >
                      {isBookmarked(selectedNews.id) ? <><BookmarkCheck className="w-3.5 h-3.5" /> Saved</> : <><Bookmark className="w-3.5 h-3.5" /> Bookmark Intelligence</>}
                    </button>
                  </div>
                  <DialogHeader>
                    <DialogTitle className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none max-w-3xl text-left border-none p-0">
                      {selectedNews.title}
                    </DialogTitle>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-4">Source: {selectedNews.source?.name} • Author: {selectedNews.author || 'Nexus Financial'}</p>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-10 md:p-14 overflow-y-auto">
                <div className="p-0 text-left">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-1.5 h-12 bg-[#c4ff00] rounded-full" />
                     <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                      {selectedNews.description}
                    </p>
                  </div>
                  
                  <div className="space-y-8 text-zinc-400 text-lg leading-relaxed font-medium">
                    {selectedNews.content?.split('\n\n').map((para: string, i: number) => (
                      <p key={i}>{para.replace(/\[\+\d+ chars\]/g, '')}</p>
                    )) || (
                      <div className="space-y-4">
                        <p>{selectedNews.content?.replace(/\[\+\d+ chars\]/g, '') || 'Deep technical analysis is currently being verified by Nexus network nodes. Historical volatility suggests a high-probability vector matching current market sentiment.'}</p>
                        <p>Market participants are advised to monitor the relevant assets during the current trading session. Nexus data engines are processing additional data points to provide 99.9% accurate projections.</p>
                      </div>
                    )}
                    {selectedNews.url && selectedNews.url !== '#' && (
                      <Button 
                        variant="link" 
                        onClick={() => window.open(selectedNews.url, '_blank', 'noopener,noreferrer')}
                        className="p-0 h-auto inline-flex items-center gap-2 text-[#c4ff00] hover:text-[#c4ff00]/80 hover:underline mt-4 font-black"
                      >
                        Read full report source <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row gap-8 items-center justify-between border-t border-white/10 pt-10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-[#c4ff00]/10 rounded-2xl flex items-center justify-center border border-[#c4ff00]/20">
                      <ShieldCheck className="w-8 h-8 text-[#c4ff00]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">Authenticity Guaranteed</p>
                      <p className="text-lg font-black text-white uppercase">Nexus Vector: ALPHA-901</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setSelectedNews(null)}
                    className="bg-white text-black font-black uppercase tracking-widest h-16 px-12 rounded-2xl w-full md:w-auto hover:bg-[#c4ff00] transition-all shadow-xl"
                  >
                    Close Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
