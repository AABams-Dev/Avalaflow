import { useState, useCallback } from 'react';

// TypeScript interface for the NFC scan result
interface NFCResult {
  serialNumber: string;
  message: string;
}

export const useNFC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<NFCResult | null>(null);

  const startScan = useCallback(async () => {
    // Check if the browser supports NFC
    if (!('NDEFReader' in window)) {
      setError("NFC is not supported on this browser/device.");
      return;
    }

    try {
      setIsScanning(true);
      setError(null);

      // @ts-ignore - NDEFReader is a modern browser API, TS might need a nudge
      const ndef = new window.NDEFReader();
      await ndef.scan();

      ndef.onreadingerror = () => {
        setError("Cannot read data from the NFC tag. Try another one.");
      };

      ndef.onreading = (event: any) => {
        const { serialNumber, message } = event;
        
        // Decode the message (NDEF records)
        const decoder = new TextDecoder();
        let decodedMessage = "";
        
        for (const record of message.records) {
          if (record.recordType === "text") {
            decodedMessage = decoder.decode(record.data);
          }
        }

        setScannedData({
          serialNumber,
          message: decodedMessage
        });
        setIsScanning(false);
      };

    } catch (err) {
      setError(`Scan failed: ${err}`);
      setIsScanning(false);
    }
  }, []);

  return { startScan, isScanning, error, scannedData };
};