'use client';

import { ShoppingCart, Search, Menu, User, Bell, Smartphone, ScanLine } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useState } from 'react';
import CartSelectionModal from './CartSelectionModal';

interface HeaderProps {
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ onCartClick, searchQuery, setSearchQuery }: HeaderProps) {
  const { session } = useCartStore();
  const { setScannerModalOpen } = useUIStore();
  const cartItemCount = session.items.length;
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            
            {/* Logo & Menu */}
            <div className="flex items-center flex-shrink-0">
              <button className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md md:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-green-600 text-white p-1.5 rounded-lg">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight hidden sm:block">Easy<span className="text-green-600">Buy</span></span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-4 lg:px-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 sm:text-sm transition-all duration-200"
                  placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <button 
                onClick={() => setIsSelectionModalOpen(true)}
                className="flex items-center gap-2 p-2 px-3 text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 rounded-full transition-colors hidden lg:flex"
              >
                <Smartphone className="h-5 w-5" />
                <span className="text-sm font-semibold">Chọn xe thông minh</span>
              </button>
              
              <button 
                onClick={() => setIsSelectionModalOpen(true)}
                className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-full lg:hidden"
                title="Chọn xe"
              >
                <Smartphone className="h-5 w-5" />
              </button>

              <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>

              <button className="flex items-center gap-2 p-2 text-slate-500 hover:bg-slate-100 rounded-full sm:rounded-lg sm:px-3">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium hidden md:block">Tài khoản</span>
              </button>

              <button 
                onClick={() => setScannerModalOpen(true)}
                className="p-2 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-full transition-colors"
                title="Quét mã vạch"
              >
                <ScanLine className="h-6 w-6" />
              </button>

              <button 
                onClick={onCartClick}
                className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartSelectionModal 
        isOpen={isSelectionModalOpen} 
        onClose={() => setIsSelectionModalOpen(false)} 
      />
    </>
  );
}
