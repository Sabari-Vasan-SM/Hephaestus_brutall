import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { Users, Search, ShoppingBag, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/superadmin/customers")({
  head: () => ({
    meta: [
      { title: "Customers Directory — BRUTAL. Super Admin" },
      { name: "description", content: "View registered client accounts, order history, and saved addresses." },
    ],
  }),
  component: AdminCustomersPage,
});

function AdminCustomersPage() {
  const { state } = useStore();
  const [search, setSearch] = useState("");

  const filteredCustomers = state.customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  const getCustomerMetrics = (email: string) => {
    const customerOrders = state.orders.filter(
      (o) => o.email.toLowerCase() === email.toLowerCase() && o.status !== "CANCELLED",
    );
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
    return {
      orderCount: customerOrders.length,
      totalSpent,
    };
  };

  return (
    <AdminLayout
      title="REGISTERED CLIENT DIRECTORY"
      subtitle={`Managing ${state.customers.length} authenticated customer profiles and address books.`}
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="flex border-[3px] border-foreground bg-background p-4 brutal-shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email address, or phone..."
              className="w-full border-[2px] border-foreground bg-smoke/40 py-2.5 pl-10 pr-4 text-xs font-bold uppercase focus:bg-background focus:outline-none"
            />
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => {
            const metrics = getCustomerMetrics(customer.email);

            return (
              <div
                key={customer.id}
                className="border-[3px] border-foreground bg-background p-6 brutal-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between border-b-[2px] border-foreground pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center border-[2px] border-foreground bg-zap font-display font-black text-sm">
                        {customer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-black uppercase">{customer.name}</h3>
                        <span className="font-mono text-[0.65rem] text-muted-foreground">ID: {customer.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Joined {new Date(customer.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Box */}
                  <div className="mt-4 grid grid-cols-2 gap-2 border-[2px] border-foreground bg-smoke/60 p-3 text-center">
                    <div>
                      <span className="label-xs text-muted-foreground block">ORDERS</span>
                      <span className="font-display font-black text-base">{metrics.orderCount}</span>
                    </div>
                    <div>
                      <span className="label-xs text-muted-foreground block">LIFETIME VALUE</span>
                      <span className="font-mono font-black text-sm text-emerald-800">
                        {formatCurrency(metrics.totalSpent)}
                      </span>
                    </div>
                  </div>

                  {/* Saved Addresses Summary */}
                  <div className="mt-4 border-t border-zinc-200 pt-3">
                    <span className="label-xs text-muted-foreground block mb-2">
                      SAVED ADDRESSES ({customer.addresses.length})
                    </span>
                    {customer.addresses.length === 0 ? (
                      <p className="text-[0.7rem] text-muted-foreground italic">No addresses saved yet.</p>
                    ) : (
                      <div className="space-y-1.5 text-[0.7rem]">
                        {customer.addresses.map((addr, idx) => (
                          <div key={idx} className="border border-zinc-300 p-2 bg-white flex items-start gap-1.5">
                            <MapPin className="h-3 w-3 shrink-0 mt-0.5 text-flare" />
                            <div className="truncate">
                              <p className="font-bold truncate">{addr.fullName}</p>
                              <p className="truncate text-muted-foreground">{addr.address}, {addr.city} {addr.postalCode}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer link to view orders */}
                <div className="mt-6 pt-3 border-t-[2px] border-foreground">
                  <Link
                    to="/superadmin/orders"
                    className="label-xs block text-center border-[2px] border-foreground bg-zap py-2 font-black press hover:bg-foreground hover:text-white"
                  >
                    INSPECT CUSTOMER ORDERS →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
