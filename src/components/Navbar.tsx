import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchOverlay } from "@/components/SearchOverlay";
import { useStore } from "@/lib/store";

const navLinks = [
  { label: "NEW", search: { sort: "new" } },
  { label: "SHOP", search: {} },
  { label: "MEN", search: { category: "men" } },
  { label: "WOMEN", search: { category: "women" } },
  { label: "ACCESSORIES", search: { category: "accessories" } },
  { label: "SALE", search: { sale: true } },
] as const;

export function Navbar() {
  const { cartCount, state } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 350);
    return () => window.clearTimeout(t);
  }, [cartCount]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-[3px] border-foreground bg-background">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <Link to="/" className="font-display text-2xl font-black tracking-tight sm:text-3xl">
            BRUTAL<span className="text-flare">.</span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to="/shop"
                search={l.search}
                className="label-xs border-2 border-transparent px-3 py-2 transition-colors hover:border-foreground hover:bg-zap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="border-[3px] border-foreground p-2 transition-colors hover:bg-zap"
            >
              <Search width={18} height={18} strokeWidth={3} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden border-[3px] border-foreground p-2 transition-colors hover:bg-zap sm:block"
            >
              <Heart width={18} height={18} strokeWidth={3} />
              {state.wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center border-2 border-foreground bg-flare px-1 text-[0.6rem] font-black text-background">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to={state.user ? "/account" : "/login"}
              aria-label="Account"
              className="hidden border-[3px] border-foreground p-2 transition-colors hover:bg-zap sm:block"
            >
              <User width={18} height={18} strokeWidth={3} />
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className={
                "relative border-[3px] border-foreground bg-foreground p-2 text-background transition-transform " +
                (bump ? "scale-110" : "")
              }
            >
              <ShoppingBag width={18} height={18} strokeWidth={3} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center border-2 border-foreground bg-zap px-1 text-[0.6rem] font-black text-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="border-[3px] border-foreground p-2 transition-colors hover:bg-zap lg:hidden"
            >
              <Menu width={18} height={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l-[3px] border-foreground bg-background">
            <div className="flex items-center justify-between border-b-[3px] border-foreground p-4">
              <span className="font-display text-2xl font-black">MENU</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="border-[3px] border-foreground p-2"
              >
                <X width={18} height={18} strokeWidth={3} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to="/shop"
                  search={l.search}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b-2 border-foreground py-4 font-display text-3xl font-black uppercase"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-6 grid gap-3">
                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="label-xs border-[3px] border-foreground px-4 py-3"
                >
                  WISHLIST ({state.wishlist.length})
                </Link>
                <Link
                  to={state.user ? "/account" : "/login"}
                  onClick={() => setMenuOpen(false)}
                  className="label-xs border-[3px] border-foreground bg-zap px-4 py-3"
                >
                  {state.user ? "MY ACCOUNT" : "SIGN IN"}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
