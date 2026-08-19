import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialCoupons,
  initialInventoryLogs,
  initialStoreSettings,
  initialHomeConfig,
  BRANDS,
  categories as defaultCategories,
  initialCategoryLabels,
  initialSubtitlePresets,
  initialBadges,
  type Product,
  type Order,
  type OrderStatus,
  type CustomerUser,
  type Coupon,
  type InventoryLog,
  type StoreSettings,
  type Address,
  type Review,
  type CategoryItem,
  type HomeSectionConfig,
} from "./data";

export type CartItem = {
  key: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type AdminSession = {
  loggedIn: boolean;
  email: string;
  name: string;
  role: "superadmin";
};

export type TaxonomyState = {
  brands: string[];
  categories: CategoryItem[];
  categoryLabels: string[];
  subtitlePresets: string[];
  badges: string[];
};

type State = {
  products: Product[];
  orders: Order[];
  inventoryLogs: InventoryLog[];
  customers: CustomerUser[];
  coupons: Coupon[];
  settings: StoreSettings;
  taxonomy: TaxonomyState;
  homeConfig: HomeSectionConfig;
  cart: CartItem[];
  wishlist: string[];
  user: CustomerUser | null;
  adminSession: AdminSession | null;
  coupon: string | null;
  recentSearches: string[];
  recentlyViewed: string[];
};

const DEFAULT_STATE: State = {
  products: initialProducts,
  orders: initialOrders,
  inventoryLogs: initialInventoryLogs,
  customers: initialCustomers,
  coupons: initialCoupons,
  settings: initialStoreSettings,
  taxonomy: {
    brands: [...BRANDS],
    categories: [...defaultCategories],
    categoryLabels: [...initialCategoryLabels],
    subtitlePresets: [...initialSubtitlePresets],
    badges: [...initialBadges],
  },
  homeConfig: initialHomeConfig,
  cart: [],
  wishlist: [],
  user: null,
  adminSession: null,
  coupon: null,
  recentSearches: [],
  recentlyViewed: [],
};

const STORAGE_KEY = "brutal.store.v2";

type StoreCtx = {
  ready: boolean;
  state: State;
  // Customer Storefront
  products: Product[];
  activeProducts: Product[];
  getProduct: (id: string) => Product | undefined;
  cartCount: number;
  cartLines: { item: CartItem; product: Product }[];
  totals: { subtotal: number; shipping: number; discount: number; total: number };
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  pushSearch: (term: string) => void;
  trackRecentlyViewed: (id: string) => void;
  addReview: (productId: string, review: Omit<Review, "id" | "date">) => void;
  // Customer Auth & Account
  registerCustomer: (name: string, email: string, password?: string, phone?: string) => { ok: boolean; message: string; user?: CustomerUser };
  loginCustomer: (email: string, password?: string) => { ok: boolean; message: string; user?: CustomerUser };
  logoutCustomer: () => void;
  updateProfile: (data: Partial<Pick<CustomerUser, "name" | "phone" | "email">>) => void;
  addAddress: (address: Address) => void;
  deleteAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
  // Orders
  placeOrder: (input: {
    customerName: string;
    email: string;
    phone: string;
    address: Address;
    delivery: string;
    paymentMethod: "CARD" | "UPI" | "COD" | "DEMO";
  }) => Order;
  cancelOrder: (orderId: string, reason?: string) => boolean;
  // Super Admin
  adminSession: AdminSession | null;
  adminLogin: (email: string, password: string) => { ok: boolean; message: string };
  adminLogout: () => void;
  addProduct: (data: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount" | "reviews">) => Product;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product | undefined;
  toggleProductStatus: (id: string) => void;
  updateStock: (productId: string, newStock: number, note?: string) => void;
  adjustStock: (productId: string, delta: number, note?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount">) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  resetToDemoData: () => void;
  // Dynamic Taxonomy & Dropdown Options
  brands: string[];
  categories: CategoryItem[];
  categoryLabels: string[];
  subtitlePresets: string[];
  badges: string[];
  addBrand: (brand: string) => void;
  deleteBrand: (brand: string) => void;
  addCategory: (category: CategoryItem) => void;
  deleteCategory: (slug: string) => void;
  addCategoryLabel: (label: string) => void;
  deleteCategoryLabel: (label: string) => void;
  addSubtitlePreset: (subtitle: string) => void;
  deleteSubtitlePreset: (subtitle: string) => void;
  addBadge: (badge: string) => void;
  deleteBadge: (badge: string) => void;
  // Homepage & Page Customization CMS
  homeConfig: HomeSectionConfig;
  updateHomeConfig: (config: Partial<HomeSectionConfig>) => void;
  resetHomeConfig: () => void;
};


const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  // Initialize from LocalStorage or Seed Data
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          ...DEFAULT_STATE,
          ...parsed,
          // Ensure products array has valid seed if empty
          products: parsed.products && parsed.products.length > 0 ? parsed.products : initialProducts,
          orders: parsed.orders && parsed.orders.length > 0 ? parsed.orders : initialOrders,
          customers: parsed.customers && parsed.customers.length > 0 ? parsed.customers : initialCustomers,
          coupons: parsed.coupons && parsed.coupons.length > 0 ? parsed.coupons : initialCoupons,
          inventoryLogs: parsed.inventoryLogs && parsed.inventoryLogs.length > 0 ? parsed.inventoryLogs : initialInventoryLogs,
          settings: parsed.settings ? { ...initialStoreSettings, ...parsed.settings } : initialStoreSettings,
          taxonomy: parsed.taxonomy && parsed.taxonomy.brands ? parsed.taxonomy : DEFAULT_STATE.taxonomy,
          homeConfig: parsed.homeConfig && parsed.homeConfig.hero ? parsed.homeConfig : initialHomeConfig,
        });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage limit exceeded */
    }
  }, [state, ready]);

  // Sync across browser tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setState((prev) => ({ ...prev, ...(JSON.parse(e.newValue!) as State) }));
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getProduct = useCallback(
    (id: string) => state.products.find((p) => p.id === id),
    [state.products],
  );

  const activeProducts = useMemo(
    () => state.products.filter((p) => p.status === "active"),
    [state.products],
  );

  // Dynamic Taxonomy State Handlers
  const addBrand = useCallback((brand: string) => {
    const trimmed = brand.trim();
    if (!trimmed) return;
    setState((s) => {
      const existing = s.taxonomy?.brands ?? [...BRANDS];
      if (existing.includes(trimmed)) return s;
      return {
        ...s,
        taxonomy: {
          ...s.taxonomy,
          brands: [...existing, trimmed],
        },
      };
    });
  }, []);

  const deleteBrand = useCallback((brand: string) => {
    setState((s) => ({
      ...s,
      taxonomy: {
        ...s.taxonomy,
        brands: (s.taxonomy?.brands ?? [...BRANDS]).filter((b) => b !== brand),
      },
    }));
  }, []);

  const addCategory = useCallback((category: CategoryItem) => {
    const slug = category.slug.toLowerCase().trim();
    if (!slug) return;
    setState((s) => {
      const existing = s.taxonomy?.categories ?? [...defaultCategories];
      if (existing.some((c) => c.slug === slug)) {
        return {
          ...s,
          taxonomy: {
            ...s.taxonomy,
            categories: existing.map((c) => (c.slug === slug ? { ...c, ...category } : c)),
          },
        };
      }
      return {
        ...s,
        taxonomy: {
          ...s.taxonomy,
          categories: [...existing, { ...category, slug }],
        },
      };
    });
  }, []);

  const deleteCategory = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      taxonomy: {
        ...s.taxonomy,
        categories: (s.taxonomy?.categories ?? [...defaultCategories]).filter((c) => c.slug !== slug),
      },
    }));
  }, []);

  const addCategoryLabel = useCallback((label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setState((s) => {
      const existing = s.taxonomy?.categoryLabels ?? [...initialCategoryLabels];
      if (existing.includes(trimmed)) return s;
      return {
        ...s,
        taxonomy: {
          ...s.taxonomy,
          categoryLabels: [...existing, trimmed],
        },
      };
    });
  }, []);

  const deleteCategoryLabel = useCallback((label: string) => {
    setState((s) => ({
      ...s,
      taxonomy: {
        ...s.taxonomy,
        categoryLabels: (s.taxonomy?.categoryLabels ?? [...initialCategoryLabels]).filter((l) => l !== label),
      },
    }));
  }, []);

  const addSubtitlePreset = useCallback((subtitle: string) => {
    const trimmed = subtitle.trim();
    if (!trimmed) return;
    setState((s) => {
      const existing = s.taxonomy?.subtitlePresets ?? [...initialSubtitlePresets];
      if (existing.includes(trimmed)) return s;
      return {
        ...s,
        taxonomy: {
          ...s.taxonomy,
          subtitlePresets: [...existing, trimmed],
        },
      };
    });
  }, []);

  const deleteSubtitlePreset = useCallback((subtitle: string) => {
    setState((s) => ({
      ...s,
      taxonomy: {
        ...s.taxonomy,
        subtitlePresets: (s.taxonomy?.subtitlePresets ?? [...initialSubtitlePresets]).filter((st) => st !== subtitle),
      },
    }));
  }, []);

  const addBadge = useCallback((badge: string) => {
    const trimmed = badge.toUpperCase().trim();
    if (!trimmed) return;
    setState((s) => {
      const existing = s.taxonomy?.badges ?? [...initialBadges];
      if (existing.includes(trimmed)) return s;
      return {
        ...s,
        taxonomy: {
          ...s.taxonomy,
          badges: [...existing, trimmed],
        },
      };
    });
  }, []);

  const deleteBadge = useCallback((badge: string) => {
    setState((s) => ({
      ...s,
      taxonomy: {
        ...s.taxonomy,
        badges: (s.taxonomy?.badges ?? [...initialBadges]).filter((b) => b !== badge),
      },
    }));
  }, []);

  // CART LOGIC
  const addToCart = useCallback((product: Product, size: string, color: string, qty = 1) => {
    const key = `${product.id}|${size}|${color}`;
    setState((s) => {
      const existing = s.cart.find((c) => c.key === key);
      const cart = existing
        ? s.cart.map((c) => (c.key === key ? { ...c, qty: Math.min(product.stock || 10, c.qty + qty) } : c))
        : [...s.cart, { key, productId: product.id, size, color, qty: Math.min(product.stock || 10, qty) }];
      return { ...s, cart };
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.key !== key) }));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setState((s) => {
      const item = s.cart.find((c) => c.key === key);
      const product = item ? s.products.find((p) => p.id === item.productId) : null;
      const maxStock = product?.stock ?? 10;
      return {
        ...s,
        cart: s.cart.flatMap((c) =>
          c.key !== key ? [c] : qty <= 0 ? [] : [{ ...c, qty: Math.min(maxStock, qty) }],
        ),
      };
    });
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [], coupon: null })), []);

  const toggleWishlist = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    }));
  }, []);

  const pushSearch = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setState((s) => ({
      ...s,
      recentSearches: [t, ...s.recentSearches.filter((x) => x !== t)].slice(0, 8),
    }));
  }, []);

  const trackRecentlyViewed = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 10),
    }));
  }, []);

  const cartLines = useMemo(
    () =>
      state.cart
        .map((item) => {
          const product = state.products.find((p) => p.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter((x): x is { item: CartItem; product: Product } => x !== null),
    [state.cart, state.products],
  );

  const totals = useMemo(() => {
    const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.item.qty, 0);
    const shipping =
      subtotal === 0 || subtotal >= state.settings.freeShippingThreshold
        ? 0
        : state.settings.standardShippingFee;
    const c = state.coupons.find(
      (cp) => cp.code === state.coupon && cp.status === "active" && subtotal >= cp.minOrder,
    );
    const discount = !c
      ? 0
      : c.type === "percent"
        ? Math.round((subtotal * c.value) / 100)
        : Math.min(c.value, subtotal);
    return { subtotal, shipping, discount, total: Math.max(0, subtotal - discount + shipping) };
  }, [cartLines, state.coupon, state.coupons, state.settings]);

  const applyCoupon = useCallback(
    (code: string) => {
      const upper = code.trim().toUpperCase();
      if (!upper) return { ok: false, message: "Please enter a promo code" };
      const c = state.coupons.find((cp) => cp.code === upper && cp.status === "active");
      if (!c) return { ok: false, message: `Code "${upper}" is invalid or expired` };
      const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.item.qty, 0);
      if (subtotal < c.minOrder) {
        return { ok: false, message: `Minimum order of ₹${c.minOrder.toLocaleString("en-IN")} required for ${upper}` };
      }
      setState((s) => ({ ...s, coupon: upper }));
      return { ok: true, message: `Promo code ${upper} applied!` };
    },
    [cartLines, state.coupons],
  );

  const clearCoupon = useCallback(() => setState((s) => ({ ...s, coupon: null })), []);

  // REVIEWS
  const addReview = useCallback((productId: string, reviewInput: Omit<Review, "id" | "date">) => {
    const newRev: Review = {
      id: "rev-" + Math.random().toString(36).slice(2, 9),
      name: reviewInput.name,
      rating: reviewInput.rating,
      body: reviewInput.body,
      date: new Date()
        .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase(),
    };
    setState((s) => ({
      ...s,
      products: s.products.map((p) => {
        if (p.id !== productId) return p;
        const allRevs = [newRev, ...p.reviews];
        const newRating = Number((allRevs.reduce((sum, r) => sum + r.rating, 0) / allRevs.length).toFixed(1));
        return {
          ...p,
          reviews: allRevs,
          reviewCount: allRevs.length,
          rating: newRating,
        };
      }),
    }));
  }, []);

  // CUSTOMER AUTH & ACCOUNT
  const registerCustomer = useCallback(
    (name: string, email: string, password = "password123", phone = "") => {
      const cleanEmail = email.trim().toLowerCase();
      if (state.customers.some((c) => c.email.toLowerCase() === cleanEmail)) {
        return { ok: false, message: "An account with this email already exists" };
      }
      const newUser: CustomerUser = {
        id: "usr-" + Math.random().toString(36).slice(2, 9),
        name: name.trim(),
        email: cleanEmail,
        password,
        phone: phone.trim(),
        addresses: [],
        defaultAddressIndex: 0,
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        customers: [newUser, ...s.customers],
        user: newUser,
      }));
      return { ok: true, message: "Account created successfully", user: newUser };
    },
    [state.customers],
  );

  const loginCustomer = useCallback(
    (email: string, password = "") => {
      const cleanEmail = email.trim().toLowerCase();
      const existing = state.customers.find((c) => c.email.toLowerCase() === cleanEmail);
      if (!existing) {
        // Auto-register demo if convenient or allow login
        return { ok: false, message: "No account found with this email address." };
      }
      if (password && existing.password && existing.password !== password) {
        return { ok: false, message: "Incorrect password." };
      }
      setState((s) => ({ ...s, user: existing }));
      return { ok: true, message: "Logged in successfully", user: existing };
    },
    [state.customers],
  );

  const logoutCustomer = useCallback(() => {
    setState((s) => ({ ...s, user: null }));
  }, []);

  const updateProfile = useCallback((data: Partial<Pick<CustomerUser, "name" | "phone" | "email">>) => {
    setState((s) => {
      if (!s.user) return s;
      const updatedUser = { ...s.user, ...data };
      return {
        ...s,
        user: updatedUser,
        customers: s.customers.map((c) => (c.id === updatedUser.id ? updatedUser : c)),
      };
    });
  }, []);

  const addAddress = useCallback((address: Address) => {
    const newAddr: Address = {
      ...address,
      id: "addr-" + Math.random().toString(36).slice(2, 8),
    };
    setState((s) => {
      if (!s.user) return s;
      const addresses = [newAddr, ...s.user.addresses];
      const updatedUser = { ...s.user, addresses };
      return {
        ...s,
        user: updatedUser,
        customers: s.customers.map((c) => (c.id === updatedUser.id ? updatedUser : c)),
      };
    });
  }, []);

  const deleteAddress = useCallback((index: number) => {
    setState((s) => {
      if (!s.user) return s;
      const addresses = s.user.addresses.filter((_, i) => i !== index);
      const defaultAddressIndex = Math.max(0, Math.min(s.user.defaultAddressIndex, addresses.length - 1));
      const updatedUser = { ...s.user, addresses, defaultAddressIndex };
      return {
        ...s,
        user: updatedUser,
        customers: s.customers.map((c) => (c.id === updatedUser.id ? updatedUser : c)),
      };
    });
  }, []);

  const setDefaultAddress = useCallback((index: number) => {
    setState((s) => {
      if (!s.user) return s;
      const updatedUser = { ...s.user, defaultAddressIndex: index };
      return {
        ...s,
        user: updatedUser,
        customers: s.customers.map((c) => (c.id === updatedUser.id ? updatedUser : c)),
      };
    });
  }, []);

  // ORDERS & CHECKOUT
  const placeOrder = useCallback(
    (input: {
      customerName: string;
      email: string;
      phone: string;
      address: Address;
      delivery: string;
      paymentMethod: "CARD" | "UPI" | "COD" | "DEMO";
    }) => {
      const items = cartLines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        image: l.product.image,
        size: l.item.size,
        color: l.item.color,
        qty: l.item.qty,
        price: l.product.price,
        sku: l.product.sku || `BRT-${l.product.id.slice(0, 6).toUpperCase()}`,
      }));

      const now = new Date();
      const dateStr = now
        .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      const etaDate = new Date(Date.now() + (input.delivery === "EXPRESS" ? 2 : 5) * 86400000);
      const etaStr = etaDate
        .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase();

      const orderId = "BRT-" + Math.floor(100000 + Math.random() * 900000);

      const newOrder: Order = {
        id: orderId,
        date: dateStr,
        customerName: input.customerName,
        email: input.email,
        phone: input.phone,
        items,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        discount: totals.discount,
        couponCode: state.coupon ?? undefined,
        total: totals.total,
        status: "PLACED",
        paymentMethod: input.paymentMethod,
        paymentStatus: input.paymentMethod === "COD" ? "PENDING" : "PAID",
        address: input.address,
        delivery: input.delivery,
        eta: etaStr,
        timeline: [
          {
            status: "PLACED",
            timestamp: `${dateStr} ${timeStr}`,
            title: "Order Placed",
            note: `Payment via ${input.paymentMethod} (${input.paymentMethod === "COD" ? "Pending on delivery" : "Verified"})`,
          },
        ],
      };

      // Auto decrease stock & generate inventory audit logs
      const inventoryLogsToAdd: InventoryLog[] = [];
      const updatedProducts = state.products.map((p) => {
        const matchingItems = items.filter((i) => i.productId === p.id);
        if (matchingItems.length === 0) return p;
        const totalPurchased = matchingItems.reduce((sum, item) => sum + item.qty, 0);
        const newStock = Math.max(0, p.stock - totalPurchased);
        inventoryLogsToAdd.push({
          id: "log-" + Math.random().toString(36).slice(2, 9),
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          type: "PURCHASE",
          qtyChange: -totalPurchased,
          newStock,
          date: `${dateStr} ${timeStr}`,
          note: `Order #${orderId} placed by ${input.customerName}`,
        });
        return { ...p, stock: newStock };
      });

      // Update coupon usage count
      const updatedCoupons = state.coupons.map((c) =>
        c.code === state.coupon ? { ...c, usageCount: c.usageCount + 1 } : c,
      );

      setState((s) => ({
        ...s,
        orders: [newOrder, ...s.orders],
        products: updatedProducts,
        inventoryLogs: [...inventoryLogsToAdd, ...s.inventoryLogs],
        coupons: updatedCoupons,
        cart: [],
        coupon: null,
      }));

      return newOrder;
    },
    [cartLines, totals, state.coupon, state.coupons, state.products],
  );

  const cancelOrder = useCallback(
    (orderId: string, reason = "Cancelled by user") => {
      const now = new Date();
      const dateStr = now
        .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      let orderToCancel: Order | undefined;
      const updatedOrders = state.orders.map((o) => {
        if (o.id !== orderId || o.status === "CANCELLED" || o.status === "DELIVERED") return o;
        orderToCancel = o;
        return {
          ...o,
          status: "CANCELLED" as OrderStatus,
          paymentStatus: o.paymentStatus === "PAID" ? ("REFUNDED" as const) : o.paymentStatus,
          timeline: [
            ...o.timeline,
            {
              status: "CANCELLED" as OrderStatus,
              timestamp: `${dateStr} ${timeStr}`,
              title: "Order Cancelled",
              note: reason,
            },
          ],
        };
      });

      if (!orderToCancel) return false;

      // Auto restore stock on order cancellation
      const logsToAdd: InventoryLog[] = [];
      const updatedProducts = state.products.map((p) => {
        const item = orderToCancel!.items.find((i) => i.productId === p.id);
        if (!item) return p;
        const newStock = p.stock + item.qty;
        logsToAdd.push({
          id: "log-" + Math.random().toString(36).slice(2, 9),
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          type: "CANCEL_RESTORE",
          qtyChange: item.qty,
          newStock,
          date: `${dateStr} ${timeStr}`,
          note: `Restored from cancelled Order #${orderId}`,
        });
        return { ...p, stock: newStock };
      });

      setState((s) => ({
        ...s,
        orders: updatedOrders,
        products: updatedProducts,
        inventoryLogs: [...logsToAdd, ...s.inventoryLogs],
      }));
      return true;
    },
    [state.orders, state.products],
  );

  // SUPER ADMIN ACTIONS
  const adminLogin = useCallback((email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "admin@brutal.com" && password === "admin123") {
      const session: AdminSession = {
        loggedIn: true,
        email: "admin@brutal.com",
        name: "Head of Operations",
        role: "superadmin",
      };
      setState((s) => ({ ...s, adminSession: session }));
      return { ok: true, message: "Welcome to BRUTAL. Command Center" };
    }
    return { ok: false, message: "Invalid administrator credentials." };
  }, []);

  const adminLogout = useCallback(() => {
    setState((s) => ({ ...s, adminSession: null }));
  }, []);

  const addProduct = useCallback(
    (data: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount" | "reviews">) => {
      const newId = "prod-" + Math.random().toString(36).slice(2, 9);
      const newProduct: Product = {
        ...data,
        id: newId,
        rating: 5.0,
        reviewCount: 0,
        reviews: [],
        createdAt: new Date().toISOString(),
      };
      const log: InventoryLog = {
        id: "log-" + Math.random().toString(36).slice(2, 9),
        productId: newId,
        productName: newProduct.name,
        sku: newProduct.sku,
        type: "RESTOCK",
        qtyChange: newProduct.stock,
        newStock: newProduct.stock,
        date: new Date().toLocaleString("en-IN"),
        note: "Initial product stock on creation",
      };
      setState((s) => ({
        ...s,
        products: [newProduct, ...s.products],
        inventoryLogs: [log, ...s.inventoryLogs],
      }));
      return newProduct;
    },
    [],
  );

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setState((s) => ({
      ...s,
      products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      products: s.products.filter((p) => p.id !== id),
      cart: s.cart.filter((c) => c.productId !== id),
      wishlist: s.wishlist.filter((w) => w !== id),
    }));
  }, []);

  const duplicateProduct = useCallback(
    (id: string) => {
      const target = state.products.find((p) => p.id === id);
      if (!target) return undefined;
      const dup: Product = {
        ...target,
        id: "prod-" + Math.random().toString(36).slice(2, 9),
        name: `${target.name} (Copy)`,
        sku: `${target.sku}-CPY`,
        createdAt: new Date().toISOString(),
        reviews: [],
        reviewCount: 0,
        rating: 5.0,
        status: "draft",
      };
      setState((s) => ({ ...s, products: [dup, ...s.products] }));
      return dup;
    },
    [state.products],
  );

  const toggleProductStatus = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      products: s.products.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "draft" : "active" } : p,
      ),
    }));
  }, []);

  const updateStock = useCallback(
    (productId: string, newStock: number, note = "Manual stock update by Admin") => {
      setState((s) => {
        const product = s.products.find((p) => p.id === productId);
        if (!product) return s;
        const diff = newStock - product.stock;
        const log: InventoryLog = {
          id: "log-" + Math.random().toString(36).slice(2, 9),
          productId,
          productName: product.name,
          sku: product.sku,
          type: "ADJUSTMENT",
          qtyChange: diff,
          newStock,
          date: new Date().toLocaleString("en-IN"),
          note,
        };
        return {
          ...s,
          products: s.products.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p)),
          inventoryLogs: [log, ...s.inventoryLogs],
        };
      });
    },
    [],
  );

  const adjustStock = useCallback(
    (productId: string, delta: number, note = "Stock delta adjustment") => {
      setState((s) => {
        const product = s.products.find((p) => p.id === productId);
        if (!product) return s;
        const newStock = Math.max(0, product.stock + delta);
        const log: InventoryLog = {
          id: "log-" + Math.random().toString(36).slice(2, 9),
          productId,
          productName: product.name,
          sku: product.sku,
          type: delta > 0 ? "RESTOCK" : "ADJUSTMENT",
          qtyChange: delta,
          newStock,
          date: new Date().toLocaleString("en-IN"),
          note,
        };
        return {
          ...s,
          products: s.products.map((p) => (p.id === productId ? { ...p, stock: newStock } : p)),
          inventoryLogs: [log, ...s.inventoryLogs],
        };
      });
    },
    [],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, note = "") => {
      const now = new Date();
      const dateStr = now
        .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      const titles: Record<OrderStatus, string> = {
        PLACED: "Order Placed",
        CONFIRMED: "Order Confirmed by Admin",
        PACKED: "Order Packed & Verified",
        SHIPPED: "Dispatched to Courier",
        OUT_FOR_DELIVERY: "Out for Delivery",
        DELIVERED: "Delivered Successfully",
        CANCELLED: "Order Cancelled",
        RETURNED: "Order Returned & Processed",
      };

      setState((s) => {
        const targetOrder = s.orders.find((o) => o.id === orderId);
        if (!targetOrder) return s;

        // If cancelling order from admin, auto restore stock
        let updatedProducts = s.products;
        let newLogs: InventoryLog[] = [];
        if (status === "CANCELLED" && targetOrder.status !== "CANCELLED") {
          updatedProducts = s.products.map((p) => {
            const item = targetOrder.items.find((i) => i.productId === p.id);
            if (!item) return p;
            const newStock = p.stock + item.qty;
            newLogs.push({
              id: "log-" + Math.random().toString(36).slice(2, 9),
              productId: p.id,
              productName: p.name,
              sku: p.sku,
              type: "CANCEL_RESTORE",
              qtyChange: item.qty,
              newStock,
              date: `${dateStr} ${timeStr}`,
              note: `Restored on cancellation of Order #${orderId}`,
            });
            return { ...p, stock: newStock };
          });
        }

        const newTimelineEvent = {
          status,
          timestamp: `${dateStr} ${timeStr}`,
          title: titles[status],
          note: note || undefined,
        };

        const updatedOrders = s.orders.map((o) => {
          if (o.id !== orderId) return o;
          return {
            ...o,
            status,
            paymentStatus:
              status === "DELIVERED" && o.paymentMethod === "COD"
                ? ("PAID" as const)
                : status === "CANCELLED" && o.paymentStatus === "PAID"
                  ? ("REFUNDED" as const)
                  : o.paymentStatus,
            timeline: [...o.timeline, newTimelineEvent],
          };
        });

        return {
          ...s,
          orders: updatedOrders,
          products: updatedProducts,
          inventoryLogs: [...newLogs, ...s.inventoryLogs],
        };
      });
    },
    [],
  );

  const addCoupon = useCallback((couponInput: Omit<Coupon, "id" | "usageCount">) => {
    const newCoupon: Coupon = {
      ...couponInput,
      code: couponInput.code.toUpperCase().trim(),
      id: "cpn-" + Math.random().toString(36).slice(2, 8),
      usageCount: 0,
    };
    setState((s) => ({ ...s, coupons: [newCoupon, ...s.coupons] }));
  }, []);

  const deleteCoupon = useCallback((id: string) => {
    setState((s) => ({ ...s, coupons: s.coupons.filter((c) => c.id !== id) }));
  }, []);

  const toggleCouponStatus = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      coupons: s.coupons.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "expired" : "active" } : c,
      ),
    }));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<StoreSettings>) => {
    setState((s) => ({
      ...s,
      settings: { ...s.settings, ...newSettings },
    }));
  }, []);

  const updateHomeConfig = useCallback((newConfig: Partial<HomeSectionConfig>) => {
    setState((s) => {
      const current = s.homeConfig ?? initialHomeConfig;
      return {
        ...s,
        homeConfig: {
          ...current,
          ...newConfig,
          hero: newConfig.hero ? { ...current.hero, ...newConfig.hero } : current.hero,
          footer: newConfig.footer ? { ...current.footer, ...newConfig.footer } : current.footer,
        },
      };
    });
  }, []);

  const resetHomeConfig = useCallback(() => {
    setState((s) => ({
      ...s,
      homeConfig: initialHomeConfig,
    }));
  }, []);

  const resetToDemoData = useCallback(() => {
    setState({
      ...DEFAULT_STATE,
      products: initialProducts,
      orders: initialOrders,
      inventoryLogs: initialInventoryLogs,
      customers: initialCustomers,
      coupons: initialCoupons,
      settings: initialStoreSettings,
      homeConfig: initialHomeConfig,
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: StoreCtx = {
    ready,
    state,
    products: state.products,
    activeProducts,
    getProduct,
    cartCount: state.cart.reduce((n, c) => n + c.qty, 0),
    cartLines,
    totals,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    inWishlist: (id) => state.wishlist.includes(id),
    applyCoupon,
    clearCoupon,
    pushSearch,
    trackRecentlyViewed,
    addReview,
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    placeOrder,
    cancelOrder,
    adminSession: state.adminSession,
    adminLogin,
    adminLogout,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    toggleProductStatus,
    updateStock,
    adjustStock,
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    toggleCouponStatus,
    updateSettings,
    resetToDemoData,
    // Dynamic Taxonomy Dropdown Lists & Actions
    brands: state.taxonomy?.brands ?? [...BRANDS],
    categories: state.taxonomy?.categories ?? [...defaultCategories],
    categoryLabels: state.taxonomy?.categoryLabels ?? [...initialCategoryLabels],
    subtitlePresets: state.taxonomy?.subtitlePresets ?? [...initialSubtitlePresets],
    badges: state.taxonomy?.badges ?? [...initialBadges],
    addBrand,
    deleteBrand,
    addCategory,
    deleteCategory,
    addCategoryLabel,
    deleteCategoryLabel,
    addSubtitlePreset,
    deleteSubtitlePreset,
    addBadge,
    deleteBadge,
    // Homepage & Page Customization CMS
    homeConfig: state.homeConfig ?? initialHomeConfig,
    updateHomeConfig,
    resetHomeConfig,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

