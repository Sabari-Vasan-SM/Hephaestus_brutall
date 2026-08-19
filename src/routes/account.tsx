import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Package,
  Heart,
  MapPin,
  User,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Field, Input } from "@/components/brutal";
import { inr, formatCurrency } from "@/lib/format";
import { useStore, type Order } from "@/lib/store";
import { type Address } from "@/lib/data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Client Portal — BRUTAL." },
      {
        name: "description",
        content: "Manage your BRUTAL. orders, saved addresses, wishlist and customer profile.",
      },
      { property: "og:title", content: "Client Portal — BRUTAL." },
      { property: "og:description", content: "Manage your orders and profile." },
    ],
  }),
  component: Account,
});

const TABS = [
  { id: "OVERVIEW", label: "OVERVIEW", icon: User },
  { id: "ORDERS", label: "ORDERS & DISPATCHES", icon: Package },
  { id: "WISHLIST", label: "SAVED PIECES", icon: Heart },
  { id: "ADDRESSES", label: "SAVED ADDRESSES", icon: MapPin },
  { id: "PROFILE", label: "PROFILE & SECURITY", icon: Settings },
] as const;

function statusTone(status: Order["status"]) {
  if (status === "DELIVERED") return "zap" as const;
  if (status === "CANCELLED") return "paper" as const;
  if (status === "SHIPPED" || status === "OUT_FOR_DELIVERY") return "flare" as const;
  return "ink" as const;
}

