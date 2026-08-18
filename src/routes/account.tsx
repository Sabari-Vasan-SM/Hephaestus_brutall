import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, Button } from "@/components/brutal";
import { products } from "@/lib/data";
import { inr } from "@/lib/format";
import { useStore, type Order } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — BRUTAL." },
      { name: "description", content: "Manage your BRUTAL. orders, addresses, wishlist and profile." },
      { property: "og:title", content: "Your Account — BRUTAL." },
      { property: "og:description", content: "Manage your orders and profile." },
    ],
  }),
  component: Account,
});

const TABS = ["OVERVIEW", "ORDERS", "WISHLIST", "ADDRESSES", "PROFILE", "SETTINGS"] as const;

function statusTone(status: Order["status"]) {
  if (status === "DELIVERED") return "zap" as const;
  if (status === "CANCELLED") return "paper" as const;
  if (status === "SHIPPED") return "flare" as const;
  return "ink" as const;
}

function Account() {
  const { state, signOut } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]>("OVERVIEW");

  if (!state.user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="text-[clamp(2.2rem,9vw,4rem)]">Sign in first.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your account lives behind the door.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/login" className="label-xs border-[3px] border-foreground bg-flare px-6 py-4 text-background press brutal-shadow-sm">
            SIGN IN
          </Link>
          <Link to="/signup" className="label-xs border-[3px] border-foreground px-6 py-4 press brutal-shadow-sm">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    );
  }

  const saved = products.filter((p) => state.wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-[clamp(2.5rem,9vw,5rem)]">
        Hey,
        <br />
        {state.user.name}.
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
        <nav aria-label="Account" className="grid gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={
                "label-xs border-[3px] border-foreground px-4 py-3 text-left transition-colors " +
                (tab === t ? "bg-foreground text-background" : "hover:bg-zap")
              }
            >
              {t}
            </button>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              signOut();
              toast("SIGNED OUT");
              navigate({ to: "/" });
            }}
          >
            Logout
          </Button>
        </nav>

        <section className="border-[3px] border-foreground p-6 brutal-shadow-sm">
          {tab === "OVERVIEW" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["ORDERS", String(state.orders.length)],
                ["WISHLIST", String(state.wishlist.length)],
                ["IN CART", String(state.cart.reduce((n, c) => n + c.qty, 0))],
              ].map(([k, v]) => (
                <div key={k} className="border-[3px] border-foreground p-4">
                  <p className="font-display text-4xl font-black">{v}</p>
                  <p className="label-xs mt-1 text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "ORDERS" &&
            (state.orders.length === 0 ? (
              <Empty title="No orders yet." note="Once you place an order it shows up here." />
            ) : (
              <ul className="grid gap-4">
                {state.orders.map((o) => (
                  <li key={o.id} className="border-[3px] border-foreground p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-black">{o.id}</p>
                        <p className="label-xs text-muted-foreground">{o.date}</p>
                      </div>
                      <Badge tone={statusTone(o.status)}>{o.status}</Badge>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {o.items.map((i, idx) => (
                        <li key={idx}>
                          {i.qty}× {i.name} — {i.size} / {i.color}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between border-t-2 border-foreground pt-3">
                      <span className="label-xs">TOTAL</span>
                      <span className="font-display text-xl font-black">{inr(o.total)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ))}

          {tab === "WISHLIST" &&
            (saved.length === 0 ? (
              <Empty title="Nothing saved." note="Tap the heart on any product." />
            ) : (
              <ul className="grid gap-3">
                {saved.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 border-[3px] border-foreground p-3">
                    <img src={p.image} alt="" width={120} height={120} loading="lazy" className="h-16 w-16 border-2 border-foreground object-cover" />
                    <Link to="/product/$productId" params={{ productId: p.id }} className="flex-1 font-display font-black uppercase hover:underline">
                      {p.name}
                    </Link>
                    <span className="font-display font-black">{inr(p.price)}</span>
                  </li>
                ))}
              </ul>
            ))}

          {tab === "ADDRESSES" &&
            (state.addresses.length === 0 ? (
              <Empty title="No addresses." note="Addresses are saved when you place an order." />
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {state.addresses.map((a, i) => (
                  <li key={i} className="border-[3px] border-foreground p-4 text-sm">
                    <p className="font-display text-lg font-black uppercase">{a.fullName}</p>
                    <p className="mt-1 text-muted-foreground">
                      {a.address}, {a.city}, {a.state} {a.postalCode}, {a.country}
                    </p>
                  </li>
                ))}
              </ul>
            ))}

          {tab === "PROFILE" && (
            <dl className="grid gap-3 text-sm">
              <div className="border-[3px] border-foreground p-4">
                <dt className="label-xs text-muted-foreground">NAME</dt>
                <dd className="mt-1 font-bold">{state.user.name}</dd>
              </div>
              <div className="border-[3px] border-foreground p-4">
                <dt className="label-xs text-muted-foreground">EMAIL</dt>
                <dd className="mt-1 font-bold">{state.user.email}</dd>
              </div>
            </dl>
          )}

          {tab === "SETTINGS" && (
            <div className="grid gap-3">
              <p className="text-sm text-muted-foreground">Preferences for drop alerts and order updates.</p>
              {["DROP ALERTS", "ORDER UPDATES", "RESTOCK NOTICES"].map((s) => (
                <label key={s} className="flex items-center justify-between border-[3px] border-foreground p-4">
                  <span className="label-xs">{s}</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-[oklch(0.667_0.234_39.5)]" />
                </label>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Empty({ title, note }: { title: string; note: string }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}
