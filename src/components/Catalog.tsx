import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function Catalog() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [camp, setCamp] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const teams = useMemo(() => [...new Set(products.map((p) => p.team))].sort(), []);
  const camps = useMemo(() => [...new Set(products.map((p) => p.camp))].sort(), []);

  const q = norm(query.trim());
  const filtered = products.filter(
    (p) =>
      (!q || norm(`${p.name} ${p.team} ${p.camp} ${p.type}`).includes(q)) &&
      (!team || p.team === team) &&
      (!type || p.type === type) &&
      (!camp || p.camp === camp),
  );

  const clear = () => {
    setQuery("");
    setTeam("");
    setType("");
    setCamp("");
  };

  return (
    <div id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12">
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">Catálogo</h2>
        <span className="text-[13px] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por time, camisa ou campeonato"
          className="search-input w-full"
          aria-label="Buscar produtos"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        className="mb-4 flex items-center gap-2 border border-border px-3 py-2 text-[13px] text-foreground sm:hidden"
        aria-expanded={showFilters}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtrar
      </button>

      <div
        className={`mb-8 flex-wrap items-center gap-3 ${showFilters ? "flex" : "hidden"} sm:flex`}
      >
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
