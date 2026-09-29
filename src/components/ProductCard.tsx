import { Shirt } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";
import type { Product } from "@/data/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();

  return (
    <div
      className="card-reveal group cursor-pointer transition-opacity hover:opacity-85"
      style={{ animationDelay: `${Math.min(index, 11) * 40}ms` }}
    >
      <div className="mb-3 flex aspect-[3/4] items-center justify-center overflow-hidden bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.team}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Shirt className="h-10 w-10" strokeWidth={1} />
            <span className="text-[13px]">Foto do produto</span>
          </div>
        )}
      </div>
      <div className="mb-1 text-xs font-medium text-gold">{product.team}</div>
      <div className="mb-1 text-[15px] font-medium text-foreground">{product.name}</div>
      <div className="mb-2.5 text-[13px] text-muted-foreground">
        {product.type} · {product.camp}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-foreground">{formatPrice(product.price)}</span>
        <button className="btn-add" onClick={() => add(product)}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
