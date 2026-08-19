import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  Clock,
  Plus,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { type OrderStatus } from "@/lib/data";

export const Route = createFileRoute("/superadmin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — BRUTAL. Super Admin" },
      { name: "description", content: "Super Admin overview and live operations metrics." },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { state, updateOrderStatus, updateStock } = useStore();

  const totalRevenue = state.orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = state.orders.length;
  const activeProducts = state.products.filter((p) => p.status === "active").length;
  const draftProducts = state.products.filter((p) => p.status === "draft").length;
  const totalCustomers = state.customers.length;

  const lowStockProducts = state.products.filter((p) => p.stock <= 10);
  const pendingOrders = state.orders.filter(
    (o) => o.status === "PLACED" || o.status === "CONFIRMED" || o.status === "PACKED",
  );

  const recentOrders = [...state.orders].slice(0, 6);

  const handleQuickStatus = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus, `Updated to ${nextStatus} via Dashboard Quick-Action`);
    toast.success(`ORDER #${orderId} UPDATED`, { description: `Status changed to ${nextStatus}` });
  };

  const handleQuickRestock = (productId: string, currentStock: number) => {
    const qtyStr = window.prompt("Enter units to add to stock:", "20");
    if (!qtyStr) return;
    const qty = parseInt(qtyStr, 10);
    if (isNaN(qty) || qty <= 0) return;
    updateStock(productId, currentStock + qty, `Quick restock (+${qty}) via Dashboard`);
    toast.success("STOCK UPDATED", { description: `Added ${qty} units to inventory.` });
  };

  return (
    <AdminLayout
      title="OPERATIONS OVERVIEW"
      subtitle="Real-time live telemetry, product health, and fulfillment pipeline."
      action={
        <Link
          to="/superadmin/products/new"
          className="flex items-center gap-2 border-[2px] border-foreground bg-zap px-4 py-2 text-xs font-black uppercase press brutal-shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>NEW PRODUCT</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Revenue */}
          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">LIFETIME REVENUE</span>
              <div className="border-[2px] border-foreground bg-zap p-1.5">
                <TrendingUp className="h-4 w-4 text-foreground" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-black">{formatCurrency(totalRevenue)}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">Across {totalOrders} total recorded orders</p>
          </div>

          {/* Orders */}
          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">TOTAL ORDERS</span>
              <div className="border-[2px] border-foreground bg-smoke p-1.5">
                <ShoppingBag className="h-4 w-4 text-foreground" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-black">{totalOrders}</p>
            <div className="mt-1 flex items-center gap-2 text-[0.7rem]">
              <span className="font-bold text-flare">{pendingOrders.length} requiring action</span>
            </div>
          </div>

          {/* Catalog Products */}
          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">CATALOG PRODUCTS</span>
              <div className="border-[2px] border-foreground bg-smoke p-1.5">
                <Package className="h-4 w-4 text-foreground" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-black">{state.products.length}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              {activeProducts} Active • {draftProducts} Draft
            </p>
          </div>

          {/* Registered Customers */}
          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">REGISTERED CLIENTS</span>
              <div className="border-[2px] border-foreground bg-smoke p-1.5">
                <Users className="h-4 w-4 text-foreground" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-black">{totalCustomers}</p>
            <p className="mt-1 text-[0.7rem] text-emerald-600 font-bold">100% active account health</p>
          </div>
        </div>

        {/* Action Callout Banners */}
        {lowStockProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-[3px] border-foreground bg-flare/15 p-5 brutal-shadow-sm border-l-[10px] border-l-flare">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-flare shrink-0" />
              <div>
                <h3 className="font-display text-sm font-black uppercase">
                  {lowStockProducts.length} ITEMS AT OR BELOW CRITICAL STOCK LEVEL
                </h3>
                <p className="text-xs text-muted-foreground">
                  Immediate replenishment recommended to avoid checkout disruptions.
                </p>
              </div>
            </div>
            <Link
              to="/superadmin/inventory"
              className="label-xs whitespace-nowrap border-[2px] border-foreground bg-background px-4 py-2.5 press hover:bg-zap"
            >
              RESTOCK INVENTORY →
            </Link>
          </div>
        )}

        {/* Operational Split: Recent Orders & Stock Alerts */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Recent Orders Section */}
          <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
            <div className="flex items-center justify-between border-b-[2px] border-foreground pb-4">
              <div>
                <h2 className="font-display text-xl font-black uppercase">RECENT ORDERS</h2>
                <p className="text-xs text-muted-foreground">Live orders placed by customers</p>
              </div>
              <Link
                to="/superadmin/orders"
                className="label-xs flex items-center gap-1 hover:text-flare underline font-bold"
              >
                <span>ALL ORDERS</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 divide-y divide-zinc-200 overflow-x-auto">
              {recentOrders.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-sm">No orders recorded yet.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="label-xs text-muted-foreground border-b border-zinc-200">
                      <th className="pb-3 font-bold">ORDER ID</th>
                      <th className="pb-3 font-bold">CUSTOMER</th>
                      <th className="pb-3 font-bold">TOTAL</th>
                      <th className="pb-3 font-bold">STATUS</th>
                      <th className="pb-3 font-bold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentOrders.map((order) => {
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
                        <tr key={order.id} className="hover:bg-smoke/30">
                          <td className="py-3 font-mono font-bold">
                            <Link to="/superadmin/orders/$orderId" params={{ orderId: order.id }} className="hover:underline text-foreground">
                              #{order.id}
                            </Link>
                          </td>
                          <td className="py-3">
                            <p className="font-bold">{order.customerName}</p>
                            <p className="text-[0.65rem] text-muted-foreground">{order.items.length} items</p>
                          </td>
                          <td className="py-3 font-bold">{formatCurrency(order.total)}</td>
                          <td className="py-3">
                            <span className={`inline-block border border-foreground px-2 py-0.5 text-[0.65rem] font-black uppercase ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {order.status === "PLACED" && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatus(order.id, "CONFIRMED")}
                                className="label-xs border border-foreground bg-zap px-2 py-1 press hover:bg-foreground hover:text-white"
                              >
                                CONFIRM
                              </button>
                            )}
                            {order.status === "CONFIRMED" && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatus(order.id, "PACKED")}
                                className="label-xs border border-foreground bg-purple-200 px-2 py-1 press hover:bg-foreground hover:text-white"
                              >
                                PACK
                              </button>
                            )}
                            {order.status === "PACKED" && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatus(order.id, "SHIPPED")}
                                className="label-xs border border-foreground bg-zap px-2 py-1 press hover:bg-foreground hover:text-white"
                              >
                                SHIP
                              </button>
                            )}
                            {order.status === "SHIPPED" && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatus(order.id, "DELIVERED")}
                                className="label-xs border border-foreground bg-emerald-300 px-2 py-1 press hover:bg-foreground hover:text-white"
                              >
                                DELIVER
                              </button>
                            )}
                            {order.status === "DELIVERED" && (
                              <span className="text-[0.65rem] font-bold text-emerald-700">COMPLETED</span>
                            )}
                            {order.status === "CANCELLED" && (
                              <span className="text-[0.65rem] font-bold text-destructive">VOIDED</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Quick Stock Replenish Panel */}
          <div className="space-y-6">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <div className="flex items-center justify-between border-b-[2px] border-foreground pb-4">
                <div>
                  <h2 className="font-display text-xl font-black uppercase">LOW STOCK RADAR</h2>
                  <p className="text-xs text-muted-foreground">Items requiring immediate stock</p>
                </div>
                <Link to="/superadmin/inventory" className="label-xs underline hover:text-flare">
                  INVENTORY
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {lowStockProducts.slice(0, 5).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between border-[2px] border-foreground p-3 bg-smoke/40"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="h-10 w-10 border border-foreground object-cover" />
                      <div>
                        <p className="font-bold text-xs line-clamp-1">{prod.name}</p>
                        <p className="font-mono text-[0.65rem] text-muted-foreground">{prod.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="border border-foreground bg-flare px-2 py-0.5 text-xs font-black text-white">
                        {prod.stock} LEFT
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickRestock(prod.id, prod.stock)}
                        className="label-xs border border-foreground bg-zap px-2 py-1 press"
                        title="Restock units"
                      >
                        +ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Shortcuts Box */}
            <div className="border-[3px] border-foreground bg-zap p-6 brutal-shadow">
              <h3 className="font-display text-lg font-black uppercase">QUICK OPERATIONS</h3>
              <p className="text-xs text-black/80 mt-1">Direct system shortcuts for rapid administration.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/superadmin/products/new"
                  className="flex items-center gap-2 border-[2px] border-foreground bg-background p-2.5 font-bold uppercase press"
                >
                  <Plus className="h-4 w-4" />
                  <span>ADD ITEM</span>
                </Link>
                <Link
                  to="/superadmin/inventory"
                  className="flex items-center gap-2 border-[2px] border-foreground bg-background p-2.5 font-bold uppercase press"
                >
                  <Boxes className="h-4 w-4" />
                  <span>AUDIT LOG</span>
                </Link>
                <Link
                  to="/superadmin/settings"
                  className="flex items-center gap-2 border-[2px] border-foreground bg-background p-2.5 font-bold uppercase press"
                >
                  <Plus className="h-4 w-4" />
                  <span>COUPONS</span>
                </Link>
                <Link
                  to="/superadmin/customers"
                  className="flex items-center gap-2 border-[2px] border-foreground bg-background p-2.5 font-bold uppercase press"
                >
                  <Users className="h-4 w-4" />
                  <span>CLIENTS</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
