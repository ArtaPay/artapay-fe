"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Currency, currencies } from './currencies';

interface CurrencyDropdownProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}
export default function CurrencyDropdown({ value, onChange }: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
            <Image src={value.icon} alt={value.name} width={40} height={40} className="object-cover" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">{value.name}</p>
            <p className="text-zinc-400 text-sm">{value.symbol}</p>
          </div>
        </div>
        <ChevronDown className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl max-h-64 overflow-y-auto">
          {currencies.map((currency) => (
            <button
              key={currency.id}
              type="button"
              onClick={() => { onChange(currency); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 p-4 hover:bg-zinc-700 transition-colors ${value.id === currency.id ? 'bg-zinc-700' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center overflow-hidden">
                <Image src={currency.icon} alt={currency.name} width={40} height={40} className="object-cover" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{currency.name}</p>
                <p className="text-zinc-400 text-sm">{currency.symbol}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
