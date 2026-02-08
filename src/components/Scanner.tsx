import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess, onScanError }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        await scannerRef.current?.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          onScanSuccess,
          (err) => { if (onScanError) onScanError(err); }
        );
      } catch (err) {
        console.error("Camera start error:", err);
      }
    };

    startScanner();

    return () => {
      // Clean up logic to prevent memory leaks or camera staying "on"
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop()
          .then(() => scannerRef.current?.clear())
          .catch(err => console.error("Failed to stop scanner on cleanup", err));
      }
    };
  }, [onScanSuccess, onScanError]);

  // Handle image selection from folder
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      
      try {
        const decodedText = await scannerRef.current?.scanFile(imageFile, true);
        if (decodedText) {
          onScanSuccess(decodedText);
        }
      } catch (err) {
        console.error("QR Scan Error:", err);
        alert("No valid QR code detected in this file. Try a clearer image.");
      }
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-black aspect-square flex items-center justify-center">

      <div id="reader" className="w-full h-full"></div>

      <div className="absolute bottom-6 left-0 right-0 px-6 z-30">
        <label className="flex items-center justify-center gap-2 w-full py-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl cursor-pointer hover:bg-red-600/20 hover:border-red-500/50 transition-all text-xs font-black uppercase tracking-widest text-white shadow-2xl">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          <span>Select Document</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </label>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 z-10" />
    </div>
  );
};

export default Scanner;