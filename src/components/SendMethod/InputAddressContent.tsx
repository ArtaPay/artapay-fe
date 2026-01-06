"use client";
import { useState, useCallback } from 'react';
import { CurrencyDropdown, Currency, currencies } from '@/components/Currency';

interface SendFormData {
  currency: Currency;
  address: string;
  amount: number;
}
interface InputAddressContentProps {
  onSend?: (data: SendFormData) => void;
}
export default function InputAddressContent({ onSend }: InputAddressContentProps) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      alert('Please enter an address');
      return;
    }
    
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setIsLoading(true);
    
    try {
      if (onSend) {
        await onSend({ currency, address, amount });
      } else {
        console.log('Sending:', { currency, address, amount });
      }
    } catch (error) {
      console.error('Send error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currency, address, amount, onSend]);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setAmount(value);
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Send As (Currency Dropdown) */}
        <div className="space-y-2">
          <label className="text-white font-medium">Send as</label>
          <CurrencyDropdown value={currency} onChange={setCurrency} />
        </div>
        {/* Address Input */}
        <div className="space-y-2">
          <label className="text-white font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-white font-medium">Amount</label>
          <input
            type="number"
            value={amount || ''}
            onChange={handleAmountChange}
            placeholder="0"
            min="0"
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-primary text-black font-bold text-xl rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'SENDING...' : 'SEND NOW'}
        </button>
      </form>
    </div>
  );
}