function Account() {
  const {
    state,
    logoutCustomer,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    activeProducts,
    removeFromWishlist,
    addToCart,
    cancelOrder,
  } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("OVERVIEW");

  // Profile Edit State
  const [profileName, setProfileName] = useState(state.user?.name ?? "");
  const [profilePhone, setProfilePhone] = useState(state.user?.phone ?? "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Address Add Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<Address>({
    fullName: state.user?.name ?? "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  if (!state.user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <div className="border-[3px] border-foreground bg-background p-10 brutal-shadow">
          <h1 className="font-display text-3xl font-black uppercase">MEMBER PORTAL LOCKED</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Sign in to review archival orders, track live packages, and manage addresses.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="label-xs border-[2px] border-foreground bg-zap px-6 py-3 font-black uppercase text-foreground press hover:bg-foreground hover:text-white"
            >
              SIGN IN
            </Link>
            <Link
              to="/signup"
              className="label-xs border-[2px] border-foreground bg-smoke px-6 py-3 font-black uppercase press"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = state.user;
  const userOrders = state.orders.filter(
    (o) => o.email.toLowerCase() === user.email.toLowerCase() || o.customerName === user.name,
  );
  const savedPieces = activeProducts.filter((p) => state.wishlist.includes(p.id));
  const addresses = user.addresses ?? [];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    updateProfile({ name: profileName, phone: profilePhone });
    setTimeout(() => {
      setIsSavingProfile(false);
      toast.success("PROFILE UPDATED");
    }, 300);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.city || !newAddr.postalCode) {
      toast.error("PLEASE FILL ALL ADDRESS FIELDS");
      return;
    }
    addAddress(newAddr);
    toast.success("ADDRESS SAVED TO ACCOUNT");
    setShowAddAddress(false);
    setNewAddr({
      fullName: user.name,
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-8 border-b-[3px] border-foreground pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="label-xs bg-foreground px-2 py-1 text-background">MEMBER DASHBOARD</span>
          <h1 className="mt-3 text-[clamp(2.4rem,8vw,4.5rem)] font-display font-black uppercase leading-[0.92] tracking-tight">
            Hey, {user.name.split(" ")[0]}.
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            logoutCustomer();
            toast.info("SIGNED OUT OF CLIENT PORTAL");
            navigate({ to: "/" });
          }}
          className="label-xs flex items-center gap-1.5 border-[2px] border-foreground bg-smoke px-4 py-2.5 font-black uppercase press hover:bg-destructive hover:text-white self-start sm:self-auto"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>SIGN OUT</span>
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
        {/* Navigation Sidebar */}
        <nav aria-label="Account Navigation" className="grid gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isCurrent = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={isCurrent}
                className={`label-xs flex items-center gap-2.5 border-[2px] border-foreground px-4 py-3.5 text-left font-black uppercase transition-colors press ${
                  isCurrent ? "bg-foreground text-background brutal-shadow-sm" : "bg-background hover:bg-zap"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Tabs */}
        <section className="border-[3px] border-foreground bg-background p-6 brutal-shadow-sm">
          {/* TAB 1: OVERVIEW */}
          {tab === "OVERVIEW" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-black uppercase">ACCOUNT METRICS</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["ALL ORDERS", String(userOrders.length), "Completed & In-Transit"],
                  ["WISHLIST PIECES", String(state.wishlist.length), "Saved for drops"],
                  ["BAG ITEMS", String(state.cart.reduce((n, c) => n + c.qty, 0)), "Ready to checkout"],
                ].map(([k, v, desc]) => (
                  <div key={k} className="border-[2px] border-foreground bg-smoke/40 p-4">
                    <p className="font-display text-3xl font-black text-foreground">{v}</p>
                    <p className="label-xs mt-1 font-black text-foreground">{k}</p>
                    <p className="text-[0.65rem] text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders Preview */}
              <div className="border-t-[2px] border-foreground pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="label-xs font-black uppercase">RECENT DISPATCH</h3>
                  {userOrders.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setTab("ORDERS")}
                      className="label-xs underline hover:text-flare"
                    >
                      VIEW ALL ORDERS ({userOrders.length})
                    </button>
                  )}
                </div>

                {userOrders.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No orders placed yet.</p>
                ) : (
                  <div className="border-[2px] border-foreground p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs">#{userOrders[0].id}</span>
                        <Badge tone={statusTone(userOrders[0].status)}>{userOrders[0].status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {userOrders[0].items.length} piece(s) • Total: {formatCurrency(userOrders[0].total)}
                      </p>
                    </div>
                    <Link
                      to="/order/$orderId"
                      params={{ orderId: userOrders[0].id }}
                      className="label-xs inline-flex items-center gap-1 border border-foreground bg-zap px-3 py-2 font-black uppercase press"
                    >
                      <span>TRACK DISPATCH</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {tab === "ORDERS" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-black uppercase">YOUR ORDER HISTORY</h2>

              {userOrders.length === 0 ? (
                <Empty
                  title="NO ORDERS YET"
                  note="Your confirmed orders and live tracking will appear here."
                />
              ) : (
                <ul className="grid gap-4">
                  {userOrders.map((o) => (
                    <li key={o.id} className="border-[2px] border-foreground bg-background p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                        <div>
                          <p className="font-mono text-sm font-black text-foreground">#{o.id}</p>
                          <p className="label-xs text-muted-foreground mt-0.5">{o.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge tone={statusTone(o.status)}>{o.status}</Badge>
                          <Link
                            to="/order/$orderId"
                            params={{ orderId: o.id }}
                            className="label-xs flex items-center gap-1 border border-foreground bg-smoke px-3 py-1.5 font-bold uppercase hover:bg-zap press"
                          >
                            <span>LIVE TRACKING</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>

                      <ul className="mt-3 space-y-2 text-xs">
                        {o.items.map((i, idx) => (
                          <li key={idx} className="flex items-center justify-between text-muted-foreground">
                            <span>
                              {i.qty}× <strong className="text-foreground">{i.name}</strong> ({i.size} / {i.color})
                            </span>
                            <span className="font-mono">{formatCurrency(i.price * i.qty)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-center justify-between border-t border-foreground pt-3">
                        <span className="label-xs text-muted-foreground">PAID AMOUNT</span>
                        <span className="font-mono text-lg font-black">{formatCurrency(o.total)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {tab === "WISHLIST" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-black uppercase">
                SAVED PIECES ({savedPieces.length})
              </h2>

              {savedPieces.length === 0 ? (
                <Empty
                  title="NOTHING IN WISHLIST"
                  note="Tap the heart icon on any drop to save pieces to this list."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedPieces.map((p) => (
                    <div
                      key={p.id}
                      className="border-[2px] border-foreground bg-background p-4 flex flex-col justify-between"
                    >
                      <div className="flex gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-20 w-20 border border-foreground object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="label-xs text-muted-foreground uppercase">{p.brand}</span>
                          <Link
                            to="/product/$productId"
                            params={{ productId: p.id }}
                            className="block font-display text-xs font-black uppercase hover:underline truncate"
                          >
                            {p.name}
                          </Link>
                          <p className="font-mono text-xs font-black mt-1">{formatCurrency(p.price)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-zinc-200">
                        <Button
                          variant="solid"
                          size="sm"
                          full
                          onClick={() => {
                            addToCart(p, p.sizes[0] ?? "M", p.colors[0] ?? "Black", 1);
                            toast.success("ADDED TO BAG", { description: p.name });
                          }}
                          className="text-[0.65rem] font-black uppercase"
                        >
                          ADD TO BAG
                        </Button>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => {
                            removeFromWishlist(p.id);
                            toast.info("REMOVED FROM WISHLIST");
                          }}
                          className="border border-foreground p-2 hover:bg-destructive hover:text-white transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {tab === "ADDRESSES" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-black uppercase">SAVED SHIPPING ADDRESSES</h2>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="label-xs flex items-center gap-1.5 border-[2px] border-foreground bg-zap px-3 py-2 font-black uppercase press hover:bg-foreground hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>ADD ADDRESS</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <form
                  onSubmit={handleCreateAddress}
                  className="border-[2px] border-foreground bg-smoke/50 p-5 space-y-4"
                >
                  <h3 className="label-xs font-black uppercase border-b border-foreground pb-2">
                    NEW DESTINATION
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="label-xs block mb-1">RECIPIENT NAME *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-xs block mb-1">STREET ADDRESS *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.address}
                        onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-1">CITY *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-1">STATE *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-1">POSTAL CODE *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.postalCode}
                        onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="label-xs block mb-1">COUNTRY *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.country}
                        onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                        className="w-full border border-foreground p-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="border-[2px] border-foreground bg-foreground text-background px-4 py-2 text-xs font-black uppercase press"
                    >
                      SAVE ADDRESS
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="border-[2px] border-foreground bg-smoke px-4 py-2 text-xs font-bold uppercase press"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}

              {addresses.length === 0 ? (
                <Empty
                  title="NO ADDRESSES SAVED"
                  note="Add your default delivery destination for 1-click checkout."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((a, idx) => {
                    const isDefault = user.defaultAddressIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`border-[2px] p-4 flex flex-col justify-between ${
                          isDefault ? "border-foreground bg-zap/30 brutal-shadow-sm" : "border-zinc-300 bg-background"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-display text-xs font-black uppercase">{a.fullName}</p>
                            {isDefault && (
                              <span className="label-xs bg-foreground px-2 py-0.5 text-background text-[0.6rem]">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{a.address}</p>
                          <p className="text-xs font-mono font-bold mt-1">
                            {a.city}, {a.state} — {a.postalCode}
                          </p>
                          <p className="text-[0.7rem] text-muted-foreground">{a.country}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-200">
                          {!isDefault ? (
                            <button
                              type="button"
                              onClick={() => {
                                setDefaultAddress(idx);
                                toast.success("DEFAULT ADDRESS SET");
                              }}
                              className="label-xs underline hover:text-flare"
                            >
                              SET AS DEFAULT
                            </button>
                          ) : (
                            <span className="text-[0.65rem] text-emerald-800 font-bold flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-emerald-600" /> Default destination
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              deleteAddress(idx);
                              toast.info("ADDRESS REMOVED");
                            }}
                            className="text-zinc-500 hover:text-destructive p-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {tab === "PROFILE" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-black uppercase">PROFILE INFORMATION</h2>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <Field label="FULL NAME">
                  <Input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                    className="text-xs font-bold"
                  />
                </Field>
                <Field label="EMAIL ADDRESS (IMMUTABLE)">
                  <Input
                    value={user.email}
                    disabled
                    className="text-xs font-mono bg-smoke/60 opacity-70 cursor-not-allowed"
                  />
                </Field>
                <Field label="PHONE NUMBER">
                  <Input
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="text-xs font-bold"
                  />
                </Field>

                <Button
                  type="submit"
                  variant="flare"
                  disabled={isSavingProfile}
                  className="text-xs font-black uppercase text-white hover:bg-black"
                >
                  {isSavingProfile ? "SAVING…" : "SAVE CHANGES"}
                </Button>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Empty({ title, note }: { title: string; note: string }) {
  return (
    <div className="border-[2px] border-dashed border-zinc-300 p-8 text-center bg-smoke/20">
      <h3 className="font-display text-base font-black uppercase">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

