'use client';

import { useUIStore } from '@/store/uiStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { Map, ArrowLeft } from 'lucide-react';

export default function MapView() {
  const { setActiveView } = useUIStore();

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveView(ViewState.SCANNER)} className="text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại quét mã
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
        
        <div className="text-center z-10">
          <Map className="w-24 h-24 text-green-600/30 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Bản đồ dẫn đường</h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Sơ đồ cửa hàng và tuyến đường ngắn nhất sẽ được hiển thị ở đây.
          </p>
        </div>
      </div>
    </div>
  );
}
