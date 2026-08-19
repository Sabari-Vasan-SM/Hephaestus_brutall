import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import {
  Settings,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Save,
  Megaphone,
  Truck,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type Coupon, type StoreSettings } from "@/lib/data";

export const Route = createFileRoute("/superadmin/settings")({
  head: () => ({
    meta: [
      { title: "Store Settings & Coupons — BRUTAL. Super Admin" },
      { name: "description", content: "Configure promo codes, shipping rates, banners, and demo state." },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const {
    state,
    addCoupon,
    deleteCoupon,
    toggleCouponStatus,
    updateSettings,
    resetToDemoData,
  } = useStore();

  // Settings State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(state.settings);

  // New Coupon Form State
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percent" | "flat">("percent");
  const [newValue, setNewValue] = useState<number>(10);
  const [newMinOrder, setNewMinOrder] = useState<number>(1000);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    toast.success("SETTINGS SAVED", { description: "Store policies and announcement updated." });
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      toast.error("INVALID CODE", { description: "Enter a valid promo code string." });
      return;
    }

    addCoupon({
      code: newCode.trim().toUpperCase(),
      type: newType,
      value: Number(newValue),
      minOrder: Number(newMinOrder),
      status: "active",
    });

    toast.success("PROMO CODE CREATED", {
      description: `Code ${newCode.toUpperCase()} is now live and redeemable.`,
    });

    setNewCode("");
    setNewValue(10);
    setNewMinOrder(1000);
  };

  const handleDeleteCoupon = (id: string, code: string) => {
    if (window.confirm(`Delete promo code "${code}"?`)) {
      deleteCoupon(id);
      toast.success("COUPON DELETED", { description: `Code ${code} removed.` });
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "CRITICAL: Reset all products, orders, inventory logs, and customers back to initial seed data?",
      )
    ) {
      resetToDemoData();
      toast.info("DEMO DATA RESTORED", { description: "Store state reset to factory defaults." });
    }
  };

  return (
    <AdminLayout
      title="STORE SETTINGS & PROMO CODES"
      subtitle="Manage discount campaigns, global shipping rules, and announcement notifications."
    >
      <div className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Promo Codes Manager */}
          <div className="space-y-6">
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <div className="flex items-center gap-2 border-b-[2px] border-foreground pb-3 mb-4">
                <Tag className="h-5 w-5" />
                <h2 className="font-display text-lg font-black uppercase">CREATE NEW PROMO CODE</h2>
              </div>

              <form onSubmit={handleAddCoupon} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs block mb-1">PROMO CODE *</label>
                    <input
                      type="text"
                      required
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      placeholder="e.g. FLASH25"
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-mono font-bold uppercase focus:bg-background focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">DISCOUNT TYPE</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as "percent" | "flat")}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold uppercase"
                    >
                      <option value="percent">PERCENTAGE (%)</option>
                      <option value="flat">FLAT AMOUNT (₹)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs block mb-1">
                      DISCOUNT VALUE ({newType === "percent" ? "%" : "₹"}) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={newType === "percent" ? 90 : 100000}
                      value={newValue}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">MINIMUM ORDER (₹)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newMinOrder}
                      onChange={(e) => setNewMinOrder(Number(e.target.value))}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 border-[2px] border-foreground bg-zap py-3 text-xs font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                  <span>ADD PROMO CODE</span>
                </button>
              </form>
            </div>

            {/* Active Coupons List */}
            <div className="border-[3px] border-foreground bg-background p-6 brutal-shadow">
              <h2 className="font-display text-lg font-black uppercase border-b-[2px] border-foreground pb-3 mb-4">
                ACTIVE DISCOUNT CODES ({state.coupons.length})
              </h2>

              <div className="divide-y divide-zinc-200">
                {state.coupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black tracking-wider text-foreground">
                          {coupon.code}
                        </span>
                        <span
                          className={`border px-1.5 py-0.2 text-[0.65rem] font-bold uppercase ${
                            coupon.status === "active"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                              : "bg-smoke text-muted-foreground border-zinc-300"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {coupon.type === "percent" ? `${coupon.value}% OFF` : `₹${coupon.value} FLAT OFF`} on
                        orders above ₹{coupon.minOrder.toLocaleString("en-IN")} • Used {coupon.usageCount} times
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className="label-xs border border-foreground bg-smoke px-2 py-1 press hover:bg-zap"
                      >
                        {coupon.status === "active" ? "EXPIRE" : "ACTIVATE"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                        className="border border-destructive bg-destructive/10 p-1.5 text-destructive press hover:bg-destructive hover:text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Global Store Settings */}
          <div className="space-y-6">
            <form onSubmit={handleSaveSettings} className="border-[3px] border-foreground bg-background p-6 brutal-shadow space-y-4">
              <div className="flex items-center gap-2 border-b-[2px] border-foreground pb-3 mb-2">
                <Megaphone className="h-5 w-5" />
                <h2 className="font-display text-lg font-black uppercase">STOREFRONT & BANNER SETTINGS</h2>
              </div>

              <div>
                <label className="label-xs block mb-1">STORE BRAND NAME</label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold uppercase"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">BRAND TAGLINE</label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="label-xs block mb-1">TOP TICKER ANNOUNCEMENT TEXT</label>
                <input
                  type="text"
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full border-[2px] border-foreground bg-smoke/40 p-2.5 text-xs font-bold uppercase"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="annActive"
                  checked={settingsForm.announcementActive}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })}
                  className="h-4 w-4 accent-foreground"
                />
                <label htmlFor="annActive" className="text-xs font-bold uppercase cursor-pointer">
                  ENABLE LIVE TOP ANNOUNCEMENT TICKER
                </label>
              </div>

              <div className="border-t-[2px] border-foreground pt-4 mt-4">
                <h3 className="font-display text-xs font-black uppercase mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  SHIPPING & THRESHOLDS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label-xs block mb-1">FREE SHIPPING (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">STANDARD FEE (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.standardShippingFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, standardShippingFee: Number(e.target.value) })}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">EXPRESS FEE (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.expressShippingFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, expressShippingFee: Number(e.target.value) })}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-[2px] border-foreground pt-4 mt-4">
                <h3 className="font-display text-xs font-black uppercase mb-3">CUSTOMER SUPPORT CHANNELS</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label-xs block mb-1">CONCIERGE EMAIL</label>
                    <input
                      type="email"
                      value={settingsForm.supportEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="label-xs block mb-1">SUPPORT HOTLINE</label>
                    <input
                      type="text"
                      value={settingsForm.supportPhone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                      className="w-full border-[2px] border-foreground bg-smoke/40 p-2 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-zap py-3.5 text-xs font-black uppercase press brutal-shadow-sm"
              >
                <Save className="h-4 w-4" />
                <span>SAVE GLOBAL SETTINGS</span>
              </button>
            </form>

            {/* Factory Reset Danger Zone */}
            <div className="border-[3px] border-destructive bg-destructive/5 p-6 brutal-shadow space-y-3">
              <div className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-5 w-5" />
                <h2 className="font-display text-base font-black uppercase">FACTORY DEMO RESET</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Resets all products (20+ items), sample orders, registered test customers, and inventory audit logs back to initial factory baseline.
              </p>
              <button
                type="button"
                onClick={handleResetData}
                className="flex items-center justify-center gap-2 border-[2px] border-destructive bg-destructive text-white py-3 px-4 text-xs font-black uppercase press hover:bg-black w-full"
              >
                <RotateCcw className="h-4 w-4" />
                <span>RESET ALL STORE DATA TO DEMO BASELINE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
