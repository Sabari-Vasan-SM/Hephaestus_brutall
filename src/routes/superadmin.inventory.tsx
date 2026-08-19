import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Search,
  History,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/superadmin/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory & Stock — BRUTAL. Super Admin" },
      { name: "description", content: "Stock level controller, batch restock, and inventory audit logs." },
    ],
  }),
  component: AdminInventoryPage,
});

function AdminInventoryPage() {
  const { state, updateStock, adjustStock } = useStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "LOW" | "OUT">("ALL");
  const [activeTab, setActiveTab] = useState<"STOCK" | "LOGS">("STOCK");

  const totalStockUnits = state.products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = state.products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = state.products.filter((p) => p.stock === 0).length;

  const filteredProducts = state.products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      (filter === "LOW" && p.stock > 0 && p.stock <= 10) ||
      (filter === "OUT" && p.stock === 0);

    return matchesSearch && matchesFilter;
  });

  const handleAdjust = (productId: string, delta: number, currentName: string) => {
    adjustStock(productId, delta, `Manual stock adjustment (${delta > 0 ? "+" : ""}${delta})`);
    toast.success("STOCK UPDATED", {
      description: `${currentName} adjusted by ${delta > 0 ? "+" : ""}${delta} units.`,
    });
  };

  const handleSetExact = (productId: string, currentStock: number, name: string) => {
    const valStr = window.prompt(`Enter new exact stock count for "${name}":`, currentStock.toString());
    if (valStr === null) return;
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val < 0) {
      toast.error("INVALID VALUE", { description: "Please enter a valid non-negative integer." });
      return;
    }
    updateStock(productId, val, `Exact stock level set to ${val}`);
    toast.success("STOCK UPDATED", { description: `${name} inventory count set to ${val}.` });
  };

  return (
    <AdminLayout
      title="INVENTORY & STOCK CONTROL"
      subtitle="Live stock replenishment, automatic purchase deductions, and immutable audit trails."
      action={
        <div className="flex items-center gap-2 border-[2px] border-foreground bg-background p-1">
          <button
            type="button"
            onClick={() => setActiveTab("STOCK")}
            className={`px-3 py-1.5 text-xs font-black uppercase press ${
              activeTab === "STOCK" ? "bg-zap text-foreground" : "hover:bg-smoke"
            }`}
          >
            STOCK LEVELS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("LOGS")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase press ${
              activeTab === "LOGS" ? "bg-zap text-foreground" : "hover:bg-smoke"
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>AUDIT LOGS ({state.inventoryLogs.length})</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* KPI Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">TOTAL WAREHOUSE UNITS</span>
              <Boxes className="h-4 w-4 text-foreground" />
            </div>
            <p className="mt-3 font-display text-3xl font-black">{totalStockUnits}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">Across {state.products.length} products</p>
          </div>

          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">LOW STOCK WARNINGS</span>
              <AlertTriangle className="h-4 w-4 text-flare" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-flare">{lowStockCount}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">Items with 10 units or fewer</p>
          </div>

          <div className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="label-xs text-muted-foreground">OUT OF STOCK (CRITICAL)</span>
              <XCircle className="h-4 w-4 text-destructive" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-destructive">{outOfStockCount}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">Blocked from checkout additions</p>
          </div>
        </div>

        {activeTab === "STOCK" ? (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 border-[3px] border-foreground bg-background p-4 brutal-shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search inventory by title or SKU..."
                  className="w-full border-[2px] border-foreground bg-smoke/40 py-2.5 pl-10 pr-4 text-xs font-bold uppercase focus:bg-background focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilter("ALL")}
                  className={`border-[2px] border-foreground px-3 py-2 text-xs font-bold uppercase press ${
                    filter === "ALL" ? "bg-zap" : "bg-background hover:bg-smoke"
                  }`}
                >
                  ALL ITEMS ({state.products.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("LOW")}
                  className={`border-[2px] border-foreground px-3 py-2 text-xs font-bold uppercase press ${
                    filter === "LOW" ? "bg-flare text-white" : "bg-background hover:bg-smoke"
                  }`}
                >
                  LOW STOCK ({lowStockCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("OUT")}
                  className={`border-[2px] border-foreground px-3 py-2 text-xs font-bold uppercase press ${
                    filter === "OUT" ? "bg-destructive text-white" : "bg-background hover:bg-smoke"
                  }`}
                >
                  OUT OF STOCK ({outOfStockCount})
                </button>
              </div>
            </div>

            {/* Stock Level Table */}
            <div className="border-[3px] border-foreground bg-background brutal-shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b-[3px] border-foreground bg-smoke">
                    <tr className="label-xs text-foreground">
                      <th className="p-4 font-black">PIECE</th>
                      <th className="p-4 font-black">SKU</th>
                      <th className="p-4 font-black">PRICE</th>
                      <th className="p-4 font-black">STOCK STATUS</th>
                      <th className="p-4 font-black text-center">CURRENT UNITS</th>
                      <th className="p-4 font-black text-right">QUICK ADJUST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-smoke/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-10 w-10 border-[2px] border-foreground object-cover"
                            />
                            <div>
                              <p className="font-bold text-xs line-clamp-1">{p.name}</p>
                              <p className="text-[0.65rem] text-muted-foreground uppercase">{p.brand}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-mono font-bold">{p.sku}</td>
                        <td className="p-4 font-mono font-bold">{formatCurrency(p.price)}</td>

                        <td className="p-4">
                          {p.stock === 0 ? (
                            <span className="border border-destructive bg-destructive/15 px-2 py-0.5 text-[0.65rem] font-black text-destructive uppercase">
                              CRITICAL (0)
                            </span>
                          ) : p.stock <= 10 ? (
                            <span className="border border-flare bg-flare/15 px-2 py-0.5 text-[0.65rem] font-black text-flare uppercase">
                              LOW STOCK ({p.stock})
                            </span>
                          ) : (
                            <span className="border border-emerald-600 bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800 uppercase">
                              OPTIMAL ({p.stock})
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleSetExact(p.id, p.stock, p.name)}
                            title="Click to set exact count"
                            className="font-mono text-base font-black border-[2px] border-foreground bg-smoke/60 px-3 py-1 hover:bg-zap press"
                          >
                            {p.stock}
                          </button>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              disabled={p.stock <= 0}
                              onClick={() => handleAdjust(p.id, -1, p.name)}
                              className="border-[2px] border-foreground bg-background p-1.5 press disabled:opacity-30 hover:bg-smoke"
                              title="Decrease 1 unit"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjust(p.id, 1, p.name)}
                              className="border-[2px] border-foreground bg-background p-1.5 press hover:bg-smoke"
                              title="Add 1 unit"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjust(p.id, 10, p.name)}
                              className="border-[2px] border-foreground bg-zap px-2 py-1 text-[0.65rem] font-black uppercase press hover:bg-foreground hover:text-white"
                              title="Add batch of 10"
                            >
                              +10
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjust(p.id, 25, p.name)}
                              className="border-[2px] border-foreground bg-foreground text-background px-2 py-1 text-[0.65rem] font-black uppercase press hover:bg-zap hover:text-foreground"
                              title="Add batch of 25"
                            >
                              +25
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Inventory Audit Logs */
          <div className="border-[3px] border-foreground bg-background brutal-shadow p-6">
            <div className="flex items-center justify-between border-b-[2px] border-foreground pb-4 mb-4">
              <div>
                <h2 className="font-display text-xl font-black uppercase">INVENTORY AUDIT ACTIVITY LOG</h2>
                <p className="text-xs text-muted-foreground">Immutable history of sales deductions, restocks, and cancellations</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b-[2px] border-foreground bg-smoke">
                  <tr className="label-xs text-foreground">
                    <th className="p-3 font-bold">TIMESTAMP</th>
                    <th className="p-3 font-bold">TYPE</th>
                    <th className="p-3 font-bold">PIECE / SKU</th>
                    <th className="p-3 font-bold">CHANGE</th>
                    <th className="p-3 font-bold">NEW BALANCE</th>
                    <th className="p-3 font-bold">AUDIT NOTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {state.inventoryLogs.map((log) => {
                    const getLogBadge = (type: string) => {
                      switch (type) {
                        case "PURCHASE":
                          return "bg-amber-100 text-amber-900 border-amber-400";
                        case "RESTOCK":
                          return "bg-emerald-100 text-emerald-900 border-emerald-400";
                        case "CANCEL_RESTORE":
                          return "bg-blue-100 text-blue-900 border-blue-400";
                        default:
                          return "bg-smoke text-foreground border-foreground";
                      }
                    };

                    return (
                      <tr key={log.id} className="hover:bg-smoke/20 font-mono">
                        <td className="p-3 text-[0.7rem] text-muted-foreground whitespace-nowrap">{log.date}</td>
                        <td className="p-3 font-sans">
                          <span className={`inline-block border px-2 py-0.5 text-[0.65rem] font-black uppercase ${getLogBadge(log.type)}`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="p-3 font-sans">
                          <p className="font-bold text-xs">{log.productName}</p>
                          <p className="font-mono text-[0.65rem] text-muted-foreground">{log.sku}</p>
                        </td>
                        <td className="p-3 font-bold">
                          <span className={log.qtyChange > 0 ? "text-emerald-700" : "text-destructive"}>
                            {log.qtyChange > 0 ? `+${log.qtyChange}` : log.qtyChange}
                          </span>
                        </td>
                        <td className="p-3 font-bold">{log.newStock}</td>
                        <td className="p-3 font-sans text-xs text-muted-foreground">{log.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
