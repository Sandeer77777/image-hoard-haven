// ============================================================
// PREÇOS E PERSONALIZAÇÕES — Mantoz Fut
// ------------------------------------------------------------
// Categoria define o preço base. Os adicionais são escolhidos
// pelo cliente na página do produto.
// ============================================================

import type { Product } from "@/data/products";

export type Category = "Torcedor" | "Jogador" | "Retrô";

export const CATEGORY_PRICES: Record<Category, number> = {
  Torcedor: 139.9,
  Jogador: 189.9,
  Retrô: 169.9,
};

export const FREE_SHIRT_INTERVAL = 4;

/** Uma camisa de menor preço base grátis a cada quatro, sem descontar adicionais. */
export function freeShirtDiscounts(items: readonly { key: string; qty: number; basePrice: number }[]): Record<string, number> {
  const totalQuantity = items.reduce((sum, item) => sum + item.qty, 0);
  let freeCount = Math.floor(totalQuantity / FREE_SHIRT_INTERVAL);
  const discounts: Record<string, number> = {};
  for (const item of [...items].sort((a, b) => a.basePrice - b.basePrice || a.key.localeCompare(b.key))) {
    const freeHere = Math.min(freeCount, item.qty);
    if (freeHere > 0) discounts[item.key] = freeHere * item.basePrice;
    freeCount -= freeHere;
    if (freeCount === 0) break;
  }
  return discounts;
}

export const CATEGORIES = Object.keys(CATEGORY_PRICES) as Category[];

/** Tamanhos normais e tamanhos especiais (com acréscimo) */
export const REGULAR_SIZES = ["P", "M", "G", "GG"] as const;
export const SPECIAL_SIZES = ["2XL", "3XL", "4XL"] as const;
export const ALL_SIZES = [...REGULAR_SIZES, ...SPECIAL_SIZES];

export const SPECIAL_SIZE_PRICE = 10;
export const NAME_NUMBER_PRICE = 15;

export interface Customization {
  /** tamanho escolhido; vazio = "Consultar" */
  size: string;
  /** nome na camisa (maiúsculas, até 15 caracteres) */
  playerName: string;
  /** número na camisa, 1 a 99 */
  playerNumber: string;
}

export const emptyCustomization = (): Customization => ({
  size: "",
  playerName: "",
  playerNumber: "",
});

export const isSpecialSize = (size: string) =>
  (SPECIAL_SIZES as readonly string[]).includes(size);

export const hasNameNumber = (c: Customization) =>
  c.playerName.trim().length > 0 || c.playerNumber.trim().length > 0;

export interface PriceLine {
  label: string;
  value: number;
}

/** Linhas do resumo de preço (base + adicionais) */
export function priceLines(product: Product, c: Customization): PriceLine[] {
  const lines: PriceLine[] = [{ label: `Camisa ${product.category}`, value: product.price }];
  if (hasNameNumber(c)) lines.push({ label: "Nome e número", value: NAME_NUMBER_PRICE });
  if (isSpecialSize(c.size))
    lines.push({ label: `Tamanho ${c.size}`, value: SPECIAL_SIZE_PRICE });
  return lines;
}

/** Preço final de uma unidade com as personalizações escolhidas */
export function unitPrice(product: Product, c: Customization): number {
  return priceLines(product, c).reduce((sum, l) => sum + l.value, 0);
}

/** Resumo em texto das personalizações, para o carrinho e o WhatsApp */
export function customizationSummary(c: Customization): string[] {
  const parts: string[] = [];
  parts.push(
    isSpecialSize(c.size)
      ? `Tam: ${c.size} (+R$ ${SPECIAL_SIZE_PRICE})`
      : `Tam: ${c.size || "Consultar"}`,
  );
  if (hasNameNumber(c)) {
    const name = c.playerName.trim() || "—";
    const num = c.playerNumber.trim() || "—";
    parts.push(`Nome: ${name} / Nº ${num} (+R$ ${NAME_NUMBER_PRICE})`);
  }
  if (parts.length === 1 && !isSpecialSize(c.size)) parts.push("Liso");
  return parts;
}
