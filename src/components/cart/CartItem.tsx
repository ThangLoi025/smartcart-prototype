'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Trash2 } from 'lucide-react';

interface Props {
  item: Product;
}

export default function CartItem({ item }: Props) {
  const { removeItem } = useCartStore();

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.price);

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-sm transition-all group">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 truncate">{item.name}</h3>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
          <span>{item.weight.toFixed(1)} lbs</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{item.barcode}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-4">
        <span className="text-green-600 font-semibold">{formattedPrice}</span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
          aria-label="Xóa sản phẩm"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
