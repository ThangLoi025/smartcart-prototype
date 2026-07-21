'use client';

import { ShoppingCart, Search, Filter, MoreVertical, CreditCard, User } from 'lucide-react';
import { useState } from 'react';

// Mock data for active carts
const mockCarts = [
  {
    id: 'SESSION-001',
    deviceId: 'CART-001',
    status: 'LOGGED_IN',
    customer: 'Nguyễn Văn A',
    itemsCount: 12,
    totalAmount: 1250000,
    startTime: Date.now() - 45 * 60 * 1000,
  },
  {
    id: 'SESSION-002',
    deviceId: 'CART-002',
    status: 'GUEST',
    customer: 'Khách vãng lai',
    itemsCount: 3,
    totalAmount: 150000,
    startTime: Date.now() - 15 * 60 * 1000,
  },
  {
    id: 'SESSION-003',
    deviceId: 'CART-005',
    status: 'LOGGED_IN',
    customer: 'Trần Thị B',
    itemsCount: 25,
    totalAmount: 3450000,
    startTime: Date.now() - 120 * 60 * 1000,
  },
];

export default function AdminCartsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes > 60) {
      return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const filteredCarts = mockCarts.filter(cart => 
    cart.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cart.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý giỏ hàng</h1>
          <p className="text-sm text-slate-500 mt-1">Theo dõi các phiên mua sắm đang diễn ra</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Giỏ hàng đang hoạt động</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{mockCarts.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Thành viên (Logged In)</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {mockCarts.filter(c => c.status === 'LOGGED_IN').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <User className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Doanh thu tạm tính</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {formatCurrency(mockCarts.reduce((sum, cart) => sum + cart.totalAmount, 0))}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-800">Danh sách phiên mua sắm</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm mã phiên, KH, thiết bị..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Lọc</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Mã phiên / Thiết bị</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCarts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy giỏ hàng nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredCarts.map((cart) => (
                  <tr key={cart.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{cart.id}</div>
                      <div className="text-xs text-slate-500 mt-1">{cart.deviceId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {cart.status === 'LOGGED_IN' ? (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {cart.customer.charAt(0)}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium">{cart.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium text-slate-700">
                        {cart.itemsCount} món
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatCurrency(cart.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      {formatTime(cart.startTime)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        cart.status === 'LOGGED_IN' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {cart.status === 'LOGGED_IN' ? 'Thành viên' : 'Khách'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
