import { HARDWARE_DELAYS } from '@/lib/constants';

export const hardwareMock = {
  simulateScannerDelay: async (): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, HARDWARE_DELAYS.SCANNER));
  },
  
  simulateWeightScale: async (expectedWeight: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, HARDWARE_DELAYS.WEIGHT_SCALE));
  }
};
