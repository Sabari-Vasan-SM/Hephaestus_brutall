import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type OrderStatus } from "@/lib/data";

export const Route = createFileRoute("/superadmin/orders/")({
  head: () => ({
    meta: [
      { title: "Orders Management — BRUTAL. Super Admin" },
      { name: "description", content: "Process, track, fulfill, and update live customer orders." },
    ],
  }),
  component: AdminOrdersPage,
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

function AdminOrdersPage() {
  const { state, updateOrderStatus } = useStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredOrders = state.orders.filter((o) => {
    const matchesSearch =
      search.trim() === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleQuickAdvance = (orderId: string, currentStatus: OrderStatus) => {
    const nextMap: Partial<Record<OrderStatus, OrderStatus>> = {
      PLACED: "CONFIRMED",
      CONFIRMED: "PACKED",
      PACKED: "SHIPPED",
      SHIPPED: "OUT_FOR_DELIVERY",
      OUT_FOR_DELIVERY: "DELIVERED",
    };

    const next = nextMap[currentStatus];
    if (next) {
      updateOrderStatus(orderId, next, `Advanced to ${next} by Operations`);
      toast.success(`ORDER #${orderId} ADVANCED`, { description: `Status changed to ${next}` });
    }
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
      case "RETURNED":
        return "bg-zinc-300 text-zinc-900";
      default:
        return "bg-smoke text-foreground";
    }
  };

  return (
    <AdminLayout
      title="ORDER FULFILLMENT & LOGISTICS"
      subtitle={`Processing ${state.orders.length} total orders across domestic distribution.`}
    >
      <div className="space-y-6">
        {/* Search & Filter */}
        <div className="flex flex-col gap-4 border-[3px] border-foreground bg-background p-4 brutal-shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, customer name, or email..."
              className="w-full border-[2px] border-foreground bg-smoke/40 py-2.5 pl-10 pr-4 text-xs font-bold uppercase focus:bg-background focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase"
            >
              <option value="ALL">ALL STATUSES ({state.orders.length})</option>
              {allStatuses.map((s) => (
                <option key={s} value={s}>
                  {s} ({state.orders.filter((o) => o.status === s).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="border-[3px] border-foreground bg-background brutal-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b-[3px] border-foreground bg-smoke">
                <tr className="label-xs text-foreground">
                  <th className="p-4 font-black">ORDER ID</th>
                  <th className="p-4 font-black">DATE</th>
                  <th className="p-4 font-black">CUSTOMER</th>
                  <th className="p-4 font-black">ITEMS</th>
                  <th className="p-4 font-black">TOTAL</th>
                  <th className="p-4 font-black">PAYMENT</th>
                  <th className="p-4 font-black">STATUS</th>
                  <th className="p-4 font-black text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-muted-foreground">
                      No orders match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-smoke/30 transition-colors">
                      {/* ID */}
                      <td className="p-4 font-mono font-bold">
                        <Link
                          to="/superadmin/orders/$orderId"
                          params={{ orderId: order.id }}
                          className="hover:underline text-foreground"
                        >
                          #{order.id}
                        </Link>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-muted-foreground whitespace-nowrap">{order.date}</td>

                      {/* Customer */}
                      <td className="p-4">
                        <p className="font-bold">{order.customerName}</p>
                        <p className="text-[0.7rem] text-muted-foreground truncate max-w-[150px]">
                          {order.email}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="p-4">
                        <div className="flex -space-x-2 overflow-hidden mb-1">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.image}
                              alt={item.name}
                              className="inline-block h-7 w-7 rounded-none border border-foreground object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-[0.65rem] text-muted-foreground">
                          {order.items.reduce((sum, i) => sum + i.qty, 0)} units ({order.items.length} skus)
                        </span>
                      </td>

                      {/* Total */}
                      <td className="p-4 font-mono font-bold">
                        <p>{formatCurrency(order.total)}</p>
                        {order.discount > 0 && (
                          <span className="text-[0.65rem] text-emerald-700 font-sans">
                            (-{formatCurrency(order.discount)})
                          </span>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        <span className="border border-foreground bg-background px-1.5 py-0.5 text-[0.65rem] font-bold uppercase">
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-block border border-foreground px-2.5 py-1 text-[0.65rem] font-black uppercase ${getStatusBadge(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status !== "DELIVERED" &&
                            order.status !== "CANCELLED" &&
                            order.status !== "RETURNED" && (
                              <button
                                type="button"
                                onClick={() => handleQuickAdvance(order.id, order.status)}
                                className="label-xs border-[2px] border-foreground bg-zap px-2 py-1 press hover:bg-foreground hover:text-white"
                                title="Advance to next logistics step"
                              >
                                NEXT STEP →
                              </button>
                            )}

                          <Link
                            to="/superadmin/orders/$orderId"
                            params={{ orderId: order.id }}
                            className="label-xs border-[2px] border-foreground bg-background px-2 py-1 press hover:bg-smoke"
                          >
                            VIEW
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
