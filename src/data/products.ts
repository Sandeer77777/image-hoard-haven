// ============================================================
// PRODUTOS — Mantoz Fut
// ------------------------------------------------------------
// É AQUI que você adiciona seus produtos reais.
// Para cada camisa, copie um bloco abaixo e preencha:
//
//   id:       número único (nunca repita)
//   name:     nome da camisa, ex: "Camisa I 2024/25"
//   team:     time, ex: "Flamengo"
//   type:     "Retrô" ou "Atual"
//   camp:     campeonato: "Brasileirão", "Libertadores", etc.
//   season:   temporada, ex: "2024/25" (opcional)
//   category: "Torcedor" (R$ 110), "Jogador" (R$ 130) ou "Retrô" (R$ 125)
//   price:    preço base em reais — normalmente o da categoria
//   image:    URL da foto de capa (deixe "" para usar o placeholder)
//   images:   outras fotos da mesma camisa (opcional)
//   patches:  ids dos patches que essa camisa aceita (opcional;
//             se não informar, aceita todos)
//
// Os filtros de Time e Campeonato são gerados automaticamente
// a partir desta lista — não precisa mexer em mais nada.
// ============================================================

import { CATEGORY_PRICES, type Category } from "@/lib/pricing";
import atletico1 from "@/assets/products/atletico-1.jpeg.asset.json";
import atletico2 from "@/assets/products/atletico-2.jpeg.asset.json";
import atletico3 from "@/assets/products/atletico-3.jpeg.asset.json";
import atletico4 from "@/assets/products/atletico-4.jpeg.asset.json";
import atletico5 from "@/assets/products/atletico-5.jpeg.asset.json";
import atletico6 from "@/assets/products/atletico-6.jpeg.asset.json";
import atletico7 from "@/assets/products/atletico-7.jpeg.asset.json";
import barcelona1 from "@/assets/products/barcelona-1.jpeg.asset.json";
import barcelona2 from "@/assets/products/barcelona-2.jpeg.asset.json";
import barcelona3 from "@/assets/products/barcelona-3.jpeg.asset.json";
import barcelona4 from "@/assets/products/barcelona-4.jpeg.asset.json";
import barcelona5 from "@/assets/products/barcelona-5.jpeg.asset.json";
import barcelona6 from "@/assets/products/barcelona-6.jpeg.asset.json";
import barcelona7 from "@/assets/products/barcelona-7.jpeg.asset.json";
import barcelona8 from "@/assets/products/barcelona-8.jpeg.asset.json";
import barcelona9 from "@/assets/products/barcelona-9.jpeg.asset.json";

export interface Product {
  id: number;
  name: string;
  team: string;
  type: "Retrô" | "Atual";
  camp: string;
  season?: string;
  category: Category;
  price: number;
  image: string;
  images?: string[];
  patches?: string[];
  /** true = aparece na seção "Mais pedidos" */
  featured?: boolean;
}

/** Tamanhos mostrados nos cards do catálogo */
export const SIZES = ["P", "M", "G", "GG"] as const;

const T = CATEGORY_PRICES.Torcedor;
const R = CATEGORY_PRICES["Retrô"];
const J = CATEGORY_PRICES.Jogador;

const atleticoPhotos = [atletico6, atletico1, atletico2, atletico3, atletico4, atletico5, atletico7].map((asset) => asset.url);
const barcelonaPhotos = [barcelona1, barcelona2, barcelona3, barcelona4, barcelona5, barcelona6, barcelona7, barcelona8, barcelona9].map((asset) => asset.url);

export const products: Product[] = [
  { id: 1, name: "Camisa I 2024/25", team: "Flamengo", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "", featured: true },
  { id: 2, name: "Camisa Retrô 2019 Libertadores", team: "Flamengo", type: "Retrô", camp: "Libertadores", season: "2019", category: "Retrô", price: R, image: "", featured: true },
  { id: 3, name: "Camisa I 2024/25", team: "Palmeiras", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "", featured: true },
  { id: 4, name: "Camisa Retrô 1999", team: "Palmeiras", type: "Retrô", camp: "Libertadores", season: "1999", category: "Retrô", price: R, image: "" },
  { id: 5, name: "Camisa I 2024/25", team: "Corinthians", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "", featured: true },
  { id: 6, name: "Camisa Retrô 2012 Libertadores", team: "Corinthians", type: "Retrô", camp: "Libertadores", season: "2012", category: "Retrô", price: R, image: "" },
  { id: 7, name: "Camisa I 2024/25", team: "São Paulo", type: "Atual", camp: "Estadual", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 8, name: "Camisa Retrô 2005 Mundial", team: "São Paulo", type: "Retrô", camp: "Libertadores", season: "2005", category: "Retrô", price: R, image: "" },
  { id: 9, name: "Camisa I 2024/25", team: "Cruzeiro", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 10, name: "Camisa Retrô 1997 Libertadores", team: "Cruzeiro", type: "Retrô", camp: "Libertadores", season: "1997", category: "Retrô", price: R, image: "" },
  { id: 11, name: "Camisa II Feminina 2026/27", team: "Atlético-MG", type: "Atual", camp: "Brasileirão", season: "2026/27", category: "Torcedor", price: T, image: atletico6.url, images: atleticoPhotos.slice(1) },
  { id: 12, name: "Camisa Retrô 2013 Libertadores", team: "Atlético-MG", type: "Retrô", camp: "Libertadores", season: "2013", category: "Retrô", price: R, image: "" },
  { id: 13, name: "Camisa I 2024/25", team: "Botafogo", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 14, name: "Camisa Retrô 1995", team: "Botafogo", type: "Retrô", camp: "Copa do Brasil", season: "1995", category: "Retrô", price: R, image: "" },
  { id: 15, name: "Camisa I 2024/25", team: "Vasco", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 16, name: "Camisa Retrô 1998 Libertadores", team: "Vasco", type: "Retrô", camp: "Libertadores", season: "1998", category: "Retrô", price: R, image: "" },
  { id: 17, name: "Camisa I 2024/25", team: "Grêmio", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 18, name: "Camisa Retrô 1983 Libertadores", team: "Grêmio", type: "Retrô", camp: "Libertadores", season: "1983", category: "Retrô", price: R, image: "" },
  { id: 19, name: "Camisa I 2024/25", team: "Santos", type: "Atual", camp: "Brasileirão", season: "2024/25", category: "Torcedor", price: T, image: "" },
  { id: 20, name: "Camisa Retrô Pelé", team: "Santos", type: "Retrô", camp: "Libertadores", season: "1970", category: "Retrô", price: R, image: "" },
  { id: 21, name: "Camisa I 2026/27 — Versão Jogador", team: "Barcelona", type: "Atual", camp: "La Liga", season: "2026/27", category: "Jogador", price: J, image: barcelona1.url, images: barcelonaPhotos.slice(1) },
];

export const getProduct = (id: number) => products.find((p) => p.id === id);

/** Todas as fotos do produto (capa primeiro) */
export const productImages = (p: Product) =>
  [p.image, ...(p.images ?? [])].filter((src) => Boolean(src));

// Número do WhatsApp do dono (com código do país)
export const WHATSAPP_NUMBER = "5538984241631";

export const INSTAGRAM_URL = "https://instagram.com/mantozfut";
