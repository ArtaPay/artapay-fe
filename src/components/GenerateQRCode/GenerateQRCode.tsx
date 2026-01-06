"use client";

import { useState } from 'react';
import ClosedQRCode from './ClosedQRCode';
import GeneratedQRCode from './GeneratedQRCode';
import { CurrencyDropdown, Currency, currencies } from '@/components/Currency';

interface QRData {
  app: string;
  type: string;
  chainId: number;
  tokenAddress: string;
  receiver: string;
  amount: number;
  symbol: string;
}

export default function GenerateQRCode() {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [amount, setAmount] = useState<number>(0);
  const [generatedData, setGeneratedData] = useState<QRData | null>(null);

  // TODO: Replace with actual wallet address
  const receiverAddress = "0xReceiverCobaCoba"; 
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const qrData: QRData = {
      app: "ArtaPay",
      type: "receive",
      chainId: currency.chainId,
      tokenAddress: currency.tokenAddress,
      receiver: receiverAddress,
      amount: amount,
      symbol: currency.symbol,
    };
    setGeneratedData(qrData);
  };

  const handleBack = () => {
    setGeneratedData(null);
  };

  if (generatedData) {
    return <GeneratedQRCode data={generatedData} onBack={handleBack} />;
  }
  
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <ClosedQRCode />
      <form onSubmit={handleGenerate} className="w-full max-w-sm space-y-6">
        {/* Receive As (Currency Dropdown) */}
        <div className="space-y-2">
          <label className="text-white font-medium">Receive as</label>
          <CurrencyDropdown value={currency} onChange={setCurrency} />
        </div>
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-white font-medium">Amount</label>
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="0"
            min="0"
            step="0.000001"
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        {/* Generate Button */}
        <button
          type="submit"
          className="w-full py-4 bg-primary text-black font-bold text-xl rounded-xl hover:bg-primary/90 transition-colors"
        >
          GENERATE QR
        </button>
      </form>
    </div>
  );
}
