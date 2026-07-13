'use client';

import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { UserCircle2, ArrowRight, Ticket, CheckCircle2, XCircle } from 'lucide-react';

export default function MemberDashboardView() {
  const { setActiveView } = useUIStore();
  const { currentUser } = useCartStore();

  if (!currentUser) {
    return null; // or a loading spinner
  }

  const handleStartShopping = () => {
    setActiveView(ViewState.SCANNER);
  };

  const formattedPoints = new Intl.NumberFormat('vi-VN').format(currentUser.points);

  return (
    <div className="flex flex-col h-full bg-slate-50 p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-50">
              <UserCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Xin chào, {currentUser.name}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>SĐT: {currentUser.phone}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Hạng {currentUser.membershipLevel}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 mb-1">Điểm tích lũy</p>
            <p className="text-3xl font-bold text-green-600">{formattedPoints}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg" className="shadow-md bg-green-600 hover:bg-green-700 text-white" onClick={handleStartShopping}>
            Bắt đầu mua sắm <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Vouchers Section */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-slate-400" />
            Voucher & Ưu đãi của bạn
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            {currentUser.vouchers.map((voucher) => {
              const isActive = voucher.status === 'ACTIVE';
              const formattedDiscount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.discountAmount);
              
              return (
                <div key={voucher.id} className={`p-6 rounded-2xl border ${isActive ? 'bg-white border-green-200 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-70'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-100 font-mono text-sm font-bold tracking-wider">
                      {voucher.code}
                    </div>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3" /> Đang áp dụng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                        <XCircle className="w-3 h-3" /> Hết hạn
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{voucher.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 h-10">{voucher.description}</p>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-slate-100/80">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Mức giảm</p>
                      <p className={`font-semibold ${isActive ? 'text-green-600' : 'text-slate-500'}`}>{formattedDiscount}</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      HSD: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
