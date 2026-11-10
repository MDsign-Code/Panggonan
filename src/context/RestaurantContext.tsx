import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, CartItem, Order, OrderStatus, PaymentMethod, PaymentStatus, Review } from '../types/restaurant';
import { INITIAL_MENU_ITEMS, INITIAL_ORDERS, INITIAL_REVIEWS, RESTAURANT_INFO } from '../data/initialData';

export type AppView = 'customer' | 'kitchen' | 'admin' | 'owner';

interface RestaurantContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedTable: string;
  setSelectedTable: (table: string) => void;

  // Menu & Stock
  menuItems: MenuItem[];
  toggleMenuAvailability: (id: string) => void;
  updateMenuStock: (id: string, newStock: number) => void;
  updateMenuPrice: (id: string, newPrice: number) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  editMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, spicyLevel: number, notes: string) => void;
  updateCartItemQty: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotalQuantity: number;
  cartSubtotal: number;
  cartTax: number;
  cartServiceFee: number;
  cartDiscount: number;
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  cartTotal: number;

  // Modal controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  activeOrderForReceipt: Order | null;
  setActiveOrderForReceipt: (order: Order | null) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  reviewTargetOrder: Order | null;
  setReviewTargetOrder: (order: Order | null) => void;
  isSocialShareModalOpen: boolean;
  setIsSocialShareModalOpen: (open: boolean) => void;
  socialShareOrder: Order | null;
  setSocialShareOrder: (order: Order | null) => void;

  // Orders
  orders: Order[];
  placeOrder: (customerName: string, customerPhone: string, paymentMethod: PaymentMethod, orderType?: 'dine_in' | 'takeaway') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: PaymentStatus, method?: PaymentMethod) => void;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // KDS sound alert
  kitchenSoundMuted: boolean;
  setKitchenSoundMuted: (muted: boolean) => void;
  playKitchenChime: () => void;

  // Reviews
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'createdAt'>) => void;

  // Active orders metrics for badge counts
  activeKitchenOrdersCount: number;
  unpaidOrdersCount: number;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Synthesized audio chime using Web Audio API
const triggerAudioChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play warm dual bell chime
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1174.66, now + 0.12); // D6
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.7);
  } catch (e) {
    console.warn('Audio chime unsupported or blocked', e);
  }
};

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('customer');
  const [selectedTable, setSelectedTable] = useState<string>('Meja 08');

  // Menu Items State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('panggonan_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('panggonan_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('panggonan_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('panggonan_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('panggonan_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('panggonan_cart', JSON.stringify(cart));
  }, [cart]);

  // Promo code state
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('panggonan_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('panggonan_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Modals & Sheets
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeOrderForReceipt, setActiveOrderForReceipt] = useState<Order | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTargetOrder, setReviewTargetOrder] = useState<Order | null>(null);
  const [isSocialShareModalOpen, setIsSocialShareModalOpen] = useState(false);
  const [socialShareOrder, setSocialShareOrder] = useState<Order | null>(null);
  const [kitchenSoundMuted, setKitchenSoundMuted] = useState(false);

  // Sound Chime Trigger
  const playKitchenChime = () => {
    if (!kitchenSoundMuted) {
      triggerAudioChime();
    }
  };

  // Cart Operations
  const addToCart = (item: MenuItem, quantity: number, spicyLevel: number, notes: string) => {
    const existingIndex = cart.findIndex(
      (c) => c.menuItem.id === item.id && c.spicyLevel === spicyLevel && c.notes === notes
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      updated[existingIndex].itemTotal = updated[existingIndex].quantity * item.price;
      setCart(updated);
    } else {
      const newEntry: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        menuItem: item,
        quantity,
        spicyLevel,
        notes,
        itemTotal: item.price * quantity
      };
      setCart((prev) => [...prev, newEntry]);
    }
  };

  const updateCartItemQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return {
              ...item,
              quantity: newQty,
              itemTotal: newQty * item.menuItem.price
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromoCode(null);
  };

  const cartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  
  // Promo code calculation
  let cartDiscount = 0;
  if (appliedPromoCode === 'PANGGONANHEMAT' && cartSubtotal >= 100000) {
    cartDiscount = 15000;
  } else if (appliedPromoCode === 'DISKON10' && cartSubtotal > 0) {
    cartDiscount = Math.round(cartSubtotal * 0.1);
  }

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PANGGONANHEMAT') {
      if (cartSubtotal < 100000) {
        return { success: false, message: 'Minimal transaksi Rp 100.000 untuk voucher ini' };
      }
      setAppliedPromoCode('PANGGONANHEMAT');
      return { success: true, message: 'Voucher potongan Rp 15.000 berhasil dipasang!' };
    }
    if (cleanCode === 'DISKON10') {
      setAppliedPromoCode('DISKON10');
      return { success: true, message: 'Diskon 10% berhasil diterapkan!' };
    }
    return { success: false, message: 'Kode voucher tidak valid atau sudah kadaluarsa' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
  };

  const cartTax = Math.round((cartSubtotal - cartDiscount) * RESTAURANT_INFO.taxRate);
  const cartServiceFee = Math.round((cartSubtotal - cartDiscount) * RESTAURANT_INFO.serviceFeeRate);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + cartServiceFee);

  // Order Placement
  const placeOrder = (
    customerName: string,
    customerPhone: string,
    paymentMethod: PaymentMethod,
    orderType: 'dine_in' | 'takeaway' = 'dine_in'
  ): Order => {
    const orderSeq = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `#PG-${orderSeq}`,
      tableNumber: orderType === 'takeaway' ? 'Takeaway' : selectedTable,
      orderType,
      customerName: customerName || (orderType === 'takeaway' ? 'Pelanggan Takeaway' : `Tamu ${selectedTable}`),
      customerPhone: customerPhone || '',
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      serviceFee: cartServiceFee,
      discount: cartDiscount,
      promoCode: appliedPromoCode || undefined,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cashier' ? 'unpaid' : 'paid',
      orderStatus: 'received',
      createdAt: new Date().toISOString(),
      estimatedMinutes: Math.min(30, 10 + cartTotalQuantity * 2),
      isReviewed: false
    };

    // Deduct stock for ordered items
    setMenuItems((prev) =>
      prev.map((menu) => {
        const ordered = cart.find((c) => c.menuItem.id === menu.id);
        if (ordered) {
          const newStock = Math.max(0, menu.stock - ordered.quantity);
          return {
            ...menu,
            stock: newStock,
            isAvailable: newStock > 0
          };
        }
        return menu;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Play chime for kitchen
    playKitchenChime();

    // Clear cart
    clearCart();
    setIsCartOpen(false);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: status,
            completedAt: status === 'served' || status === 'completed' ? new Date().toISOString() : ord.completedAt
          };
        }
        return ord;
      })
    );
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus, method?: PaymentMethod) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus,
            paymentMethod: method || ord.paymentMethod
          };
        }
        return ord;
      })
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, orderStatus: 'cancelled' };
        }
        return ord;
      })
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  // Menu Management
  const toggleMenuAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const updateMenuStock = (id: string, newStock: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stock: Math.max(0, newStock),
              isAvailable: newStock > 0
            }
          : item
      )
    );
  };

  const updateMenuPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: Math.max(0, newPrice) } : item))
    );
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `menu-${Date.now()}`
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const editMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: 'Baru saja'
    };
    setReviews((prev) => [newRev, ...prev]);

    // If order was passed, mark order as reviewed
    if (reviewTargetOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === reviewTargetOrder.id ? { ...o, isReviewed: true } : o))
      );
    }
  };

  // Active counts for badges
  const activeKitchenOrdersCount = orders.filter(
    (o) => o.orderStatus === 'received' || o.orderStatus === 'cooking'
  ).length;

  const unpaidOrdersCount = orders.filter(
    (o) => o.paymentStatus === 'unpaid' && o.orderStatus !== 'cancelled'
  ).length;

  return (
    <RestaurantContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedTable,
        setSelectedTable,
        menuItems,
        toggleMenuAvailability,
        updateMenuStock,
        updateMenuPrice,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        cartTotalQuantity,
        cartSubtotal,
        cartTax,
        cartServiceFee,
        cartDiscount,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        activeOrderForReceipt,
        setActiveOrderForReceipt,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewTargetOrder,
        setReviewTargetOrder,
        isSocialShareModalOpen,
        setIsSocialShareModalOpen,
        socialShareOrder,
        setSocialShareOrder,
        orders,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        cancelOrder,
        getOrderById,
        kitchenSoundMuted,
        setKitchenSoundMuted,
        playKitchenChime,
        reviews,
        addReview,
        activeKitchenOrdersCount,
        unpaidOrdersCount
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
