import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useState, type ReactNode, useEffect } from "react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const navItems = [
  { href: "/superadmin", label: "DASHBOARD", icon: LayoutDashboard, exact: true },
  { href: "/superadmin/products", label: "PRODUCTS", icon: Package },
  { href: "/superadmin/inventory", label: "INVENTORY", icon: Boxes },
  { href: "/superadmin/orders", label: "ORDERS", icon: ShoppingBag },
  { href: "/superadmin/customers", label: "CUSTOMERS", icon: Users },
  { href: "/superadmin/settings", label: "SETTINGS", icon: Settings },
];

export function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const { adminSession, adminLogout, state } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;

  // Route protection
  useEffect(() => {
    if (!adminSession?.loggedIn) {
      navigate({ to: "/superadmin/login" });
    }
  }, [adminSession, navigate]);

  if (!adminSession?.loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md border-[3px] border-foreground bg-background p-8 text-center brutal-shadow">
          <AlertTriangle className="mx-auto h-12 w-12 text-flare" />
          <h1 className="mt-4 text-2xl font-black uppercase font-display">AUTHENTICATION REQUIRED</h1>
          <p className="mt-2 text-sm text-muted-foreground">You must log in to access the Super Admin control panel.</p>
          <div className="mt-6">
            <Link
              to="/superadmin/login"
              className="inline-block border-[3px] border-foreground bg-zap px-6 py-3 font-bold uppercase press brutal-shadow-sm text-xs"
            >
              ADMIN LOGIN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const lowStockCount = state.products.filter((p) => p.stock <= 10).length;
  const pendingOrdersCount = state.orders.filter((o) => o.status === "PLACED" || o.status === "CONFIRMED").length;

  const handleLogout = () => {
    adminLogout();
    toast.success("ADMIN LOGGED OUT", { description: "Session ended securely." });
    navigate({ to: "/superadmin/login" });
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-foreground font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-[3px] border-foreground bg-background transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b-[3px] border-foreground px-6 bg-zap">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black tracking-tight">
              BRUTAL<span className="text-flare">.</span>
            </span>
            <span className="border border-foreground bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold text-background uppercase">
              ADMIN
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="p-1 border-[2px] border-foreground lg:hidden hover:bg-background"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Admin Profile Pill */}
        <div className="border-b-[3px] border-foreground bg-smoke/70 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border-[2px] border-foreground bg-zap font-display font-black text-sm">
              HQ
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <p className="truncate text-xs font-bold uppercase">{adminSession.name}</p>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="truncate text-[0.7rem] text-muted-foreground">{adminSession.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? currentPath === item.href
              : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between border-[2px] px-4 py-3 text-xs font-bold uppercase transition-all duration-150 ${
                  isActive
                    ? "border-foreground bg-zap brutal-shadow-sm translate-x-1"
                    : "border-transparent hover:border-foreground hover:bg-smoke"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                  <span>{item.label}</span>
                </div>
                {item.label === "INVENTORY" && lowStockCount > 0 && (
                  <span className="border border-foreground bg-flare px-1.5 py-0.5 text-[0.65rem] font-black text-background">
                    {lowStockCount} LOW
                  </span>
                )}
                {item.label === "ORDERS" && pendingOrdersCount > 0 && (
                  <span className="border border-foreground bg-foreground px-1.5 py-0.5 text-[0.65rem] font-black text-background">
                    {pendingOrdersCount} NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t-[3px] border-foreground p-4 space-y-2 bg-smoke/40">
          <Link
            to="/"
            target="_blank"
            className="flex w-full items-center justify-center gap-2 border-[2px] border-foreground bg-background py-2.5 text-xs font-bold uppercase press hover:bg-zap"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>VIEW STOREFRONT</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 border-[2px] border-foreground bg-destructive/10 text-destructive py-2.5 text-xs font-bold uppercase press hover:bg-destructive hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-[3px] border-foreground bg-background px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="border-[2px] border-foreground p-2 lg:hidden hover:bg-zap"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {action}
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
