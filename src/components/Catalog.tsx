import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function Catalog() {
  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [camp, setCamp] = useState("");

  const teams = useMemo(() => [...new Set(products.map((p) => p.team))].sort(), []);
  const camps = useMemo(() => [...new Set(products.map((p) => p.camp))].sort(), []);

  const filtered = products.filter(
    (p) => (!team || p.team === team) && (!type || p.type === type) && (!camp || p.camp === camp),
  );

  const clear = () => {
    setTeam("");
    setType("");
    setCamp("");
  };

  return (
    <div id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-display text-2xl font-semibold text-foreground">Catálogo</h2>
          <span className="text-[13px] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select className="filter-select" value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">Time</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Tipo</option>
            <option value="Retrô">Retrô</option>
            <option value="Atual">Atual</option>
          </select>
          <select className="filter-select" value={camp} onChange={(e) => setCamp(e.target.value)}>
            <option value="">Campeonato</option>
            {camps.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={clear}
            className="text-[13px] text-muted-foreground underline transition-colors hover:text-foreground"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[15px] text-muted-foreground">
            Nenhum produto encontrado
          </div>
        ) : (
          filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
        )}
      </div>
    </div>
  );
}
