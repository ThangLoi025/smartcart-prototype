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
    <div className="flex items-start p-4 bg-white group hover:bg-slate-50 transition-colors">
      <div className="w-12 h-12 bg-slate-100 rounded mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs text-slate-400">Ảnh</div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug">{item.name}</h3>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
          <span>{formattedPrice} / cái</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>SL: 1</span>
        </div>
      </div>
      
      <div className="flex flex-col items-end justify-between h-full">
        <span className="text-sm font-bold text-slate-900">{formattedPrice}</span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-slate-300 hover:text-rose-500 transition-colors p-1 mt-2 opacity-0 group-hover:opacity-100"
          aria-label="Xóa sản phẩm"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
