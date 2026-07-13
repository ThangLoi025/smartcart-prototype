'use client';

import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { QrCode, UserCircle2 } from 'lucide-react';

export default function WelcomeView() {
  const { setActiveView, isProcessing, setProcessing } = useUIStore();
  const { setSessionMode, setCurrentUser } = useCartStore();

  const handleGuestLogin = () => {
    setSessionMode('GUEST');
    setActiveView(ViewState.SCANNER);
  };

  const handleMemberLogin = async () => {
    setProcessing(true);
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_123', mode: 'LOGGED_IN' })
      });
      const data = await res.json();
      if (data.user) {
        setSessionMode('LOGGED_IN', 'user_123');
        setCurrentUser(data.user);
        setActiveView(ViewState.MEMBER_DASHBOARD);
      }
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-4 tracking-tight">
          Chào mừng đến với SmartCart
        </h1>
        <p className="text-xl text-slate-600">Quét mã vạch, theo dõi tổng tiền, mua sắm tiện lợi.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
        <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all shadow-sm">
          <UserCircle2 className="w-16 h-16 text-slate-400 mb-6" />
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Mua sắm ẩn danh</h2>
          <p className="text-slate-500 mb-8 text-center text-sm">Bắt đầu quét sản phẩm ngay. Không cần tài khoản.</p>
          <Button variant="secondary" size="lg" className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200" onClick={handleGuestLogin}>
            Bắt đầu mua sắm
          </Button>
        </div>

        <div className="flex flex-col items-center p-8 bg-green-50 rounded-3xl border border-green-200 hover:border-green-300 transition-all shadow-sm hover:shadow-lg">
          <QrCode className="w-16 h-16 text-green-600 mb-6" />
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Đăng nhập thành viên</h2>
          <p className="text-green-800/70 mb-8 text-center text-sm">Quét mã QR trên ứng dụng để tích điểm và dùng voucher.</p>
          <Button variant="primary" size="lg" className="w-full shadow-md bg-green-600 hover:bg-green-700 text-white" onClick={handleMemberLogin} disabled={isProcessing}>
            {isProcessing ? 'Đang xử lý...' : 'Quét mã QR Ứng dụng'}
          </Button>
        </div>
      </div>
    </div>
  );
}
