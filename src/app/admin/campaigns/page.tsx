'use client';

import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { Presentation, Upload, Play, Square, Image as ImageIcon, Smartphone } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminCampaigns() {
  const { campaigns, createCampaign, updateCampaignSync, setActiveCampaign, activeCampaignId } = useAdminStore();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createCampaign({
      name,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop', // mock image
    });
    setShowForm(false);
    setName('');
    setImageUrl('');
  };

  const handleSync = (id: string) => {
    setSyncingId(id);
    updateCampaignSync(id, 10);
    setActiveCampaign(id);
    
    // Giả lập tiến trình đồng bộ
    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setSyncingId(null);
      }
      updateCampaignSync(id, progress);
    }, 1000);
  };

  const handleStop = (id: string) => {
    updateCampaignSync(id, 0);
    if (activeCampaignId === id) {
      setActiveCampaign(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Chiến dịch Quảng cáo</h2>
          <p className="text-sm text-slate-500 mt-1">Quản lý banner hiển thị trên màn hình chờ của xe đẩy (Guest mode)</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="primary" className="bg-blue-600 hover:bg-blue-700">
          <Presentation className="w-4 h-4 mr-2" />
          Tạo chiến dịch mới
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h3 className="font-semibold text-slate-800 mb-4">Tạo chiến dịch quảng cáo</h3>
          <form onSubmit={handleCreate} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên chiến dịch</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="VD: Khuyến mãi thịt bò Mỹ..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Kéo thả file media vào đây</p>
              <p className="text-xs text-slate-500 mt-1">Hỗ trợ JPG, PNG, MP4. Tối đa 5MB. Kích thước 1920x1080.</p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Hủy</Button>
              <Button type="submit" variant="primary" className="bg-blue-600 hover:bg-blue-700">Lưu chiến dịch</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign List */}
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className={`bg-white p-5 rounded-2xl shadow-sm border transition-all ${activeCampaignId === campaign.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden mr-4 flex-shrink-0 border border-slate-200">
                    <img src={campaign.imageUrl} alt={campaign.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{campaign.name}</h4>
                    <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full border font-medium ${
                      campaign.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {campaign.status === 'ACTIVE' ? 'Đang chạy' : 'Đã dừng'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {campaign.status === 'PAUSED' ? (
                     <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white w-32"
                      onClick={() => handleSync(campaign.id)}
                      disabled={syncingId !== null}
                    >
                      <Play className="w-3 h-3 mr-1" /> Đồng bộ
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="danger"
                      className="w-32"
                      onClick={() => handleStop(campaign.id)}
                    >
                      <Square className="w-3 h-3 mr-1" /> Dừng khẩn cấp
                    </Button>
                  )}
                </div>
              </div>

              {/* Sync Progress */}
              {campaign.syncProgress > 0 && campaign.syncProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Đang tải xuống các xe...</span>
                    <span>{campaign.syncProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${campaign.syncProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {campaigns.length === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500">
              <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p>Chưa có chiến dịch nào.</p>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-[500px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
            <Smartphone className="w-5 h-5 text-slate-600 mr-2" />
            <h3 className="font-semibold text-slate-800">Preview hiển thị (Tablet)</h3>
          </div>
          <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center">
            {/* Tablet Mockup */}
            <div className="w-[480px] h-[320px] bg-black rounded-3xl p-4 shadow-2xl relative">
              <div className="absolute top-1/2 -left-2 w-2 h-16 bg-slate-800 rounded-l-md transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-2 w-2 h-16 bg-slate-800 rounded-r-md transform -translate-y-1/2"></div>
              
              <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                {activeCampaignId ? (
                  <img 
                    src={campaigns.find(c => c.id === activeCampaignId)?.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                    <img src="/next.svg" alt="Logo" className="h-8 opacity-20 mb-4" />
                    <p className="text-slate-400 text-sm">Chưa có banner nào đang chạy</p>
                  </div>
                )}
                {/* Mock UI overlay to show it's the SmartCart app */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-800 flex items-center">
                  SmartCart Guest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
