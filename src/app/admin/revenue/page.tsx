'use client';

import { useAdminStore } from '@/store/adminStore';
import { Download, AlertCircle, Clock, Search, TrendingUp, ShieldAlert } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminRevenue() {
  const { securityLogs } = useAdminStore();

  const chartData = {
    labels: ['Bò Kobe', 'Nước ngọt Coca', 'Gạo lứt', 'Sữa tươi Vinamilk', 'Rau muống', 'Thịt heo xay', 'Trứng gà', 'Bánh mì', 'Xúc xích', 'Táo nhập khẩu'],
    datasets: [
      {
        label: 'Số lượng mua qua xe đẩy',
        data: [120, 300, 150, 400, 250, 180, 220, 140, 280, 190],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Báo cáo & Rủi ro</h2>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Hôm nay</option>
            <option>Tuần này</option>
            <option>Tháng này</option>
          </select>
          <button className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Products Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Top 10 sản phẩm bán qua xe đẩy
          </h3>
          <div className="h-64">
            <Bar 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} 
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span>Thời gian trung bình hoàn thành 1 hóa đơn qua xe đẩy:</span>
            <span className="font-bold text-slate-800">12 phút 45 giây</span>
          </div>
        </div>

        {/* Heatmap Simulation */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-rose-500" />
            Biểu đồ nhiệt (Thời gian nán lại tại quầy)
          </h3>
          <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20">
             {/* Mock Heatmap dots */}
             <div className="absolute top-[20%] left-[30%] w-24 h-24 bg-red-500/40 rounded-full blur-xl"></div>
             <div className="absolute top-[25%] left-[32%] w-12 h-12 bg-red-600/60 rounded-full blur-md"></div>
             <div className="absolute top-[15%] left-[25%] text-xs font-bold text-slate-700 bg-white/50 px-1 rounded">Quầy Thịt/Cá</div>
             
             <div className="absolute top-[60%] left-[70%] w-32 h-32 bg-amber-500/30 rounded-full blur-xl"></div>
             <div className="absolute top-[65%] left-[75%] w-16 h-16 bg-amber-500/50 rounded-full blur-md"></div>
             <div className="absolute top-[55%] left-[65%] text-xs font-bold text-slate-700 bg-white/50 px-1 rounded">Quầy Sữa</div>

             <div className="absolute top-[80%] left-[20%] w-16 h-16 bg-blue-500/30 rounded-full blur-lg"></div>
             <div className="absolute top-[75%] left-[15%] text-xs font-bold text-slate-700 bg-white/50 px-1 rounded">Quầy Rau Củ</div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-slate-600" />
          Nhật ký An ninh & Lỗi trọng lượng (Immutable)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                <th className="py-3 px-4 font-medium">Thời gian</th>
                <th className="py-3 px-4 font-medium">Mã xe</th>
                <th className="py-3 px-4 font-medium">Loại sự kiện</th>
                <th className="py-3 px-4 font-medium">Chi tiết</th>
                <th className="py-3 px-4 font-medium">Nhân viên xác nhận</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {securityLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">{log.cartId}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                      {log.type === 'WEIGHT_OVERRIDE' ? 'BỎ QUA LỖI CÂN' : 'NGHI NGỜ TRỘM CẮP'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{log.message}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{log.operatorId}</td>
                </tr>
              ))}
              {securityLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Không có bản ghi nhật ký an ninh nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Needed to make MapPin work since we forgot to import it
function MapPin(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
