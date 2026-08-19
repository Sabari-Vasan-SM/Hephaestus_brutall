import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  Plus,
  Search,
  Filter,
  Copy,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "@/lib/data";

export const Route = createFileRoute("/superadmin/products/")({
  head: () => ({
    meta: [
      { title: "Products Management — BRUTAL. Super Admin" },
      { name: "description", content: "Manage, create, edit, duplicate, and publish products." },
    ],
  }),
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const { state, deleteProduct, duplicateProduct, toggleProductStatus } = useStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [stockFilter, setStockFilter] = useState<string>("ALL");

  const filteredProducts = state.products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchesStock =
      stockFilter === "ALL" ||
      (stockFilter === "IN_STOCK" && p.stock > 10) ||
      (stockFilter === "LOW_STOCK" && p.stock > 0 && p.stock <= 10) ||
      (stockFilter === "OUT_OF_STOCK" && p.stock === 0);

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteProduct(id);
      toast.success("PRODUCT DELETED", { description: `${name} has been removed from catalog.` });
    }
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateProduct(id);
    if (dup) {
      toast.success("PRODUCT DUPLICATED", { description: `Created draft copy: ${dup.name}` });
    }
  };

  const handleToggleStatus = (id: string, currentStatus: "active" | "draft") => {
    toggleProductStatus(id);
    const next = currentStatus === "active" ? "DRAFT" : "ACTIVE";
    toast.info("STATUS UPDATED", { description: `Product is now in ${next} state.` });
  };

  return (
    <AdminLayout
      title="PRODUCT CATALOG"
      subtitle={`Total ${state.products.length} registered pieces across all collections.`}
      action={
        <Link
          to="/superadmin/products/new"
          className="flex items-center gap-2 border-[2px] border-foreground bg-zap px-4 py-2.5 text-xs font-black uppercase press brutal-shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>ADD NEW PRODUCT</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-4 border-[3px] border-foreground bg-background p-4 brutal-shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, SKU, brand, or tag..."
              className="w-full border-[2px] border-foreground bg-smoke/40 py-2.5 pl-10 pr-4 text-xs font-bold uppercase focus:bg-background focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="men">MEN</option>
              <option value="women">WOMEN</option>
              <option value="accessories">ACCESSORIES</option>
              <option value="footwear">FOOTWEAR</option>
              <option value="headwear">HEADWEAR</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase"
            >
              <option value="ALL">ALL STATUS</option>
              <option value="active">ACTIVE ONLY</option>
              <option value="draft">DRAFTS ONLY</option>
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="border-[2px] border-foreground bg-background px-3 py-2 text-xs font-bold uppercase"
            >
              <option value="ALL">ALL STOCK</option>
              <option value="IN_STOCK">HEALTHY (&gt; 10)</option>
              <option value="LOW_STOCK">LOW STOCK (≤ 10)</option>
              <option value="OUT_OF_STOCK">OUT OF STOCK (0)</option>
            </select>
          </div>
        </div>

        {/* Products Table Container */}
        <div className="border-[3px] border-foreground bg-background brutal-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b-[3px] border-foreground bg-smoke">
                <tr className="label-xs text-foreground">
                  <th className="p-4 font-black">PRODUCT</th>
                  <th className="p-4 font-black">SKU / BRAND</th>
                  <th className="p-4 font-black">CATEGORY</th>
                  <th className="p-4 font-black">PRICE</th>
                  <th className="p-4 font-black">STOCK</th>
                  <th className="p-4 font-black">STATUS</th>
                  <th className="p-4 font-black text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-muted-foreground">
                      No products match your active search filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-smoke/30 transition-colors">
                      {/* Image & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-12 w-12 border-[2px] border-foreground object-cover shrink-0"
                          />
                          <div>
                            <p className="font-bold text-xs line-clamp-1">{p.name}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              {p.featured && (
                                <span className="border border-foreground bg-zap px-1 py-0.2 text-[0.6rem] font-black uppercase">
                                  FEATURED
                                </span>
                              )}
                              {p.trending && (
                                <span className="border border-foreground bg-flare px-1 py-0.2 text-[0.6rem] font-black text-white uppercase">
                                  TRENDING
                                </span>
                              )}
                              {p.newArrival && (
                                <span className="border border-foreground bg-blue-200 px-1 py-0.2 text-[0.6rem] font-black uppercase">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU / Brand */}
                      <td className="p-4">
                        <p className="font-mono font-bold">{p.sku}</p>
                        <p className="text-[0.7rem] text-muted-foreground uppercase">{p.brand}</p>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="border border-foreground bg-background px-2 py-1 text-[0.7rem] font-bold uppercase">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-mono font-bold">
                        <p>{formatCurrency(p.price)}</p>
                        {p.compareAt && (
                          <p className="text-[0.65rem] text-muted-foreground line-through">
                            {formatCurrency(p.compareAt)}
                          </p>
                        )}
                      </td>

                      {/* Stock Level */}
                      <td className="p-4">
                        {p.stock === 0 ? (
                          <span className="border border-destructive bg-destructive/15 px-2 py-0.5 text-[0.65rem] font-black text-destructive uppercase">
                            OUT OF STOCK
                          </span>
                        ) : p.stock <= 10 ? (
                          <span className="border border-flare bg-flare/15 px-2 py-0.5 text-[0.65rem] font-black text-flare uppercase">
                            LOW ({p.stock})
                          </span>
                        ) : (
                          <span className="border border-foreground bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800 uppercase">
                            {p.stock} UNITS
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p.id, p.status)}
                          className={`label-xs border-[2px] px-2.5 py-1 press ${
                            p.status === "active"
                              ? "border-foreground bg-zap text-foreground"
                              : "border-zinc-400 bg-smoke text-muted-foreground"
                          }`}
                        >
                          {p.status === "active" ? "ACTIVE" : "DRAFT"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live preview */}
                          <Link
                            to="/product/$productId"
                            params={{ productId: p.id }}
                            target="_blank"
                            title="View Live Storefront PDP"
                            className="border-[2px] border-foreground p-1.5 press hover:bg-zap"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          {/* Edit */}
                          <Link
                            to="/superadmin/products/$productId/edit"
                            params={{ productId: p.id }}
                            title="Edit Product"
                            className="border-[2px] border-foreground p-1.5 press hover:bg-zap"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Link>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p.id)}
                            title="Duplicate Product"
                            className="border-[2px] border-foreground p-1.5 press hover:bg-smoke"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id, p.name)}
                            title="Delete Product"
                            className="border-[2px] border-foreground bg-destructive/10 p-1.5 text-destructive press hover:bg-destructive hover:text-white"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
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
