# Promoção leve 4, pague 3

## O que será feito

1. Trocar a oferta atual por **“Leve 4 camisas, pague 3”**: a cada quatro camisas no mesmo pedido, a camisa de **menor preço base** sai grátis. Com oito camisas, saem grátis as duas de menor preço base; e assim por diante. Pode misturar Torcedor, Jogador e Retrô, inclusive tamanhos diferentes. O desconto cobre apenas o preço base da camisa, não os adicionais de tamanho especial e nome/número.
2. Atualizar os avisos no topo, no catálogo e na página da camisa para não mencionar “combo”, R$ 30 por peça ou uma porcentagem fixa. Explicar com clareza: “Vale para qualquer mistura de modelos e tamanhos; a camisa de menor valor do pedido sai grátis.”
3. Atualizar o carrinho e a mensagem do WhatsApp com a camisa grátis, economia e total corretos. Recalcular imediatamente ao adicionar, reduzir ou remover camisas; com menos de quatro, não há camisa grátis.
4. Manter o **frete grátis a partir de 5 camisas** (acima de 4) e ajustar os textos para refletir essa condição separadamente.
5. Conferir pedidos com 3, 4, 5 e 8 camisas, versões misturadas e personalizações; verificar que carrinho, página da camisa e WhatsApp mostram valores consistentes.

## Exemplo de valores

- Quatro camisas Torcedor sem adicionais: 4 × R$ 139,90 = R$ 559,60; uma grátis (R$ 139,90); total **R$ 419,70**.
- Duas Jogador, uma Retrô e uma Torcedor: sai grátis a Torcedor (R$ 139,90). Com quatro camisas da mesma versão, uma dessa versão sai grátis.

## Detalhes técnicos

- Centralizar a seleção das peças gratuitas e o desconto sobre preços base em `src/lib/pricing.ts`; recalcular os totais do carrinho compartilhado em `src/lib/cart-store.ts` e refletir os valores no resumo e no WhatsApp.
- Manter os preços avulsos atuais, os adicionais e o catálogo de produtos sem alterações.
