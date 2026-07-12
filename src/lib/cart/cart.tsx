import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/catalog/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx>({
  items: [],
  count: 0,
  total: 0,
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const remove = (productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) return prev.filter((i) => i.product.id !== productId);
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  return (
    <Ctx.Provider value={{ items, count, total, add, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
