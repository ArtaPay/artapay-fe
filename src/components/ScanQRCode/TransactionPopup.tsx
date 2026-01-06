"use client";

import Image from 'next/image';

interface TransactionData {
  app: string;
  type: string;
  chainId: number;
  tokenAddress: string;
  receiver: string;
  amount: number;
  symbol: string;
}

interface TransactionPopupProps {
  data: TransactionData;
  senderCurrency: { symbol: string; icon: string };
  onSend: () => void;
  onCancel: () => void;
}

export default function TransactionPopup({ 
  data, 
  senderCurrency, 
  onSend, 
  onCancel 
}: TransactionPopupProps) {
  const shortenAddress = (addr: string) => {
    if (addr.length <= 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl p-6 border-2 border-primary">
        <h2 className="text-white text-xl font-bold text-center mb-6">
          Transaction Information
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-zinc-400">Transaction</span>
            <span className="text-white font-medium">Send Token</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Send to</span>
            <span className="text-white font-mono">{shortenAddress(data.receiver)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Sender's currency</span>
            <div className="flex items-center gap-2">
              <Image src={senderCurrency.icon} alt="" width={20} height={20} />
              <span className="text-white">{senderCurrency.symbol}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Receiver's currency</span>
            <div className="flex items-center gap-2">
              <span className="text-white">{data.symbol}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Total Amount</span>
            <span>
              <span className="text-primary font-bold">{data.amount}</span>
              <span className="text-white ml-1">{data.symbol}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={onSend}
            className="w-full py-4 bg-primary text-black font-bold text-xl rounded-xl hover:bg-primary/90 transition-colors"
          >
            SEND NOW
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 border-2 border-accent text-accent font-bold text-xl rounded-xl hover:bg-accent/10 transition-colors"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
