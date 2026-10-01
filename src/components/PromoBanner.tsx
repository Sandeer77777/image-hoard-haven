import { useState } from "react";
import { X } from "lucide-react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gold px-10 py-2 text-center text-[12px] font-medium tracking-wide text-white">
      Combo 4+: R$ 30 de desconto por camisa &nbsp;|&nbsp; Frete grátis a partir de 5 camisas
      <button
        onClick={() => setVisible(false)}
        aria-label="Fechar aviso"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
