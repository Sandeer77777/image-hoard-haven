import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/cart";
import { productImages, type Product } from "@/data/products";
import { ProductCarousel } from "./ProductCarousel";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const images = productImages(product);

  return (
    <div
      className="card-reveal product-card group flex flex-col"
      style={{ animationDelay: `${Math.min(index, 11) * 50}ms` }}
    >
      <div className="mb-3">
        <ProductCarousel images={images} alt={`${product.name} — ${product.team}`} />
      </div>

      <Link
        to="/produto/$id"
        params={{ id: String(product.id) }}
        className="flex flex-1 flex-col no-underline"
      >
        <div className="mb-1 text-[11px] font-medium text-gold">{product.team}</div>
        <div className="mb-1 text-[15px] font-semibold text-foreground">{product.name}</div>
        <div className="mb-2.5 text-[13px] text-muted-foreground">
          {product.type} · {product.camp}
        </div>

        <div className="mt-auto">
          <div className="mb-3 text-base font-semibold text-foreground">
            <span className="text-[12px] font-normal text-muted-foreground">A partir de </span>
            {formatPrice(product.price)}
          </div>
          <div className="mb-3 text-xs text-muted-foreground">Leve 4, pague 3 · menor valor grátis</div>
          <span className="btn-add block w-full text-center sm:inline-block sm:w-auto">
            Ver opções
          </span>
        </div>
      </Link>
    </div>
  );
}
