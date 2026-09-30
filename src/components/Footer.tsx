import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-secondary px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:justify-between sm:gap-8">
        <div>
          <h4 className="font-display mb-3 text-[15px] font-semibold text-foreground">Mantoz Fut</h4>
          <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            A melhor seleção de camisas de time do Brasil. Qualidade garantida.
          </p>
        </div>
        <div>
          <h4 className="font-display mb-3 text-[15px] font-semibold text-foreground">Navegação</h4>
          <a href="#catalogo" className="block text-[13px] leading-loose text-muted-foreground transition-colors hover:text-foreground">
            Catálogo
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="block text-[13px] leading-loose text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram
          </a>
        </div>
        <div>
          <h4 className="font-display mb-3 text-[15px] font-semibold text-foreground">Contato</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="block text-[13px] leading-loose text-muted-foreground transition-colors hover:text-foreground"
          >
            WhatsApp: (38) 98424-1631
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl border-t border-border pt-5 text-xs text-muted-foreground">
        &copy; 2026 Mantoz Fut. Todos os direitos reservados.
      </div>
    </footer>
  );
}
