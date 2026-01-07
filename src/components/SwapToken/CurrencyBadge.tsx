"use client";

import Image from 'next/image';
import { Currency } from '@/components/Currency';

interface CurrencyBadgeProps {
  currency: Currency;
  onClick: () => void;
}

export default function CurrencyBadge({ currency, onClick }: CurrencyBadgeProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-full border border-zinc-700 hover:border-zinc-500 transition-colors"
    >
      <Image 
        src={currency.icon} 
        alt={currency.name} 
        width={24} 
        height={24}
        className="rounded-full"
      />
      <span className="text-white font-medium">{currency.symbol}</span>
    </button>
  );
}
