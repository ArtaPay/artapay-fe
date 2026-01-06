"use client";

import { useState } from 'react';
import ClosedCamera from './ClosedCamera';
import OpenCamera from './OpenCamera';
import ImportFromGallery from './ImportFromGallery';
import TransactionPopup from './TransactionPopup';
import { currencies } from '@/components/Currency';

interface TransactionData {
  app: string;
  type: string;
  chainId: number;
  tokenAddress: string;
  receiver: string;
  amount: number;
  symbol: string;
}

interface QRCodeProps {
  onScanResult?: (result: string) => void;
}

export default function QRCode({ onScanResult }: QRCodeProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState<TransactionData | null>(null);

  const handleScanNow = () => {
    setIsCameraOpen(true);
  };

  const handleBack = () => {
    setIsCameraOpen(false);
  };

  const handleScan = (result: string) => {
    try {
      const data = JSON.parse(result) as TransactionData;
      setScannedData(data);
      setIsCameraOpen(false);
      onScanResult?.(result);
    } catch (e) {
      console.error("Invalid QR data:", e);
      alert("QR Code tidak valid");
    }
  };

  const handleSend = () => {
    console.log("Sending transaction:", scannedData);
    // TODO: Implement actual send logic
    alert("Transaction sent!");
    setScannedData(null);
  };

  const handleCancel = () => {
    setScannedData(null);
  };

  const handleImport = async (file: File) => {
    console.log("Imported file:", file.name);
    // TODO: Process QR from image
  };

  // Show transaction popup if data scanned
  if (scannedData) {
    return (
      <TransactionPopup
        data={scannedData}
        senderCurrency={currencies[0]} // Default to first currency
        onSend={handleSend}
        onCancel={handleCancel}
      />
    );
  }
  
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {isCameraOpen ? (
        <OpenCamera onScan={handleScan} onBack={handleBack} />
      ) : (
        <>
          <ClosedCamera onScanNow={handleScanNow} />
          <p className="text-accent">or</p>
          <ImportFromGallery onImport={handleImport} />
        </>
      )}
    </div>
  );
}
