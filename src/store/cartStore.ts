import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  uploads: string[];
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addUpload: (id: string, dataUrl: string) => void;
  removeUpload: (id: string, index: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (newItem) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  },
  addUpload: (id, dataUrl) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === id
          ? { ...item, uploads: [...item.uploads, dataUrl] }
          : item
      ),
    }));
  },
  removeUpload: (id, index) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === id
          ? { ...item, uploads: item.uploads.filter((_, i) => i !== index) }
          : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  itemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  totalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
