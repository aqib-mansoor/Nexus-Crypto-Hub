import React, { useState, useEffect } from 'react';
import { useCryptoData, useCurrencyConverter } from '@/hooks/useNexusData';
import { RefreshCcw, DollarSign, ArrowRightLeft, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export const CurrencyConverter = () => {
  const { data: coins } = useCryptoData();
  const { data: rates } = useCurrencyConverter();

  const [amount, setAmount] = useState<number>(1);
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>('bitcoin');
  const [selectedFiat, setSelectedFiat] = useState<string>('PKR');
  const [targetType, setTargetType] = useState<'fiat' | 'crypto'>('fiat');

  const fiatSymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PKR: '₨',
    AED: 'د.إ',
  };

  const crypto = coins?.find((c: any) => c.id === selectedCryptoId);
  const targetCrypto = coins?.find((c: any) => c.symbol.toLowerCase() === selectedFiat.toLowerCase() || c.id === selectedFiat);
  
  const fiatRate = rates?.[selectedFiat] || (selectedFiat === 'PKR' ? 278.50 : 1); // Dynamic PKR fallback
  
  let result = 0;
  if (crypto) {
    if (targetType === 'crypto' && targetCrypto) {
      result = (amount * crypto.current_price) / targetCrypto.current_price;
    } else {
      result = (amount * crypto.current_price) * (selectedFiat === 'USD' ? 1 : fiatRate);
    }
  }

  return (
    <Card className="bg-black p-4 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#c4ff00]/5 pointer-events-none" />

      <CardHeader className="p-6 md:p-10 pb-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="bg-[#c4ff00] p-2 md:p-3 rounded-2xl shrink-0 shadow-[0_0_15px_rgba(196,255,0,0.2)]">
              <RefreshCcw className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Nexus Bridge</CardTitle>
              <p className="text-[9px] font-black text-[#c4ff00] uppercase tracking-[0.3em]">Institutional Swap Core</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl w-full sm:w-auto">
             <button 
               onClick={() => setTargetType('fiat')}
               className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetType === 'fiat' ? 'bg-[#c4ff00] text-black shadow-[0_0_10px_rgba(196,255,0,0.3)]' : 'text-white/40 hover:text-white'}`}
             >Fiat</button>
             <button 
               onClick={() => setTargetType('crypto')}
               className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetType === 'crypto' ? 'bg-[#c4ff00] text-black shadow-[0_0_10px_rgba(196,255,0,0.3)]' : 'text-white/40 hover:text-white'}`}
             >Crypto</button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-8 items-center md:items-end">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] ml-2">Source Asset</label>
            <div className="flex flex-col xs:flex-row gap-4">
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-16 bg-white/5 border-none rounded-2xl text-xl md:text-2xl font-black text-white focus-visible:ring-2 focus-visible:ring-[#c4ff00] flex-grow"
              />
              <Select value={selectedCryptoId} onValueChange={setSelectedCryptoId}>
                <SelectTrigger className="w-full xs:w-[140px] h-16 bg-white/5 border-none rounded-2xl text-white font-black uppercase tracking-widest text-lg shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  {coins?.slice(0, 50).map((c: any) => (
                    <SelectItem key={c.id} value={c.id} className="font-bold">
                      <div className="flex items-center gap-3">
                        <img 
                          src={c.image} 
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full" 
                          alt="" 
                        />
                        <span className="text-sm">{c.symbol.toUpperCase()}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center h-full items-end pb-0 md:pb-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#c4ff00] flex items-center justify-center text-black shadow-xl shadow-[#c4ff00]/20">
              <ArrowRightLeft className="w-6 h-6 md:w-8 md:h-8 rotate-90 md:rotate-0" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] ml-2">Target Asset</label>
            <div className="flex flex-col xs:flex-row gap-4">
              <div className="flex-grow h-16 bg-white/10 rounded-2xl flex items-center px-6 text-xl md:text-2xl font-black text-white border-2 border-white/5 overflow-hidden">
                <span className="truncate">{result.toLocaleString(undefined, { maximumFractionDigits: targetType === 'crypto' ? 6 : 2 })}</span>
              </div>
              <Select value={selectedFiat} onValueChange={(val) => setSelectedFiat(val)}>
                <SelectTrigger className="w-full xs:w-[140px] h-16 bg-white/5 border-none rounded-2xl text-white font-black uppercase tracking-widest text-lg shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  {targetType === 'fiat' ? Object.entries(fiatSymbols).map(([code, symbol]) => (
                    <SelectItem key={code} value={code} className="font-bold">
                      <div className="flex items-center gap-2">
                         <span className="text-[#c4ff00] font-black">{symbol}</span>
                         <span>{code}</span>
                      </div>
                    </SelectItem>
                  )) : coins?.slice(0, 20).map((c: any) => (
                    <SelectItem key={c.id} value={c.symbol.toUpperCase()} className="font-bold">
                      <div className="flex items-center gap-3">
                        <img 
                          src={c.image} 
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full" 
                          alt="" 
                        />
                        <span>{c.symbol.toUpperCase()}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto overflow-hidden">
            <div className="relative shrink-0">
              <img 
                src={crypto?.image} 
                referrerPolicy="no-referrer"
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl" 
                alt="" 
              />
              {targetType === 'crypto' && <img src={targetCrypto?.image} referrerPolicy="no-referrer" className="w-6 h-6 md:w-8 md:h-8 rounded-lg absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 border-2 border-[#161311]" alt="" />}
            </div>
            <div className="min-w-0 flex-1 md:flex-none">
              <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-1">Bridge Rate</p>
              <p className="text-lg md:text-2xl font-black text-white tracking-tighter truncate">
                1 {crypto?.symbol.toUpperCase()} ≈ <span className="text-[#c4ff00]">
                  {targetType === 'crypto' 
                    ? (crypto?.current_price / (targetCrypto?.current_price || 1)).toFixed(4)
                    : ((crypto?.current_price || 0) * (selectedFiat === 'USD' ? 1 : fiatRate)).toLocaleString()
                  } {selectedFiat}
                </span>
              </p>
            </div>

            {/* Injected Sparkline */}
            <div className="hidden sm:block h-10 w-24 ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={crypto?.sparkline_in_7d?.price.map((p: number, i: number) => ({ p, i })) || []}>
                   <Line 
                     type="monotone" 
                     dataKey="p" 
                     stroke={crypto?.price_change_percentage_24h >= 0 ? '#22c55e' : '#ef4444'} 
                     strokeWidth={2} 
                     dot={false} 
                   />
                   <YAxis hide domain={['dataMin', 'dataMax']} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-1">Status</p>
              <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Nexus Verified</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-1">Network Fee</p>
              <p className="text-sm font-black text-emerald-500 uppercase">ZERO COMMISION</p>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Exchange powered by Nexus Core engine</p>
      </CardContent>
    </Card>
  );
};
