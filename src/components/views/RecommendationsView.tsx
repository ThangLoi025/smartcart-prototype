'use client';

import { useState } from 'react';
import { Circle, Tag, List, Percent, ChevronRight, MapPin, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const RECOMMENDATIONS = [
  { id: 1, name: "Sữa Tươi Vinamilk 100% Không Đường, Hộp 1L", category: "Sữa & Chế phẩm từ sữa", imgUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
  { id: 2, name: "Bánh Mì Sandwich Tươi Ngàn Lớp, Cỡ Lớn", category: "Bánh ngọt", imgUrl: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=150&h=150&fit=crop" },
  { id: 3, name: "Chuối Vàng Chiquita Bổ Dưỡng, Nải 1Kg", category: "Hoa quả tươi", imgUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop" },
];

const DEALS = [
  { id: 1, name: "Thịt Bò Úc Nhập Khẩu", discount: "Giảm 30%", imgUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=150&h=150&fit=crop" },
  { id: 2, name: "Combo 2 Chai Tương Ớt Chinsu", discount: "Mua 1 Tặng 1", imgUrl: "https://images.unsplash.com/photo-1585675549065-27a3c3065eb0?w=150&h=150&fit=crop" },
  { id: 3, name: "Gạo Thơm Lài ST25, Túi 5Kg", discount: "Giảm sốc cuối ngày", imgUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" }
];

const COUPONS = [
  { id: 1, title: "Giảm 50.000đ cho Đồ Gia Dụng", code: "HOME50K", exp: "Hết hạn: Hôm nay" },
  { id: 2, title: "Freeship Đơn từ 300K", code: "FREESHIP300", exp: "Hết hạn: 31/08/2026" },
  { id: 3, title: "Giảm 10% Trái Cây Tươi", code: "FRUITY10", exp: "Hết hạn: 15/08/2026" },
];

const MOCK_SEARCH_PRODUCTS = [
  { id: '101', name: 'Nước mắm Nam Ngư 500ml', price: 45000, category: 'Gia vị', imgUrl: 'https://images.unsplash.com/photo-1592663527359-cf6642f46d6b?w=150&h=150&fit=crop' },
  { id: '102', name: 'Mì Hảo Hảo Tôm Chua Cay (Thùng 30 gói)', price: 115000, category: 'Mì ăn liền', imgUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=150&h=150&fit=crop' },
  { id: '103', name: 'Dầu ăn Tường An 1 Lít', price: 55000, category: 'Gia vị', imgUrl: 'https://images.unsplash.com/photo-1474440692490-2e83ae1394bc?w=150&h=150&fit=crop' },
  { id: '104', name: 'Sữa chua Vinamilk có đường (Lốc 4 hộp)', price: 25000, category: 'Sữa & Chế phẩm', imgUrl: 'https://images.unsplash.com/photo-1517093771960-911a337c7689?w=150&h=150&fit=crop' },
  { id: '105', name: 'Bia Heineken Sleek 330ml (Lon)', price: 19000, category: 'Đồ uống', imgUrl: 'https://images.unsplash.com/photo-1580828369019-ea906c278a87?w=150&h=150&fit=crop' },
];

interface StorefrontProps {
  searchQuery: string;
}

export default function RecommendationsView({ searchQuery }: StorefrontProps) {
  const [activeTab, setActiveTab] = useState('search');
  const { addItem } = useCartStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    try {
      addItem({
        id: product.id,
        barcode: `MOCK-${product.id}`,
        name: product.name,
        price: product.price,
        weight: product.weight || 0.5,
        location_coords: []
      });
      // Optional: Show a toast notification here
    } catch (error: any) {
      alert(error.message);
    }
  };

  // If there's a search query, force show search results
  const currentTab = searchQuery ? 'search' : activeTab;

  const filteredProducts = MOCK_SEARCH_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (currentTab === 'search') {
        return (
          <div className="space-y-4">
            <div className="pt-2">
              {searchQuery ? (
                <p className="text-sm text-slate-500 mb-4">
                  Kết quả tìm kiếm cho <span className="font-semibold text-slate-800">"{searchQuery}"</span> ({filteredProducts.length})
                </p>
              ) : (
                <p className="text-sm text-slate-500 mb-4">Sản phẩm nổi bật</p>
              )}
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-500 font-medium">Không tìm thấy sản phẩm nào.</p>
                  <p className="text-sm text-slate-400 mt-1">Vui lòng thử từ khóa khác.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                        <img src={product.imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-xs text-slate-500 mb-1.5">{product.category}</p>
                        <h4 className="text-sm font-medium text-slate-800 leading-snug mb-3 flex-1 line-clamp-2 hover:text-green-600 cursor-pointer">{product.name}</h4>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-bold text-lg text-slate-900">{formatCurrency(product.price)}</span>
                          <button 
                            onClick={(e) => handleAddToCart(e, product)}
                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors border border-green-200 hover:border-green-600"
                            title="Thêm vào giỏ"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }

    switch(currentTab) {
      case 'recommended':
        return (
          <>
            <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-4 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors mb-6">
              <span className="font-medium text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600"/>Giao hàng đến: <span className="text-slate-800 font-semibold">Q. Bình Thạnh, TP.HCM</span></span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold text-slate-800 text-lg">Sản phẩm gợi ý</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECOMMENDATIONS.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                       <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">{item.category}</p>
                      <h4 className="text-sm font-medium text-slate-800 leading-snug group-hover:text-green-600 cursor-pointer line-clamp-2 mb-2">{item.name}</h4>
                      <div className="flex justify-between items-center">
                         <span className="font-bold text-slate-900">{formatCurrency(item.price || 50000)}</span>
                         <button 
                            onClick={(e) => handleAddToCart(e, { ...item, price: item.price || 50000 })}
                            className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg text-sm font-medium transition-colors"
                         >
                           Thêm
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'deals':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEALS.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-red-50/30 p-4 rounded-2xl border border-red-100 hover:bg-red-50/80 transition-colors group">
                <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 relative">
                  <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg">HOT</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-800 leading-snug mb-2 group-hover:text-red-600">{item.name}</h4>
                  <div className="flex items-center justify-between">
                     <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">{item.discount}</span>
                     <button className="text-red-600 bg-white border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">Mua ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'coupons':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {COUPONS.map((coupon) => (
              <div key={coupon.id} className="relative bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-green-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <Percent className="w-6 h-6" />
                  </div>
                  <span className="bg-green-100 text-green-700 font-mono text-xs px-2.5 py-1 rounded-md font-bold">{coupon.code}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 mb-1">{coupon.title}</h4>
                  <p className="text-xs text-slate-500">{coupon.exp}</p>
                </div>
                <button className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-colors">Lưu mã</button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Tab Navigation (Horizontal Scrollable) */}
      <div className="border-b border-slate-200 bg-white px-4 md:px-8">
        <div className="flex space-x-6 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('search')}
            className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${currentTab === 'search' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Tất cả sản phẩm
          </button>
          <button 
            onClick={() => setActiveTab('recommended')}
            className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${currentTab === 'recommended' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Khuyên dùng
          </button>
          <button 
            onClick={() => setActiveTab('deals')}
            className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${currentTab === 'deals' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Khuyến mãi
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${currentTab === 'coupons' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Mã giảm giá
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
