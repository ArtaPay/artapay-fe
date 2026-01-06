"use client";

import { QRCodeSVG } from 'qrcode.react';

interface QRData {
  app: string;
  type: string;
  chainId: number;
  tokenAddress: string;
  receiver: string;
  amount: number;
  symbol: string;
}

interface GeneratedQRCodeProps {
  data: QRData;
  onBack: () => void;
}

export default function GeneratedQRCode({ data, onBack }: GeneratedQRCodeProps) {
  const qrValue = JSON.stringify(data);
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-6 bg-white rounded-2xl">
        <QRCodeSVG value={qrValue} size={200} />
      </div>
      <div className="text-center">
        <p className="text-white font-medium">Scan to receive</p>
        <p className="text-primary text-2xl font-bold">{data.amount} {data.symbol}</p>
      </div>
      <button
        onClick={onBack}
        className="w-full max-w-sm py-4 border-2 border-accent text-accent font-bold text-xl rounded-xl hover:bg-accent/10 transition-colors"
      >
        BACK
      </button>
    </div>
  );
}
