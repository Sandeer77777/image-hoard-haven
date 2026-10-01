# Ajustes da página da camisa e nova promoção

## O que será feito

1. **Fotos fáceis de navegar:** permitir deslizar a foto principal com o dedo no celular e mostrar setas laterais no computador, mantendo as miniaturas. Ajustar a área das fotos do catálogo e da página da camisa para uma proporção uniforme, com fundo branco e imagem inteira visível, sem a faixa cinza aparente; preservar as 7 fotos do Atlético-MG e as 9 do Barcelona na ordem atual.
2. **Escolhas da camisa:** manter o seletor de P a 4XL e a personalização de nome e número, com +R$ 10 para 2XL–4XL e +R$ 15 para nome e número. Retirar a escolha de patches, seus custos e suas menções da página, do carrinho e da mensagem do WhatsApp.
3. **Preços e Combo 4+:** atualizar os preços avulsos para Torcedor R$ 139,90, Retrô R$ 169,90 e Jogador R$ 189,90. Quando o carrinho somar 4 camisas ou mais, descontar R$ 30 por camisa, mesmo misturando versões e tamanhos; recalcular ao aumentar, diminuir ou remover itens. Os adicionais não recebem desconto. Mostrar a economia, os subtotais e o total corretos no carrinho e no pedido enviado pelo WhatsApp. Atualizar preços e mensagens promocionais no catálogo e na página da camisa; manter frete grátis a partir de 5 camisas, que é uma regra separada.
4. **Informações ao final de cada camisa:** mostrar os tamanhos disponíveis e o adicional dos tamanhos especiais, mais uma descrição curta e cuidadosa do visual e acabamento. Não mencionar a China, materiais não confirmados, nem prometer equivalência verificável ao produto original; não usar a palavra “réplica”. Não inventar medidas em centímetros.
5. **Verificação:** testar deslize e setas, aparência das fotos em celular e computador, preço de 1 a 4 camisas (incluindo versões misturadas, tamanhos especiais e nome/número), remoção do desconto ao voltar para 3 peças e o texto do pedido no WhatsApp.

## Detalhes técnicos

- Manter `src/data/products.ts` como catálogo editável e fonte da ordem das fotos; centralizar cálculos em `src/lib/pricing.ts` e aplicar o desconto conforme a quantidade total em `src/lib/cart.tsx`.
- A galeria principal em `src/routes/produto.$id.tsx` terá navegação por toque/setas e miniaturas sincronizadas; os estilos de foto ficam nos tokens de `src/styles.css`.
- O arquivo enviado define a regra de preços; a decisão mais recente de retirar patches prevalece sobre a tabela de patches daquele arquivo.
