import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function FilterGroup({ title, options, value, onChange, name }: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-semibold text-foreground">{title}</legend>
      <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
        {["", ...options].map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 py-1 text-sm text-foreground">
            <input type="radio" name={name} value={option} checked={value === option}
              onChange={() => onChange(option)} className="h-4 w-4 shrink-0 accent-gold" />
            <span className="min-w-0 break-words">{option || "Todos"}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Catalog() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [camp, setCamp] = useState("");
  const [category, setCategory] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const teams = useMemo(() => [...new Set(products.map((p) => p.team))].sort((a, b) => a.localeCompare(b, "pt-BR")), []);
  const camps = useMemo(() => [...new Set(products.map((p) => p.camp))].sort((a, b) => a.localeCompare(b, "pt-BR")), []);
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), []);
  const q = norm(query.trim());
  const filtered = products.filter((p) =>
    (!q || norm(`${p.name} ${p.team} ${p.camp} ${p.type}`).includes(q)) &&
    (!team || p.team === team) && (!type || p.type === type) &&
    (!camp || p.camp === camp) && (!category || p.category === category),
  );
  const activeFilters = [team, type, camp, category].filter(Boolean).length;
  const clear = () => { setQuery(""); setTeam(""); setType(""); setCamp(""); setCategory(""); };
  const filterGroups = (prefix: string) => (
    <div className="space-y-6">
      <FilterGroup title="Times" options={teams} value={team} onChange={setTeam} name={`${prefix}-team`} />
      <FilterGroup title="Tipo" options={["Atual", "Retrô"]} value={type} onChange={setType} name={`${prefix}-type`} />
      <FilterGroup title="Campeonato" options={camps} value={camp} onChange={setCamp} name={`${prefix}-camp`} />
      <FilterGroup title="Categoria" options={categories} value={category} onChange={setCategory} name={`${prefix}-category`} />
      {(activeFilters > 0 || query) && <Button variant="outline" className="w-full" onClick={clear}>Limpar filtros{activeFilters > 0 ? ` (${activeFilters})` : ""}</Button>}
    </div>
  );

  return (
    <section id="catalogo" aria-label="Catálogo" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-12">
      <div className="mb-8">
        <div className="mb-5 flex flex-wrap items-baseline gap-3">
          <h2 className="font-display text-3xl font-semibold text-foreground">Catálogo</h2>
          <span role="status" className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</span>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por time, camisa ou campeonato" className="search-input w-full" aria-label="Buscar produtos" />
        </div>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside aria-label="Filtros do catálogo" className="hidden border-r border-border pr-6 lg:block">
          <div className="sticky top-24">{filterGroups("desktop")}</div>
        </aside>
        <div className="min-w-0">
          <Dialog.Root open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
            <Dialog.Trigger asChild>
              <Button variant="outline" className="mb-4 w-full lg:hidden"><SlidersHorizontal />Filtros{activeFilters > 0 ? ` (${activeFilters})` : ""}</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/50" />
              <Dialog.Content aria-describedby={undefined} className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-full flex-col border-r border-border bg-background text-foreground shadow-lg">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <Dialog.Title className="font-display text-xl font-semibold">Filtros</Dialog.Title>
                  <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Fechar filtros"><X /></Button></Dialog.Close>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-6">{filterGroups("mobile")}</div>
                <div className="border-t border-border p-4"><Dialog.Close asChild><Button className="w-full">Ver {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</Button></Dialog.Close></div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
