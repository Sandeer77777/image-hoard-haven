import type { Product } from "@/data/products";
import { comboDiscount, emptyCustomization, unitPrice, type Customization } from "@/lib/pricing";

export interface CartItem {
  key: string;
  product: Product;
  custom: Customization;
  qty: number;
  unit: number;
}

export interface CartState {
  items: CartItem[];
  count: number;
  total: number;
  savings: number;
  discountPerItem: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [], count: 0, total: 0, savings: 0, discountPerItem: 0, isOpen: false,
};

let state: CartState = initialState;
const listeners = new Set<() => void>();

export const getCartSnapshot = () => state;
export const getServerCartSnapshot = () => initialState;
export const subscribeCart = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

function update(items: CartItem[], isOpen: boolean) {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const discountPerItem = comboDiscount(count);
  const savings = count * discountPerItem;
  const total = items.reduce((sum, item) => sum + item.unit * item.qty, 0) - savings;
  state = { items, isOpen, count, discountPerItem, savings, total };
  listeners.forEach((listener) => listener());
}

export const cartActions = {
  add(product: Product, custom?: Customization) {
    const c = custom ?? emptyCustomization();
    const key = [product.id, c.size, c.playerName.trim().toUpperCase(), c.playerNumber.trim()].join("__");
    const items = state.items.some((item) => item.key === key)
      ? state.items.map((item) => item.key === key ? { ...item, qty: item.qty + 1 } : item)
      : [...state.items, { key, product, custom: c, qty: 1, unit: unitPrice(product, c) }];
    update(items, true);
  },
  changeQty(key: string, delta: number) {
    update(state.items.map((item) => item.key === key ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0), state.isOpen);
  },
  remove(key: string) {
    update(state.items.filter((item) => item.key !== key), state.isOpen);
  },
  open() { update(state.items, true); },
  close() { update(state.items, false); },
};