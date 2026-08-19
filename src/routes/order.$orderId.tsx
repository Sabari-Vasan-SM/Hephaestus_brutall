import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  AlertCircle,
  XCircle,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/brutal";
import { inr, formatCurrency } from "@/lib/format";
import { useStore } from "@/lib/store";
import { type OrderStatus } from "@/lib/data";

export const Route = createFileRoute("/order/$orderId")({
  head: () => ({
    meta: [
      { title: "Live Order Tracking — BRUTAL." },
      {
        name: "description",
        content: "Track your real-time BRUTAL. order dispatch and timeline progress.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderTrackerPage,
});

const progressSteps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: "PLACED", label: "PLACED", icon: CheckCircle2 },
  { status: "CONFIRMED", label: "CONFIRMED", icon: Clock },
  { status: "PACKED", label: "PACKED", icon: Package },
  { status: "SHIPPED", label: "SHIPPED", icon: Truck },
  { status: "OUT_FOR_DELIVERY", label: "OUT FOR DELIVERY", icon: MapPin },
  { status: "DELIVERED", label: "DELIVERED", icon: Check },
];

function OrderTrackerPage() {
  const { orderId } = Route.useParams();
  const { state, cancelOrder } = useStore();
  const navigate = useNavigate();

  const order = state.orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="border-[3px] border-foreground bg-background p-12 brutal-shadow">
          <AlertCircle className="mx-auto h-12 w-12 text-flare" />
          <h1 className="mt-4 font-display text-3xl font-black uppercase">ORDER NOT FOUND</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            No order registered with reference identifier #{orderId}.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/shop"
              className="border-[2px] border-foreground bg-zap px-6 py-3 text-xs font-black uppercase press"
            >
              BROWSE DROPS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCancelled = order.status === "CANCELLED";
  const isDelivered = order.status === "DELIVERED";

  const getStepIndex = (status: OrderStatus) => {
    const idx = progressSteps.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = getStepIndex(order.status);

  const handleCancelOrder = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? Allocated items will be returned to store stock.",
      )
    ) {
      const ok = cancelOrder(order.id, "Customer requested cancellation via Tracking Portal");
      if (ok) {
        toast.info("ORDER CANCELLED", {
          description: "Your order has been cancelled and stock returned.",
        });
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      {/* Main Order Box */}
      <div className="relative border-[3px] border-foreground bg-background p-6 sm:p-10 brutal-shadow-lg animate-pop space-y-8">
        <span
          aria-hidden
          className="absolute -right-3 -top-3 h-12 w-12 border-[3px] border-foreground bg-zap hidden sm:block"
        />

        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-foreground pb-6">
          <div className="flex items-center gap-2">
            <span
              className={`label-xs border-[2px] border-foreground px-3 py-1 font-black uppercase ${
                isCancelled
                  ? "bg-destructive/20 text-destructive border-destructive"
                  : isDelivered
                    ? "bg-emerald-300 text-emerald-950"
                    : "bg-zap text-foreground"
              }`}
            >
              {order.status}
            </span>
            <span className="font-mono text-xs font-bold text-muted-foreground">
              PLACED {order.date}
            </span>
          </div>

          <span className="font-mono text-xs font-black uppercase border border-foreground bg-smoke px-2 py-1">
            EST. DELIVERY: {order.eta}
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-[clamp(2.4rem,7vw,4.5rem)] font-display font-black uppercase leading-[0.92] tracking-tight">
            {isCancelled ? "Order Voided." : isDelivered ? "Delivered." : "Dispatched & Tracking."}
          </h1>
          <p className="mt-2 text-xs font-mono text-muted-foreground">
            ORDER REFERENCE: <strong className="text-foreground font-black">#{order.id}</strong>
          </p>
        </div>

        {/* Visual Progress Stepper */}
        {!isCancelled ? (
          <div className="border-[3px] border-foreground bg-smoke/60 p-6">
            <h2 className="label-xs mb-6 text-muted-foreground">LIVE FULFILLMENT STATUS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {progressSteps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div
                    key={step.status}
                    className={`flex flex-col items-center text-center p-2.5 border-[2px] transition-all ${
                      isCurrent
                        ? "border-foreground bg-zap brutal-shadow-sm scale-105 font-black"
                        : isPassed
                          ? "border-foreground bg-foreground text-background"
                          : "border-zinc-300 bg-white/60 text-muted-foreground opacity-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-tight">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="border-[3px] border-destructive bg-destructive/10 p-5 text-destructive flex items-center gap-3">
            <XCircle className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-display font-black text-sm uppercase">ORDER HAS BEEN CANCELLED</p>
              <p className="text-xs">Payment is refunded and items have been released to inventory.</p>
            </div>
          </div>
        )}

        {/* 2-Column Details Breakdown */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Order Items */}
          <div className="border-[2px] border-foreground p-5 bg-background space-y-3">
            <h3 className="label-xs border-b border-foreground pb-2 font-black">PIECES ORDERED</h3>
            <div className="divide-y divide-zinc-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 border border-foreground object-cover"
                    />
                    <div>
                      <p className="font-bold line-clamp-1">{item.name}</p>
                      <p className="text-[0.65rem] text-muted-foreground font-mono">
                        {item.size} • {item.color} (Qty: {item.qty})
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold">{formatCurrency(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-foreground pt-3 flex justify-between font-mono font-black text-sm">
              <span>TOTAL PAID</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Shipping Destination */}
          <div className="border-[2px] border-foreground p-5 bg-background space-y-3">
            <h3 className="label-xs border-b border-foreground pb-2 font-black">DESTINATION & PAYMENT</h3>
            <div className="text-xs space-y-1">
              <p className="font-bold">{order.address.fullName}</p>
              <p className="text-muted-foreground">{order.address.address}</p>
              <p className="text-muted-foreground">
                {order.address.city}, {order.address.state} — {order.address.postalCode}
              </p>
              <p className="text-muted-foreground">{order.address.country}</p>
            </div>

            <div className="border-t border-zinc-200 pt-3 text-[0.7rem] text-muted-foreground space-y-1 font-mono">
              <p>Payment: <strong className="text-foreground">{order.paymentMethod}</strong> ({order.paymentStatus})</p>
              <p>Dispatch Service: <strong className="text-foreground">{order.delivery}</strong></p>
            </div>
          </div>
        </div>

        {/* Live Timeline Log */}
        <div className="border-[2px] border-foreground p-5 bg-smoke/40 space-y-4">
          <h3 className="label-xs font-black uppercase border-b border-foreground pb-2">
            DISPATCH ACTIVITY HISTORY
          </h3>

          <div className="space-y-3">
            {order.timeline.map((ev, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="mt-1 h-2 w-2 bg-foreground rounded-none shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="font-display font-black uppercase text-foreground">
                      {ev.title}
                    </strong>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      {ev.timestamp}
                    </span>
                  </div>
                  {ev.note && (
                    <p className="text-[0.7rem] text-muted-foreground mt-0.5">{ev.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-[3px] border-foreground">
          <Link
            to="/shop"
            search={{}}
            className="label-xs inline-flex items-center gap-2 border-[2px] border-foreground bg-zap px-6 py-3 font-black uppercase press hover:bg-foreground hover:text-white"
          >
            CONTINUE BROWSING <ArrowRight className="h-4 w-4" />
          </Link>

          {!isCancelled && !isDelivered && (order.status === "PLACED" || order.status === "CONFIRMED") && (
            <button
              type="button"
              onClick={handleCancelOrder}
              className="label-xs border-[2px] border-destructive bg-destructive/10 text-destructive px-4 py-3 font-black uppercase press hover:bg-destructive hover:text-white"
            >
              CANCEL ORDER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

