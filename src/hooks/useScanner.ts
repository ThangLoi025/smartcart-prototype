import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { hardwareMock } from '@/services/hardwareMock';

export function useScanner() {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const isScanningRef = useRef(false);
  
  const { addItem } = useCartStore();
  const { setProcessing } = useUIStore();

  const handleScan = useCallback(async (decodedText: string) => {
    // Prevent multiple parallel scans
    if (isScanningRef.current) return;
    
    try {
      isScanningRef.current = true;
      setError(null);
      setProcessing(true);

      // 1. Scanner delay mock
      await hardwareMock.simulateScannerDelay();

      // 2. Fetch product info from mock API
      const response = await fetch(`/api/products/${decodedText}`);
      if (!response.ok) {
        throw new Error('Product not found or invalid barcode.');
      }
      
      const product = await response.json();

      // 3. Hardware scale mock wait (verifying weight)
      await hardwareMock.simulateWeightScale(product.weight);

      // 4. Add to cart state
      addItem(product);

    } catch (err: any) {
      console.error('Scan Error:', err);
      setError(err.message || 'Failed to process item.');
    } finally {
      setProcessing(false);
      // Add a small cooldown before allowing next scan
      setTimeout(() => {
        isScanningRef.current = false;
      }, 2000);
    }
  }, [addItem, setProcessing]);

  useEffect(() => {
    // Only initialize if element exists and not already initialized
    if (!document.getElementById('reader') || scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    
    scannerRef.current = scanner;

    scanner.render(
      (text) => handleScan(text),
      (err) => { /* Ignore background scan errors */ }
    );

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear().catch(console.error);
        } catch (e) {
          console.error(e);
        }
        scannerRef.current = null;
      }
    };
  }, [handleScan]);

  return { error, simulateScan: handleScan };
}
