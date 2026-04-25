import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark, Newspaper, ArrowRight, X, Trash2, ShieldCheck, Zap, TrendingUp, TrendingDown, Minus, Info, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose
} from '@/components/ui/dialog';
import { NewsArticle } from '@/services/newsService';

export const BookmarksPage = () => {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const getTimeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 0 ? `${hours}h ago` : 'Just now';
  };

  const getFallbackImage = (category: string) => {
    const fallbacks: Record<string, string> = {
      'Energy': 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200',
      'Market': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200',
      'Tech': 'https://images.unsplash.com/photo-1639322537248-5666d368bd38?auto=format&fit=crop&q=80&w=1200'
    };
    return fallbacks[category] || fallbacks['Market'];
  };

  const cleanContent = (content: string | undefined | null) => {
    if (!content) return null;
    return content.replace(/\[\+\d+ chars\]/g, '');
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
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 pt-24 md:pt-32 pb-20">
      <div className="mb-12 md:mb-16 text-left">
        <h1 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-[1.1]">Intelligence<br className="hidden md:block"/>Archive</h1>
        <div className="flex items-center gap-3">
          <Bookmark className="w-4 h-4 md:w-5 md:h-5 text-[#c4ff00]" />
          <p className="text-[#c4ff00] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs underline decoration-2 underline-offset-8">Saved Vectors: {bookmarks.length}</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-black border border-white/10 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 flex flex-col items-center justify-center text-center backdrop-blur-xl">
           <Newspaper className="w-12 h-12 md:w-20 md:h-20 text-white/10 mb-6 md:mb-8" />
           <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-4">Archive Empty</h3>
           <p className="text-white/40 text-sm md:text-base max-w-sm mb-8 font-medium">No intelligence vectors have been bookmarked for later analysis. Sync some nodes from the Hub.</p>
           <Button 
            onClick={() => window.history.back()}
            className="h-14 px-8 md:px-10 bg-[#c4ff00] text-black font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#c4ff00]/20"
           >
             Return to Hub
           </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bookmarks.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-black border border-white/10 rounded-[2rem] relative overflow-hidden group shadow-sm flex flex-col h-full backdrop-blur-xl hover:border-[#c4ff00]/30 transition-colors"
            >
              <div className="h-44 md:h-48 overflow-hidden relative" onClick={() => setSelectedNews(item)}>
                <img 
                  src={item.urlToImage || getFallbackImage(item.category || 'Market')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer" 
                  alt="" 
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(item);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-red-500 transition-all shadow-2xl group/delete"
                    title="Remove from Archive"
                  >
                    <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                  </button>
                  {item.sentiment && <SentimentBadge sentiment={item.sentiment} article={item} />}
                </div>
                <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-[#c4ff00] text-black text-[8px] font-black uppercase tracking-widest rounded-md">
                     {item.category}
                   </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow text-left" onClick={() => setSelectedNews(item)}>
                <p className="text-white/30 text-[8px] md:text-[9px] font-bold mb-3 tracking-widest">{getTimeAgo(item.publishedAt)}</p>
                <h4 className="text-sm md:text-base font-black text-white group-hover:text-[#c4ff00] transition-colors leading-tight line-clamp-2 mb-4 cursor-pointer">
                  {item.title}
                </h4>
                <div className="mt-auto flex items-center justify-between text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c4ff00]" />
                    Verified
                  </span>
                  <div className="flex items-center gap-2 text-[#c4ff00] group-hover:gap-4 transition-all group-hover:translate-x-1 cursor-pointer">
                    Scan <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border border-white/5 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl focus-visible:outline-none">
          {selectedNews && (
            <div className="flex flex-col max-h-[90vh] overflow-hidden">
               <div className="relative h-[350px] md:h-[450px] shrink-0">
                  <img src={selectedNews.urlToImage || getFallbackImage(selectedNews.category || 'Market')} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <DialogClose className="absolute top-8 right-8 p-3 rounded-full bg-black/40 hover:bg-[#c4ff00] hover:text-black text-white backdrop-blur-xl outline-none transition-all group border border-white/10 z-50">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </DialogClose>
                  <div className="absolute bottom-10 left-10 right-10 text-left">
                    <div className="flex items-center flex-wrap gap-4 mb-6">
                      <span className="px-4 py-1.5 bg-[#c4ff00] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg">
                        {selectedNews.category || 'ARCHIVED'}
                      </span>
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{getTimeAgo(selectedNews.publishedAt)}</span>
                      {selectedNews.sentiment && <SentimentBadge sentiment={selectedNews.sentiment} article={selectedNews} />}
                      <button 
                        onClick={() => toggleBookmark(selectedNews)}
                        className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#c4ff00] hover:text-black transition-colors"
                      >
                        {isBookmarked(selectedNews.id) ? <><BookmarkCheck className="w-3.5 h-3.5" /> Saved</> : <><Bookmark className="w-3.5 h-3.5" /> Archive Intelligence</>}
                      </button>
                    </div>
                    <DialogHeader>
                      <DialogTitle className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.1] max-w-3xl text-left border-none p-0">
                        {selectedNews.title}
                      </DialogTitle>
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-4">Source: {selectedNews.source?.name} • Author: {selectedNews.author || 'Nexus Analyst'}</p>
                    </DialogHeader>
                  </div>
               </div>
               <div className="p-8 md:p-14 overflow-y-auto text-left">
                  <div className="p-0 text-left">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-1.5 h-12 bg-[#c4ff00] rounded-full" />
                       <p className="text-lg md:text-2xl font-bold text-white leading-relaxed">
                        {selectedNews.description}
                      </p>
                    </div>
                    
                    <div className="space-y-8 text-white/40 text-lg leading-relaxed font-medium">
                      <p>{cleanContent(selectedNews.content) || "Full intelligence report available within primary secure node. Advanced validation confirms high probability match for current market vectors."}</p>
                      <p>Market participants are advised to monitor the relevant assets during the current trading session. Nexus data engines are processing additional data points to provide 99.9% accurate projections.</p>
                    </div>
                  </div>
                  <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-6">
                          <div className="bg-[#c4ff00]/10 p-4 rounded-xl border border-[#c4ff00]/20">
                            <Zap className="w-6 h-6 text-[#c4ff00]" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Vector Status</span>
                            <span className="text-lg font-black text-white uppercase">Verified Archive</span>
                          </div>
                      </div>
                      <Button onClick={() => setSelectedNews(null)} className="h-16 px-12 bg-white text-black font-black uppercase tracking-widest rounded-2xl w-full md:w-auto hover:bg-[#c4ff00] transition-all shadow-xl">
                        Close Intelligence
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
