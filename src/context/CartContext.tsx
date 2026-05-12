import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Dish } from "@/data/dishes";

export type CartItem = { dish: Dish; quantity: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  status: "preparing" | "out-for-delivery" | "delivered";
  etaMinutes: number;
  address: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (dish: Dish, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  orders: Order[];
  placeOrder: (address: string) => Order;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "forkful_cart_v1";
const ORDERS_KEY = "forkful_orders_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addItem = (dish: Dish, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { dish, quantity: qty }];
    });

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.dish.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.dish.id !== id)
        : prev.map((i) => (i.dish.id === id ? { ...i, quantity: qty } : i))
    );

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.dish.price * i.quantity, 0),
    [items]
  );
  const deliveryFee = items.length === 0 ? 0 : subtotal > 40 ? 0 : 3.99;
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const placeOrder = (address: string): Order => {
    const order: Order = {
      id: `FRK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      items,
      total,
      placedAt: new Date().toISOString(),
      status: "preparing",
      etaMinutes: 25 + Math.floor(Math.random() * 15),
      address,
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        subtotal,
        deliveryFee,
        total,
        itemCount,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};