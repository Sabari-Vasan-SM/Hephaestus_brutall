import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button, Input, Rating } from "@/components/brutal";
import { categories, products } from "@/lib/data";
import { inr } from "@/lib/format";

type SortValue = "new" | "price-asc" | "price-desc" | "rating";

type ShopSearch = {
  q?: string | undefined;
  category?: string | undefined;
  sale?: boolean | undefined;
  sort?: SortValue | undefined;
  maxPrice?: number | undefined;
  size?: string | undefined;
  color?: string | undefined;
  rating?: number | undefined;
  view?: "grid" | "list" | undefined;
};

const SORTS: { value: SortValue; label: string }[] = [
  { value: "new", label: "NEWEST" },
  { value: "price-asc", label: "PRICE: LOW→HIGH" },
  { value: "price-desc", label: "PRICE: HIGH→LOW" },
  { value: "rating", label: "TOP RATED" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "One Size"];
const COLORS = ["Black", "Bone", "Electric Yellow", "Washed Black", "Concrete", "Black / White"];
const MAX = 7000;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
    const num = Number(search["maxPrice"]);
    const rating = Number(search["rating"]);
    return {
      q: str(search["q"]),
      category: str(search["category"]),
      sale: search["sale"] === true || search["sale"] === "true" ? true : undefined,
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
      { title: "Shop All — BRUTAL." },
      {
        name: "description",
        content:
          "Filter the full BRUTAL. catalogue by category, size, colour, price and rating. Limited-run streetwear.",
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
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), resetScroll: false });

  const maxPrice = search.maxPrice ?? MAX;

  const list = useMemo(() => {
    let out = products.slice();
    const term = search.q?.trim().toLowerCase();
    if (term)
      out = out.filter((p) =>
        `${p.name} ${p.categoryLabel} ${p.subtitle}`.toLowerCase().includes(term),
      );
    if (search.category) out = out.filter((p) => p.category === search.category);
    if (search.sale) out = out.filter((p) => !!p.compareAt);
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
        out.sort((a, b) => Number(b.badges.includes("NEW")) - Number(a.badges.includes("NEW")));
        break;
      default:
        break;
    }
    return out;
  }, [search, maxPrice]);

  const activeCount = [
    search.category,
    search.sale,
    search.size,
    search.color,
    search.rating,
    search.q,
  ].filter(Boolean).length;

  const clearAll = () => navigate({ search: {}, resetScroll: false });

  const Filters = (
    <div className="space-y-8">
      <div>
        <h3 className="label-xs mb-3">SEARCH</h3>
        <Input
          value={search.q ?? ""}
          onChange={(e) => set({ q: e.target.value || undefined })}
          placeholder="SEARCH…"
          aria-label="Search products"
        />
      </div>

      <div>
        <h3 className="label-xs mb-3">CATEGORY</h3>
        <div className="grid gap-2">
          <FilterButton active={!search.category} onClick={() => set({ category: undefined })}>
            ALL
          </FilterButton>
          {categories.map((c) => (
            <FilterButton
              key={c.slug}
              active={search.category === c.slug}
              onClick={() => set({ category: search.category === c.slug ? undefined : c.slug })}
            >
              {c.slug.toUpperCase()}
            </FilterButton>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-xs mb-3">MAX PRICE — {inr(maxPrice)}</h3>
        <input
          type="range"
          min={999}
          max={MAX}
          step={500}
          value={maxPrice}
          aria-label="Maximum price"
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[oklch(0.667_0.234_39.5)]"
        />
      </div>

      <div>
        <h3 className="label-xs mb-3">SIZE</h3>
        <div className="flex flex-wrap gap-2">
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

      <div>
        <h3 className="label-xs mb-3">COLOUR</h3>
        <div className="flex flex-wrap gap-2">
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

      <div>
        <h3 className="label-xs mb-3">RATING</h3>
        <div className="grid gap-2">
          {[4.5, 4, 3].map((r) => (
            <FilterButton
              key={r}
              active={search.rating === r}
              onClick={() => set({ rating: search.rating === r ? undefined : r })}
            >
              {r}★ & UP
            </FilterButton>
          ))}
        </div>
      </div>

      <div>
        <h3 className="label-xs mb-3">OFFERS</h3>
        <FilterButton
          active={!!search.sale}
          onClick={() => set({ sale: search.sale ? undefined : true })}
        >
          ON SALE ONLY
        </FilterButton>
      </div>

      <Button variant="outline" full onClick={clearAll} type="button">
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8">
        <span className="label-xs bg-foreground px-2 py-1 text-background">CATALOGUE</span>
        <h1 className="mt-4 text-[clamp(2.8rem,10vw,6rem)]">
          Shop
          <br />
          the drop.
        </h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-[3px] border-foreground p-5 brutal-shadow-sm">
            {Filters}
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="label-xs flex items-center gap-2 border-[3px] border-foreground px-4 py-3 lg:hidden"
            >
              <SlidersHorizontal width={14} height={14} strokeWidth={3} /> FILTER
              {activeCount ? ` (${activeCount})` : ""}
            </button>

            <label className="label-xs flex items-center gap-2 border-[3px] border-foreground px-3 py-2">
              SORT
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

            <span className="label-xs text-muted-foreground">{list.length} PRODUCTS</span>

            <div className="ml-auto hidden items-center gap-1 sm:flex">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={search.view !== "list"}
                onClick={() => set({ view: undefined })}
                className={
                  "border-[3px] border-foreground p-2 " + (search.view !== "list" ? "bg-zap" : "")
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
                  "border-[3px] border-foreground p-2 " + (search.view === "list" ? "bg-zap" : "")
                }
              >
                <List width={16} height={16} strokeWidth={3} />
              </button>
            </div>
          </div>

          {list.length === 0 ? (
            <div className="border-[3px] border-foreground p-12 text-center brutal-shadow-sm">
              <h2 className="text-3xl">No matches.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Loosen the filters and try again.
              </p>
              <div className="mt-6 flex justify-center">
                <Button variant="zap" onClick={clearAll} type="button">
                  Reset filters
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

      {filtersOpen && (
        <div className="fixed inset-0 z-[65] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t-[3px] border-foreground bg-background p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-2xl font-black">FILTERS</span>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="border-[3px] border-foreground p-2"
              >
                <X width={18} height={18} strokeWidth={3} />
              </button>
            </div>
            {Filters}
            <div className="mt-6">
              <Button variant="solid" full onClick={() => setFiltersOpen(false)} type="button">
                Show {list.length} results
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-14 border-[3px] border-foreground bg-muted p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-sm text-muted-foreground">
            Every BRUTAL. product ships with free returns for 14 days. Rated{" "}
            <span className="font-bold text-foreground">4.6 average</span> across {products.length}{" "}
            pieces.
          </p>
          <Rating value={4.6} count={products.reduce((n, p) => n + p.reviewCount, 0)} size={18} />
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
        "label-xs border-[3px] border-foreground px-3 py-2 text-left transition-colors " +
        (active ? "bg-foreground text-background" : "hover:bg-zap")
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
        "label-xs border-2 border-foreground px-2.5 py-1.5 transition-colors " +
        (active ? "bg-flare text-background" : "hover:bg-zap")
      }
    >
      {children}
    </button>
  );
}
