import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  store: string;
  rating: number;
  sold: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
};

export type UserData = {
  fullName: string;
  contact: string;
  password?: string;
};

interface CartState {
  items: CartItem[];
  isZakatEnabled: boolean;
  isCartOpen: boolean;
  notifications: Notification[];
  
  // Auth state
  users: UserData[];
  currentUser: UserData | null;
  registerUser: (userData: UserData) => void;
  loginUser: (contact: string, password?: string) => boolean;
  logoutUser: () => void;
  
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  toggleZakat: () => void;
  toggleCart: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'isUnread'>) => void;
  markNotificationsAsRead: () => void;
  getTotals: () => { subtotal: number; zakat: number; total: number };
}
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isZakatEnabled: false,
  isCartOpen: false,
  notifications: [
    { id: 'initial-1', title: 'Promo Spesial PAT MART!', message: 'Diskon 50% untuk seri DIMOO Retro.', time: '1 jam yang lalu', isUnread: true }
  ],
  
  users: [],
  currentUser: null,

  registerUser: (userData) => set((state) => ({ users: [...state.users, userData] })),
  
  loginUser: (contact, password) => {
    const { users } = get();
    // basic validation - either contact matches and (pw matches or pw not provided for mockup)
    const user = users.find(u => u.contact === contact && (!password || u.password === password));
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },
  
  logoutUser: () => set({ currentUser: null }),
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  decrementItem: (productId) => set((state) => {
    const existingItem = state.items.find(item => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      return {
        items: state.items.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      };
    }
    return {
      items: state.items.filter(item => item.id !== productId)
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  toggleZakat: () => set((state) => ({ isZakatEnabled: !state.isZakatEnabled })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  addNotification: (notif) => set((state) => ({
    notifications: [{
      id: Math.random().toString(36).substring(7),
      ...notif,
      time: 'Baru saja',
      isUnread: true,
    }, ...state.notifications]
  })),

  markNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isUnread: false }))
  })),

  getTotals: () => {
    const { items, isZakatEnabled } = get();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Zakat Calculation: 2.5% of the transaction
    const zakat = isZakatEnabled ? subtotal * 0.025 : 0;
    const total = subtotal + zakat;
    
    return { subtotal, zakat, total };
  }
}));
