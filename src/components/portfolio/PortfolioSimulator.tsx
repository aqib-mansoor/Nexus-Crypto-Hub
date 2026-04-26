import React, { useState } from 'react';
import { usePortfolio, useCryptoData } from '@/hooks/useNexusData';
import { Briefcase, PlusCircle, Trash2, TrendingUp, TrendingDown, Wallet, LayoutGrid, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';

export const PortfolioTracker = () => {
  const { portfolio, addAsset, removeAsset, totalValue, totalProfit, profitPercentage } = usePortfolio();
  const { data: coins } = useCryptoData();
  const [isAdding, setIsAdding] = useState(false);

  const [selectedCoinId, setSelectedCoinId] = useState('');
  const [amount, setAmount] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');

  const handleAdd = () => {
    const coin = coins?.find(c => c.id === selectedCoinId);
    if (!coin || !amount || !buyingPrice) {
      toast.error('Please fill all fields');
      return;
    }
    addAsset(coin, parseFloat(amount), parseFloat(buyingPrice));
    setIsAdding(false);
    setSelectedCoinId('');
    setAmount('');
    setBuyingPrice('');
    toast.success('Asset added to ledger');
  };

  const removeCoin = (idx: number) => {
    removeAsset(idx);
    toast.success('Asset removed');
  };

  return (
    <Card className="bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl md:rounded-[3rem] overflow-hidden" id="portfolio">
      <CardHeader className="bg-black p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#c4ff00]/[0.02] pointer-events-none" />
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto relative z-10">
          <div className="bg-[#c4ff00] p-2.5 md:p-3.5 rounded-xl md:rounded-[1.5rem] shrink-0 shadow-[0_0_30px_rgba(196,255,0,0.4)]">
            <Briefcase className="w-6 h-6 md:w-10 md:h-10 text-black" />
          </div>
          <div>
            <CardTitle className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-1 md:mb-2">My Ledger</CardTitle>
            <p className="text-[9px] md:text-xs font-black text-[#c4ff00] uppercase tracking-[0.4em] drop-shadow-sm opacity-80">Institutional Simulation Terminal</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className={`w-full md:w-auto rounded-xl md:rounded-2xl font-black h-12 md:h-16 px-8 md:px-10 transition-all gap-3 text-xs md:text-sm uppercase tracking-widest relative z-10 ${isAdding ? 'bg-zinc-800 text-white border border-white/10' : 'bg-[#c4ff00] hover:bg-white text-black shadow-lg shadow-[#c4ff00]/10'}`}
        >
          {isAdding ? <><X className="w-4 h-4 md:w-5 md:h-5" /> Cancel</> : <><PlusCircle className="w-4 h-4 md:w-5 md:h-5" /> Add Liquidity</>}
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5 bg-white/[0.01]">
          <StatBox label="Total Assets Controlled" value={totalValue} isCurrency isHighlight={false} percentage={0} />
          <StatBox 
            label="Net Unrealized P/L" 
            value={totalProfit} 
            isCurrency 
            percentage={profitPercentage} 
            isHighlight 
          />
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white/[0.02]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Network Allocation</p>
              <Badge className="bg-white/10 text-white/50 text-[8px] font-black uppercase tracking-widest border-none">
                {portfolio.length} Signals
              </Badge>
            </div>
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: portfolio.length > 0 ? "100%" : "0%" }}
                className="h-full bg-gradient-to-r from-[#c4ff00] to-emerald-400 shadow-[0_0_15px_rgba(196,255,0,0.5)]"
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Efficiency: Optimal</span>
              <span className="text-[9px] font-black text-[#c4ff00] uppercase tracking-widest">v4.2 Sync</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-6 md:p-10 bg-white dark:bg-zinc-900 border-b border-[#161311]/5 dark:border-white/5 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-end max-w-6xl mx-auto">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase ml-1">Pick Currency</label>
                  <Select value={selectedCoinId} onValueChange={setSelectedCoinId}>
                    <SelectTrigger className="h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl font-bold text-white">
                      <SelectValue placeholder="Select Asset" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10">
                      {coins?.slice(0, 50).map(c => (
                        <SelectItem key={c.id} value={c.id} className="font-bold text-white">{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase ml-1">Amount</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 md:h-14 bg-white/5 border-white/10 rounded-xl md:rounded-2xl font-bold text-white placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase ml-1">Buying Price ($)</label>
                  <Input 
                    type="number" 
                    placeholder="Current: ..." 
                    value={buyingPrice}
                    onChange={(e) => setBuyingPrice(e.target.value)}
                    className="h-12 md:h-14 bg-white/5 border-white/10 rounded-xl md:rounded-2xl font-bold text-white placeholder:text-white/20"
                  />
                </div>
                <Button 
                  onClick={handleAdd}
                  className="h-12 md:h-14 bg-[#c4ff00] text-black font-black rounded-xl md:rounded-2xl uppercase tracking-widest hover:bg-white shadow-[0_0_15px_rgba(196,255,0,0.2)] transition-all text-xs md:text-sm"
                >
                  Commit to Ledger
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto scrollbar-hide">
          {portfolio.length === 0 ? (
            <div className="p-20 md:p-32 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 md:mb-8">
                <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 text-[#c4ff00]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-2">Ledger Empty</h3>
              <p className="text-sm md:text-base text-white/40 font-medium max-w-xs px-4">Start building your virtual legacy by adding your first asset above.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="text-left px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest">Asset</th>
                  <th className="text-right px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest">Balance</th>
                  <th className="hidden md:table-cell text-right px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest">P/L Position</th>
                  <th className="text-center px-4 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {portfolio.map((item, idx) => {
                  const liveCoin = coins?.find(c => c.id === item.id);
                  const currentTotal = liveCoin ? item.amount * liveCoin.current_price : 0;
                  const investedTotal = item.amount * item.purchasePrice;
                  const itemProfit = currentTotal - investedTotal;
                  const itemProfitPercent = investedTotal > 0 ? (itemProfit / investedTotal) * 100 : 0;

                  return (
                    <motion.tr 
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-[#f5ede0]/20 dark:hover:bg-white/5 transition-colors h-20 md:h-28"
                    >
                      <td className="px-6 md:px-10 py-4 md:py-6">
                        <div className="flex items-center gap-3 md:gap-5">
                          <img 
                            src={liveCoin?.image} 
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white/5 p-0.5 md:p-1" 
                            alt=""
                          />
                          <div>
                            <p className="font-bold md:font-black text-white uppercase tracking-tight text-sm md:text-lg">{item.name}</p>
                            <p className="text-[9px] md:text-[10px] font-black text-[#c4ff00] tracking-widest uppercase">{item.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 md:px-10 py-4 md:py-6 text-right">
                        <p className="font-bold md:font-black text-white text-sm md:text-xl">{item.amount.toLocaleString()} {item.symbol.toUpperCase()}</p>
                        <p className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-widest">${currentTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      </td>
                      <td className={`hidden md:table-cell px-6 md:px-10 py-4 md:py-6 text-right ${itemProfit >= 0 ? 'text-[#c4ff00]' : 'text-rose-500'}`}>
                        <div className="flex items-center justify-end gap-2 font-black text-xl">
                          {itemProfit >= 0 ? '+' : '-'}${Math.abs(itemProfit).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          <Badge className={`border-none rounded-lg px-2 py-1 font-black text-[10px] ${itemProfit >= 0 ? 'bg-[#c4ff00]/20 text-[#c4ff00]' : 'bg-rose-500/20 text-rose-500'}`}>
                            {itemProfitPercent.toFixed(2)}%
                          </Badge>
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">ROI Analysis</p>
                      </td>
                      <td className="px-4 md:px-10 py-4 md:py-6 text-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeCoin(idx)} 
                          className="text-white/10 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg md:rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const StatBox = ({ label, value, isCurrency, percentage, isHighlight }: any) => (
  <div className={`p-8 md:p-12 flex flex-col justify-center transition-colors relative group ${isHighlight ? 'bg-[#c4ff00]/[0.02]' : ''}`}>
    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 group-hover:text-white/50 transition-colors">{label}</p>
    <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
      <span className={`text-4xl md:text-6xl font-black ${isHighlight ? (value >= 0 ? 'text-[#c4ff00]' : 'text-rose-500') : 'text-white'} tracking-tighter leading-none`}>
        {isCurrency && (value >= 0 ? '$' : '-$')}
        {Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </span>
      {isHighlight && (
        <span className={`text-[10px] md:text-sm font-black px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl shadow-lg border border-current/20 ${value >= 0 ? 'bg-[#c4ff00]/10 text-[#c4ff00]' : 'bg-rose-500/10 text-rose-500'}`}>
          {value >= 0 ? '+' : ''}{percentage.toFixed(1)}%
        </span>
      )}
    </div>
    
    {/* Subtle indicator decoration */}
    <div className={`absolute bottom-0 left-0 h-1 bg-current opacity-0 group-hover:opacity-100 transition-all ${isHighlight ? (value >= 0 ? 'text-[#c4ff00]' : 'text-rose-500') : 'text-white/20'}`} style={{ width: '20%' }} />
  </div>
);
