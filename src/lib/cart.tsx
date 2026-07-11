import { createContext, useContext, useState, type ReactNode } from "react";

interface CartCtx {
  count: number;
  add: () => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx>({ count: 0, add: () => {}, clear: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <Ctx.Provider value={{ count, add: () => setCount((c) => c + 1), clear: () => setCount(0) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
