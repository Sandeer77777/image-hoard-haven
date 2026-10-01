import { useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MessageCircle, Shirt, X } from "lucide-react";
import { CartProvider, formatPrice, useCart } from "@/lib/cart";
import {
  ALL_SIZES,
  NAME_NUMBER_PRICE,
  COMBO_DISCOUNT,
  COMBO_MINIMUM,
  SPECIAL_SIZE_PRICE,
  customizationSummary,
  emptyCustomization,
  isSpecialSize,
  priceLines,
  unitPrice,
} from "@/lib/pricing";
import { getProduct, productImages, WHATSAPP_NUMBER, type Product } from "@/data/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const product = getProduct(Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Camisa não encontrada — Mantoz Fut" },
          { name: "description", content: "Esta camisa não foi encontrada no catálogo da Mantoz Fut." },
          { property: "og:title", content: "Camisa não encontrada — Mantoz Fut" },
          { property: "og:description", content: "Esta camisa não foi encontrada no catálogo da Mantoz Fut." },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.team} | Mantoz Fut`;
    const description = `${product.name} do ${product.team} (${product.type} · ${product.camp}) a partir de ${formatPrice(product.price)}. Escolha tamanho, nome e número e peça pelo WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display mb-3 text-2xl font-semibold">Camisa não encontrada</h1>
      <Link to="/" className="text-gold underline">
        Voltar ao catálogo
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <ProductDetail product={product} />
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const { add, count } = useCart();
  const images = productImages(product);
  const [mainImage, setMainImage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [custom, setCustom] = useState(() => emptyCustomization());
  const [withName, setWithName] = useState(false);
  const [added, setAdded] = useState(false);

  const effective = withName
    ? custom
    : { ...custom, playerName: "", playerNumber: "" };
  const lines = priceLines(product, effective);
  const total = unitPrice(product, effective);
  const nextCount = count + 1;
  const comboPrice = total - (nextCount >= COMBO_MINIMUM ? COMBO_DISCOUNT : 0);
  const moveImage = (direction: number) => setMainImage((current) => (current + direction + images.length) % images.length);

  const handleAdd = () => {
    add(product, effective);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const buyOnWhatsApp = () => {
    let msg = "Olá! Vi no site *Mantoz Fut* e quero comprar:\n\n";
    msg += `${product.name} — ${product.team}${product.season ? ` ${product.season}` : ""}\n`;
    customizationSummary(effective).forEach((part) => {
      msg += `${part}\n`;
    });
    msg += `\nTotal desta camisa: ${formatPrice(total)}`;
    msg += `\nCombo 4+: ${formatPrice(COMBO_DISCOUNT)} de desconto por camisa a partir de ${COMBO_MINIMUM} peças no mesmo pedido. Para aproveitar, adicione as camisas ao carrinho.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-[13px] text-muted-foreground no-underline transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
        {/* Galeria */}
        <div className="min-w-0">
          <div
            className="product-media relative flex aspect-[3/4] w-full touch-pan-y items-center justify-center overflow-hidden"
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              const endX = event.changedTouches[0]?.clientX;
              if (touchStartX.current !== null && endX !== undefined && images.length > 1 && Math.abs(endX - touchStartX.current) > 40) {
                moveImage(endX < touchStartX.current ? 1 : -1);
              }
              touchStartX.current = null;
            }}
          >
            {images.length ? (
              <button type="button" onClick={() => setZoom(true)} className="h-full w-full" aria-label="Ampliar foto">
                <img src={images[mainImage]} alt={`${product.name} — ${product.team}, foto ${mainImage + 1}`} className="h-full w-full object-contain" />
              </button>
            ) : (
              <span className="product-placeholder flex flex-col items-center gap-2">
                <Shirt className="h-12 w-12" strokeWidth={1} />
                <span className="text-sm">Foto do produto</span>
              </span>
            )}
            {images.length > 1 && <>
              <button type="button" onClick={() => moveImage(-1)} className="detail-arrow left-3" aria-label="Foto anterior"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => moveImage(1)} className="detail-arrow right-3" aria-label="Próxima foto"><ChevronRight className="h-5 w-5" /></button>
            </>}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setMainImage(i)}
                  className={`h-20 w-16 flex-shrink-0 overflow-hidden border ${i === mainImage ? "border-gold" : "border-border"}`}
                  aria-label={`Ver foto ${i + 1}`}
                >
                   <img src={src} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações e personalização */}
        <div className="min-w-0">
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gold">
            {product.team}
          </div>
          <h1 className="font-display mb-1 text-3xl font-bold text-foreground">{product.name}</h1>
          <div className="mb-5 text-[13px] text-muted-foreground">
            {product.type} · {product.camp}
            {product.season ? ` · ${product.season}` : ""}
          </div>

          <div className="mb-2 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-foreground">
              {formatPrice(total)}
            </span>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">Combo 4+: {formatPrice(product.price - COMBO_DISCOUNT)} por camisa a partir de 4 peças. Adicionais à parte.</p>

          {/* Tamanho */}
          <div className="mb-6">
            <div className="mb-2 text-sm font-semibold text-foreground">Tamanho</div>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setCustom((c) => ({ ...c, size: c.size === s ? "" : s }))
                  }
                  className={`size-chip size-chip-lg ${custom.size === s ? "selected" : ""}`}
                  aria-pressed={custom.size === s}
                >
                  {s}
                </button>
              ))}
            </div>
            {isSpecialSize(custom.size) && (
              <div className="mt-2 text-xs text-muted-foreground">
                Tamanho especial: +{formatPrice(SPECIAL_SIZE_PRICE)}
              </div>
            )}
          </div>

          {/* Nome e número */}
          <div className="mb-6">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground">
              <input
                type="checkbox"
                checked={withName}
                onChange={(e) => setWithName(e.target.checked)}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              Adicionar nome e número (+{formatPrice(NAME_NUMBER_PRICE)})
            </label>

            {withName && (
              <div className="mt-3 space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={custom.playerName}
                    maxLength={15}
                    onChange={(e) =>
                      setCustom((c) => ({ ...c, playerName: e.target.value.toUpperCase() }))
                    }
                    placeholder="NOME"
                    className="search-input flex-1 !pl-3 uppercase"
                    aria-label="Nome na camisa"
                  />
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={custom.playerNumber}
                    onChange={(e) =>
                      setCustom((c) => ({ ...c, playerNumber: e.target.value.slice(0, 2) }))
                    }
                    placeholder="Nº"
                    className="search-input w-20 !pl-3"
                    aria-label="Número na camisa"
                  />
                </div>
                <div className="flex flex-col items-center gap-1 bg-secondary px-4 py-5">
                  <span className="font-display text-xl font-bold tracking-[0.2em] text-foreground">
                    {custom.playerName || "SEU NOME"}
                  </span>
                  <span className="font-display text-4xl font-bold leading-none text-foreground">
                    {custom.playerNumber || "10"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="mb-6 bg-secondary px-4 py-4 text-[13px]">
            {lines.map((l, i) => (
              <div key={i} className="flex justify-between py-0.5 text-muted-foreground">
                <span>{l.label}</span>
                <span>{formatPrice(l.value)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-[15px] font-semibold text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button className="btn-gold mb-3 w-full" onClick={handleAdd}>
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Adicionado!
              </>
            ) : (
              "Adicionar ao carrinho"
            )}
          </button>
          <button className="btn-whatsapp" onClick={buyOnWhatsApp}>
            <MessageCircle className="h-4 w-4" />
            Comprar pelo WhatsApp
          </button>
          {nextCount >= COMBO_MINIMUM && <p className="mt-2 text-xs text-muted-foreground">No carrinho, esta camisa entra por {formatPrice(comboPrice)} com o Combo 4+.</p>}
        </div>
      </div>

      <section className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <h2 className="font-display mb-3 text-xl font-semibold">Tamanhos</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Disponível para consulta em P, M, G, GG, 2XL, 3XL e 4XL. Tamanhos 2XL a 4XL têm adicional de {formatPrice(SPECIAL_SIZE_PRICE)}. Confirme a disponibilidade do tamanho escolhido no pedido.</p>
        </div>
        <div>
          <h2 className="font-display mb-3 text-xl font-semibold">Sobre a camisa</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Uma camisa para vestir as cores do seu time com atenção ao visual e aos detalhes. Consulte as fotos de cada peça e escolha a versão, o tamanho e a personalização que combinam com você.</p>
        </div>
      </section>

      {zoom && images.length > 0 && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setZoom(false)}
        >
          <button
            className="absolute right-5 top-5 text-white"
            aria-label="Fechar"
            onClick={() => setZoom(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={images[mainImage]}
            alt={`${product.name} ampliada`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
