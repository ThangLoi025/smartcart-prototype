'use client';

import { X, ShoppingCart, AlertTriangle, Wrench } from 'lucide-react';
import { useState } from 'react';

interface CartSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for the carts based on user request
const MOCK_CARTS = [
  { id: 'CART-001', status: 'AVAILABLE', label: 'Khả dụng', battery: 90 },
  { id: 'CART-002', status: 'AVAILABLE', label: 'Khả dụng', battery: 85 },
  { id: 'CART-003', status: 'REPAIR', label: 'Đang chờ sửa chữa', battery: 10 },
  { id: 'CART-004', status: 'BROKEN', label: 'Đang hư', battery: 0 },
  { id: 'CART-005', status: 'AVAILABLE', label: 'Khả dụng', battery: 100 },
];

export default function CartSelectionModal({ isOpen, onClose }: CartSelectionModalProps) {
  const [selectedCart, setSelectedCart] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (cartId: string, status: string) => {
    if (status !== 'AVAILABLE') return; // Cannot select broken or repair carts
    setSelectedCart(cartId);
    setTimeout(() => {
      alert(`Đã kết nối thành công với ${cartId}`);
      onClose();
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <ShoppingCart className="w-6 h-6 text-green-500" />;
      case 'REPAIR':
        return <Wrench className="w-6 h-6 text-yellow-500" />;
      case 'BROKEN':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return <ShoppingCart className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'border-green-200 bg-green-50/30 hover:border-green-400 hover:shadow-md cursor-pointer';
      case 'REPAIR':
        return 'border-yellow-200 bg-yellow-50/30 opacity-70 cursor-not-allowed';
      case 'BROKEN':
        return 'border-red-200 bg-red-50/30 opacity-70 cursor-not-allowed';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Chọn Xe Đẩy Thông Minh</h2>
            <p className="text-sm text-slate-500 mt-1">Kết nối với xe đẩy để trải nghiệm mua sắm tự động</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50">
          <div className="space-y-4">
            {MOCK_CARTS.map((cart) => (
              <div 
                key={cart.id}
                onClick={() => handleSelect(cart.id, cart.status)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${getStatusColor(cart.status)} ${selectedCart === cart.id ? 'ring-2 ring-green-500 border-green-500 bg-green-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    {getStatusIcon(cart.status)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{cart.id}</h3>
                    <p className={`text-sm font-medium mt-0.5 flex items-center gap-1 ${
                      cart.status === 'AVAILABLE' ? 'text-green-600' : 
                      cart.status === 'REPAIR' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {cart.label}
                    </p>
                  </div>
                </div>
                
                {cart.status === 'AVAILABLE' && (
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">Pin</p>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${cart.battery}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{cart.battery}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
