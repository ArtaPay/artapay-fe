"use client";

import Image from 'next/image';
import { Currency, currencies } from '@/components/Currency';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  excludeCurrency?: Currency; // Currency to exclude from list
}

export default function CurrencyModal({ 
  isOpen, 
  onClose, 
  onSelect,
  excludeCurrency 
}: CurrencyModalProps) {
  if (!isOpen) return null;
  const availableCurrencies = currencies.filter(c => c.id !== excludeCurrency?.id);
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-zinc-800 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-700">
          <h3 className="text-white font-bold text-center">Select Currency</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {availableCurrencies.map((currency) => (
            <button
              key={currency.id}
              onClick={() => {
                onSelect(currency);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-4 hover:bg-zinc-700 transition-colors"
            >
              <Image 
                src={currency.icon} 
                alt={currency.name} 
                width={40} 
                height={40}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-white font-medium">{currency.name}</p>
                <p className="text-zinc-400 text-sm">{currency.symbol}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
