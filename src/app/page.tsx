'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/store/uiStore';
import { ViewState } from '@/lib/constants';
import WelcomeView from '@/components/views/WelcomeView';
import AuthView from '@/components/views/AuthView';
import MemberDashboardView from '@/components/views/MemberDashboardView';
import MapView from '@/components/views/MapView';
import RecommendationsView from '@/components/views/RecommendationsView';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/layout/Header';
import CartSidebar from '@/components/cart/CartSidebar';
import ScannerView from '@/components/views/ScannerView';
import { X } from 'lucide-react';

export default function Home() {
  const { activeView, isProcessing } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case ViewState.MAP:
        return <MapView />;
      case ViewState.MEMBER_DASHBOARD:
        return <MemberDashboardView />;
      default:
        // Default shopping view
        return <RecommendationsView searchQuery={searchQuery} />;
    }
  };

  // Nếu là màn hình Welcome (có thể bỏ hoặc giữ như màn hình landing page)
  if (activeView === ViewState.WELCOME) {
    return (
      <main className="h-screen w-screen bg-slate-50 relative">
        <WelcomeView />
      </main>
    );
  }

  if (activeView === ViewState.AUTH) {
    return (
      <main className="h-screen w-screen bg-slate-50 relative">
        <AuthView />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {renderContent()}
        
        {/* Hardware processing overlay (Keep for now if needed, or remove) */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <LoadingSpinner className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-xl font-medium tracking-wide animate-pulse text-slate-900">Đang xử lý...</h2>
          </div>
        )}
      </div>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <button 
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 -left-12 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 text-slate-500"
            >
              <X className="w-6 h-6" />
            </button>
            <CartSidebar />
          </div>
        </div>
      )}

      {/* Camera Scanner Modal */}
      <ScannerView />
    </main>
  );
}
