'use client';

import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { ViewState } from '@/lib/constants';
import { useScanner } from '@/hooks/useScanner';
import Button from '@/components/ui/Button';
import { Map, AlertCircle, Home } from 'lucide-react';
import { useEffect } from 'react';

export default function ScannerView() {
  const { setActiveView } = useUIStore();
  const { clearSession } = useCartStore();
  const { error, simulateScan } = useScanner();

  const handleEndSession = () => {
    clearSession();
    setActiveView(ViewState.WELCOME);
  };

  // Fix for html5-qrcode styles overriding our dark theme
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #reader { border: none !important; border-radius: 1rem; overflow: hidden; background: #ffffff; }
      #reader__scan_region { background: #ffffff; }
      #reader__dashboard_section_csr button { background-color: #16a34a !important; color: white !important; border: none !important; padding: 0.5rem 1rem !important; border-radius: 0.5rem !important; cursor: pointer; margin-top: 10px; }
      #reader a { color: #16a34a !important; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-6 z-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto flex gap-3">
          <Button variant="secondary" onClick={handleEndSession} className="backdrop-blur-md bg-white/80 text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-100">
            <Home className="w-5 h-5 mr-2 text-slate-500" />
            Trang chủ
          </Button>
          <Button variant="secondary" onClick={() => setActiveView(ViewState.MAP)} className="backdrop-blur-md bg-white/80 text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-100">
            <Map className="w-5 h-5 mr-2 text-green-600" />
            Bản đồ cửa hàng
          </Button>
        </div>
        
        {error && (
          <div className="pointer-events-auto animate-in slide-in-from-top-4 fade-in bg-rose-500/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 backdrop-blur-md max-w-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Camera Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md aspect-square relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200 bg-white">
          <div id="reader" className="w-full h-full"></div>
          
          {/* Overlay Reticle */}
          <div className="absolute inset-0 pointer-events-none border-4 border-green-500/20 rounded-3xl"></div>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-green-500 rounded-xl relative opacity-70">
              <div className="absolute w-4 h-4 border-t-4 border-l-4 border-green-600 top-[-2px] left-[-2px]"></div>
              <div className="absolute w-4 h-4 border-t-4 border-r-4 border-green-600 top-[-2px] right-[-2px]"></div>
              <div className="absolute w-4 h-4 border-b-4 border-l-4 border-green-600 bottom-[-2px] left-[-2px]"></div>
              <div className="absolute w-4 h-4 border-b-4 border-r-4 border-green-600 bottom-[-2px] right-[-2px]"></div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-slate-600 text-lg font-medium">Căn chỉnh mã vạch vào khung để thêm sản phẩm</p>

        {/* Debug / Simulation Panel */}
        <div className="mt-8 w-full max-w-md bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Bảng điều khiển mô phỏng</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={() => simulateScan('00000000001')}>
              + Chuối
            </Button>
            <Button variant="secondary" size="sm" onClick={() => simulateScan('00000000002')}>
              + Sữa
            </Button>
            <Button variant="secondary" size="sm" onClick={() => simulateScan('00000000003')}>
              + Bánh mì
            </Button>
            <Button variant="danger" size="sm" onClick={() => simulateScan('99999999999')}>
              + Sản phẩm quá nặng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
