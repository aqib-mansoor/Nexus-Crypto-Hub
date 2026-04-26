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
    <Card className="bg-black p-3 md:p-4 rounded-[2rem] shadow-2xl relative overflow-hidden border border-white/5 h-full">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#c4ff00]/5 pointer-events-none" />

      <CardHeader className="p-4 md:p-6 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#c4ff00] p-1.5 md:p-2 rounded-xl shrink-0 shadow-[0_0_15px_rgba(196,255,0,0.2)]">
              <RefreshCcw className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Nexus Bridge</CardTitle>
              <p className="text-[7px] md:text-[8px] font-black text-[#c4ff00] uppercase tracking-[0.3em] leading-none">Institutional Swap</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-lg">
             <button 
               onClick={() => setTargetType('fiat')}
               className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${targetType === 'fiat' ? 'bg-[#c4ff00] text-black' : 'text-white/40 hover:text-white'}`}
             >Fiat</button>
             <button 
               onClick={() => setTargetType('crypto')}
               className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${targetType === 'crypto' ? 'bg-[#c4ff00] text-black' : 'text-white/40 hover:text-white'}`}
             >Crypto</button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_50px_1fr] gap-3 md:gap-4 items-end">
          <div className="space-y-2">
            <label className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Source</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-10 md:h-12 bg-white/5 border-none rounded-xl text-lg font-black text-white focus-visible:ring-2 focus-visible:ring-[#c4ff00] flex-grow"
              />
              <Select value={selectedCryptoId} onValueChange={setSelectedCryptoId}>
                <SelectTrigger className="w-[80px] h-10 md:h-12 bg-white/5 border-none rounded-xl text-white font-black uppercase tracking-widest text-xs shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  {coins?.slice(0, 50).map((c: any) => (
                    <SelectItem key={c.id} value={c.id} className="font-bold">
                      <div className="flex items-center gap-2">
                        <img 
                          src={c.image} 
                          referrerPolicy="no-referrer"
                          className="w-4 h-4 rounded-full" 
                          alt="" 
                        />
                        <span className="text-xs">{c.symbol.toUpperCase()}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pb-1">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#c4ff00] flex items-center justify-center text-black shadow-lg">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Target</label>
            <div className="flex gap-2">
              <div className="flex-grow h-10 md:h-12 bg-white/10 rounded-xl flex items-center px-4 text-base md:text-lg font-black text-white border border-white/5 overflow-hidden">
                <span className="truncate">{result.toLocaleString(undefined, { maximumFractionDigits: targetType === 'crypto' ? 6 : 2 })}</span>
              </div>
              <Select value={selectedFiat} onValueChange={(val) => setSelectedFiat(val)}>
                <SelectTrigger className="w-[80px] h-10 md:h-12 bg-white/5 border-none rounded-xl text-white font-black uppercase tracking-widest text-xs shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  {targetType === 'fiat' ? Object.entries(fiatSymbols).map(([code, symbol]) => (
                    <SelectItem key={code} value={code} className="font-bold">
                      <div className="flex items-center gap-2">
                         <span className="text-[#c4ff00] font-black text-xs">{symbol}</span>
                         <span className="text-xs">{code}</span>
                      </div>
                    </SelectItem>
                  )) : coins?.slice(0, 20).map((c: any) => (
                    <SelectItem key={c.id} value={c.symbol.toUpperCase()} className="font-bold">
                      <div className="flex items-center gap-2">
                        <img 
                          src={c.image} 
                          referrerPolicy="no-referrer"
                          className="w-4 h-4 rounded-full" 
                          alt="" 
                        />
                        <span className="text-xs">{c.symbol.toUpperCase()}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img 
                src={crypto?.image} 
                referrerPolicy="no-referrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg" 
                alt="" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-white/20 font-black text-[7px] uppercase tracking-widest leading-none mb-1">Bridge Rate</p>
              <p className="text-sm md:text-base font-black text-white tracking-tighter truncate leading-none">
                1 {crypto?.symbol.toUpperCase()} ≈ <span className="text-[#c4ff00]">
                  {targetType === 'crypto' 
                    ? (crypto?.current_price / (targetCrypto?.current_price || 1)).toFixed(4)
                    : ((crypto?.current_price || 0) * (selectedFiat === 'USD' ? 1 : fiatRate)).toLocaleString()
                  } {selectedFiat}
                </span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-white/20 font-black text-[7px] uppercase tracking-widest leading-none mb-1">Fees</p>
            <p className="text-[10px] font-black text-emerald-500 uppercase leading-none">0.0% NX-FEE</p>
          </div>
        </div>
        <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-6">Exchange powered by Nexus Core engine</p>
      </CardContent>
    </Card>
  );
};
