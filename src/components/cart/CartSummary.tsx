'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { MAX_CART_WEIGHT_LBS } from '@/lib/constants';
import { CreditCard, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function CartSummary() {
  const { session, clearSession } = useCartStore();
  const { setActiveView } = useUIStore();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<'success' | 'error' | null>(null);

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(session.totalAmount);

  const weightPercentage = Math.min((session.totalWeight / MAX_CART_WEIGHT_LBS) * 100, 100);
  const isNearLimit = session.totalWeight > MAX_CART_WEIGHT_LBS * 0.9;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutResult(null);

    // Simulate network and payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate outcome: 50% chance of success for testing both cases
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      setCheckoutResult('success');
      // Wait 3 seconds to show success state before clearing and redirecting
      setTimeout(() => {
        setCheckoutResult(null);
        setIsCheckingOut(false);
        clearSession();
        setActiveView(ViewState.WELCOME);
      }, 3000);
    } else {
      setCheckoutResult('error');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Weight Indicator */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Trọng lượng giỏ hàng</span>
          <span className={isNearLimit ? 'text-amber-600 font-medium' : ''}>
            {session.totalWeight.toFixed(1)} / {MAX_CART_WEIGHT_LBS.toFixed(1)} lbs
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isNearLimit ? 'bg-amber-500' : 'bg-green-600'}`}
            style={{ width: `${weightPercentage}%` }}
          />
        </div>
      </div>

      {/* Subtotals */}
      <div className="space-y-2 py-2 border-t border-slate-200">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Sản phẩm ({session.items.length})</span>
          <span>{formattedTotal}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Thuế (dự kiến)</span>
          <span>0 ₫</span>
        </div>
      </div>

      {/* Total & Checkout */}
      <div className="pt-2">
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm font-medium text-slate-500">Tổng cộng</span>
          <span className="text-2xl font-bold text-slate-900">{formattedTotal}</span>
        </div>

        {checkoutResult === 'error' && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
            <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-rose-700">Thanh toán thất bại</p>
              <p className="text-rose-600">Thẻ của bạn bị từ chối hoặc có lỗi mạng. Vui lòng thử lại.</p>
            </div>
          </div>
        )}

        {checkoutResult === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-green-700">Thanh toán thành công!</p>
              <p className="text-green-600">Cảm ơn bạn đã mua sắm. Đang quay lại trang chủ...</p>
            </div>
          </div>
        )}
        
        <Button 
          className={`w-full text-lg transition-all ${
            checkoutResult === 'success' 
              ? 'bg-green-700 pointer-events-none' 
              : 'shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5'
          }`}
          size="lg"
          disabled={session.items.length === 0 || isCheckingOut || checkoutResult === 'success'}
          onClick={handleCheckout}
        >
          {isCheckingOut ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : checkoutResult === 'success' ? (
            <CheckCircle2 className="w-5 h-5 mr-2" />
          ) : (
            <CreditCard className="w-5 h-5 mr-2" />
          )}
          {isCheckingOut ? 'Đang xử lý...' : checkoutResult === 'success' ? 'Thành công' : 'Thanh toán'}
        </Button>
      </div>
    </div>
  );
}
