import { Instagram, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { INSTAGRAM_URL } from "@/data/products";

export function Header() {
  const { count, open } = useCart();

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-display text-[22px] font-bold tracking-wide text-foreground">
          Mantoz <span className="text-gold">Fut</span>
        </a>
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <button
            onClick={open}
            className="relative flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            Carrinho
            {count > 0 && (
              <span className="absolute -right-3.5 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
