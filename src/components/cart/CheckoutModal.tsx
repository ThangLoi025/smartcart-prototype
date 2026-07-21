'use client';

import { useState } from 'react';
import { X, QrCode, CreditCard, Banknote, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

type PaymentMethod = 'QR' | 'VISA' | 'CASH' | null;

export default function CheckoutModal({ isOpen, onClose, totalAmount }: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [agreedToCashCondition, setAgreedToCashCondition] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { clearSession } = useCartStore();
  const { setActiveView } = useUIStore();

  if (!isOpen) return null;

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalAmount);

  const handleCheckout = async () => {
    if (method === 'CASH' && !agreedToCashCondition) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    setIsProcessing(false);

    // After success, clear session and close
    setTimeout(() => {
      clearSession();
      setActiveView(ViewState.WELCOME);
      onClose();
      // Reset state for next time
      setTimeout(() => {
        setIsSuccess(false);
        setMethod(null);
        setAgreedToCashCondition(false);
      }, 500);
    }, 2000);
  };

  const isCheckoutDisabled = !method || (method === 'CASH' && !agreedToCashCondition) || isProcessing;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={isProcessing || isSuccess ? undefined : onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Thanh Toán</h2>
            <p className="text-sm text-slate-500 mt-1">Chọn phương thức thanh toán của bạn</p>
          </div>
          {(!isProcessing && !isSuccess) && (
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Thanh toán thành công!</h3>
              <p className="text-slate-500">Cảm ơn bạn đã mua sắm tại SmartCart.</p>
              <p className="text-sm text-slate-400 mt-4">Hóa đơn điện tử đã được gửi đến thiết bị của bạn.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-sm text-slate-500 mb-1">Tổng thanh toán</p>
                <p className="text-4xl font-bold text-green-600">{formattedTotal}</p>
              </div>

              <div className="space-y-3 mb-6">
                {/* Method: QR Code */}
                <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                  method === 'QR' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-200 hover:bg-slate-50'
                }`}>
                  <input type="radio" name="payment_method" className="sr-only" onChange={() => setMethod('QR')} checked={method === 'QR'} />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${method === 'QR' ? 'bg-green-200 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Quét mã QR</h4>
                    <p className="text-sm text-slate-500">Momo, ZaloPay, VNPay</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'QR' ? 'border-green-500' : 'border-slate-300'}`}>
                    {method === 'QR' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                  </div>
                </label>

                {/* Method: VISA */}
                <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                  method === 'VISA' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                }`}>
                  <input type="radio" name="payment_method" className="sr-only" onChange={() => setMethod('VISA')} checked={method === 'VISA'} />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${method === 'VISA' ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Thẻ Visa / Mastercard</h4>
                    <p className="text-sm text-slate-500">Quẹt thẻ trực tiếp trên máy POS</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'VISA' ? 'border-blue-500' : 'border-slate-300'}`}>
                    {method === 'VISA' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                  </div>
                </label>

                {/* Method: CASH */}
                <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                  method === 'CASH' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-200 hover:bg-slate-50'
                }`}>
                  <input type="radio" name="payment_method" className="sr-only" onChange={() => setMethod('CASH')} checked={method === 'CASH'} />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${method === 'CASH' ? 'bg-amber-200 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Tiền mặt</h4>
                    <p className="text-sm text-slate-500">Thanh toán tại quầy thu ngân</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'CASH' ? 'border-amber-500' : 'border-slate-300'}`}>
                    {method === 'CASH' && <div className="w-3 h-3 bg-amber-500 rounded-full" />}
                  </div>
                </label>
              </div>

              {/* Cash Condition Alert */}
              {method === 'CASH' && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-amber-800 mb-2">Điều kiện thanh toán tiền mặt</h5>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={agreedToCashCondition}
                          onChange={(e) => setAgreedToCashCondition(e.target.checked)}
                        />
                        <div className="w-5 h-5 border-2 border-amber-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-colors"></div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-amber-700 group-hover:text-amber-900 transition-colors leading-snug">
                        Tôi xác nhận rằng những món đồ đã lấy sẽ không được hoàn trả lại trừ khi xuất hóa đơn thanh toán.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full text-lg h-14"
                disabled={isCheckoutDisabled}
                onClick={handleCheckout}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Đang xử lý giao dịch...
                  </>
                ) : (
                  `Xác nhận thanh toán ${formattedTotal}`
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
