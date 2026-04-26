import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ArrowRight, Sparkles, Zap, Bell, ShieldCheck, X, Loader2, Bookmark, BookmarkCheck, TrendingUp, TrendingDown, Minus, Info, Activity, Clock } from 'lucide-react';
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden group border border-white/5 flex flex-col justify-center min-h-[250px] md:min-h-[300px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[#c4ff00]/10 blur-[80px] rounded-full -mr-12 -mt-12 group-hover:bg-[#c4ff00]/20 transition-all duration-700" />
          
          <div className="relative z-10">
            <div className="bg-[#c4ff00] w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-xl shadow-[#c4ff00]/30 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </div>
            <h2 className="text-xl md:text-3xl xl:text-4xl font-black text-white uppercase tracking-tighter mb-2 md:mb-3 leading-[0.95]">Alpha Intelligence</h2>
            <p className="text-white/50 text-xs md:text-sm mb-6 max-w-sm font-medium leading-relaxed">
              Institutional-grade market analysis and high-velocity alerts, synchronized via Nexus Data Engine.
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[6px] font-bold text-white/50">
                    NX
                  </div>
                ))}
              </div>
              <p className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                Protocol Status: Active
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instant Alpha Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-black rounded-2xl md:rounded-3xl p-5 md:p-6 border border-white/5"
        >
          <div className="flex flex-col xs:flex-row items-center justify-between mb-4 md:mb-6 gap-4">
            <div className="flex items-center gap-3 self-start xs:self-auto">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Newspaper className="w-4 h-4 text-[#c4ff00]" />
              </div>
              <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight">Market Briefs</h3>
            </div>
            <div className="flex items-center gap-2 text-[7px] md:text-[8px] font-black text-[#c4ff00] uppercase tracking-widest border border-[#c4ff00]/20 px-2 py-0.5 rounded-full bg-[#c4ff00]/5 self-start xs:self-auto">
              <div className="w-1 h-1 rounded-full bg-[#c4ff00] animate-pulse" />
              Live Feed
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 className="w-8 h-8 text-[#c4ff00] animate-spin" />
                <p className="text-[8px] font-black text-[#c4ff00] uppercase tracking-widest animate-pulse">Syncing Intelligence...</p>
              </div>
            ) : marketNews.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 4 }}
                className="group cursor-pointer bg-white/[0.03] p-3 rounded-xl md:bg-transparent md:p-0"
                onClick={() => setSelectedNews(item)}
              >
                <div className="flex flex-col sm:flex-row md:grid md:grid-cols-4 gap-3">
                  <div className="relative overflow-hidden rounded-lg h-32 sm:h-24 md:h-16 shadow-md shrink-0">
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
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c4ff00] hover:text-black transition-colors"
                    >
                      {isBookmarked(item.id) ? <BookmarkCheck className="w-2.5 h-2.5" /> : <Bookmark className="w-2.5 h-2.5" />}
                    </button>
                  </div>
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-[6px] md:text-[7px] font-black text-[#c4ff00] uppercase tracking-widest bg-[#c4ff00]/10 px-1.5 py-0.5 rounded-md">{item.category}</span>
                         <span className="text-[6px] md:text-[7px] font-bold text-zinc-500">{getTimeAgo(item.publishedAt)}</span>
                         {item.sentiment && <div className="scale-[0.6] origin-left"><SentimentBadge sentiment={item.sentiment} article={item} /></div>}
                      </div>
                      <h4 className="text-[11px] md:text-sm font-black text-white uppercase leading-tight group-hover:text-[#c4ff00] transition-colors line-clamp-2">{item.title}</h4>
                      <p className="hidden md:block text-[8px] text-zinc-500 line-clamp-1 mt-0.5 font-medium opacity-70 leading-none">{item.description}</p>
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
        className="bg-[#c4ff00]/5 rounded-2xl md:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#c4ff00]/10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#c4ff00] p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg shadow-[#c4ff00]/30 shrink-0">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-black text-[#c4ff00] uppercase tracking-tighter leading-none mb-1">Energy Pipeline</h3>
              <p className="text-[7px] md:text-[8px] font-black text-[#c4ff00]/30 uppercase tracking-[0.3em] leading-none">Global Commodities Vector</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {energyNews.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, borderColor: '#c4ff0033', backgroundColor: '#18181b' }}
              onClick={() => setSelectedNews({...item, category: 'Signal'})}
              className="bg-zinc-900/50 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-white/5 relative group overflow-hidden cursor-pointer shadow-2xl flex flex-col h-full transition-all duration-500"
            >
              <div className="h-40 md:h-52 overflow-hidden relative shrink-0">
                <img 
                  src={item.urlToImage || getFallbackImage('Signal')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-black bg-[#c4ff00] px-3 py-1 rounded shadow-[0_0_20px_rgba(196,255,0,0.3)]">
                    {item.impact || 'ALPHA'}
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">{getTimeAgo(item.publishedAt)}</p>
                  {item.sentiment && <SentimentBadge sentiment={item.sentiment} article={item} />}
                </div>
                <h4 className="text-sm md:text-lg font-black text-white uppercase leading-[1.1] tracking-tighter group-hover:text-[#c4ff00] transition-colors line-clamp-3 mb-6">
                  {item.title}
                </h4>
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-[9px] font-black text-[#c4ff00] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Initiate Deep Scan <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
                    <Activity className="w-3 h-3 text-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Modal */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-[95vw] lg:max-w-6xl p-0 overflow-hidden bg-black border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_100px_rgba(196,255,0,0.1)] focus-visible:outline-none">
          {selectedNews && (
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] lg:h-[80vh] overflow-hidden">
              {/* Image Side - Refined */}
              <div className="relative h-48 sm:h-64 lg:h-full lg:w-[42%] shrink-0 overflow-hidden group border-r border-white/5">
                <img 
                  src={selectedNews.urlToImage || getFallbackImage(selectedNews.category || 'Market')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Meta Labels in Image */}
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#c4ff00] text-black text-[10px] font-black uppercase tracking-[2px] rounded shadow-[0_0_20px_rgba(196,255,0,0.4)]">
                      {selectedNews.category || 'MARKET'}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-black uppercase tracking-[0.2em] rounded">
                      {getTimeAgo(selectedNews.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase leading-[0.9] tracking-tighter drop-shadow-2xl">
                    {selectedNews.title}
                  </h3>
                </div>
              </div>

              {/* Content Side - Institutional Terminal Style */}
              <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden relative">
                {/* Header Controls */}
                <div className="sticky top-0 w-full p-6 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl z-50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <Activity className="w-4 h-4 text-[#c4ff00]" />
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Institutional Feed v4.2</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                       <div className="h-4 w-px bg-white/10" />
                       <Clock className="w-4 h-4 text-white/20" />
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Analysis Time: 4m</span>
                    </div>
                  </div>
                  <DialogClose className="p-2.5 rounded-xl bg-white/5 hover:bg-[#c4ff00] hover:text-black text-white transition-all border border-white/10">
                    <X className="w-5 h-5" />
                  </DialogClose>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-14 space-y-12">
                   {/* Sentiment Matix */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-8">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Sentiment Score</p>
                        <div className="flex items-center gap-2">
                           <SentimentBadge sentiment={selectedNews.sentiment || 'NEUTRAL'} article={selectedNews} />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Reliability Index</p>
                        <p className="text-white font-bold text-sm">94.2% Verified</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Impact Factor</p>
                        <p className="text-[#c4ff00] font-bold text-sm">HIGH VOLATILITY</p>
                     </div>
                   </div>

                  {/* Lead Section */}
                  <div className="bg-white/[0.02] p-8 md:p-10 rounded-[2rem] border border-white/5 relative group transition-all hover:border-[#c4ff00]/20">
                     <div className="absolute top-0 left-0 w-1 h-full bg-[#c4ff00] shadow-[0_0_20px_#c4ff00]" />
                     <p className="text-xl md:text-2xl font-bold text-white/90 leading-[1.3] font-serif italic italic">
                        "{selectedNews.description}"
                     </p>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-8 text-white/60 text-base md:text-lg leading-relaxed font-medium">
                    {selectedNews.content?.split('\n\n').map((para: string, i: number) => (
                      <p key={i} className="first-letter:text-4xl first-letter:font-black first-letter:text-[#c4ff00] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                        {para.replace(/\[\+\d+ chars\]/g, '')}
                      </p>
                    )) || (
                      <div className="space-y-8">
                        <p>Nexus Surveillance Units have logged high-velocity accumulation patterns across multiple tier-1 execution environments. Preliminary data extraction indicates institutional-sized volume consolidation occurring in fragmented liquidity pools across the decentralised spectrum.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/[0.03] rounded-3xl border border-white/5">
                           <div className="space-y-2">
                             <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#c4ff00]" />
                                <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-widest">Network Signal</p>
                             </div>
                             <p className="text-white text-sm font-bold">Node Consensus: STRENGTHENING</p>
                           </div>
                           <div className="space-y-2">
                             <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Risk Guard</p>
                             </div>
                             <p className="text-white text-sm font-bold">Deviation: 0.08ms Latency Verified</p>
                           </div>
                        </div>

                        <p>Our distributed sentiment mapping engine suggests a significant disconnect between retail short-term sell-pressure and institutional mid-term accumulation strategies. The identified support vectors align perfectly with the NX-V4 Settlement metrics observed in previous quarterly expansions.</p>
                        
                        <div className="p-8 md:p-10 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 mt-8 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="w-24 h-24 text-emerald-400" />
                          </div>
                          <p className="text-emerald-400 font-black uppercase text-[9px] tracking-[4px] mb-3 flex items-center gap-2">
                             <ShieldCheck className="w-5 h-5 shadow-[0_0_10px_#10b981]" /> Analyst Pulse
                          </p>
                          <p className="text-white/80 text-lg font-bold leading-relaxed">
                            "The current market architecture indicates a structural reset phase. Automated liquidity routing is now prioritizing execution safety over raw throughput."
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Attribution */}
                  <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-8 pb-4">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                        <Newspaper className="w-6 h-6 text-[#c4ff00]" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-0.5">AUTHENTICATED SOURCE</p>
                        <p className="text-base font-black text-white uppercase tracking-tight">{selectedNews.source?.name} Intelligence</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                      {selectedNews.url && selectedNews.url !== '#' && (
                        <Button 
                          onClick={() => window.open(selectedNews.url, '_blank')}
                          className="flex-1 md:flex-none h-14 px-8 bg-[#c4ff00] hover:bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                        >
                          Launch Source <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        onClick={() => toggleBookmark(selectedNews)}
                        className="flex-1 md:flex-none h-14 px-8 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                      >
                         {isBookmarked(selectedNews.id) ? 'Bookmarked' : 'Deep Archive'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
