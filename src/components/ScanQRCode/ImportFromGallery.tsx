"use client";

import { useRef } from 'react';
import Image from 'next/image';
import ImportIcon from '@/assets/Import_From_Gallery.svg';

interface ImportFromGalleryProps {
  onImport: (file: File) => void;
}

export default function ImportFromGallery({ onImport }: ImportFromGalleryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };
  
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="flex items-center gap-3 px-6 py-3 border border-accent rounded-xl hover:bg-accent/10 transition-colors"
      >
        <Image src={ImportIcon} alt="Import" width={24} height={24} />
        <span className="text-white font-medium">Import from gallery</span>
      </button>
    </>
  );
}
