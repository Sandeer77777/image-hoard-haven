import { createContext } from "react";
import type { CartContextValue } from "./cart";

// Keep the context identity stable when the cart implementation hot-reloads.
export const CartContext = createContext<CartContextValue | null>(null);