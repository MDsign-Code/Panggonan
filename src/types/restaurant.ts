export type MenuCategory = 
  | 'semua'
  | 'unggasan_daging'
  | 'sup_kuah'
  | 'sate_bakaran'
  | 'camilan'
  | 'minuman'
  | 'dessert';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  originalPrice?: number;
  image: string;
  isAvailable: boolean;
  stock: number;
  spicyLevel: 0 | 1 | 2 | 3; // 0: Tidak, 1: Sedang, 2: Pedas, 3: Ekstra Pedas
  isChefRecommended: boolean;
  isHalal: boolean;
  prepTimeMinutes: number;
  portionSize: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string; // unique cart entry id
  menuItem: MenuItem;
  quantity: number;
  spicyLevel: number;
  notes: string;
  extraOptions?: string[];
  itemTotal: number;
}

export type PaymentMethod = 'qris' | 'gopay' | 'ovo' | 'dana' | 'shopeepay' | 'bca_va' | 'cashier';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid';
export type OrderStatus = 'received' | 'cooking' | 'ready' | 'served' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  orderType: 'dine_in' | 'takeaway';
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tax: number; // 10% PB1
  serviceFee: number; // 5%
  discount: number;
  promoCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
  completedAt?: string;
  isReviewed?: boolean;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  dishName: string;
  createdAt: string;
  tableNumber?: string;
  verifiedDineIn: boolean;
}
