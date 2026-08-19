import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trash2, Tag, Truck, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Button, Input } from "@/components/brutal";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — BRUTAL." },
      {
        name: "description",
        content: "Review your BRUTAL. bag, apply a discount code and head to checkout.",
      },
      { property: "og:title", content: "Your Cart — BRUTAL." },
      { property: "og:description", content: "Review your bag and checkout." },
    ],
  }),
  component: CartPage,
});

export function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const { totals, state, applyCoupon, clearCoupon } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const freeThreshold = state.settings.freeShippingThreshold;
  const remainingForFree = Math.max(0, freeThreshold - totals.subtotal);
  const freeProgress = Math.min(100, Math.round((totals.subtotal / freeThreshold) * 100));

  return (
    <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
      <h2 className="font-display text-2xl font-black uppercase tracking-tight">ORDER SUMMARY</h2>

      {/* Free Shipping Progress Indicator */}
      <div className="border-[2px] border-foreground bg-smoke/60 p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-foreground" />
            {remainingForFree === 0 ? (
              <span className="text-emerald-700">QUALIFIED FOR FREE SHIPPING!</span>
            ) : (
              <span>ADD {inr(remainingForFree)} FOR FREE SHIPPING</span>
            )}
          </span>
          <span className="font-mono">{freeProgress}%</span>
        </div>
        <div className="h-2 w-full border border-foreground bg-white overflow-hidden">
          <div
            className="h-full bg-zap transition-all duration-300"
            style={{ width: `${freeProgress}%` }}
          />
        </div>
      </div>

      {/* Breakdown Rows */}
      <dl className="space-y-3 text-xs font-mono">
        <Row label="BAG SUBTOTAL" value={inr(totals.subtotal)} />
        <Row
          label="ESTIMATED SHIPPING"
          value={totals.shipping === 0 ? "FREE" : inr(totals.shipping)}
        />
        {totals.discount > 0 && (
          <div className="flex items-baseline justify-between text-emerald-700 font-bold">
            <dt className="label-xs">PROMO ({state.coupon})</dt>
            <dd>− {inr(totals.discount)}</dd>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t-[3px] border-foreground pt-4">
          <dt className="font-display text-base font-black uppercase text-foreground">TOTAL AMOUNT</dt>
          <dd className="font-display text-3xl font-black text-foreground">{inr(totals.total)}</dd>
        </div>
      </dl>

      {/* Promo Code Input */}
      <div className="border-t-[2px] border-foreground pt-4">
        <h3 className="label-xs mb-2 flex items-center gap-1.5">
          <Tag className="h-3 w-3" />
          PROMO / COUPON CODE
        </h3>

        {state.coupon ? (
          <div className="flex items-center justify-between border-[2px] border-foreground bg-zap px-3 py-2">
            <span className="label-xs font-black">{state.coupon} APPLIED</span>
            <button
              type="button"
              className="label-xs underline hover:text-flare"
              onClick={() => {
                clearCoupon();
                toast.info("PROMO CODE REMOVED");
              }}
            >
              REMOVE
            </button>
          </div>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const res = applyCoupon(code);
              setError(res.ok ? "" : res.message);
              if (res.ok) {
                setCode("");
                toast.success(res.message);
              }
            }}
          >
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. BRUTAL10"
              aria-label="Discount code"
              className="uppercase font-mono text-xs"
            />
            <Button type="submit" variant="outline" className="text-xs uppercase font-black">
              Apply
            </Button>
          </form>
        )}

        {error && (
          <p className="mt-1 text-[0.7rem] font-bold uppercase text-destructive">{error}</p>
        )}

        {state.coupons.length > 0 && !state.coupon && (
          <div className="mt-2 flex flex-wrap gap-1.5 text-[0.65rem] text-muted-foreground">
            <span>Available:</span>
            {state.coupons
              .filter((c) => c.status === "active")
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const res = applyCoupon(c.code);
                    if (res.ok) toast.success(res.message);
                  }}
                  className="font-mono font-bold text-foreground underline hover:text-flare"
                >
                  {c.code}
                </button>
              ))}
          </div>
        )}
      </div>

      {cta && <div className="pt-2">{cta}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="label-xs text-muted-foreground font-sans">{label}</dt>
      <dd className="font-bold text-foreground">{value}</dd>
    </div>
  );
}

function CartPage() {
  const { cartLines, setQty, removeFromCart, ready } = useStore();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 border-b-[3px] border-foreground pb-4">
        <span className="label-xs bg-foreground px-2 py-1 text-background">YOUR BAG</span>
        <h1 className="mt-4 text-[clamp(2.8rem,9vw,5.5rem)] font-display font-black uppercase leading-[0.9] tracking-tight">
          Review
          <br />
          bag items.
        </h1>
      </header>

      {!ready ? (
        <div className="grid gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse border-[3px] border-foreground bg-muted" />
          ))}
        </div>
      ) : cartLines.length === 0 ? (
        <div className="border-[3px] border-foreground bg-background p-12 text-center brutal-shadow max-w-xl mx-auto">
          <div className="grid h-16 w-16 place-items-center border-[3px] border-foreground bg-zap mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-foreground" />
          </div>
          <h2 className="font-display text-3xl font-black uppercase">YOUR BAG IS EMPTY</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Explore limited archival drops and pick your silhouettes before they sell out.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/shop"
              search={{}}
              className="label-xs inline-flex items-center gap-2 border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm font-black"
            >
              EXPLORE CATALOG <ArrowRight width={16} height={16} strokeWidth={3} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <ul className="grid gap-4">
            {cartLines.map(({ item, product }) => (
              <li
                key={item.key}
                className="flex gap-4 border-[3px] border-foreground bg-background p-4 brutal-shadow-sm"
              >
                <Link
                  to="/product/$productId"
                  params={{ productId: product.id }}
                  className="shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="h-24 w-24 border-[2px] border-foreground object-cover sm:h-32 sm:w-32"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="label-xs text-muted-foreground uppercase">
                          {product.brand}
                        </span>
                        <h2 className="truncate font-display text-base sm:text-lg font-black uppercase">
                          <Link
                            to="/product/$productId"
                            params={{ productId: product.id }}
                            className="hover:underline"
                          >
                            {product.name}
                          </Link>
                        </h2>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="border border-foreground bg-smoke px-1.5 py-0.2 text-[0.65rem] font-bold uppercase">
                            SIZE: {item.size}
                          </span>
                          <span className="border border-foreground bg-smoke px-1.5 py-0.2 text-[0.65rem] font-bold uppercase">
                            COLOR: {item.color}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => {
                          removeFromCart(item.key);
                          toast.info("REMOVED FROM BAG", { description: product.name });
                        }}
                        className="shrink-0 border-2 border-foreground p-1.5 transition-colors hover:bg-destructive hover:text-white press"
                      >
                        <Trash2 width={14} height={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 mt-3">
                    <div className="flex items-center gap-2">
                      <QuantitySelector
                        value={item.qty}
                        onChange={(v) => setQty(item.key, Math.min(product.stock, v))}
                      />
                      {product.stock <= 10 && (
                        <span className="label-xs text-flare font-bold">
                          Only {product.stock} in stock
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-lg font-black">
                      {inr(product.price * item.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="lg:sticky lg:top-24">
            <OrderSummary
              cta={
                <Link
                  to="/checkout"
                  className="flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-xs font-black uppercase tracking-[0.08em] text-white press brutal-shadow-sm hover:bg-black"
                >
                  PROCEED TO CHECKOUT <ArrowRight width={16} height={16} strokeWidth={3} />
                </Link>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

