import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, StitchingType, StandardSize, CustomMeasurements, CurrencyCode, Order, Category } from '../types';
import { CURRENCY_RATES, PRODUCTS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotalPKR: number;
  cartTotalPKR: number;
  discountPKR: number;
  appliedPromo: { code: string; discountPercent: number } | null;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (pkr: number) => string;
  formatPriceWithCurrency: (pkr: number) => { amount: string; symbol: string; code: string };
  addToCart: (
    product: Product,
    stitchingType: StitchingType,
    selectedSize?: StandardSize,
    customMeasurements?: CustomMeasurements,
    selectedColor?: string,
    quantity?: number
  ) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  
  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  recentOrder: Order | null;
  setRecentOrder: (order: Order | null) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (c: Category) => void;
  selectedFabric: string;
  setSelectedFabric: (f: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zehraan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('zehraan_currency');
      return (saved as CurrencyCode) || 'PKR';
    } catch {
      return 'PKR';
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zehraan_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Quick toast notification
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zehraan_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zehraan_currency', currency);
    } catch (e) {
      console.warn('Could not save currency', e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('zehraan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlist]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const formatPrice = (pkr: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.PKR;
    const converted = pkr * rateInfo.rate;
    if (rateInfo.decimals === 0) {
      return `${rateInfo.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${rateInfo.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: rateInfo.decimals, maximumFractionDigits: rateInfo.decimals })}`;
  };

  const formatPriceWithCurrency = (pkr: number) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.PKR;
    const converted = pkr * rateInfo.rate;
    const formatted = rateInfo.decimals === 0
      ? Math.round(converted).toLocaleString()
      : converted.toLocaleString(undefined, { minimumFractionDigits: rateInfo.decimals, maximumFractionDigits: rateInfo.decimals });
    return {
      amount: formatted,
      symbol: rateInfo.symbol,
      code: rateInfo.name,
    };
  };

  const addToCart = (
    product: Product,
    stitchingType: StitchingType,
    selectedSize?: StandardSize,
    customMeasurements?: CustomMeasurements,
    selectedColor?: string,
    quantity: number = 1
  ) => {
    const stitchingAddOn = stitchingType === 'unstitched' ? 0 : product.stitchingPricePKR;
    const unitPricePKR = product.pricePKR + stitchingAddOn;
    
    // Unique ID based on product + stitching + size + custom measurements
    const cartItemId = `${product.id}-${stitchingType}-${selectedSize || 'none'}-${selectedColor || 'default'}-${customMeasurements ? JSON.stringify(customMeasurements) : 'standard'}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity, totalPricePKR: unitPricePKR * (item.quantity + quantity) }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          stitchingType,
          selectedSize,
          customMeasurements,
          selectedColor: selectedColor || product.colors[0]?.name,
          quantity,
          totalPricePKR: unitPricePKR * quantity,
        };
        return [...prevCart, newItem];
      }
    });

    showNotification(`Added ${product.name.split('—')[0]} to your Bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === cartItemId) {
          const stitchingAddOn = item.stitchingType === 'unstitched' ? 0 : item.product.stitchingPricePKR;
          const unitPrice = item.product.pricePKR + stitchingAddOn;
          return {
            ...item,
            quantity,
            totalPricePKR: unitPrice * quantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find((p) => p.id === productId);
      const name = prod ? prod.name.split('—')[0] : 'Item';
      if (exists) {
        showNotification(`Removed ${name} from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(`Saved ${name} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'EID26' || cleanCode === 'EIDMUBARAK') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      return { success: true, message: 'Code EID26 applied! 10% discount added to order.' };
    }
    if (cleanCode === 'ZEHRAAN15') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15 });
      return { success: true, message: 'VIP code applied! 15% discount added to order.' };
    }
    if (cleanCode === 'WELCOME5') {
      setAppliedPromo({ code: cleanCode, discountPercent: 5 });
      return { success: true, message: 'Welcome code applied! 5% discount added.' };
    }
    return { success: false, message: 'Invalid promo code. Try EID26 for 10% off.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Computations
  const cartSubtotalPKR = cart.reduce((sum, item) => sum + item.totalPricePKR, 0);
  const discountPKR = appliedPromo ? Math.round((cartSubtotalPKR * appliedPromo.discountPercent) / 100) : 0;
  const cartTotalPKR = Math.max(0, cartSubtotalPKR - discountPKR);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotalPKR,
        cartTotalPKR,
        discountPKR,
        appliedPromo,
        currency,
        setCurrency,
        formatPrice,
        formatPriceWithCurrency,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromo,
        removePromo,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        recentOrder,
        setRecentOrder,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedFabric,
        setSelectedFabric,
        sortBy,
        setSortBy,
        notification,
        showNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
