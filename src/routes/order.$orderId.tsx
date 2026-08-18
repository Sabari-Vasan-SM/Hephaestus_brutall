import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/brutal";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — BRUTAL." },
      { name: "description", content: "Your BRUTAL. order is locked in. Track delivery and keep shopping the drop." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Order Confirmed — BRUTAL." },
      { property: "og:description", content: "Your order is locked in." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { orderId } = Route.useParams();
  const { state } = useStore();
  const order = state.orders.find((o) => o.id === orderId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="relative border-[3px] border-foreground p-8 brutal-shadow-lg animate-pop">
        <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 border-[3px] border-foreground bg-zap" />
        <span aria-hidden className="absolute -bottom-5 left-8 h-10 w-24 border-[3px] border-foreground bg-flare" />
        <span className="label-xs inline-flex items-center gap-2 border-[3px] border-foreground bg-zap px-3 py-2">
          <Check width={14} height={14} strokeWidth={4} /> ORDER CONFIRMED
        </span>
        <h1 className="mt-6 text-[clamp(2.6rem,10vw,5rem)]">
          Order
          <br />
          locked in.
        </h1>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="border-[3px] border-foreground p-4">
            <dt className="label-xs text-muted-foreground">ORDER NUMBER</dt>
            <dd className="mt-1 font-display text-xl font-black">{orderId}</dd>
          </div>
          <div className="border-[3px] border-foreground p-4">
            <dt className="label-xs text-muted-foreground">ESTIMATED DELIVERY</dt>
            <dd className="mt-1 font-display text-xl font-black">{order?.eta ?? "WITHIN 6 DAYS"}</dd>
          </div>
        </dl>

        {order && (
          <div className="mt-4 border-[3px] border-foreground p-4">
            <ul className="space-y-1 text-sm text-muted-foreground">
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.qty}× {i.name} — {i.size} / {i.color}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t-2 border-foreground pt-3">
              <span className="label-xs">PAID</span>
              <span className="font-display text-2xl font-black">{inr(order.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="flare"
            size="lg"
            onClick={() => toast("TRACKING", { description: `${orderId} is being packed.` })}
          >
            Track order <ArrowRight width={16} height={16} strokeWidth={3} />
          </Button>
          <Link
            to="/shop"
            search={{}}
            className="inline-flex items-center gap-2 border-[3px] border-foreground px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] press brutal-shadow-sm"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
