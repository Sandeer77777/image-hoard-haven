import { MessageCircle, Minus, Plus, Shirt, X } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";
import { WHATSAPP_NUMBER } from "@/data/products";

export function CartDrawer() {
  const { items, total, count, isOpen, close, changeQty, remove } = useCart();

  const sendToWhatsApp = () => {
    if (!items.length) return;
    let msg = "Olá! Vim pelo site *Mantoz Fut* e gostaria de fazer um pedido:\n\n";
    items.forEach((i) => {
      msg += `${i.qty}x ${i.name} — ${i.team} — ${formatPrice(i.price * i.qty)}\n`;
    });
    msg += `\n*${count} ${count === 1 ? "camisa" : "camisas"} — Total: ${formatPrice(total)}*`;
    if (count >= 5) msg += "\n(Frete grátis)";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <div
        className={`cart-overlay fixed inset-0 z-50 bg-black/35 ${isOpen ? "open" : ""}`}
        onClick={close}
      />
      <aside
        className={`cart-drawer fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-[400px] flex-col border-l border-border bg-background ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="font-display text-lg font-semibold text-foreground">Carrinho</h3>
          <button
            onClick={close}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Nenhum item no carrinho
            </div>
          ) : (
            items.map((i) => (
              <div key={i.id} className="flex gap-3.5 border-b border-border/60 py-4">
                <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden bg-secondary">
                  {i.image ? (
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  ) : (
                    <Shirt className="h-6 w-6 text-muted-foreground" strokeWidth={1} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 text-sm font-medium text-foreground">{i.name}</div>
                  <div className="mb-2 text-xs text-muted-foreground">{i.team}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(i.id, -1)}
                        className="flex h-[26px] w-[26px] items-center justify-center border border-border bg-secondary text-foreground transition-colors hover:border-muted-foreground"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-5 text-center text-sm">{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.id, 1)}
                        className="flex h-[26px] w-[26px] items-center justify-center border border-border bg-secondary text-foreground transition-colors hover:border-muted-foreground"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {formatPrice(i.price * i.qty)}
                    </div>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    className="mt-1.5 text-xs text-muted-foreground underline transition-colors hover:text-destructive"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="mb-4 bg-secondary px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
            Frete grátis na compra de 5 ou mais camisetas. Ao clicar no botão abaixo, seu pedido
            será enviado direto no nosso WhatsApp.
          </div>
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-[22px] font-bold text-foreground">
              {formatPrice(total)}
            </span>
          </div>
          <button className="btn-whatsapp" onClick={sendToWhatsApp} disabled={!items.length}>
            <MessageCircle className="h-4 w-4" />
            Enviar pedido via WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}
