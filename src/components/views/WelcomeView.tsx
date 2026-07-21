'use client';

import { useState, useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useAdminStore } from '@/store/adminStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { QrCode, UserCircle2, X } from 'lucide-react';

export default function WelcomeView() {
  const { setActiveView, isProcessing, setProcessing } = useUIStore();
  const { setSessionMode, setCurrentUser } = useCartStore();
  
  // Lấy chiến dịch đang chạy từ Admin Store
  const { campaigns, activeCampaignId } = useAdminStore();
  const [showBanner, setShowBanner] = useState(false);
  
  const activeCampaign = campaigns.find(c => c.id === activeCampaignId && c.status === 'ACTIVE');

  useEffect(() => {
    if (activeCampaign) {
      setShowBanner(true);
    }
  }, [activeCampaign]);

  const handleGuestLogin = () => {
    setSessionMode('GUEST');
    setActiveView(ViewState.SCANNER);
  };

  const handleAuthNavigation = () => {
    setActiveView(ViewState.AUTH);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-8 overflow-hidden">
      {/* Banner Quảng Cáo (Digital Signage) */}
      {showBanner && activeCampaign && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col">
          <div className="flex-1 relative">
            <img 
              src={activeCampaign.imageUrl} 
              alt={activeCampaign.name} 
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay to encourage tapping */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
               <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">{activeCampaign.name}</h1>
               <p className="text-xl text-white/90 mb-8 drop-shadow">Chạm vào màn hình để bắt đầu mua sắm cùng SmartCart</p>
               <Button 
                 variant="primary" 
                 size="lg" 
                 className="w-64 mx-auto bg-white text-slate-900 hover:bg-slate-100 shadow-xl"
                 onClick={() => setShowBanner(false)}
               >
                 Bắt đầu ngay
               </Button>
            </div>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Giao diện Đăng nhập / Chọn chế độ gốc */}
      <div className={`transition-all duration-700 ${showBanner && activeCampaign ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-4 tracking-tight">
            Chào mừng đến với SmartCart
          </h1>
          <p className="text-xl text-slate-600">Quét mã vạch, theo dõi tổng tiền, mua sắm tiện lợi.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
          <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all shadow-sm">
            <UserCircle2 className="w-16 h-16 text-slate-400 mb-6" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Khách không có tài khoản, guest mode</h2>
            <p className="text-slate-500 mb-8 text-center text-sm">Bắt đầu quét sản phẩm ngay. Không cần tài khoản.</p>
            <Button variant="secondary" size="lg" className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200" onClick={handleGuestLogin}>
              Bắt đầu mua sắm
            </Button>
          </div>

          <div className="flex flex-col items-center p-8 bg-green-50 rounded-3xl border border-green-200 hover:border-green-300 transition-all shadow-sm hover:shadow-lg">
            <QrCode className="w-16 h-16 text-green-600 mb-6" />
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Thành viên SmartCart</h2>
            <p className="text-green-800/70 mb-8 text-center text-sm">Đăng nhập hoặc tạo tài khoản để tích điểm và dùng voucher.</p>
            <Button variant="primary" size="lg" className="w-full shadow-md bg-green-600 hover:bg-green-700 text-white" onClick={handleAuthNavigation} disabled={isProcessing}>
              Đăng Nhập / Đăng Ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
