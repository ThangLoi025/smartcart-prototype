import { create } from 'zustand';
import { CartSession, Product, User } from '@/types';
import { MAX_CART_WEIGHT_LBS } from '@/lib/constants';

interface CartState {
  session: CartSession;
  currentUser: User | null;
  setSessionMode: (mode: 'GUEST' | 'LOGGED_IN', userId?: string) => void;
  setCurrentUser: (user: User | null) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearSession: () => void;
}

const initialSession: CartSession = {
  sessionId: '',
  status: 'GUEST',
  userId: null,
  items: [],
  totalAmount: 0,
  totalWeight: 0,
};

export const useCartStore = create<CartState>((set, get) => ({
  session: initialSession,
  currentUser: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  setSessionMode: (mode, userId) => {
    const sessionId = Math.random().toString(36).substring(2, 15);
    set({
      session: {
        ...initialSession,
        sessionId,
        status: mode,
        userId: mode === 'LOGGED_IN' ? (userId ?? null) : null,
      },
    });
  },

  addItem: (product) => {
    const { session } = get();
    
    // Strict business constraint: Max Weight Limit
    if (session.totalWeight + product.weight > MAX_CART_WEIGHT_LBS) {
      throw new Error(`Vượt quá giới hạn trọng lượng! Không thể thêm ${product.name}. Tối đa ${MAX_CART_WEIGHT_LBS} lbs.`);
    }

    set({
      session: {
        ...session,
        items: [...session.items, product],
        totalAmount: session.totalAmount + product.price,
        totalWeight: session.totalWeight + product.weight,
      },
    });
  },

  removeItem: (productId) => {
    const { session } = get();
    const index = session.items.findIndex(item => item.id === productId);
    
    if (index === -1) return;
    
    const product = session.items[index];
    const newItems = [...session.items];
    newItems.splice(index, 1);

    set({
      session: {
        ...session,
        items: newItems,
        totalAmount: session.totalAmount - product.price,
        totalWeight: session.totalWeight - product.weight,
      },
    });
  },

  clearSession: () => {
    set({ session: initialSession, currentUser: null });
  },
}));
