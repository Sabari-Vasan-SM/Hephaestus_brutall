import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as LayoutGrid, m as List, o as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as products, f as Button, h as Rating, m as Input, o as Route$5, s as SORTS, u as inr, v as categories } from "./router-BOH_pa23.mjs";
import { t as ProductCard } from "./ProductCard-BkZmVWn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Depz96UC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIZES = [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"One Size"
];
var COLORS = [
	"Black",
	"Bone",
	"Electric Yellow",
	"Washed Black",
	"Concrete",
	"Black / White"
];
var MAX = 7e3;
function Shop() {
	const search = Route$5.useSearch();
	const navigate = useNavigate({ from: "/shop" });
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const set = (patch) => navigate({
		search: (prev) => ({
			...prev,
			...patch
		}),
		resetScroll: false
	});
	const maxPrice = search.maxPrice ?? MAX;
	const list = (0, import_react.useMemo)(() => {
		let out = products.slice();
		const term = search.q?.trim().toLowerCase();
		if (term) out = out.filter((p) => `${p.name} ${p.categoryLabel} ${p.subtitle}`.toLowerCase().includes(term));
		if (search.category) out = out.filter((p) => p.category === search.category);
		if (search.sale) out = out.filter((p) => !!p.compareAt);
		if (search.size) out = out.filter((p) => p.sizes.includes(search.size));
		if (search.color) out = out.filter((p) => p.colors.includes(search.color));
		if (search.rating) out = out.filter((p) => p.rating >= search.rating);
		out = out.filter((p) => p.price <= maxPrice);
		switch (search.sort) {
			case "price-asc":
				out.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				out.sort((a, b) => b.price - a.price);
				break;
			case "rating":
				out.sort((a, b) => b.rating - a.rating);
				break;
			case "new": out.sort((a, b) => Number(b.badges.includes("NEW")) - Number(a.badges.includes("NEW")));
		}
		return out;
	}, [search, maxPrice]);
	const activeCount = [
		search.category,
		search.sale,
		search.size,
		search.color,
		search.rating,
		search.q
	].filter(Boolean).length;
	const clearAll = () => navigate({
		search: {},
		resetScroll: false
	});
	const Filters = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "SEARCH"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: search.q ?? "",
				onChange: (e) => set({ q: e.target.value || void 0 }),
				placeholder: "SEARCH…",
				"aria-label": "Search products"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "CATEGORY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterButton, {
					active: !search.category,
					onClick: () => set({ category: void 0 }),
					children: "ALL"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterButton, {
					active: search.category === c.slug,
					onClick: () => set({ category: search.category === c.slug ? void 0 : c.slug }),
					children: c.slug.toUpperCase()
				}, c.slug))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "label-xs mb-3",
				children: ["MAX PRICE — ", inr(maxPrice)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 999,
				max: MAX,
				step: 500,
				value: maxPrice,
				"aria-label": "Maximum price",
				onChange: (e) => set({ maxPrice: Number(e.target.value) }),
				className: "w-full accent-[oklch(0.667_0.234_39.5)]"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "SIZE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: search.size === s,
					onClick: () => set({ size: search.size === s ? void 0 : s }),
					children: s
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "COLOUR"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: search.color === c,
					onClick: () => set({ color: search.color === c ? void 0 : c }),
					children: c
				}, c))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "RATING"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: [
					4.5,
					4,
					3
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterButton, {
					active: search.rating === r,
					onClick: () => set({ rating: search.rating === r ? void 0 : r }),
					children: [r, "★ & UP"]
				}, r))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "label-xs mb-3",
				children: "OFFERS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterButton, {
				active: !!search.sale,
				onClick: () => set({ sale: search.sale ? void 0 : true }),
				children: "ON SALE ONLY"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				full: true,
				onClick: clearAll,
				type: "button",
				children: "Clear all filters"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-xs bg-foreground px-2 py-1 text-background",
					children: "CATALOGUE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-[clamp(2.8rem,10vw,6rem)]",
					children: [
						"Shop",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"the drop."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[260px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky top-24 border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: Filters
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setFiltersOpen(true),
							className: "label-xs flex items-center gap-2 border-[3px] border-foreground px-4 py-3 lg:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
									width: 14,
									height: 14,
									strokeWidth: 3
								}),
								" FILTER",
								activeCount ? ` (${activeCount})` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "label-xs flex items-center gap-2 border-[3px] border-foreground px-3 py-2",
							children: ["SORT", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: search.sort ?? "",
								onChange: (e) => set({ sort: e.target.value || void 0 }),
								className: "bg-transparent text-xs font-bold uppercase outline-none",
								"aria-label": "Sort products",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "FEATURED"
								}), SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.value,
									children: s.label
								}, s.value))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "label-xs text-muted-foreground",
							children: [list.length, " PRODUCTS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto hidden items-center gap-1 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Grid view",
								"aria-pressed": search.view !== "list",
								onClick: () => set({ view: void 0 }),
								className: "border-[3px] border-foreground p-2 " + (search.view !== "list" ? "bg-zap" : ""),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
									width: 16,
									height: 16,
									strokeWidth: 3
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "List view",
								"aria-pressed": search.view === "list",
								onClick: () => set({ view: "list" }),
								className: "border-[3px] border-foreground p-2 " + (search.view === "list" ? "bg-zap" : ""),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									width: 16,
									height: 16,
									strokeWidth: 3
								})
							})]
						})
					]
				}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-[3px] border-foreground p-12 text-center brutal-shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl",
							children: "No matches."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Loosen the filters and try again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "zap",
								onClick: clearAll,
								type: "button",
								children: "Reset filters"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: search.view === "list" ? "grid gap-4" : "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						layout: search.view === "list" ? "list" : "grid"
					}, p.id))
				})] })]
			}),
			filtersOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[65] lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close filters",
					onClick: () => setFiltersOpen(false),
					className: "absolute inset-0 bg-foreground/40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t-[3px] border-foreground bg-background p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-black",
								children: "FILTERS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFiltersOpen(false),
								"aria-label": "Close filters",
								className: "border-[3px] border-foreground p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									width: 18,
									height: 18,
									strokeWidth: 3
								})
							})]
						}),
						Filters,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "solid",
								full: true,
								onClick: () => setFiltersOpen(false),
								type: "button",
								children: [
									"Show ",
									list.length,
									" results"
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 border-[3px] border-foreground bg-muted p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-md text-sm text-muted-foreground",
						children: [
							"Every BRUTAL. product ships with free returns for 14 days. Rated",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "4.6 average"
							}),
							" across ",
							products.length,
							" ",
							"pieces."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
						value: 4.6,
						count: products.reduce((n, p) => n + p.reviewCount, 0),
						size: 18
					})]
				})
			})
		]
	});
}
function FilterButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: "label-xs border-[3px] border-foreground px-3 py-2 text-left transition-colors " + (active ? "bg-foreground text-background" : "hover:bg-zap"),
		children
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: "label-xs border-2 border-foreground px-2.5 py-1.5 transition-colors " + (active ? "bg-flare text-background" : "hover:bg-zap"),
		children
	});
}
//#endregion
export { Shop as component };
