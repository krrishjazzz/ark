"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";
import { SIZES, FRAME_OPTIONS } from "@/lib/constants";
import { getProductPrimaryImage } from "@/lib/images";

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  compareList: string[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (slug: string) => void;
  toggleCompare: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
  cartCount: number;
  clearCart: () => void;
  calculatePrice: (basePrice: number, size: string) => number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ark-store");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.cart) setCart(data.cart);
        if (data.wishlist) setWishlist(data.wishlist);
        if (data.recentlyViewed) setRecentlyViewed(data.recentlyViewed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "ark-store",
        JSON.stringify({ cart, wishlist, recentlyViewed })
      );
    } catch {
      /* ignore */
    }
  }, [cart, wishlist, recentlyViewed]);

  const calculatePrice = useCallback((basePrice: number, size: string) => {
    const sizeOption = SIZES.find((s) => s.value === size);
    return Math.round(basePrice * (sizeOption?.priceMultiplier ?? 1));
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size);
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity } : i
        )
      );
    },
    [removeFromCart]
  );

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const addToRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 10);
    });
  }, []);

  const toggleCompare = useCallback((productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const isInCompare = useCallback(
    (productId: string) => compareList.includes(productId),
    [compareList]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      recentlyViewed,
      compareList,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      addToRecentlyViewed,
      toggleCompare,
      isInWishlist,
      isInCompare,
      cartCount,
      clearCart,
      calculatePrice,
    }),
    [
      cart,
      wishlist,
      recentlyViewed,
      compareList,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      addToRecentlyViewed,
      toggleCompare,
      isInWishlist,
      isInCompare,
      cartCount,
      clearCart,
      calculatePrice,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}

export function useAddProductToCart(product: Product, size: string, frame: string) {
  const { addToCart, calculatePrice } = useStore();
  return () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: getProductPrimaryImage(product.images),
      size,
      frame,
      price: calculatePrice(product.basePrice, size),
    });
  };
}
