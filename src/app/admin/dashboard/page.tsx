'use client';

import { useAdminStore } from '@/store/adminStore';
import { ShoppingCart, BatteryCharging, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { devices, alerts, dismissAlert } = useAdminStore();

  const activeCount = devices.filter(d => d.status === 'ACTIVE').length;
  const freeCount = devices.filter(d => d.status === 'FREE').length;
  const chargingCount = devices.filter(d => d.status === 'CHARGING').length;
  const errorCount = devices.filter(d => d.status === 'ERROR').length;

  const chartData = {
    labels: ['Đang hoạt động', 'Rảnh', 'Đang sạc', 'Lỗi'],
    datasets: [
      {
        data: [activeCount, freeCount, chargingCount, errorCount],
        backgroundColor: [
          '#3b82f6', // blue
          '#10b981', // emerald
          '#f59e0b', // amber
          '#ef4444', // red
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Xe đang hoạt động</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{activeCount}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Xe rảnh</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{freeCount}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Xe đang sạc</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{chargingCount}</p>
          </div>
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <BatteryCharging className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-500">Xe gặp lỗi</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{errorCount}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Cảnh báo hệ thống
          </h3>
          
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-slate-500 text-sm italic">Không có cảnh báo nào.</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="flex items-start p-4 rounded-xl border border-red-100 bg-red-50">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-red-700 mr-2">{alert.cartId}</span>
                      <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-md font-medium">
                        {alert.type === 'OFFLINE' ? 'Mất kết nối' : 'Pin yếu'}
                      </span>
                    </div>
                    <p className="text-red-800/80 text-sm mt-1">{alert.message}</p>
                    <p className="text-red-600 text-xs mt-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => dismissAlert(alert.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Đã xử lý
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Tỉ lệ trạng thái</h3>
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
             <Doughnut 
               data={chartData} 
               options={{
                 cutout: '75%',
                 plugins: { legend: { position: 'bottom' } }
               }} 
             />
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-4xl font-bold text-slate-800">{devices.length}</span>
                <span className="text-xs text-slate-500 uppercase font-semibold">Tổng xe</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
