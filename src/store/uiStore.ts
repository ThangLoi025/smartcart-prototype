import { create } from 'zustand';
import { ViewState } from '@/lib/constants';

interface UIState {
  activeView: ViewState;
  isProcessing: boolean;
  isScannerModalOpen: boolean;
  setActiveView: (view: ViewState) => void;
  setProcessing: (status: boolean) => void;
  setScannerModalOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeView: ViewState.WELCOME,
  isProcessing: false,
  isScannerModalOpen: false,
  setActiveView: (view) => set({ activeView: view }),
  setProcessing: (status) => set({ isProcessing: status }),
  setScannerModalOpen: (isOpen) => set({ isScannerModalOpen: isOpen }),
}));
