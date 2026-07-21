'use client';

import { useState } from 'react';
import { useAdminStore, SmartCartDevice } from '@/store/adminStore';
import { MapPin, Battery, Wrench, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminDevices() {
  const { devices, updateDeviceStatus } = useAdminStore();
  const [selectedDevice, setSelectedDevice] = useState<SmartCartDevice | null>(null);

  const handleMaintenance = (id: string) => {
    updateDeviceStatus(id, 'MAINTENANCE');
    if (selectedDevice?.id === id) {
      setSelectedDevice({ ...selectedDevice, status: 'MAINTENANCE' });
    }
    alert('Đã tạo lệnh bảo trì. Sẽ có nhân viên tiếp nhận xe.');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FREE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CHARGING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      case 'MAINTENANCE': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Device List */}
      <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Danh sách thiết bị</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm ID xe..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {devices.map(device => (
            <div 
              key={device.id} 
              onClick={() => setSelectedDevice(device)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedDevice?.id === device.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800">{device.id}</h4>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <Battery className={`w-4 h-4 mr-1 ${device.battery < 20 ? 'text-red-500' : 'text-emerald-500'}`} />
                    {device.battery}% Pin
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(device.status)}`}>
                  {device.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Details & Map */}
      <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        {selectedDevice ? (
          <>
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Chi tiết xe: {selectedDevice.id}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Cập nhật lần cuối: {new Date(selectedDevice.lastPing).toLocaleTimeString()}
                  </p>
                </div>
                {selectedDevice.status === 'ERROR' && (
                  <Button 
                    variant="danger" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleMaintenance(selectedDevice.id)}
                  >
                    <Wrench className="w-4 h-4 mr-2" />
                    Gán việc bảo trì
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1 p-6 relative flex flex-col">
              <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Vị trí (Giả lập sơ đồ siêu thị)
              </h4>
              <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden">
                {/* Giả lập map mặt bằng siêu thị */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div 
                  className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse"
                  style={{ top: `${selectedDevice.location.y}%`, left: `${selectedDevice.location.x}%` }}
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-mono shadow-sm border border-slate-200">
                  Tọa độ: [{selectedDevice.location.x.toFixed(1)}, {selectedDevice.location.y.toFixed(1)}]
                </div>
              </div>
              
              {selectedDevice.status === 'ERROR' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h5 className="font-semibold text-red-800 mb-2">Thông tin lỗi:</h5>
                  <p className="text-sm text-red-700">Xe bị sập nguồn đột ngột hoặc mất tín hiệu kết nối. Đề nghị cử nhân viên kỹ thuật tới kiểm tra phần cứng và thay pin.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Search className="w-12 h-12 mb-4 text-slate-300" />
            <p>Chọn một xe đẩy từ danh sách bên trái để xem chi tiết</p>
          </div>
        )}
      </div>
    </div>
  );
}
