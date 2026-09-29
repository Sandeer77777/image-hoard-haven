import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function Featured() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  if (!featured.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-12">
      <h2 className="font-display mb-6 text-2xl font-semibold text-foreground">Mais pedidos</h2>

      {/* mobile: scroll lateral / desktop: grid */}
      <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0">
        {featured.map((p, i) => (
          <div key={p.id} className="w-[60%] flex-shrink-0 snap-start sm:w-auto">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
