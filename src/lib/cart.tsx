import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { emptyCustomization, unitPrice, type Customization } from "@/lib/pricing";

export interface CartItem {
  key: string;
  product: Product;
  custom: Customization;
  qty: number;
  /** preço de uma unidade já com adicionais */
  unit: number;
}

/** chave única por produto + personalizações escolhidas */
const keyOf = (product: Product, c: Customization) =>
  [
    product.id,
    c.size,
    c.playerName.trim().toUpperCase(),
    c.playerNumber.trim(),
    [...c.patches].sort().join("+"),
  ].join("__");

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (product: Product, custom?: Customization) => void;
  changeQty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((product: Product, custom?: Customization) => {
    const c = custom ?? emptyCustomization();
    setItems((prev) => {
      const k = keyOf(product, c);
      if (prev.some((i) => i.key === k)) {
        return prev.map((i) => (i.key === k ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key: k, product, custom: c, qty: 1, unit: unitPrice(product, c) }];
    });
    setIsOpen(true);
  }, []);

  const changeQty = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.unit * i.qty, 0);
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
