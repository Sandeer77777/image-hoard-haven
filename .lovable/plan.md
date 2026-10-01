# Promoção leve 5, pague 4

## O que será feito

1. Trocar a oferta atual por **“Leve 5 camisas, pague 4”**: a cada cinco camisas no mesmo pedido, a camisa de **menor preço base** sai grátis. Com dez camisas, saem grátis as duas de menor preço base; e assim por diante. Pode misturar versões e tamanhos. O desconto cobre apenas a camisa, não os adicionais de tamanho especial e nome/número.
2. Atualizar os avisos no topo, no catálogo e na página da camisa para não mencionar “combo”, “4+”, R$ 30 por peça ou uma porcentagem fixa. Usar “Leve 5, pague 4” porque, em pedidos com preços diferentes, o percentual de economia varia.
3. Atualizar o carrinho e a mensagem do WhatsApp com a camisa grátis, economia e total corretos. Recalcular imediatamente ao adicionar, reduzir ou remover camisas; com menos de cinco, não há camisa grátis.
4. Manter o **frete grátis a partir de 5 camisas** (acima de 4) e ajustar os textos para refletir essa condição separadamente.
5. Conferir pedidos com 4, 5 e 10 camisas, versões misturadas e personalizações; verificar que carrinho, página da camisa e WhatsApp mostram valores consistentes.

## Exemplo de valores

- Cinco camisas Torcedor sem adicionais: 5 × R$ 139,90 = R$ 699,50; uma grátis (R$ 139,90); total **R$ 559,60**, economia de 20% nesse exemplo.
- Quatro Torcedor e uma Jogador: sai grátis uma Torcedor (R$ 139,90), não a Jogador. O percentual de economia será diferente.

## Detalhes técnicos

- Centralizar a seleção das peças gratuitas e o desconto sobre preços base em `src/lib/pricing.ts`; recalcular os totais do carrinho compartilhado em `src/lib/cart-store.ts` e refletir os valores no resumo e no WhatsApp.
- Manter os preços avulsos atuais, os adicionais e o catálogo de produtos sem alterações.
