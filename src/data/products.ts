// ============================================================
// PRODUTOS — Mantoz Fut
// ------------------------------------------------------------
// É AQUI que você adiciona seus produtos reais.
// Para cada camisa, copie um bloco abaixo e preencha:
//
//   id:    número único (nunca repita)
//   name:  nome da camisa, ex: "Camisa I 2024/25"
//   team:  time, ex: "Flamengo"
//   type:  "Retrô" ou "Atual"
//   camp:  campeonato: "Brasileirão", "Libertadores",
//          "Copa do Brasil", "Estadual", etc.
//   price: preço em reais (número, ex: 150)
//   image: URL da foto (deixe "" para usar o placeholder)
//
// Os filtros de Time e Campeonato são gerados automaticamente
// a partir desta lista — não precisa mexer em mais nada.
// ============================================================

export interface Product {
  id: number;
  name: string;
  team: string;
  type: "Retrô" | "Atual";
  camp: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: "Camisa I 2024/25", team: "Flamengo", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 2, name: "Camisa Retrô 2019 Libertadores", team: "Flamengo", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 3, name: "Camisa I 2024/25", team: "Palmeiras", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 4, name: "Camisa Retrô 1999", team: "Palmeiras", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 5, name: "Camisa I 2024/25", team: "Corinthians", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 6, name: "Camisa Retrô 2012 Libertadores", team: "Corinthians", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 7, name: "Camisa I 2024/25", team: "São Paulo", type: "Atual", camp: "Estadual", price: 150, image: "" },
  { id: 8, name: "Camisa Retrô 2005 Mundial", team: "São Paulo", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 9, name: "Camisa I 2024/25", team: "Cruzeiro", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 10, name: "Camisa Retrô 1997 Libertadores", team: "Cruzeiro", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 11, name: "Camisa I 2024/25", team: "Atlético-MG", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 12, name: "Camisa Retrô 2013 Libertadores", team: "Atlético-MG", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 13, name: "Camisa I 2024/25", team: "Botafogo", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 14, name: "Camisa Retrô 1995", team: "Botafogo", type: "Retrô", camp: "Copa do Brasil", price: 150, image: "" },
  { id: 15, name: "Camisa I 2024/25", team: "Vasco", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 16, name: "Camisa Retrô 1998 Libertadores", team: "Vasco", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 17, name: "Camisa I 2024/25", team: "Grêmio", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 18, name: "Camisa Retrô 1983 Libertadores", team: "Grêmio", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
  { id: 19, name: "Camisa I 2024/25", team: "Santos", type: "Atual", camp: "Brasileirão", price: 150, image: "" },
  { id: 20, name: "Camisa Retrô Pelé", team: "Santos", type: "Retrô", camp: "Libertadores", price: 150, image: "" },
];

// Número do WhatsApp do dono (com código do país)
export const WHATSAPP_NUMBER = "5538984241631";

export const INSTAGRAM_URL = "https://instagram.com/mantozfut";
