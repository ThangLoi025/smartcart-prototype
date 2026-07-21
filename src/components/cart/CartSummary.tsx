'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import { MAX_CART_WEIGHT_LBS } from '@/lib/constants';
import { CreditCard } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function CartSummary() {
  const { session } = useCartStore();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(session.totalAmount);

  const weightPercentage = Math.min((session.totalWeight / MAX_CART_WEIGHT_LBS) * 100, 100);
  const isNearLimit = session.totalWeight > MAX_CART_WEIGHT_LBS * 0.9;

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

        <Button 
          className="w-full text-lg transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5"
          size="lg"
          disabled={session.items.length === 0}
          onClick={() => setIsCheckoutModalOpen(true)}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Thanh toán
        </Button>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        totalAmount={session.totalAmount}
      />
    </div>
  );
}
