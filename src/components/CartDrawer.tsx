import { MessageCircle, Minus, Plus, Shirt, X } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";
import { WHATSAPP_NUMBER } from "@/data/products";
import { customizationSummary } from "@/lib/pricing";

export function CartDrawer() {
    const { items, total, count, isOpen, close, changeQty, remove } = useCart();

  const sendToWhatsApp = () => {
        if (!items.length) return;
        let msg = "Olá! Vim pelo site *Mantoz Fut* e gostaria de fazer um pedido:\n\n";
        items.forEach((i) => {
                const summary = customizationSummary(i.custom);
                msg += `${i.qty}x ${i.product.name} — ${i.product.team}\n`;
                msg += `   ${summary.join(" | ")}\n`;
                msg += `   Subtotal: ${formatPrice(i.unit * i.qty)}\n\n`;
        });
        msg += `*${count} ${count === 1 ? "camisa" : "camisas"} — Total: ${formatPrice(total)}*`;
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
                        className={`cart-drawer fixed bottom-0 right-0 top-0 z-[60] flex w-full flex-col border-l border-border bg-background sm:w-[92vw] sm:max-w-[420px] ${isOpen ? "open" : ""}`}
                        aria-hidden={!isOpen}
                      >
                      <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-5 py-5">
                                <h3 className="font-display text-lg font-semibold text-foreground">Carrinho</h3>h3>
                                <button
                                              onClick={close}
                                              className="text-muted-foreground transition-colors hover:text-foreground"
                                              aria-label="Fechar carrinho"
                                            >
                                            <X className="h-5 w-5" />
                                </button>button>
                      </div>div>
              
                      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                        {items.length === 0 ? (
                                    <div className="py-12 text-center text-sm text-muted-foreground">
                                                  Nenhum item no carrinho
                                    </div>div>
                                  ) : (
                                    items.map((item, idx) => {
                                                    const summary = customizationSummary(item.custom);
                                                    return (
                                                                      <div
                                                                                          key={item.key}
                                                                                          className="cart-item flex gap-3.5 border-b border-border/60 py-4"
                                                                                          style={{ animationDelay: `${Math.min(idx, 8) * 50}ms` }}
                                                                                        >
                                                                                        <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden bg-secondary">
                                                                                          {item.product.image ? (
                                                                                                                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                                                                                                              ) : (
                                                                                                                <Shirt className="h-6 w-6 text-muted-foreground" strokeWidth={1} />
                                                                                                              )}
                                                                                          </div>div>
                                                                                        <div className="min-w-0 flex-1">
                                                                                                            <div className="mb-0.5 text-sm font-medium text-foreground">{item.product.name}</div>div>
                                                                                                            <div className="mb-1 text-xs text-muted-foreground">{item.product.team}</div>div>
                                                                                                            <div className="mb-2 space-y-0.5">
                                                                                                              {summary.map((line, i) => (
                                                                                                                  <div key={i} className="text-[11px] text-muted-foreground">{line}</div>div>
                                                                                                                ))}
                                                                                                              </div>div>
                                                                                                            <div className="flex items-center justify-between gap-2">
                                                                                                                                  <div className="flex items-center gap-2">
                                                                                                                                                          <button
                                                                                                                                                                                      onClick={() => changeQty(item.key, -1)}
                                                                                                                                                                                      className="flex h-[26px] w-[26px] items-center justify-center border border-border bg-secondary text-foreground transition-colors hover:border-muted-foreground"
                                                                                                                                                                                      aria-label="Diminuir quantidade"
                                                                                                                                                                                    >
                                                                                                                                                                                    <Minus className="h-3.5 w-3.5" />
                                                                                                                                                            </button>button>
                                                                                                                                                          <span className="min-w-5 text-center text-sm">{item.qty}</span>span>
                                                                                                                                                          <button
                                                                                                                                                                                      onClick={() => changeQty(item.key, 1)}
                                                                                                                                                                                      className="flex h-[26px] w-[26px] items-center justify-center border border-border bg-secondary text-foreground transition-colors hover:border-muted-foreground"
                                                                                                                                                                                      aria-label="Aumentar quantidade"
                                                                                                                                                                                    >
                                                                                                                                                                                    <Plus className="h-3.5 w-3.5" />
                                                                                                                                                            </button>button>
                                                                                                                                    </div>div>
                                                                                                                                  <div className="whitespace-nowrap text-sm font-semibold text-foreground">
                                                                                                                                    {formatPrice(item.unit * item.qty)}
                                                                                                                                    </div>div>
                                                                                                              </div>div>
                                                                                                            <button
                                                                                                                                    onClick={() => remove(item.key)}
                                                                                                                                    className="mt-1.5 text-xs text-muted-foreground underline transition-colors hover:text-destructive"
                                                                                                                                  >
                                                                                                                                  Remover
                                                                                                              </button>button>
                                                                                          </div>div>
                                                                      </div>div>
                                                                    );
                                    })
                                  )}
                      </div>div>
              
                      <div className="flex-shrink-0 border-t border-border px-5 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                                <div className="mb-4 bg-secondary px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                                            Frete grátis a partir de 5 camisas. Finalize seu pedido pelo WhatsApp — rápido e sem
                                            burocracia.
                                </div>div>
                                <div className="mb-4 flex items-baseline justify-between">
                                            <span className="text-sm text-muted-foreground">Total</span>span>
                                            <span className="font-display text-[22px] font-bold text-foreground">
                                              {formatPrice(total)}
                                            </span>span>
                                </div>div>
                                <button
                                              className={`btn-whatsapp ${items.length ? "pulse" : ""}`}
                                              onClick={sendToWhatsApp}
                                              disabled={!items.length}
                                            >
                                            <MessageCircle className="h-4 w-4" />
                                            Enviar pedido via WhatsApp
                                </button>button>
                      </div>div>
              </aside>aside>
        </>>
      );
}
</>
