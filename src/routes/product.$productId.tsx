import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Heart, Truck, RotateCcw, Ruler, Star, CheckCircle, AlertTriangle, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Badge, Button, Rating, badgeTone } from "@/components/brutal";
import { discountPct, inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  head: () => ({
    meta: [
      { title: "Product Detail — BRUTAL." },
      { name: "description", content: "Heavyweight streetwear piece specification and review." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { getProduct, activeProducts, addToCart, toggleWishlist, inWishlist, addReview, state } =
    useStore();
  const navigate = useNavigate();

  const product = getProduct(productId);

  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState(state.user?.name ?? "");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewBody, setReviewBody] = useState("");

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-20 text-center">
        <div className="border-[3px] border-foreground bg-background p-12 brutal-shadow max-w-lg mx-auto">
          <h1 className="font-display text-3xl font-black uppercase">PIECE NOT FOUND</h1>
          <p className="mt-2 text-sm text-muted-foreground">This silhouette may have been archived or is temporarily in draft.</p>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-block border-[2px] border-foreground bg-zap px-6 py-3 font-bold uppercase press text-xs"
            >
              EXPLORE CATALOG
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Set initial default size/color if empty
  const activeSize = size || product.sizes[0] || "One Size";
  const activeColor = color || product.colors[0] || "Black";
  const saved = inWishlist(product.id);
  const off = discountPct(product.price, product.compareAt);

  const related = activeProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  const fallbackRelated = activeProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error("OUT OF STOCK", { description: "This piece is currently sold out." });
      return false;
    }
    if (!activeSize) {
      setSizeError(true);
      toast.error("PICK A SIZE FIRST");
      return false;
    }
    addToCart(product, activeSize, activeColor, qty);
    toast.success("ADDED TO CART", { description: `${product.name} — ${activeSize} / ${activeColor}` });
    return true;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewBody.trim()) {
      toast.error("MISSING FIELDS", { description: "Please complete all fields in your review." });
      return;
    }
    addReview(product.id, {
      name: reviewName.trim(),
      rating: reviewRating,
      body: reviewBody.trim(),
    });
    toast.success("REVIEW SUBMITTED", { description: "Thank you for rating this piece." });
    setReviewBody("");
    setShowReviewForm(false);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="label-xs mb-6 flex flex-wrap items-center gap-2 text-muted-foreground font-mono"
      >
        <Link to="/" className="hover:text-foreground">
          HOME
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground">
          {product.category.toUpperCase()}
        </Link>
        <span>/</span>
        <span className="text-foreground font-bold">{product.name.toUpperCase()}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* GALLERY */}
        <div className="grid gap-4 sm:grid-cols-[84px_1fr]">
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col overflow-x-auto">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "h-20 w-20 shrink-0 overflow-hidden border-[3px] border-foreground",
                  active === i ? "border-flare ring-2 ring-flare brutal-shadow-sm" : "",
                )}
              >
                <img
                  src={g}
                  alt=""
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
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
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badges.map((b) => (
                <Badge key={b} tone={badgeTone(b)}>
                  {b}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* INFO SPECIFICATION */}
        <div>
          <div className="flex items-center justify-between">
            <span className="label-xs border border-foreground bg-smoke px-2 py-0.5 font-bold uppercase">
              {product.brand} • {product.categoryLabel}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{product.sku}</span>
          </div>

          <h1 className="mt-2 text-[clamp(2.2rem,6vw,3.5rem)] font-black uppercase font-display leading-[0.95]">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-mono">{product.subtitle}</p>

          <div className="mt-4 flex items-center gap-4">
            <Rating value={product.rating} count={product.reviewCount} size={18} />
            <span className="text-xs text-muted-foreground">({product.reviews.length} client reviews)</span>
          </div>

          {/* Pricing Box */}
          <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y-[3px] border-foreground py-5">
            <span className="font-display text-4xl font-black">{inr(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through font-mono">
                  {inr(product.compareAt)}
                </span>
                <Badge tone="flare">{off}% OFF</Badge>
              </>
            )}
            <span className="label-xs ml-auto text-muted-foreground">INCL. OF ALL TAXES</span>
          </div>

          {/* Real-time Inventory / Stock Badge */}
          <div className="mt-4">
            {product.stock === 0 ? (
              <div className="flex items-center gap-2 border-[2px] border-destructive bg-destructive/10 p-3 text-xs font-black uppercase text-destructive">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>OUT OF STOCK — RESTOCK IN PROGRESS</span>
              </div>
            ) : product.stock <= 10 ? (
              <div className="flex items-center gap-2 border-[2px] border-flare bg-flare/15 p-3 text-xs font-black uppercase text-flare">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>ONLY {product.stock} UNITS REMAINING IN WAREHOUSE</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-[2px] border-emerald-600 bg-emerald-50 p-2.5 text-xs font-bold uppercase text-emerald-800">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>IN STOCK & READY FOR 24H DISPATCH ({product.stock} AVAILABLE)</span>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="label-xs">SIZE SPEC</h2>
              <button
                type="button"
                className="label-xs flex items-center gap-1 underline hover:text-flare"
                onClick={() =>
                  toast("SIZE GUIDE", {
                    description:
                      "Silhouettes are engineered with boxy, oversized drape. Select true size for relaxed fit.",
                  })
                }
              >
                <Ruler width={12} height={12} strokeWidth={3} /> FIT GUIDE
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
                  aria-pressed={activeSize === s}
                  className={cn(
                    "min-w-12 border-[3px] border-foreground px-4 py-2.5 text-xs font-black uppercase transition-colors press",
                    activeSize === s ? "bg-foreground text-background" : "bg-background hover:bg-zap",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-[0.7rem] font-bold uppercase text-destructive">
                Please pick a size before adding
              </p>
            )}
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <h2 className="label-xs mb-2">COLOR — {activeColor}</h2>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={activeColor === c}
                  className={cn(
                    "label-xs border-[2px] border-foreground px-3 py-2 transition-colors font-bold press",
                    activeColor === c ? "bg-flare text-white" : "bg-background hover:bg-zap",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <h2 className="label-xs">QUANTITY</h2>
            <QuantitySelector
              value={qty}
              onChange={(val) => setQty(Math.min(product.stock, val))}
            />
          </div>

          {/* Add to Cart & Buy Now Action Buttons */}
          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Button
              variant="solid"
              size="lg"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
              type="button"
              className="disabled:opacity-40"
            >
              {product.stock <= 0 ? "SOLD OUT" : "ADD TO CART"}
            </Button>
            <Button
              variant="flare"
              size="lg"
              disabled={product.stock <= 0}
              type="button"
              className="disabled:opacity-40 text-white"
              onClick={() => {
                if (handleAddToCart()) navigate({ to: "/checkout" });
              }}
            >
              BUY NOW <ArrowRight width={16} height={16} strokeWidth={3} />
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
              <Heart
                width={18}
                height={18}
                strokeWidth={3}
                className={saved ? "fill-flare text-flare" : ""}
              />
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <InfoTile icon={<Truck width={16} height={16} strokeWidth={3} />} title="METRO DISPATCH">
              Free shipping on orders over ₹4,999. Trackable via BlueDart / Delhivery.
            </InfoTile>
            <InfoTile
              icon={<RotateCcw width={16} height={16} strokeWidth={3} />}
              title="14-DAY RETURNS"
            >
              Unworn, original tags intact. Instant store refund or exchange.
            </InfoTile>
          </div>

          {/* Materials */}
          <div className="mt-8 border-[3px] border-foreground">
            <h2 className="label-xs border-b-[3px] border-foreground bg-smoke px-4 py-3 font-black">
              TECHNICAL SPECIFICATIONS & MATERIALS
            </h2>
            <ul className="space-y-2 p-4 text-xs font-mono text-muted-foreground">
              {product.materials.map((m, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-flare font-bold">◆</span> {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* REVIEWS & SUBMISSION SECTION */}
      <section className="mt-16 border-t-[3px] border-foreground pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight">
              CUSTOMER REVIEWS ({product.reviews.length})
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Verified feedback from collectors who ordered this silhouette.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="label-xs flex items-center gap-2 border-[2px] border-foreground bg-zap px-4 py-2.5 font-black press hover:bg-foreground hover:text-white"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Interactive Review Submission Drawer */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="mb-8 border-[3px] border-foreground bg-background p-6 brutal-shadow"
          >
            <h3 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2 mb-4">
              SUBMIT YOUR FEEDBACK
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div>
                <label className="label-xs block mb-1">YOUR NAME *</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Rohan V."
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold focus:bg-background focus:outline-none"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">RATING SCORE (1-5 STARS)</label>
                <div className="flex items-center gap-2 border-[2px] border-foreground bg-smoke/40 p-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={cn(
                          "h-5 w-5",
                          star <= reviewRating
                            ? "fill-zap text-foreground"
                            : "text-zinc-400",
                        )}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs font-bold ml-2">{reviewRating} / 5</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="label-xs block mb-1">REVIEW COMMENTS *</label>
              <textarea
                rows={3}
                required
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="How does the GSM weight, cut, and finish feel in person?"
                className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-sans focus:bg-background focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="border-[2px] border-foreground bg-zap px-6 py-2.5 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
              >
                PUBLISH REVIEW
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="border-[2px] border-foreground bg-smoke px-4 py-2.5 text-xs font-bold uppercase press"
              >
                CANCEL
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {product.reviews.map((r) => (
            <article key={r.id} className="border-[3px] border-foreground p-5 brutal-shadow-sm bg-background">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-black uppercase">{r.name}</h3>
                <span className="label-xs text-muted-foreground font-mono">{r.date}</span>
              </div>
              <div className="mt-2">
                <Rating value={r.rating} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* RELATED PIECES */}
      <section className="mt-16 border-t-[3px] border-foreground pt-12">
        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
          MORE FROM {product.categoryLabel.toUpperCase()}
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(related.length ? related : fallbackRelated).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="sticky bottom-0 z-40 -mx-4 mt-12 flex items-center gap-3 border-t-[3px] border-foreground bg-background p-3 sm:-mx-6 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xs font-black uppercase">{product.name}</p>
          <p className="font-mono text-base font-black">{inr(product.price)}</p>
        </div>
        <Button
          variant="flare"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          type="button"
          className="text-white font-black"
        >
          {product.stock <= 0 ? "SOLD OUT" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-[3px] border-foreground p-4 bg-background">
      <div className="label-xs flex items-center gap-2 font-black">
        {icon} {title}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{children}</p>
    </div>
  );
}

