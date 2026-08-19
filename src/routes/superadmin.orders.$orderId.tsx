import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  PackageCheck,
  AlertTriangle,
  Clock,
  Send,
  MapPin,
  User,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type OrderStatus } from "@/lib/data";

export const Route = createFileRoute("/superadmin/orders/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Inspector — BRUTAL. Super Admin" },
      { name: "description", content: "Inspect order details, update status, and manage logistics." },
    ],
  }),
  component: AdminOrderDetailPage,
});

const allStatuses: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

function AdminOrderDetailPage() {
  const { orderId } = Route.useParams();
  const { state, updateOrderStatus } = useStore();

  const order = state.orders.find((o) => o.id === orderId);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.status ?? "PLACED");
  const [timelineNote, setTimelineNote] = useState("");

  if (!order) {
    return (
      <AdminLayout title="ORDER NOT FOUND">
        <div className="border-[3px] border-foreground bg-background p-12 text-center brutal-shadow">
          <h2 className="font-display text-2xl font-black uppercase">ORDER ID #{orderId} NOT FOUND</h2>
          <p className="mt-2 text-sm text-muted-foreground">The order requested does not exist in store records.</p>
          <div className="mt-6">
            <Link
              to="/superadmin/orders"
              className="border-[2px] border-foreground bg-zap px-6 py-3 font-bold uppercase press brutal-shadow-sm text-xs"
            >
              RETURN TO ALL ORDERS
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.id, selectedStatus, timelineNote.trim());
    toast.success(`ORDER #${order.id} UPDATED`, {
      description: `Status changed to ${selectedStatus}. Customer tracking timeline synced.`,
    });
    setTimelineNote("");
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PLACED":
        return "bg-amber-200 text-amber-950";
      case "CONFIRMED":
        return "bg-blue-200 text-blue-950";
      case "PACKED":
        return "bg-purple-200 text-purple-950";
      case "SHIPPED":
        return "bg-zap text-foreground";
      case "OUT_FOR_DELIVERY":
        return "bg-indigo-200 text-indigo-950";
      case "DELIVERED":
        return "bg-emerald-300 text-emerald-950";
      case "CANCELLED":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-smoke text-foreground";
    }
  };

  return (
    <AdminLayout
      title={`ORDER #${order.id}`}
      subtitle={`Placed on ${order.date} • Estimated Delivery: ${order.eta}`}
      action={
        <div className="flex items-center gap-2">
          <Link
            to="/order/$orderId"
            params={{ orderId: order.id }}
            target="_blank"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-zap"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CUSTOMER TRACKING VIEW</span>
          </Link>
          <Link
            to="/superadmin/orders"
            className="flex items-center gap-1.5 border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase press hover:bg-smoke"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">BACK</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Status Action Banner */}
        <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b-[2px] border-foreground pb-4 mb-4">
            <div>
              <span className="label-xs text-muted-foreground">CURRENT STATUS</span>
              <div className="mt-1 flex items-center gap-3">
                <span
                  className={`inline-block border-[2px] border-foreground px-3 py-1 text-xs font-black uppercase ${getStatusBadge(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  Payment: <strong className="text-foreground">{order.paymentStatus}</strong> via {order.paymentMethod}
                </span>
              </div>
            </div>

            <span className="font-mono text-xl font-black">TOTAL: {formatCurrency(order.total)}</span>
          </div>

          {/* Status Update Form */}
          <form onSubmit={handleUpdateStatus} className="grid gap-4 sm:grid-cols-[1.5fr_2fr_auto] items-end">
            <div>
              <label className="label-xs block mb-1">TRANSITION ORDER STATUS</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                className="w-full border-[2px] border-foreground bg-zap p-3 text-xs font-black uppercase"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-xs block mb-1">TIMELINE DISPATCH / AUDIT NOTE (OPTIONAL)</label>
              <input
                type="text"
                value={timelineNote}
                onChange={(e) => setTimelineNote(e.target.value)}
                placeholder="e.g. Dispatched via BlueDart AWB #998124"
                className="w-full border-[2px] border-foreground bg-smoke/40 p-3 text-xs font-bold focus:bg-background focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="border-[2px] border-foreground bg-foreground text-background px-6 py-3 text-xs font-black uppercase press hover:bg-zap hover:text-foreground"
            >
              SAVE STATUS
            </button>
          </form>
        </div>

        {/* 2-Column Split: Items/Financials vs Customer/Timeline */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1.2fr]">
          {/* Left: Items & Financials */}
          <div className="space-y-6">
            {/* Items Table */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-3 mb-4">
                ORDER ITEMS ({order.items.length})
              </h2>

              <div className="divide-y divide-zinc-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 border-[2px] border-foreground object-cover"
                      />
                      <div>
                        <p className="font-bold text-xs">{item.name}</p>
                        <p className="font-mono text-[0.65rem] text-muted-foreground">{item.sku}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="border border-foreground bg-smoke px-1.5 py-0.2 text-[0.65rem] font-bold uppercase">
                            SIZE: {item.size}
                          </span>
                          <span className="border border-foreground bg-smoke px-1.5 py-0.2 text-[0.65rem] font-bold uppercase">
                            COLOR: {item.color}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono font-bold text-xs">
                        {item.qty} × {formatCurrency(item.price)}
                      </p>
                      <p className="font-mono text-sm font-black mt-1">
                        {formatCurrency(item.qty * item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="mt-6 border-t-[2px] border-foreground pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-foreground">{formatCurrency(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({order.couponCode || "PROMO"})</span>
                    <span className="font-mono">-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping ({order.delivery})</span>
                  <span className="font-mono font-bold text-foreground">
                    {order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 font-display text-base font-black">
                  <span>TOTAL AMOUNT</span>
                  <span className="font-mono text-lg">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow">
                <div className="flex items-center gap-2 border-b-[2px] border-foreground pb-2 mb-3">
                  <User className="h-4 w-4" />
                  <h3 className="font-display text-xs font-black uppercase">CUSTOMER CONTACT</h3>
                </div>
                <p className="font-bold text-xs">{order.customerName}</p>
                <p className="text-xs text-muted-foreground mt-1">{order.email}</p>
                <p className="text-xs text-muted-foreground">{order.phone || "No phone provided"}</p>
              </div>

              <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow">
                <div className="flex items-center gap-2 border-b-[2px] border-foreground pb-2 mb-3">
                  <MapPin className="h-4 w-4" />
                  <h3 className="font-display text-xs font-black uppercase">SHIPPING ADDRESS</h3>
                </div>
                <p className="font-bold text-xs">{order.address.fullName}</p>
                <p className="text-xs text-muted-foreground mt-1">{order.address.address}</p>
                <p className="text-xs text-muted-foreground">
                  {order.address.city}, {order.address.state} — {order.address.postalCode}
                </p>
                <p className="text-xs text-muted-foreground">{order.address.country}</p>
              </div>
            </div>
          </div>

          {/* Right: Live Tracking Timeline */}
          <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-6">
            <div>
              <h2 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-2">
                FULFILLMENT TIMELINE
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time synchronized event progression visible to customer.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-foreground">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1.5 h-4 w-4 border-2 border-foreground bg-zap rounded-none" />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-black uppercase">{event.title}</span>
                      <span className="font-mono text-[0.65rem] text-muted-foreground">{event.timestamp}</span>
                    </div>
                    {event.note && (
                      <p className="mt-1 text-xs text-muted-foreground bg-smoke p-2 border border-zinc-200">
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
