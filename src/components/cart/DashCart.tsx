'use client';

import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { UserCircle2, Bell, Apple } from 'lucide-react';
import CartItem from './CartItem';
import { ViewState } from '@/lib/constants';

export default function DashCart() {
  const { session, clearSession } = useCartStore();
  const { setScannerModalOpen, setActiveView } = useUIStore();
  const { items, status } = session;

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(session.totalAmount);

  const handleDoneShopping = () => {
    clearSession();
    setActiveView(ViewState.WELCOME);
  };

  return (
    <div className="flex flex-col h-full bg-[#f6f8f8] relative border-r border-slate-300 shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-10 w-[55%] min-w-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#f6f8f8]">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <UserCircle2 className="w-6 h-6 text-slate-700" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'LOGGED_IN' && (
            <span className="bg-[#232f3e] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Thành viên VIP
            </span>
          )}
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 custom-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 mt-12">
            <p className="text-slate-600 text-lg">Giỏ hàng của bạn đang trống.</p>
            <p className="text-sm text-slate-500 text-center">Hãy quét một sản phẩm để bắt đầu.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {items.map((item, index) => (
              <CartItem key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Item Button */}
      <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none">
        <button 
          onClick={() => setScannerModalOpen(true)}
          className="pointer-events-auto bg-[#10b981] hover:bg-[#059669] text-white rounded-full pl-2 pr-6 py-2 flex items-center shadow-xl transform transition-transform hover:scale-105 active:scale-95"
        >
          <div className="bg-white rounded-full p-1 mr-3 relative shadow-inner">
            <Apple className="w-5 h-5 text-[#ef4444] fill-[#ef4444]" />
            <span className="absolute bottom-0 right-0 text-[8px] font-bold text-white bg-black px-1 rounded-sm leading-none">1234</span>
          </div>
          <span className="font-bold tracking-wide">Nhập mã sản phẩm</span>
        </button>
      </div>

      {/* Footer Summary */}
      <div className="bg-white p-6 border-t border-slate-300">
        <div className="flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={handleDoneShopping}>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Hoàn tất mua sắm?</h3>
            <p className="text-xs text-slate-500">Đi ra qua làn dành cho SmartCart</p>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Số lượng</p>
               <p className="font-bold text-xl text-slate-800">{items.length}</p>
             </div>
             <div className="text-right">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Tạm tính</p>
               <p className="font-bold text-2xl text-slate-900">{formattedTotal}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
