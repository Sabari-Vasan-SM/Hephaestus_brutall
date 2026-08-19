import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/brutal";
import { categories, products, trendingSearches } from "@/lib/data";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, pushSearch, activeProducts } = useStore();

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return activeProducts
      .filter((p) =>
        [p.name, p.brand, p.categoryLabel, p.category, p.subtitle, ...p.colors]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [q, activeProducts]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[70] overflow-y-auto bg-background"
    >
      <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="border-[3px] border-foreground p-2 press brutal-shadow-sm"
          >
            <X width={20} height={20} strokeWidth={3} />
          </button>
        </div>

        <h1 className="mt-6 text-[clamp(2.2rem,9vw,5rem)]">
          What are
          <br />
          <span className="bg-zap px-2">you looking</span>
          <br />
          for?
        </h1>

        <div className="mt-8 flex items-center border-[3px] border-foreground brutal-shadow">
          <Search width={20} height={20} strokeWidth={3} className="ml-4 shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => pushSearch(q)}
            placeholder="SEARCH PRODUCTS…"
            aria-label="Search products"
            className="w-full bg-transparent px-4 py-4 font-display text-lg font-black uppercase tracking-tight outline-none placeholder:text-muted-foreground sm:text-2xl"
          />
        </div>

        {q.trim() ? (
          <div className="mt-8">
            <p className="label-xs mb-4">
              {results.length} RESULT{results.length === 1 ? "" : "S"}
            </p>
            {results.length === 0 ? (
              <div className="border-[3px] border-foreground p-8 text-center">
                <p className="font-display text-2xl font-black uppercase">Nothing here.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try “tee”, “cargo” or “hoodie”.
                </p>
              </div>
            ) : (
              <ul className="grid gap-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$productId"
                      params={{ productId: p.id }}
                      onClick={() => {
                        pushSearch(q);
                        onClose();
                      }}
                      className="flex items-center gap-4 border-[3px] border-foreground p-3 transition-colors hover:bg-zap"
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={80}
                        height={80}
                        loading="lazy"
                        className="h-16 w-16 border-2 border-foreground object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-black uppercase">
                          {p.name}
                        </span>
                        <span className="label-xs text-muted-foreground">{p.categoryLabel}</span>
                      </span>
                      <span className="font-display font-black">{inr(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {state.recentSearches.length > 0 && (
              <div>
                <h2 className="label-xs mb-3">RECENT SEARCHES</h2>
                <div className="flex flex-wrap gap-2">
                  {state.recentSearches.map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)}>
                      <Badge tone="paper">{s}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2 className="label-xs mb-3">TRENDING</h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((s) => (
                  <button key={s} type="button" onClick={() => setQ(s)}>
                    <Badge tone="zap">{s}</Badge>
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <h2 className="label-xs mb-3">POPULAR CATEGORIES</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/shop"
                    search={{ category: c.slug }}
                    onClick={onClose}
                    className="border-[3px] border-foreground p-4 font-display text-lg font-black uppercase transition-colors hover:bg-flare hover:text-background"
                  >
                    {c.slug}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
