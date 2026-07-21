import { create } from 'zustand';

export type CartStatus = 'ACTIVE' | 'FREE' | 'CHARGING' | 'ERROR' | 'MAINTENANCE';

export interface SmartCartDevice {
  id: string;
  status: CartStatus;
  battery: number; // 0 - 100
  lastPing: number; // timestamp
  location: { x: number; y: number }; // Mock coordinates
}

export interface AdminAlert {
  id: string;
  cartId: string;
  message: string;
  type: 'OFFLINE' | 'BATTERY_LOW' | 'WEIGHT_MISMATCH' | 'GENERAL_ERROR';
  timestamp: number;
}

export interface Campaign {
  id: string;
  name: string;
  imageUrl: string;
  status: 'ACTIVE' | 'PAUSED';
  syncProgress: number; // 0 - 100
}

export interface SecurityLog {
  id: string;
  type: 'WEIGHT_OVERRIDE' | 'THEFT_SUSPICION';
  cartId: string;
  message: string;
  operatorId: string;
  timestamp: number;
}

interface AdminState {
  isAuthenticated: boolean;
  adminUser: { name: string; role: string } | null;
  devices: SmartCartDevice[];
  alerts: AdminAlert[];
  campaigns: Campaign[];
  activeCampaignId: string | null;
  securityLogs: SecurityLog[];
  
  // Actions
  login: () => void;
  logout: () => void;
  updateDeviceStatus: (id: string, status: CartStatus) => void;
  dismissAlert: (id: string) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'syncProgress' | 'status'>) => void;
  setActiveCampaign: (id: string | null) => void;
  updateCampaignSync: (id: string, progress: number) => void;
}

// Initial mock data
const initialDevices: SmartCartDevice[] = [
  { id: 'CART-001', status: 'ACTIVE', battery: 85, lastPing: Date.now(), location: { x: 20, y: 30 } },
  { id: 'CART-002', status: 'FREE', battery: 92, lastPing: Date.now(), location: { x: 10, y: 15 } },
  { id: 'CART-003', status: 'ERROR', battery: 45, lastPing: Date.now() - 6 * 60 * 1000, location: { x: 60, y: 80 } }, // Offline
  { id: 'CART-004', status: 'FREE', battery: 12, lastPing: Date.now(), location: { x: 50, y: 50 } }, // Low battery
  { id: 'CART-005', status: 'CHARGING', battery: 100, lastPing: Date.now(), location: { x: 5, y: 5 } },
];

const initialAlerts: AdminAlert[] = [
  { id: 'ALT-1', cartId: 'CART-003', message: 'Xe đẩy mất kết nối quá 5 phút', type: 'OFFLINE', timestamp: Date.now() - 5 * 60 * 1000 },
  { id: 'ALT-2', cartId: 'CART-004', message: 'Pin yếu (<15%). Yêu cầu sạc', type: 'BATTERY_LOW', timestamp: Date.now() - 2 * 60 * 1000 },
];

const initialLogs: SecurityLog[] = [
  { id: 'LOG-1', type: 'WEIGHT_OVERRIDE', cartId: 'CART-001', message: 'Xác nhận bỏ qua lỗi cân nặng (Chênh lệch: 50g)', operatorId: 'NV-009', timestamp: Date.now() - 3600000 }
];

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  adminUser: null,
  devices: initialDevices,
  alerts: initialAlerts,
  campaigns: [],
  activeCampaignId: null,
  securityLogs: initialLogs,

  login: () => set({ isAuthenticated: true, adminUser: { name: 'Anh Vinh', role: 'Quản lý vận hành' } }),
  
  logout: () => set({ isAuthenticated: false, adminUser: null }),
  
  updateDeviceStatus: (id, status) => set((state) => ({
    devices: state.devices.map(d => d.id === id ? { ...d, status } : d)
  })),

  dismissAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== id)
  })),

  createCampaign: (campaignData) => set((state) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `CAM-${Date.now()}`,
      status: 'PAUSED',
      syncProgress: 0,
    };
    return { campaigns: [...state.campaigns, newCampaign] };
  }),

  setActiveCampaign: (id) => set({ activeCampaignId: id }),

  updateCampaignSync: (id, progress) => set((state) => ({
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, syncProgress: progress, status: progress === 100 ? 'ACTIVE' : c.status } : c)
  }))
}));
