import { useState } from "react";
import { Shirt } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";
import { SIZES, type Product } from "@/data/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [size, setSize] = useState("");
  const [pressed, setPressed] = useState(false);

  const handleAdd = () => {
    setPressed(true);
    window.setTimeout(() => setPressed(false), 120);
    add(product, size);
  };

  return (
    <div
      className="card-reveal product-card group flex flex-col"
      style={{ animationDelay: `${Math.min(index, 11) * 50}ms` }}
    >
      <div className="product-media mb-3 flex aspect-[3/4] items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.team}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="product-placeholder flex flex-col items-center gap-2">
            <Shirt className="h-10 w-10" strokeWidth={1} />
            <span className="text-[13px]">Foto do produto</span>
          </div>
        )}
      </div>
      <div className="mb-1 text-[11px] font-medium text-gold">{product.team}</div>
      <div className="mb-1 text-[15px] font-semibold text-foreground">{product.name}</div>
      <div className="mb-2.5 text-[13px] text-muted-foreground">
        {product.type} · {product.camp}
      </div>

      <div className="mt-auto">
        <div className="mb-3 text-base font-semibold text-foreground">
          {formatPrice(product.price)}
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(size === s ? "" : s)}
              className={`size-chip ${size === s ? "selected" : ""}`}
              aria-pressed={size === s}
              aria-label={`Tamanho ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className={`btn-add w-full sm:w-auto ${pressed ? "pressed" : ""}`}
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
