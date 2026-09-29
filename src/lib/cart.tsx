import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem extends Product {
  qty: number;
  /** tamanho escolhido; vazio = "Consultar" */
  size: string;
}

/** chave única por produto + tamanho */
const keyOf = (id: number, size: string) => `${id}__${size}`;

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (product: Product, size?: string) => void;
  changeQty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  open: () => void;
  close: () => void;
  keyOf: (id: number, size: string) => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((product: Product, size = "") => {
    setItems((prev) => {
      const k = keyOf(product.id, size);
      const existing = prev.find((i) => keyOf(i.id, i.size) === k);
      if (existing) {
        return prev.map((i) => (keyOf(i.id, i.size) === k ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const changeQty = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (keyOf(i.id, i.size) === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i.id, i.size) !== key));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items,
      count,
      total,
      isOpen,
      add,
      changeQty,
      remove,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      keyOf,
    };
  }, [items, isOpen, add, changeQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}

export function formatPrice(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}
