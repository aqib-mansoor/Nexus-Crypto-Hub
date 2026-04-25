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
    <Card className="bg-black border border-white/5 shadow-2xl rounded-2xl md:rounded-[2.5rem] overflow-hidden" id="portfolio">
      <CardHeader className="bg-black p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border-b border-white/5">
        <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
          <div className="bg-[#c4ff00] p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0 shadow-[0_0_20px_rgba(196,255,0,0.3)]">
            <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">My Ledger</CardTitle>
            <p className="text-[10px] font-black text-[#c4ff00] uppercase tracking-[0.3em] mt-0.5 md:mt-1 drop-shadow-sm">Live Investment Tracker</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className={`w-full md:w-auto rounded-xl md:rounded-2xl font-black h-12 md:h-14 px-6 md:px-8 transition-all gap-2 text-xs md:text-sm ${isAdding ? 'bg-rose-500 hover:bg-rose-600' : 'bg-[#c4ff00] hover:bg-[#c4ff00]/90 text-black shadow-[0_0_15px_rgba(196,255,0,0.2)]'}`}
        >
          {isAdding ? <><X className="w-4 h-4 md:w-5 md:h-5 text-white" /> Cancel</> : <><PlusCircle className="w-4 h-4 md:w-5 md:h-5" /> New Asset</>}
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-white/[0.02]">
          <StatBox label="Ledger Value" value={totalValue} isCurrency isHighlight={false} percentage={0} />
          <StatBox 
            label="Net Position" 
            value={totalProfit} 
            isCurrency 
            percentage={profitPercentage} 
            isHighlight 
          />
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 md:mb-4">Portfolio Diversity</p>
            <div className="h-2 md:h-3 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: portfolio.length > 0 ? "100%" : "0%" }}
                className="h-full bg-[#c4ff00] shadow-[0_0_10px_#c4ff00]"
              />
            </div>
            <p className="text-[10px] font-black text-white mt-2">{portfolio.length} Assets Tracked</p>
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
  <div className={`p-6 md:p-10 flex flex-col justify-center ${isHighlight ? 'bg-[#c4ff00]/5' : ''}`}>
    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{label}</p>
    <div className="flex items-baseline gap-2 md:gap-3">
      <span className={`text-3xl md:text-5xl font-black ${isHighlight ? (value >= 0 ? 'text-[#c4ff00]' : 'text-rose-500') : 'text-white'} tracking-tighter`}>
        {isCurrency && (value >= 0 ? '$' : '-$')}
        {Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </span>
      {isHighlight && (
        <span className={`text-[10px] md:text-sm font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg ${value >= 0 ? 'bg-[#c4ff00]/10 text-[#c4ff00]' : 'bg-rose-500/10 text-rose-500'}`}>
          {value >= 0 ? '+' : ''}{percentage.toFixed(1)}%
        </span>
      )}
    </div>
  </div>
);
