'use client';

import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { ShoppingCart } from 'lucide-react';

export default function CartSidebar() {
  const { session } = useCartStore();
  const { items, status } = session;

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-green-600" />
          Giỏ hàng của tôi
        </h2>
        <div className="flex items-center gap-2">
          {status === 'LOGGED_IN' && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
              Thành viên
            </span>
          )}
          {status === 'GUEST' && (
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">
              Khách
            </span>
          )}
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
            <ShoppingCart className="w-16 h-16 opacity-20" />
            <p className="text-slate-600">Giỏ hàng của bạn đang trống.</p>
            <p className="text-sm text-slate-500 text-center px-4">Quét sản phẩm để bắt đầu mua sắm.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <CartItem key={`${item.id}-${index}`} item={item} />
          ))
        )}
      </div>

      {/* Footer Summary */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <CartSummary />
      </div>
    </div>
  );
}
