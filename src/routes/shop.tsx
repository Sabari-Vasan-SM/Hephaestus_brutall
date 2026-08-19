import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGrid, List, SlidersHorizontal, X, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button, Input, Rating } from "@/components/brutal";
import { BRANDS, categories } from "@/lib/data";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";

type SortValue = "new" | "price-asc" | "price-desc" | "rating";

type ShopSearch = {
  q?: string | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  sale?: boolean | undefined;
  inStock?: boolean | undefined;
  sort?: SortValue | undefined;
  maxPrice?: number | undefined;
  size?: string | undefined;
  color?: string | undefined;
  rating?: number | undefined;
  view?: "grid" | "list" | undefined;
};

const SORTS: { value: SortValue; label: string }[] = [
  { value: "new", label: "NEWEST FIRST" },
  { value: "price-asc", label: "PRICE: LOW→HIGH" },
  { value: "price-desc", label: "PRICE: HIGH→LOW" },
  { value: "rating", label: "TOP RATED" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLORS = ["Black", "Bone", "Electric Yellow", "Washed Black", "Concrete", "Silver Gray", "Olive Drab"];
const MAX = 10000;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
    const num = Number(search["maxPrice"]);
    const rating = Number(search["rating"]);
    return {
      q: str(search["q"]),
      category: str(search["category"]),
      brand: str(search["brand"]),
      sale: search["sale"] === true || search["sale"] === "true" ? true : undefined,
      inStock: search["inStock"] === true || search["inStock"] === "true" ? true : undefined,
      sort: SORTS.some((s) => s.value === search["sort"])
        ? (search["sort"] as SortValue)
        : undefined,
      maxPrice: Number.isFinite(num) && num > 0 ? num : undefined,
      size: str(search["size"]),
      color: str(search["color"]),
      rating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
      view: search["view"] === "list" ? "list" : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All — BRUTAL. Streetwear Catalog" },
      {
        name: "description",
        content:
          "Filter the full BRUTAL. catalogue by category, brand, size, colour, price and rating. Limited-run streetwear.",
      },
      { property: "og:title", content: "Shop All — BRUTAL." },
      {
        property: "og:description",
        content: "Filter the full BRUTAL. catalogue. Limited-run streetwear.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { activeProducts } = useStore();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), resetScroll: false });

  const maxPrice = search.maxPrice ?? MAX;

  const list = useMemo(() => {
    let out = activeProducts.slice();
    const term = search.q?.trim().toLowerCase();
    if (term)
      out = out.filter((p) =>
        `${p.name} ${p.brand} ${p.sku} ${p.categoryLabel} ${p.subcategory} ${p.subtitle}`
          .toLowerCase()
          .includes(term),
      );
    if (search.category) out = out.filter((p) => p.category === search.category);
    if (search.brand) out = out.filter((p) => p.brand === search.brand);
    if (search.sale) out = out.filter((p) => !!p.compareAt || p.badges.includes("SALE"));
    if (search.inStock) out = out.filter((p) => p.stock > 0);
    if (search.size) out = out.filter((p) => p.sizes.includes(search.size!));
    if (search.color) out = out.filter((p) => p.colors.includes(search.color!));
    if (search.rating) out = out.filter((p) => p.rating >= search.rating!);
    out = out.filter((p) => p.price <= maxPrice);

    switch (search.sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        out.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        out.sort(
          (a, b) =>
            Number(b.newArrival || b.badges.includes("NEW")) -
            Number(a.newArrival || a.badges.includes("NEW")),
        );
        break;
      default:
        break;
    }
    return out;
  }, [activeProducts, search, maxPrice]);

  const activeCount = [
    search.category,
    search.brand,
    search.sale,
    search.inStock,
    search.size,
    search.color,
    search.rating,
    search.q,
  ].filter(Boolean).length;

  const clearAll = () => navigate({ search: {}, resetScroll: false });

  const Filters = (
    <div className="space-y-6">
      <div>
        <h3 className="label-xs mb-2">LIVE SEARCH</h3>
        <Input
          value={search.q ?? ""}
          onChange={(e) => set({ q: e.target.value || undefined })}
          placeholder="SEARCH PIECES, SKUS, LABELS…"
          aria-label="Search products"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className="label-xs mb-2">COLLECTIONS</h3>
        <div className="grid gap-1.5">
          <FilterButton active={!search.category} onClick={() => set({ category: undefined })}>
            ALL COLLECTIONS ({activeProducts.length})
          </FilterButton>
          {categories.map((c) => {
            const count = activeProducts.filter((p) => p.category === c.slug).length;
            return (
              <FilterButton
                key={c.slug}
                active={search.category === c.slug}
                onClick={() => set({ category: search.category === c.slug ? undefined : c.slug })}
              >
                {c.slug.toUpperCase()} ({count})
              </FilterButton>
            );
          })}
        </div>
      </div>

      {/* BRAND */}
      <div>
        <h3 className="label-xs mb-2">DESIGN LABS & BRANDS</h3>
        <div className="grid gap-1.5">
          <FilterButton active={!search.brand} onClick={() => set({ brand: undefined })}>
            ALL LABELS
          </FilterButton>
          {BRANDS.map((b) => (
            <FilterButton
              key={b}
              active={search.brand === b}
              onClick={() => set({ brand: search.brand === b ? undefined : b })}
            >
              {b}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="label-xs">MAX PRICE</h3>
          <span className="font-mono font-bold text-xs">{inr(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={999}
          max={MAX}
          step={500}
          value={maxPrice}
          aria-label="Maximum price"
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="w-full accent-foreground"
        />
      </div>

      {/* SIZES */}
      <div>
        <h3 className="label-xs mb-2">SIZE SPEC</h3>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <FilterChip
              key={s}
              active={search.size === s}
              onClick={() => set({ size: search.size === s ? undefined : s })}
            >
              {s}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <h3 className="label-xs mb-2">COLOR PROFILE</h3>
        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((c) => (
            <FilterChip
              key={c}
              active={search.color === c}
              onClick={() => set({ color: search.color === c ? undefined : c })}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* RATING */}
      <div>
        <h3 className="label-xs mb-2">CUSTOMER RATING</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {[4.8, 4.5, 4.0].map((r) => (
            <FilterButton
              key={r}
              active={search.rating === r}
              onClick={() => set({ rating: search.rating === r ? undefined : r })}
            >
              {r}★+
            </FilterButton>
          ))}
        </div>
      </div>

      {/* TOGGLES */}
      <div className="space-y-2 pt-2 border-t border-zinc-200">
        <FilterButton
          active={!!search.sale}
          onClick={() => set({ sale: search.sale ? undefined : true })}
        >
          🔥 ON SALE / DISCOUNTED
        </FilterButton>
        <FilterButton
          active={!!search.inStock}
          onClick={() => set({ inStock: search.inStock ? undefined : true })}
        >
          📦 IN STOCK ONLY
        </FilterButton>
      </div>

      {activeCount > 0 && (
        <Button variant="outline" full onClick={clearAll} type="button">
          Clear ({activeCount}) filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-xs bg-foreground px-2 py-1 text-background">CATALOGUE</span>
          <span className="label-xs bg-zap px-2 py-1 font-black">
            {activeProducts.length} ACTIVE SILHOUETTES
          </span>
        </div>
        <h1 className="mt-4 text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase font-display leading-[0.9] tracking-tight">
          Shop
          <br />
          the archive.
        </h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            {Filters}
          </div>
        </aside>

        {/* Product Grid Area */}
        <section>
          {/* Action Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-[3px] border-foreground bg-background p-3 brutal-shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="label-xs flex items-center gap-2 border-[2px] border-foreground bg-zap px-3 py-2 lg:hidden press font-black"
              >
                <SlidersHorizontal width={14} height={14} strokeWidth={3} />
                <span>FILTERS {activeCount ? `(${activeCount})` : ""}</span>
              </button>

              <label className="label-xs flex items-center gap-2 border-[2px] border-foreground bg-smoke/40 px-3 py-2">
                <span className="text-muted-foreground">SORT:</span>
                <select
                  value={search.sort ?? ""}
                  onChange={(e) =>
                    set({ sort: (e.target.value || undefined) as SortValue | undefined })
                  }
                  className="bg-transparent text-xs font-bold uppercase outline-none"
                  aria-label="Sort products"
                >
                  <option value="">FEATURED</option>
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="label-xs text-muted-foreground font-mono">
                SHOWING <strong>{list.length}</strong> OF {activeProducts.length} PIECES
              </span>

              <div className="hidden items-center gap-1 sm:flex">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={search.view !== "list"}
                  onClick={() => set({ view: undefined })}
                  className={
                    "border-[2px] border-foreground p-1.5 press " +
                    (search.view !== "list" ? "bg-zap" : "bg-background")
                  }
                >
                  <LayoutGrid width={16} height={16} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={search.view === "list"}
                  onClick={() => set({ view: "list" })}
                  className={
                    "border-[2px] border-foreground p-1.5 press " +
                    (search.view === "list" ? "bg-zap" : "bg-background")
                  }
                >
                  <List width={16} height={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {list.length === 0 ? (
            <div className="border-[3px] border-foreground bg-background p-12 text-center brutal-shadow">
              <h2 className="font-display text-3xl font-black uppercase">NO PIECES FOUND</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No active silhouettes matched the applied filter criteria.
              </p>
              <div className="mt-6 flex justify-center">
                <Button variant="zap" onClick={clearAll} type="button">
                  RESET ALL FILTERS
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={
                search.view === "list"
                  ? "grid gap-4"
                  : "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3"
              }
            >
              {list.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout={search.view === "list" ? "list" : "grid"}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[65] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-foreground/50"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t-[3px] border-foreground bg-background p-5">
            <div className="mb-5 flex items-center justify-between border-b-[2px] border-foreground pb-3">
              <span className="font-display text-2xl font-black uppercase">FILTER CATALOG</span>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="border-[2px] border-foreground p-2"
              >
                <X width={18} height={18} strokeWidth={3} />
              </button>
            </div>
            {Filters}
            <div className="mt-6">
              <Button variant="solid" full onClick={() => setFiltersOpen(false)} type="button">
                SHOW {list.length} RESULTS
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quality Footnote */}
      <div className="mt-14 border-[3px] border-foreground bg-smoke p-6 brutal-shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-xs text-muted-foreground">
            Every BRUTAL. silhouette is produced in Tiruppur and Tokyo with 14-day hassle-free returns.
            Rated <span className="font-bold text-foreground">4.8★ average</span> across customer reviews.
          </p>
          <Rating value={4.8} count={activeProducts.reduce((n, p) => n + p.reviewCount, 0)} size={18} />
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "label-xs border-[2px] border-foreground px-3 py-2 text-left font-bold transition-colors " +
        (active ? "bg-foreground text-background" : "bg-background hover:bg-zap")
      }
    >
      {children}
    </button>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "label-xs border-[2px] border-foreground px-2.5 py-1.5 transition-colors font-bold " +
        (active ? "bg-flare text-white" : "bg-background hover:bg-zap")
      }
    >
      {children}
    </button>
  );
}

