import { useSyncExternalStore } from "react";
import { cartActions, getCartSnapshot, getServerCartSnapshot, subscribeCart } from "./cart-store";

export function useCart() {
  const state = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  return { ...state, ...cartActions };
}

export function formatPrice(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
