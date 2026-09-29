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
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <button
            onClick={open}
            aria-label="Abrir carrinho"
            className="relative flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <ShoppingBag className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
