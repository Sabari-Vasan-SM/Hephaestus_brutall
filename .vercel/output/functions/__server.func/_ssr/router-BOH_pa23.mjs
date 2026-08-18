import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as Star, c as Search, g as Heart, n as User, p as Menu, s as ShoppingBag, t as X, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { M as notFound, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-Bht_Jd0X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonStyles = cva("inline-flex items-center justify-center gap-2 border-[3px] border-foreground font-bold uppercase tracking-[0.08em] disabled:opacity-40 disabled:pointer-events-none select-none", {
	variants: {
		variant: {
			solid: "bg-foreground text-background brutal-shadow-sm press",
			zap: "bg-zap text-foreground brutal-shadow-sm press",
			flare: "bg-flare text-background brutal-shadow-sm press",
			outline: "bg-background text-foreground brutal-shadow-sm press",
			ghost: "bg-transparent border-transparent shadow-none hover:bg-muted"
		},
		size: {
			sm: "px-3 py-2 text-[0.7rem]",
			md: "px-5 py-3 text-xs",
			lg: "px-7 py-4 text-sm",
			icon: "h-11 w-11 p-0"
		},
		full: {
			true: "w-full",
			false: ""
		}
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
		full: false
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, full, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonStyles({
		variant,
		size,
		full
	}), className),
	...props
}));
Button.displayName = "Button";
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("w-full border-[3px] border-foreground bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus-visible:outline-3", className),
	...props
}));
Input.displayName = "Input";
function Field({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label-xs mb-2 block",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[0.7rem] font-bold uppercase text-destructive",
				children: error
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[0.7rem] text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
var badgeStyles = cva("inline-block border-2 border-foreground px-2 py-1 label-xs leading-none", {
	variants: { tone: {
		zap: "bg-zap text-foreground",
		flare: "bg-flare text-background",
		ink: "bg-foreground text-background",
		paper: "bg-background text-foreground"
	} },
	defaultVariants: { tone: "ink" }
});
function Badge({ children, tone, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeStyles({ tone }), className),
		children
	});
}
function badgeTone(label) {
	if (label === "SALE") return "flare";
	if (label === "NEW") return "zap";
	if (label === "LIMITED") return "ink";
	return "paper";
}
function Rating({ value, count, size = 14 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		"aria-label": `Rated ${value} out of 5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex",
				"aria-hidden": true,
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					width: size,
					height: size,
					strokeWidth: 2.5,
					className: i <= Math.round(value) ? "fill-zap text-foreground" : "text-muted-foreground"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.7rem] font-bold",
				children: value.toFixed(1)
			}),
			count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[0.7rem] text-muted-foreground",
				children: [
					"(",
					count,
					")"
				]
			})
		]
	});
}
function SectionTitle({ children, kicker }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-8 flex flex-wrap items-end justify-between gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "label-xs mb-3 inline-block bg-foreground px-2 py-1 text-background",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[clamp(2.5rem,8vw,5rem)]",
			children
		})] })
	});
}
var p1_default = "/assets/p1-CADwMxh_.jpg";
var p2_default = "/assets/p2-DwXH6VFV.jpg";
var p3_default = "/assets/p3-Ozwx0NQp.jpg";
var p4_default = "/assets/p4-Dr7w8MpD.jpg";
var p5_default = "/assets/p5-Darhm3go.jpg";
var p6_default = "/assets/p6-C6bprjno.jpg";
var p7_default = "/assets/p7-CNO6uLEl.jpg";
var p8_default = "/assets/p8-CUHmqaYC.jpg";
var cat_men_default = "/assets/cat-men-Ba7Q9alM.jpg";
var cat_women_default = "/assets/cat-women-j3yHFQwC.jpg";
var cat_acc_default = "/assets/cat-acc-NtbcRgcG.jpg";
var R = (id, name, rating, body, date) => ({
	id,
	name,
	rating,
	body,
	date
});
var products = [
	{
		id: "oversized-tee-001",
		name: "Null Oversized Tee",
		category: "men",
		categoryLabel: "T-Shirts",
		subtitle: "Black / Unisex",
		price: 1999,
		compareAt: 2499,
		rating: 4.7,
		reviewCount: 128,
		image: p1_default,
		gallery: [
			p1_default,
			p7_default,
			p3_default
		],
		badges: ["BESTSELLER", "SALE"],
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		],
		colors: ["Black", "Bone"],
		description: "A 280 GSM boxy tee cut deliberately wide through the body with dropped shoulders. Garment dyed, pre-shrunk and built to hold its shape after the hundredth wash.",
		materials: [
			"100% combed organic cotton",
			"280 GSM heavyweight jersey",
			"Garment dyed in Tiruppur"
		],
		reviews: [R("r1", "Ananya K.", 5, "The weight of this tee is unreal. It hangs exactly like the photos.", "12 JAN 2026"), R("r2", "Rehan M.", 4, "Sizing runs big, which is the point. Went true to size and it's perfect.", "03 FEB 2026")]
	},
	{
		id: "cargo-pant-002",
		name: "Grid Wide Cargo",
		category: "men",
		categoryLabel: "Bottoms",
		subtitle: "Washed Black / Unisex",
		price: 3499,
		rating: 4.5,
		reviewCount: 64,
		image: p2_default,
		gallery: [
			p2_default,
			p1_default,
			p4_default
		],
		badges: ["NEW"],
		sizes: [
			"28",
			"30",
			"32",
			"34",
			"36"
		],
		colors: ["Washed Black", "Concrete"],
		description: "Wide-leg cargo cut from rigid cotton twill with bellow pockets and a stiff waistband that softens with wear. Deliberately architectural.",
		materials: [
			"98% cotton twill, 2% elastane",
			"Enzyme washed",
			"YKK hardware"
		],
		reviews: [R("r3", "Dev S.", 5, "Fits enormous in the best way. Pockets actually usable.", "22 FEB 2026")]
	},
	{
		id: "hoodie-003",
		name: "Zap Boxy Hoodie",
		category: "women",
		categoryLabel: "Outerwear",
		subtitle: "Electric Yellow / Unisex",
		price: 4299,
		compareAt: 5299,
		rating: 4.9,
		reviewCount: 212,
		image: p3_default,
		gallery: [
			p3_default,
			p1_default,
			p6_default
		],
		badges: ["LIMITED", "SALE"],
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		colors: ["Electric Yellow", "Black"],
		description: "Our loudest piece. A 450 GSM loopback hoodie with a squared hem, double-lined hood and zero branding on the outside. 300 units only.",
		materials: [
			"450 GSM French terry",
			"Ribbed cuffs and hem",
			"Limited run of 300"
		],
		reviews: [R("r4", "Meera J.", 5, "Bought it for the colour, kept it for the fit.", "01 MAR 2026"), R("r5", "Tanvi R.", 5, "Heavy, structured, genuinely premium.", "09 MAR 2026")]
	},
	{
		id: "sneaker-004",
		name: "Slab Runner",
		category: "footwear",
		categoryLabel: "Sneakers",
		subtitle: "Black / White",
		price: 6999,
		rating: 4.4,
		reviewCount: 89,
		image: p4_default,
		gallery: [
			p4_default,
			p2_default,
			p8_default
		],
		badges: ["BESTSELLER"],
		sizes: [
			"6",
			"7",
			"8",
			"9",
			"10",
			"11"
		],
		colors: ["Black / White"],
		description: "A chunky low-profile runner on a sculpted EVA slab sole. Leather upper, reinforced toe box, no swoosh energy required.",
		materials: [
			"Full grain leather upper",
			"Compression moulded EVA midsole",
			"Rubber outsole"
		],
		reviews: [R("r6", "Karan V.", 4, "Comfortable straight out of the box.", "18 JAN 2026")]
	},
	{
		id: "bucket-005",
		name: "Blackout Bucket Hat",
		category: "accessories",
		categoryLabel: "Headwear",
		subtitle: "Black / One Size",
		price: 1299,
		compareAt: 1699,
		rating: 4.2,
		reviewCount: 41,
		image: p5_default,
		gallery: [
			p5_default,
			p8_default,
			p6_default
		],
		badges: ["SALE"],
		sizes: ["One Size"],
		colors: ["Black"],
		description: "Structured cotton canvas bucket with a stiffened brim that holds its angle. Quietly aggressive.",
		materials: ["Heavy cotton canvas", "Cotton twill lining"],
		reviews: [R("r7", "Ishan P.", 4, "Brim keeps its shape, which is rare.", "27 FEB 2026")]
	},
	{
		id: "tote-006",
		name: "Everyday Heavy Tote",
		category: "accessories",
		categoryLabel: "Bags",
		subtitle: "Bone / Black Straps",
		price: 1799,
		rating: 4.6,
		reviewCount: 73,
		image: p6_default,
		gallery: [
			p6_default,
			p5_default,
			p1_default
		],
		badges: ["NEW"],
		sizes: ["One Size"],
		colors: ["Bone"],
		description: "18oz canvas tote with leather straps, an internal zip pocket and a flat base that actually stands up.",
		materials: ["18oz cotton canvas", "Vegetable tanned leather straps"],
		reviews: [R("r8", "Sara D.", 5, "Carries a laptop, gym kit and groceries. Unbothered.", "14 FEB 2026")]
	},
	{
		id: "denim-007",
		name: "Concrete Denim Jacket",
		category: "women",
		categoryLabel: "Outerwear",
		subtitle: "Washed Black / Unisex",
		price: 5499,
		compareAt: 6999,
		rating: 4.8,
		reviewCount: 96,
		image: p7_default,
		gallery: [
			p7_default,
			p2_default,
			p4_default
		],
		badges: ["SALE", "LIMITED"],
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		],
		colors: ["Washed Black"],
		description: "A boxy trucker in 13oz rigid denim, overdyed black and stonewashed once so it fades on your terms.",
		materials: [
			"13oz Japanese denim",
			"Overdyed and stonewashed",
			"Antique silver hardware"
		],
		reviews: [R("r9", "Nikhil B.", 5, "The fade after a month is exactly what I wanted.", "05 MAR 2026")]
	},
	{
		id: "shades-008",
		name: "Cut Rectangle Shades",
		category: "accessories",
		categoryLabel: "Eyewear",
		subtitle: "Black / UV400",
		price: 2299,
		rating: 4.3,
		reviewCount: 52,
		image: p8_default,
		gallery: [
			p8_default,
			p5_default,
			p6_default
		],
		badges: ["NEW"],
		sizes: ["One Size"],
		colors: ["Black"],
		description: "Sharp rectangular acetate frames with flat UV400 lenses. Deliberately severe.",
		materials: [
			"Italian acetate frame",
			"UV400 polarised lens",
			"Spring steel hinges"
		],
		reviews: [R("r10", "Aarav T.", 4, "Sharp shape, no wobble.", "20 FEB 2026")]
	}
];
var categories = [
	{
		slug: "men",
		title: "MEN",
		image: cat_men_default,
		count: products.filter((p) => p.category === "men").length
	},
	{
		slug: "women",
		title: "WOMEN",
		image: cat_women_default,
		count: products.filter((p) => p.category === "women").length
	},
	{
		slug: "accessories",
		title: "ACCESS-\nORIES",
		image: cat_acc_default,
		count: products.filter((p) => p.category === "accessories").length
	},
	{
		slug: "footwear",
		title: "FOOT-\nWEAR",
		image: p4_default,
		count: products.filter((p) => p.category === "footwear").length
	}
];
Array.from(new Set(products.flatMap((p) => p.colors)));
var trendingSearches = [
	"Oversized tee",
	"Cargo",
	"Hoodie",
	"Sneakers",
	"Tote"
];
var coupons = {
	BRUTAL10: {
		type: "percent",
		value: 10
	},
	DROP500: {
		type: "flat",
		value: 500
	}
};
function getProduct(id) {
	return products.find((p) => p.id === id);
}
var EMPTY = {
	cart: [],
	wishlist: [],
	orders: [],
	user: null,
	coupon: null,
	recentSearches: [],
	addresses: []
};
var KEY = "brutal.store.v1";
var StoreContext = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(EMPTY);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setState({
				...EMPTY,
				...JSON.parse(raw)
			});
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		try {
			localStorage.setItem(KEY, JSON.stringify(state));
		} catch {}
	}, [state, ready]);
	const addToCart = (0, import_react.useCallback)((product, size, color, qty = 1) => {
		const key = `${product.id}|${size}|${color}`;
		setState((s) => {
			const cart = s.cart.find((c) => c.key === key) ? s.cart.map((c) => c.key === key ? {
				...c,
				qty: Math.min(10, c.qty + qty)
			} : c) : [...s.cart, {
				key,
				productId: product.id,
				size,
				color,
				qty
			}];
			return {
				...s,
				cart
			};
		});
	}, []);
	const removeFromCart = (0, import_react.useCallback)((key) => {
		setState((s) => ({
			...s,
			cart: s.cart.filter((c) => c.key !== key)
		}));
	}, []);
	const setQty = (0, import_react.useCallback)((key, qty) => {
		setState((s) => ({
			...s,
			cart: s.cart.flatMap((c) => c.key !== key ? [c] : qty <= 0 ? [] : [{
				...c,
				qty: Math.min(10, qty)
			}])
		}));
	}, []);
	const clearCart = (0, import_react.useCallback)(() => setState((s) => ({
		...s,
		cart: [],
		coupon: null
	})), []);
	const toggleWishlist = (0, import_react.useCallback)((id) => {
		setState((s) => ({
			...s,
			wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id]
		}));
	}, []);
	const signIn = (0, import_react.useCallback)((user) => setState((s) => ({
		...s,
		user
	})), []);
	const signOut = (0, import_react.useCallback)(() => setState((s) => ({
		...s,
		user: null
	})), []);
	const pushSearch = (0, import_react.useCallback)((term) => {
		const t = term.trim();
		if (!t) return;
		setState((s) => ({
			...s,
			recentSearches: [t, ...s.recentSearches.filter((x) => x !== t)].slice(0, 6)
		}));
	}, []);
	const cartLines = (0, import_react.useMemo)(() => state.cart.map((item) => {
		const product = getProduct(item.productId);
		return product ? {
			item,
			product
		} : null;
	}).filter((x) => x !== null), [state.cart]);
	const totals = (0, import_react.useMemo)(() => {
		const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.item.qty, 0);
		const shipping = subtotal === 0 || subtotal >= 4999 ? 0 : 149;
		const c = state.coupon ? coupons[state.coupon] : void 0;
		const discount = !c ? 0 : c.type === "percent" ? Math.round(subtotal * c.value / 100) : Math.min(c.value, subtotal);
		return {
			subtotal,
			shipping,
			discount,
			total: Math.max(0, subtotal - discount + shipping)
		};
	}, [cartLines, state.coupon]);
	const value = {
		ready,
		state,
		addToCart,
		removeFromCart,
		setQty,
		clearCart,
		toggleWishlist,
		inWishlist: (id) => state.wishlist.includes(id),
		applyCoupon: (0, import_react.useCallback)((code) => {
			const upper = code.trim().toUpperCase();
			if (!upper) return {
				ok: false,
				message: "Enter a code"
			};
			if (!coupons[upper]) return {
				ok: false,
				message: `${upper} is not a valid code`
			};
			setState((s) => ({
				...s,
				coupon: upper
			}));
			return {
				ok: true,
				message: `${upper} applied`
			};
		}, []),
		clearCoupon: (0, import_react.useCallback)(() => setState((s) => ({
			...s,
			coupon: null
		})), []),
		signIn,
		signOut,
		placeOrder: (0, import_react.useCallback)((input) => {
			const items = cartLines.map((l) => ({
				productId: l.product.id,
				name: l.product.name,
				size: l.item.size,
				color: l.item.color,
				qty: l.item.qty,
				price: l.product.price
			}));
			const eta = new Date(Date.now() + (input.delivery === "EXPRESS" ? 2 : 6) * 864e5);
			const order = {
				...input,
				id: "BRT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
				date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "short",
					year: "numeric"
				}).toUpperCase(),
				items,
				total: totals.total,
				status: "PROCESSING",
				eta: eta.toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "short",
					year: "numeric"
				}).toUpperCase()
			};
			setState((s) => ({
				...s,
				orders: [order, ...s.orders],
				cart: [],
				coupon: null,
				addresses: [input.address, ...s.addresses.filter((a) => a.postalCode !== input.address.postalCode)].slice(0, 3)
			}));
			return order;
		}, [cartLines, totals.total]),
		pushSearch,
		cartCount: state.cart.reduce((n, c) => n + c.qty, 0),
		cartLines,
		totals
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used inside StoreProvider");
	return ctx;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/format-DVIWD9hZ.js
function inr(value) {
	return "₹" + Math.round(value).toLocaleString("en-IN");
}
function discountPct(price, compareAt) {
	if (!compareAt || compareAt <= price) return 0;
	return Math.round((compareAt - price) / compareAt * 100);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BOH_pa23.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-C9NKgYLi.css";
function SearchOverlay({ open, onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const { state, pushSearch } = useStore();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setQ("");
		const t = window.setTimeout(() => inputRef.current?.focus(), 30);
		const onKey = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.clearTimeout(t);
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		if (!term) return [];
		return products.filter((p) => [
			p.name,
			p.categoryLabel,
			p.category,
			p.subtitle,
			...p.colors
		].join(" ").toLowerCase().includes(term)).slice(0, 6);
	}, [q]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Search",
		className: "fixed inset-0 z-[70] overflow-y-auto bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1100px] px-4 py-6 sm:px-6 sm:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close search",
						className: "border-[3px] border-foreground p-2 press brutal-shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							width: 20,
							height: 20,
							strokeWidth: 3
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 text-[clamp(2.2rem,9vw,5rem)]",
					children: [
						"What are",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-zap px-2",
							children: "you looking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"for?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center border-[3px] border-foreground brutal-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						width: 20,
						height: 20,
						strokeWidth: 3,
						className: "ml-4 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: q,
						onChange: (e) => setQ(e.target.value),
						onBlur: () => pushSearch(q),
						placeholder: "SEARCH PRODUCTS…",
						"aria-label": "Search products",
						className: "w-full bg-transparent px-4 py-4 font-display text-lg font-black uppercase tracking-tight outline-none placeholder:text-muted-foreground sm:text-2xl"
					})]
				}),
				q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "label-xs mb-4",
						children: [
							results.length,
							" RESULT",
							results.length === 1 ? "" : "S"
						]
					}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-[3px] border-foreground p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-black uppercase",
							children: "Nothing here."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Try “tee”, “cargo” or “hoodie”."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3",
						children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/product/$productId",
							params: { productId: p.id },
							onClick: () => {
								pushSearch(q);
								onClose();
							},
							className: "flex items-center gap-4 border-[3px] border-foreground p-3 transition-colors hover:bg-zap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: "",
									width: 80,
									height: 80,
									loading: "lazy",
									className: "h-16 w-16 border-2 border-foreground object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-display text-base font-black uppercase",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-xs text-muted-foreground",
										children: p.categoryLabel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-black",
									children: inr(p.price)
								})
							]
						}) }, p.id))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-8 sm:grid-cols-2",
					children: [
						state.recentSearches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "label-xs mb-3",
							children: "RECENT SEARCHES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: state.recentSearches.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQ(s),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "paper",
									children: s
								})
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "label-xs mb-3",
							children: "TRENDING"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: trendingSearches.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQ(s),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "zap",
									children: s
								})
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "label-xs mb-3",
								children: "POPULAR CATEGORIES"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
								children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: c.slug },
									onClick: onClose,
									className: "border-[3px] border-foreground p-4 font-display text-lg font-black uppercase transition-colors hover:bg-flare hover:text-background",
									children: c.slug
								}, c.slug))
							})]
						})
					]
				})
			]
		})
	});
}
var navLinks = [
	{
		label: "NEW",
		search: { sort: "new" }
	},
	{
		label: "SHOP",
		search: {}
	},
	{
		label: "MEN",
		search: { category: "men" }
	},
	{
		label: "WOMEN",
		search: { category: "women" }
	},
	{
		label: "ACCESSORIES",
		search: { category: "accessories" }
	},
	{
		label: "SALE",
		search: { sale: true }
	}
];
function Navbar() {
	const { cartCount, state } = useStore();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [bump, setBump] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (cartCount === 0) return;
		setBump(true);
		const t = window.setTimeout(() => setBump(false), 350);
		return () => window.clearTimeout(t);
	}, [cartCount]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-50 border-b-[3px] border-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "font-display text-2xl font-black tracking-tight sm:text-3xl",
						children: ["BRUTAL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flare",
							children: "."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Main",
						className: "ml-auto hidden items-center gap-1 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "label-xs border-2 border-transparent px-3 py-2 transition-colors hover:border-foreground hover:bg-zap",
							children: "HOME"
						}), navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: l.search,
							className: "label-xs border-2 border-transparent px-3 py-2 transition-colors hover:border-foreground hover:bg-zap",
							children: l.label
						}, l.label))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2 lg:ml-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSearchOpen(true),
								"aria-label": "Search",
								className: "border-[3px] border-foreground p-2 transition-colors hover:bg-zap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									width: 18,
									height: 18,
									strokeWidth: 3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wishlist",
								"aria-label": "Wishlist",
								className: "relative hidden border-[3px] border-foreground p-2 transition-colors hover:bg-zap sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									width: 18,
									height: 18,
									strokeWidth: 3
								}), state.wishlist.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center border-2 border-foreground bg-flare px-1 text-[0.6rem] font-black text-background",
									children: state.wishlist.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: state.user ? "/account" : "/login",
								"aria-label": "Account",
								className: "hidden border-[3px] border-foreground p-2 transition-colors hover:bg-zap sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									width: 18,
									height: 18,
									strokeWidth: 3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								"aria-label": `Cart, ${cartCount} items`,
								className: "relative border-[3px] border-foreground bg-foreground p-2 text-background transition-transform " + (bump ? "scale-110" : ""),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									width: 18,
									height: 18,
									strokeWidth: 3
								}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center border-2 border-foreground bg-zap px-1 text-[0.6rem] font-black text-foreground",
									children: cartCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMenuOpen(true),
								"aria-label": "Open menu",
								className: "border-[3px] border-foreground p-2 transition-colors hover:bg-zap lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
									width: 18,
									height: 18,
									strokeWidth: 3
								})
							})
						]
					})
				]
			})
		}),
		menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-[60] lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close menu",
				onClick: () => setMenuOpen(false),
				className: "absolute inset-0 bg-foreground/40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l-[3px] border-foreground bg-background",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b-[3px] border-foreground p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-black",
						children: "MENU"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMenuOpen(false),
						"aria-label": "Close menu",
						className: "border-[3px] border-foreground p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							width: 18,
							height: 18,
							strokeWidth: 3
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 overflow-y-auto p-4",
					"aria-label": "Mobile",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							onClick: () => setMenuOpen(false),
							className: "block border-b-2 border-foreground py-4 font-display text-3xl font-black uppercase",
							children: "HOME"
						}),
						navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: l.search,
							onClick: () => setMenuOpen(false),
							className: "block border-b-2 border-foreground py-4 font-display text-3xl font-black uppercase",
							children: l.label
						}, l.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wishlist",
								onClick: () => setMenuOpen(false),
								className: "label-xs border-[3px] border-foreground px-4 py-3",
								children: [
									"WISHLIST (",
									state.wishlist.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: state.user ? "/account" : "/login",
								onClick: () => setMenuOpen(false),
								className: "label-xs border-[3px] border-foreground bg-zap px-4 py-3",
								children: state.user ? "MY ACCOUNT" : "SIGN IN"
							})]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
			open: searchOpen,
			onClose: () => setSearchOpen(false)
		})
	] });
}
var shopLinks = [
	{
		label: "SHOP ALL",
		to: "/shop",
		search: {}
	},
	{
		label: "MEN",
		to: "/shop",
		search: { category: "men" }
	},
	{
		label: "WOMEN",
		to: "/shop",
		search: { category: "women" }
	},
	{
		label: "ACCESSORIES",
		to: "/shop",
		search: { category: "accessories" }
	},
	{
		label: "SALE",
		to: "/shop",
		search: { sale: true }
	}
];
var infoLinks = [
	"ABOUT",
	"CONTACT",
	"FAQ",
	"SHIPPING",
	"RETURNS",
	"PRIVACY",
	"TERMS"
];
function Footer() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const subscribe = (e) => {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
			setError("Enter a valid email");
			return;
		}
		setError("");
		setEmail("");
		toast.success("YOU'RE ON THE LIST", { description: "Drop alerts incoming." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t-[3px] border-foreground bg-foreground text-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-black tracking-tight",
							children: "BRUTAL."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-6 text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] text-zap",
							children: [
								"We make",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"everyday",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"objects",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"less boring."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-2",
							children: [
								"INSTAGRAM",
								"X",
								"TIKTOK"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://instagram.com",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "label-xs border-2 border-background px-3 py-2 transition-colors hover:bg-zap hover:text-foreground",
								children: s
							}, s))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Shop",
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "label-xs text-zap",
							children: "SHOP"
						}), shopLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							search: l.search,
							className: "block text-sm font-bold uppercase tracking-wide hover:text-zap",
							children: l.label
						}, l.label))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "label-xs text-zap",
							children: "INFO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1",
							children: infoLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/info/$slug",
								params: { slug: l.toLowerCase() },
								className: "text-sm font-bold uppercase hover:text-zap",
								children: l
							}, l))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t-[3px] border-background/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: subscribe,
					className: "mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[clamp(1.6rem,4vw,2.4rem)] text-background lg:w-1/3",
						children: "Get the drop."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full flex-col gap-3 sm:flex-row lg:flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "newsletter-email",
									children: "Email address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "newsletter-email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "YOU@EMAIL.COM",
									className: "border-background bg-foreground text-background placeholder:text-background/50",
									"aria-invalid": !!error
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[0.7rem] font-bold uppercase text-zap",
									children: error
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							variant: "zap",
							size: "lg",
							children: ["Subscribe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								width: 16,
								height: 16,
								strokeWidth: 3
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t-[3px] border-background/40 px-4 py-5 text-center sm:px-6 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-xs text-background/60",
					children: "© 2026 BRUTAL. ALL RIGHTS RESERVED. BUILT DIFFERENT."
				})
			})
		]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-[3px] group-[.toaster]:border-foreground group-[.toaster]:rounded-none group-[.toaster]:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group-[.toaster]:p-4 group-[.toaster]:font-sans",
			title: "group-[.toast]:font-display group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:text-xs group-[.toast]:sm:text-sm",
			description: "group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:text-foreground/80 group-[.toast]:mt-0.5",
			actionButton: "group-[.toast]:bg-zap group-[.toast]:text-foreground group-[.toast]:border-[2px] group-[.toast]:border-foreground group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:group-[.toast]:bg-foreground hover:group-[.toast]:text-background group-[.toast]:transition-colors",
			cancelButton: "group-[.toast]:bg-smoke group-[.toast]:text-foreground group-[.toast]:border-[2px] group-[.toast]:border-foreground group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
			closeButton: "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:rounded-none hover:group-[.toast]:bg-zap",
			success: "group-[.toaster]:border-foreground group-[.toaster]:bg-zap/20 group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground",
			error: "group-[.toaster]:border-foreground group-[.toaster]:bg-destructive/15 group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-destructive",
			info: "group-[.toaster]:border-foreground group-[.toaster]:bg-smoke group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground",
			warning: "group-[.toaster]:border-foreground group-[.toaster]:bg-zap group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md border-[3px] border-foreground p-10 text-center brutal-shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-8xl",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl",
					children: "Nothing here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page doesn't exist or has been dropped."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "label-xs inline-flex border-[3px] border-foreground bg-zap px-5 py-3 press brutal-shadow-sm",
						children: "BACK HOME"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md border-[3px] border-foreground p-10 text-center brutal-shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something broke on our end. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "label-xs border-[3px] border-foreground bg-foreground px-5 py-3 text-background press brutal-shadow-sm",
						children: "TRY AGAIN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "label-xs border-[3px] border-foreground px-5 py-3 press brutal-shadow-sm",
						children: "GO HOME"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BRUTAL. — Streetwear With No Rules" },
			{
				name: "description",
				content: "BRUTAL. is an independent streetwear label. Heavyweight basics, limited drops, no compromise."
			},
			{
				property: "og:title",
				content: "BRUTAL. — Streetwear With No Rules"
			},
			{
				property: "og:description",
				content: "Independent pieces for people who don't follow the usual. Shop the new drop."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })] })
	});
}
var $$splitComponentImporter$10 = () => import("./routes-DSEQhEpw.mjs");
var Route$10 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "BRUTAL. — New Season. No Rules." },
		{
			name: "description",
			content: "Heavyweight streetwear built in limited runs. Shop the new drop from BRUTAL. — oversized tees, cargos, hoodies and accessories."
		},
		{
			property: "og:title",
			content: "BRUTAL. — New Season. No Rules."
		},
		{
			property: "og:description",
			content: "Independent pieces for people who don't follow the usual. Shop the new drop."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./account-CFARD8GW.mjs");
var Route$9 = createFileRoute("/account")({
	head: () => ({ meta: [
		{ title: "Your Account — BRUTAL." },
		{
			name: "description",
			content: "Manage your BRUTAL. orders, addresses, wishlist and profile."
		},
		{
			property: "og:title",
			content: "Your Account — BRUTAL."
		},
		{
			property: "og:description",
			content: "Manage your orders and profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./cart-qAv2cLro.mjs");
var Route$8 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your Cart — BRUTAL." },
		{
			name: "description",
			content: "Review your BRUTAL. bag, apply a discount code and head to checkout."
		},
		{
			property: "og:title",
			content: "Your Cart — BRUTAL."
		},
		{
			property: "og:description",
			content: "Review your bag and checkout."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
function OrderSummary({ cta }) {
	const { totals, state, applyCoupon, clearCoupon } = useStore();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-[3px] border-foreground p-6 brutal-shadow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Summary."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "SUBTOTAL",
						value: inr(totals.subtotal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "SHIPPING",
						value: totals.shipping === 0 ? "FREE" : inr(totals.shipping)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "DISCOUNT",
						value: totals.discount ? `− ${inr(totals.discount)}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between border-t-[3px] border-foreground pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "label-xs",
							children: "TOTAL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-display text-3xl font-black",
							children: inr(totals.total)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "label-xs mb-2",
						children: "DISCOUNT CODE"
					}),
					state.coupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-[3px] border-foreground bg-zap px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "label-xs",
							children: [state.coupon, " APPLIED"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "label-xs underline",
							onClick: () => clearCoupon(),
							children: "REMOVE"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							const res = applyCoupon(code);
							setError(res.ok ? "" : res.message);
							if (res.ok) {
								setCode("");
								toast.success(res.message);
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: code,
							onChange: (e) => setCode(e.target.value),
							placeholder: "BRUTAL10",
							"aria-label": "Discount code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "outline",
							children: "Apply"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.7rem] font-bold uppercase text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[0.7rem] text-muted-foreground",
						children: "Try BRUTAL10 or DROP500."
					})
				]
			}),
			cta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: cta
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "label-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-bold",
			children: value
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./checkout-DjsjLe4H.mjs");
var Route$7 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "Checkout — BRUTAL." },
		{
			name: "description",
			content: "Complete your BRUTAL. order: shipping, delivery speed and payment."
		},
		{
			property: "og:title",
			content: "Checkout — BRUTAL."
		},
		{
			property: "og:description",
			content: "Complete your order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./login-B6Y6Eb-k.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign In — BRUTAL." },
		{
			name: "description",
			content: "Sign in to your BRUTAL. account to track orders and saved pieces."
		},
		{
			property: "og:title",
			content: "Sign In — BRUTAL."
		},
		{
			property: "og:description",
			content: "Sign in to your BRUTAL. account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var SORTS = [
	{
		value: "new",
		label: "NEWEST"
	},
	{
		value: "price-asc",
		label: "PRICE: LOW→HIGH"
	},
	{
		value: "price-desc",
		label: "PRICE: HIGH→LOW"
	},
	{
		value: "rating",
		label: "TOP RATED"
	}
];
var $$splitComponentImporter$5 = () => import("./shop-Depz96UC.mjs");
var Route$5 = createFileRoute("/shop")({
	validateSearch: (search) => {
		const str = (v) => typeof v === "string" && v ? v : void 0;
		const num = Number(search["maxPrice"]);
		const rating = Number(search["rating"]);
		return {
			q: str(search["q"]),
			category: str(search["category"]),
			sale: search["sale"] === true || search["sale"] === "true" ? true : void 0,
			sort: SORTS.some((s) => s.value === search["sort"]) ? search["sort"] : void 0,
			maxPrice: Number.isFinite(num) && num > 0 ? num : void 0,
			size: str(search["size"]),
			color: str(search["color"]),
			rating: Number.isFinite(rating) && rating > 0 ? rating : void 0,
			view: search["view"] === "list" ? "list" : void 0
		};
	},
	head: () => ({ meta: [
		{ title: "Shop All — BRUTAL." },
		{
			name: "description",
			content: "Filter the full BRUTAL. catalogue by category, size, colour, price and rating. Limited-run streetwear."
		},
		{
			property: "og:title",
			content: "Shop All — BRUTAL."
		},
		{
			property: "og:description",
			content: "Filter the full BRUTAL. catalogue. Limited-run streetwear."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./signup-Bffe_09J.mjs");
var Route$4 = createFileRoute("/signup")({
	head: () => ({ meta: [
		{ title: "Create Account — BRUTAL." },
		{
			name: "description",
			content: "Join the drop. Create a BRUTAL. account for early access to limited runs."
		},
		{
			property: "og:title",
			content: "Create Account — BRUTAL."
		},
		{
			property: "og:description",
			content: "Join the drop and get early access."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./wishlist-dbj4xoi6.mjs");
var Route$3 = createFileRoute("/wishlist")({
	head: () => ({ meta: [
		{ title: "Your Wishlist — BRUTAL." },
		{
			name: "description",
			content: "Everything you've saved from the BRUTAL. drop, in one place."
		},
		{
			property: "og:title",
			content: "Your Wishlist — BRUTAL."
		},
		{
			property: "og:description",
			content: "Everything you've saved from the drop."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var CONTENT = {
	about: {
		title: "About.",
		body: ["BRUTAL. is an independent label making heavyweight everyday pieces in runs of 300 or fewer.", "We design in Bangalore, cut and sew in Tiruppur, and ship worldwide."]
	},
	contact: {
		title: "Contact.",
		body: ["Email hello@brutal.store — we reply within one working day.", "Studio visits by appointment only."]
	},
	faq: {
		title: "FAQ.",
		body: ["Sizing: everything runs oversized. Take your usual size for a boxy fit, one down for regular.", "Restocks: limited pieces are not restocked. Sign up for drop alerts instead."]
	},
	shipping: {
		title: "Shipping.",
		body: ["Free shipping over ₹4,999. Metro delivery in 48 hours, rest of India in 4–6 days.", "Express delivery is ₹199."]
	},
	returns: {
		title: "Returns.",
		body: ["14-day returns on unworn items with tags attached.", "Refunds land within 5 working days of pickup."]
	},
	privacy: {
		title: "Privacy.",
		body: ["We store only what's needed to fulfil your order.", "We never sell your data."]
	},
	terms: {
		title: "Terms.",
		body: ["By shopping with BRUTAL. you agree to our sale, shipping and returns policies.", "Prices include all taxes."]
	}
};
var $$splitComponentImporter$2 = () => import("./info._slug-D0Jlwl7K.mjs");
var Route$2 = createFileRoute("/info/$slug")({
	head: ({ params }) => {
		const page = CONTENT[params.slug];
		const title = `${page?.title.replace(".", "") ?? "Information"} — BRUTAL.`;
		const description = page?.body[0] ?? "Information about shopping with BRUTAL.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./order._orderId-CV_4FcVM.mjs");
var Route$1 = createFileRoute("/order/$orderId")({
	head: () => ({ meta: [
		{ title: "Order Confirmed — BRUTAL." },
		{
			name: "description",
			content: "Your BRUTAL. order is locked in. Track delivery and keep shopping the drop."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Order Confirmed — BRUTAL."
		},
		{
			property: "og:description",
			content: "Your order is locked in."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./product._productId-BptgWwta.mjs");
var Route = createFileRoute("/product/$productId")({
	loader: ({ params }) => {
		const product = getProduct(params.productId);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product unavailable — BRUTAL." }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		return { meta: [
			{ title: `${p.name} — BRUTAL.` },
			{
				name: "description",
				content: p.description.slice(0, 155)
			},
			{
				property: "og:title",
				content: `${p.name} — BRUTAL.`
			},
			{
				property: "og:description",
				content: p.description.slice(0, 155)
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	AccountRoute: Route$9.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => Route$11
	}),
	CartRoute: Route$8.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$11
	}),
	CheckoutRoute: Route$7.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$6.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	ShopRoute: Route$5.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$11
	}),
	SignupRoute: Route$4.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$11
	}),
	WishlistRoute: Route$3.update({
		id: "/wishlist",
		path: "/wishlist",
		getParentRoute: () => Route$11
	}),
	InfoSlugRoute: Route$2.update({
		id: "/info/$slug",
		path: "/info/$slug",
		getParentRoute: () => Route$11
	}),
	OrderOrderIdRoute: Route$1.update({
		id: "/order/$orderId",
		path: "/order/$orderId",
		getParentRoute: () => Route$11
	}),
	ProductProductIdRoute: Route.update({
		id: "/product/$productId",
		path: "/product/$productId",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { badgeTone as _, CONTENT as a, products as b, OrderSummary as c, Badge as d, Button as f, SectionTitle as g, Rating as h, Route$2 as i, discountPct as l, Input as m, Route as n, Route$5 as o, Field as p, Route$1 as r, SORTS as s, router_exports as t, inr as u, categories as v, useStore as x, cn as y };
