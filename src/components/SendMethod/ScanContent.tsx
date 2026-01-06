"use client";

import { QRCode } from '@/components/ScanQRCode';

export default function ScanContent() {
  const handleScanResult = (result: string) => {
    console.log("Scanned address:", result);
    // TODO: Handle the scanned result
  };
  return (
    <div>
      <QRCode onScanResult={handleScanResult} />
    </div>
  );
}
