// ============================================================
// PREÇOS E PERSONALIZAÇÕES — Mantoz Fut
// ------------------------------------------------------------
// Categoria define o preço base. Os adicionais são escolhidos
// pelo cliente na página do produto.
// Combo 4+: R$ 30 de desconto por peça quando o pedido tem 4+
// ============================================================

import type { Product } from "@/data/products";

export type Category = "Torcedor" | "Jogador" | "Retrô";

/** Preços avulsos (1 a 3 peças) */
export const CATEGORY_PRICES: Record<Category, number> = {
    Torcedor: 139.9,
    Jogador: 189.9,
    Retrô: 169.9,
};

export const CATEGORIES = Object.keys(CATEGORY_PRICES) as Category[];

/** Combo 4+: desconto fixo por peça no preço base */
export const COMBO_MIN_QTY = 4;
export const COMBO_DISCOUNT = 30;

/** Preço com desconto de combo */
export function comboPrice(category: Category): number {
    return CATEGORY_PRICES[category] - COMBO_DISCOUNT;
}

/** Tamanhos normais e tamanhos especiais (com acréscimo) */
export const REGULAR_SIZES = ["P", "M", "G", "GG"] as const;
export const SPECIAL_SIZES = ["2XL", "3XL", "4XL"] as const;
export const ALL_SIZES = [...REGULAR_SIZES, ...SPECIAL_SIZES];

export const SPECIAL_SIZE_PRICE = 10;
export const NAME_NUMBER_PRICE = 15;

export interface Patch {
    id: string;
    label: string;
    price: number;
}

export const PATCHES: Patch[] = [
  { id: "libertadores", label: "Patch Libertadores", price: 10 },
  { id: "brasileirao", label: "Patch Brasileirão", price: 10 },
  { id: "copa-do-brasil", label: "Patch Copa do Brasil", price: 10 },
  { id: "mundial", label: "Patch Mundial", price: 10 },
  { id: "campeao", label: "Patch Campeão", price: 10 },
  ];

export const getPatch = (id: string) => PATCHES.find((p) => p.id === id);

export interface Customization {
    /** tamanho escolhido; vazio = "Consultar" */
  size: string;
    /** nome na camisa (maiúsculas, até 15 caracteres) */
  playerName: string;
    /** número na camisa, 1 a 99 */
  playerNumber: string;
    /** ids dos patches escolhidos */
  patches: string[];
}

export const emptyCustomization = (): Customization => ({
    size: "",
    playerName: "",
    playerNumber: "",
    patches: [],
});

export const isSpecialSize = (size: string) =>
    (SPECIAL_SIZES as readonly string[]).includes(size);

export const hasNameNumber = (c: Customization) =>
    c.playerName.trim().length > 0 || c.playerNumber.trim().length > 0;

export interface PriceLine {
    label: string;
    value: number;
}

/** Linhas do resumo de preço (base + adicionais).
 *  isCombo=true aplica desconto de R$ 30 no preço base. */
export function priceLines(product: Product, c: Customization, isCombo = false): PriceLine[] {
    const basePrice = isCombo
      ? comboPrice(product.category as Category)
          : product.price;
    const lines: PriceLine[] = [{ label: `Camisa ${product.category}`, value: basePrice }];
    if (hasNameNumber(c)) lines.push({ label: "Nome e número", value: NAME_NUMBER_PRICE });
    if (isSpecialSize(c.size))
          lines.push({ label: `Tamanho ${c.size}`, value: SPECIAL_SIZE_PRICE });
    c.patches.forEach((id) => {
          const patch = getPatch(id);
          if (patch) lines.push({ label: patch.label, value: patch.price });
    });
    return lines;
}

/** Preço final de uma unidade com as personalizações escolhidas.
 *  isCombo=true aplica desconto de R$ 30 no preço base. */
export function unitPrice(product: Product, c: Customization, isCombo = false): number {
    return priceLines(product, c, isCombo).reduce((sum, l) => sum + l.value, 0);
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
    const patches = c.patches
      .map((id) => getPatch(id))
      .filter((p): p is Patch => Boolean(p))
      .map((p) => `${p.label.replace("Patch ", "")} (+R$ ${p.price})`);
    if (patches.length) parts.push(`Patch: ${patches.join(", ")}`);
    if (parts.length === 1 && !isSpecialSize(c.size)) parts.push("Liso");
    return parts;
}
