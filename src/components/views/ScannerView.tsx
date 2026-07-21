'use client';

import { useUIStore } from '@/store/uiStore';
import { useScanner } from '@/hooks/useScanner';
import Button from '@/components/ui/Button';
import { AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export default function ScannerView() {
  const { isScannerModalOpen, setScannerModalOpen } = useUIStore();
  const { error, simulateScan } = useScanner();

  // Fix for html5-qrcode styles overriding our dark theme
  useEffect(() => {
    if (!isScannerModalOpen) return;
    
    const style = document.createElement('style');
    style.innerHTML = `
      #reader { border: none !important; border-radius: 1rem; overflow: hidden; background: #ffffff; }
      #reader__scan_region { background: #ffffff; }
      #reader__dashboard_section_csr button { background-color: #16a34a !important; color: white !important; border: none !important; padding: 0.5rem 1rem !important; border-radius: 0.5rem !important; cursor: pointer; margin-top: 10px; }
      #reader a { color: #16a34a !important; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [isScannerModalOpen]);

  if (!isScannerModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-50 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Nhập mã sản phẩm / Quét mã</h2>
          <button 
            onClick={() => setScannerModalOpen(false)}
            className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="m-4 animate-in slide-in-from-top-4 fade-in bg-rose-500 text-white px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Camera Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-inner ring-1 ring-slate-200 bg-white">
            <div id="reader" className="w-full h-full"></div>
            
            {/* Overlay Reticle */}
            <div className="absolute inset-0 pointer-events-none border-4 border-[#10b981]/20 rounded-2xl"></div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-[#10b981] rounded-xl relative opacity-70">
                <div className="absolute w-4 h-4 border-t-4 border-l-4 border-[#10b981] top-[-2px] left-[-2px]"></div>
                <div className="absolute w-4 h-4 border-t-4 border-r-4 border-[#10b981] top-[-2px] right-[-2px]"></div>
                <div className="absolute w-4 h-4 border-b-4 border-l-4 border-[#10b981] bottom-[-2px] left-[-2px]"></div>
                <div className="absolute w-4 h-4 border-b-4 border-r-4 border-[#10b981] bottom-[-2px] right-[-2px]"></div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-slate-600 text-sm font-medium text-center">Căn chỉnh mã vạch vào khung hình để thêm</p>

          {/* Debug / Simulation Panel */}
          <div className="mt-6 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Bảng giả lập</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" onClick={() => { simulateScan('00000000001'); setScannerModalOpen(false); }}>
                + Mì Ý Buitoni
              </Button>
              <Button variant="secondary" size="sm" onClick={() => { simulateScan('00000000002'); setScannerModalOpen(false); }}>
                + Phô mai Daiya
              </Button>
              <Button variant="secondary" size="sm" onClick={() => { simulateScan('00000000003'); setScannerModalOpen(false); }}>
                + Snack Ruffles
              </Button>
              <Button variant="danger" size="sm" onClick={() => simulateScan('99999999999')}>
                + Lỗi Quá Trọng Lượng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
