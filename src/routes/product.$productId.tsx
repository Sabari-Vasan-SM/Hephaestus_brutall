import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Heart, Truck, RotateCcw, Ruler } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Badge, Button, Rating, badgeTone } from "@/components/brutal";
import { getProduct, products } from "@/lib/data";
import { discountPct, inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — BRUTAL." }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — BRUTAL.` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — BRUTAL.` },
        { property: "og:description", content: p.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [size, setSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const saved = inWishlist(product.id);
  const off = discountPct(product.price, product.compareAt);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);

  const add = () => {
    if (!size) {
      setSizeError(true);
      toast.error("PICK A SIZE FIRST");
      return false;
    }
    addToCart(product, size, color, qty);
    toast.success("ADDED TO CART", { description: `${product.name} — ${size} / ${color}` });
    return true;
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <nav aria-label="Breadcrumb" className="label-xs mb-6 flex flex-wrap items-center gap-2 text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          HOME
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground">
          {product.category.toUpperCase()}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name.toUpperCase()}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* GALLERY */}
        <div className="grid gap-4 sm:grid-cols-[84px_1fr]">
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "h-20 w-20 shrink-0 overflow-hidden border-[3px] border-foreground",
                  active === i && "brutal-shadow-sm",
                )}
              >
                <img src={g} alt="" width={200} height={200} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative order-1 sm:order-2">
            <img
              src={product.gallery[active] ?? product.image}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square w-full border-[3px] border-foreground object-cover brutal-shadow"
            />
            <span className="absolute left-3 top-3 flex flex-col gap-1">
              {product.badges.map((b) => (
                <Badge key={b} tone={badgeTone(b)}>
                  {b}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div>
          <span className="label-xs text-muted-foreground">{product.categoryLabel}</span>
          <h1 className="mt-2 text-[clamp(2.2rem,7vw,3.8rem)]">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{product.subtitle}</p>

          <div className="mt-4">
            <Rating value={product.rating} count={product.reviewCount} size={18} />
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y-[3px] border-foreground py-5">
            <span className="font-display text-4xl font-black">{inr(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through">{inr(product.compareAt)}</span>
                <Badge tone="flare">{off}% OFF</Badge>
              </>
            )}
            <span className="label-xs ml-auto text-muted-foreground">INCL. OF ALL TAXES</span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="label-xs">SIZE</h2>
              <button type="button" className="label-xs flex items-center gap-1 underline" onClick={() => toast("SIZE GUIDE", { description: "Sizes run oversized. Take your usual size for a boxy fit, one down for regular." })}>
                <Ruler width={12} height={12} strokeWidth={3} /> SIZE GUIDE
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={cn(
                    "min-w-12 border-[3px] border-foreground px-3 py-2 text-sm font-bold uppercase transition-colors",
                    size === s ? "bg-foreground text-background" : "hover:bg-zap",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="mt-2 text-[0.7rem] font-bold uppercase text-destructive">Select a size</p>}
          </div>

          <div className="mt-6">
            <h2 className="label-xs mb-2">COLOUR — {color}</h2>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={cn(
                    "label-xs border-[3px] border-foreground px-3 py-2 transition-colors",
                    color === c ? "bg-flare text-background" : "hover:bg-zap",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <h2 className="label-xs">QTY</h2>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Button variant="solid" size="lg" onClick={add} type="button">
              Add to cart
            </Button>
            <Button
              variant="flare"
              size="lg"
              type="button"
              onClick={() => {
                if (add()) navigate({ to: "/checkout" });
              }}
            >
              Buy now <ArrowRight width={16} height={16} strokeWidth={3} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              onClick={() => {
                toggleWishlist(product.id);
                toast(saved ? "REMOVED FROM WISHLIST" : "SAVED TO WISHLIST");
              }}
            >
              <Heart width={18} height={18} strokeWidth={3} className={saved ? "fill-flare text-flare" : ""} />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <InfoTile icon={<Truck width={16} height={16} strokeWidth={3} />} title="FREE SHIPPING">
              On orders over ₹4,999. Metro delivery in 48h.
            </InfoTile>
            <InfoTile icon={<RotateCcw width={16} height={16} strokeWidth={3} />} title="14-DAY RETURNS">
              Unworn, tags on, no questions asked.
            </InfoTile>
          </div>

          <div className="mt-8 border-[3px] border-foreground">
            <h2 className="label-xs border-b-[3px] border-foreground bg-muted px-4 py-3">DETAILS & MATERIALS</h2>
            <ul className="space-y-2 p-4 text-sm text-muted-foreground">
              {product.materials.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="text-flare">◆</span> {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="mt-16">
        <h2 className="text-[clamp(2rem,6vw,3.5rem)]">Reviews.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {product.reviews.map((r) => (
            <article key={r.id} className="border-[3px] border-foreground p-5 brutal-shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg">{r.name}</h3>
                <span className="label-xs text-muted-foreground">{r.date}</span>
              </div>
              <div className="mt-2">
                <Rating value={r.rating} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-16">
        <h2 className="text-[clamp(2rem,6vw,3.5rem)]">Goes with.</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(related.length ? related : fallbackRelated).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="sticky bottom-0 z-40 -mx-4 mt-12 flex items-center gap-3 border-t-[3px] border-foreground bg-background p-3 sm:-mx-6 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-black uppercase">{product.name}</p>
          <p className="font-display text-lg font-black">{inr(product.price)}</p>
        </div>
        <Button variant="flare" onClick={add} type="button">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

function InfoTile({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="border-[3px] border-foreground p-4">
      <div className="label-xs flex items-center gap-2">
        {icon} {title}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{children}</p>
    </div>
  );
}
