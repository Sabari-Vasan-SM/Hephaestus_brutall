import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trash2 } from "lucide-react";
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
      { name: "description", content: "Review your BRUTAL. bag, apply a discount code and head to checkout." },
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

  return (
    <div className="border-[3px] border-foreground p-6 brutal-shadow">
      <h2 className="text-2xl">Summary.</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <Row label="SUBTOTAL" value={inr(totals.subtotal)} />
        <Row label="SHIPPING" value={totals.shipping === 0 ? "FREE" : inr(totals.shipping)} />
        <Row label="DISCOUNT" value={totals.discount ? `− ${inr(totals.discount)}` : "—"} />
        <div className="flex items-baseline justify-between border-t-[3px] border-foreground pt-4">
          <dt className="label-xs">TOTAL</dt>
          <dd className="font-display text-3xl font-black">{inr(totals.total)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <h3 className="label-xs mb-2">DISCOUNT CODE</h3>
        {state.coupon ? (
          <div className="flex items-center justify-between border-[3px] border-foreground bg-zap px-3 py-2">
            <span className="label-xs">{state.coupon} APPLIED</span>
            <button type="button" className="label-xs underline" onClick={() => clearCoupon()}>
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
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="BRUTAL10" aria-label="Discount code" />
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </form>
        )}
        {error && <p className="mt-1 text-[0.7rem] font-bold uppercase text-destructive">{error}</p>}
        <p className="mt-2 text-[0.7rem] text-muted-foreground">Try BRUTAL10 or DROP500.</p>
      </div>

      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="label-xs text-muted-foreground">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}

function CartPage() {
  const { cartLines, setQty, removeFromCart, ready } = useStore();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-[clamp(2.8rem,10vw,6rem)]">
        Your
        <br />
        cart.
      </h1>

      {!ready ? (
        <div className="mt-10 grid gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse border-[3px] border-foreground bg-muted" />
          ))}
        </div>
      ) : cartLines.length === 0 ? (
        <div className="mt-10 border-[3px] border-foreground p-12 text-center brutal-shadow">
          <h2 className="text-3xl">Empty in here.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Nothing in the bag yet. The drop is waiting.</p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/shop"
              search={{}}
              className="label-xs inline-flex items-center gap-2 border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm"
            >
              START SHOPPING <ArrowRight width={16} height={16} strokeWidth={3} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <ul className="grid gap-4">
            {cartLines.map(({ item, product }) => (
              <li key={item.key} className="flex gap-4 border-[3px] border-foreground p-3 brutal-shadow-sm sm:p-4">
                <Link to="/product/$productId" params={{ productId: product.id }} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="h-24 w-24 border-[3px] border-foreground object-cover sm:h-32 sm:w-32"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg">
                        <Link to="/product/$productId" params={{ productId: product.id }} className="hover:underline">
                          {product.name}
                        </Link>
                      </h2>
                      <p className="label-xs mt-1 text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => {
                        removeFromCart(item.key);
                        toast("REMOVED FROM CART", { description: product.name });
                      }}
                      className="shrink-0 border-2 border-foreground p-1.5 transition-colors hover:bg-destructive hover:text-background"
                    >
                      <Trash2 width={16} height={16} strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <QuantitySelector value={item.qty} onChange={(v) => setQty(item.key, v)} />
                    <span className="font-display text-xl font-black">{inr(product.price * item.qty)}</span>
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
                  className="flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow-sm"
                >
                  Checkout <ArrowRight width={16} height={16} strokeWidth={3} />
                </Link>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
