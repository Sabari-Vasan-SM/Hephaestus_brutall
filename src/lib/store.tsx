import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { coupons, getProduct, type Product } from "./data";

export type CartItem = {
  key: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type Address = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    size: string;
    color: string;
    qty: number;
    price: number;
  }[];
  total: number;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  email: string;
  address: Address;
  delivery: string;
  payment: string;
  eta: string;
};

export type User = { name: string; email: string };

type State = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: User | null;
  coupon: string | null;
  recentSearches: string[];
  addresses: Address[];
};

const EMPTY: State = {
  cart: [],
  wishlist: [],
  orders: [],
  user: null,
  coupon: null,
  recentSearches: [],
  addresses: [],
};

const KEY = "brutal.store.v1";

type Ctx = {
  ready: boolean;
  state: State;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
  placeOrder: (input: Omit<Order, "id" | "date" | "items" | "total" | "status" | "eta">) => Order;
  pushSearch: (term: string) => void;
  cartCount: number;
  cartLines: { item: CartItem; product: Product }[];
  totals: { subtotal: number; shipping: number; discount: number; total: number };
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as State) });
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, ready]);

  const addToCart = useCallback((product: Product, size: string, color: string, qty = 1) => {
    const key = `${product.id}|${size}|${color}`;
    setState((s) => {
      const existing = s.cart.find((c) => c.key === key);
      const cart = existing
        ? s.cart.map((c) => (c.key === key ? { ...c, qty: Math.min(10, c.qty + qty) } : c))
        : [...s.cart, { key, productId: product.id, size, color, qty }];
      return { ...s, cart };
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.key !== key) }));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.flatMap((c) =>
        c.key !== key ? [c] : qty <= 0 ? [] : [{ ...c, qty: Math.min(10, qty) }],
      ),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [], coupon: null })), []);

  const toggleWishlist = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    }));
  }, []);

  const signIn = useCallback((user: User) => setState((s) => ({ ...s, user })), []);
  const signOut = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const pushSearch = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setState((s) => ({
      ...s,
      recentSearches: [t, ...s.recentSearches.filter((x) => x !== t)].slice(0, 6),
    }));
  }, []);

  const cartLines = useMemo(
    () =>
      state.cart
        .map((item) => {
          const product = getProduct(item.productId);
          return product ? { item, product } : null;
        })
        .filter((x): x is { item: CartItem; product: Product } => x !== null),
    [state.cart],
  );

  const totals = useMemo(() => {
    const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.item.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 4999 ? 0 : 149;
    const c = state.coupon ? coupons[state.coupon] : undefined;
    const discount = !c
      ? 0
      : c.type === "percent"
        ? Math.round((subtotal * c.value) / 100)
        : Math.min(c.value, subtotal);
    return { subtotal, shipping, discount, total: Math.max(0, subtotal - discount + shipping) };
  }, [cartLines, state.coupon]);

  const applyCoupon = useCallback((code: string) => {
    const upper = code.trim().toUpperCase();
    if (!upper) return { ok: false, message: "Enter a code" };
    if (!coupons[upper]) return { ok: false, message: `${upper} is not a valid code` };
    setState((s) => ({ ...s, coupon: upper }));
    return { ok: true, message: `${upper} applied` };
  }, []);

  const clearCoupon = useCallback(() => setState((s) => ({ ...s, coupon: null })), []);

  const placeOrder = useCallback<Ctx["placeOrder"]>(
    (input) => {
      const items = cartLines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        size: l.item.size,
        color: l.item.color,
        qty: l.item.qty,
        price: l.product.price,
      }));
      const eta = new Date(Date.now() + (input.delivery === "EXPRESS" ? 2 : 6) * 86400000);
      const order: Order = {
        ...input,
        id: "BRT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        date: new Date()
          .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
        items,
        total: totals.total,
        status: "PROCESSING",
        eta: eta
          .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
      };
      setState((s) => ({
        ...s,
        orders: [order, ...s.orders],
        cart: [],
        coupon: null,
        addresses: [
          input.address,
          ...s.addresses.filter((a) => a.postalCode !== input.address.postalCode),
        ].slice(0, 3),
      }));
      return order;
    },
    [cartLines, totals.total],
  );

  const value: Ctx = {
    ready,
    state,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    inWishlist: (id) => state.wishlist.includes(id),
    applyCoupon,
    clearCoupon,
    signIn,
    signOut,
    placeOrder,
    pushSearch,
    cartCount: state.cart.reduce((n, c) => n + c.qty, 0),
    cartLines,
    totals,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
