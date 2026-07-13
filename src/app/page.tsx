'use client';

import dynamic from 'next/dynamic';
import { useUIStore } from '@/store/uiStore';
import { ViewState } from '@/lib/constants';
import WelcomeView from '@/components/views/WelcomeView';
import MemberDashboardView from '@/components/views/MemberDashboardView';
import MapView from '@/components/views/MapView';
import CartSidebar from '@/components/cart/CartSidebar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ScannerView = dynamic(() => import('@/components/views/ScannerView'), { ssr: false });

export default function Home() {
  const { activeView, isProcessing } = useUIStore();

  const renderLeftPanel = () => {
    switch (activeView) {
      case ViewState.WELCOME:
        return <WelcomeView />;
      case ViewState.MEMBER_DASHBOARD:
        return <MemberDashboardView />;
      case ViewState.SCANNER:
        return <ScannerView />;
      case ViewState.MAP:
        return <MapView />;
      default:
        return <WelcomeView />;
    }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* Left Panel: Dynamic Area */}
      <section className="flex-1 relative bg-white">
        {renderLeftPanel()}
        
        {/* Hardware processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <LoadingSpinner className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-xl font-medium tracking-wide animate-pulse text-slate-900">Đang xử lý phần cứng...</h2>
            <p className="text-slate-500 mt-2 text-sm">Vui lòng đợi trong khi cân ổn định</p>
          </div>
        )}
      </section>

      {/* Right Panel: Persistent Cart */}
      <section className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-l border-slate-200 shadow-2xl z-10 flex flex-col">
        <CartSidebar />
      </section>
    </main>
  );
}
