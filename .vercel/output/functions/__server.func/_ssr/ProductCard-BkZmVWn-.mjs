import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Plus, g as Heart } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as badgeTone, d as Badge, h as Rating, l as discountPct, u as inr, x as useStore, y as cn } from "./router-BOH_pa23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-BkZmVWn-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, layout = "grid" }) {
	const { addToCart, toggleWishlist, inWishlist } = useStore();
	const [beat, setBeat] = (0, import_react.useState)(false);
	const saved = inWishlist(product.id);
	const off = discountPct(product.price, product.compareAt);
	const quickAdd = () => {
		addToCart(product, product.sizes[Math.min(2, product.sizes.length - 1)] ?? "One Size", product.colors[0] ?? "Black");
		toast.success("ADDED TO CART", { description: `${product.name} — ${product.colors[0] ?? ""}` });
	};
	const wish = () => {
		toggleWishlist(product.id);
		setBeat(true);
		window.setTimeout(() => setBeat(false), 400);
		toast(saved ? "REMOVED FROM WISHLIST" : "SAVED TO WISHLIST", { description: product.name });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group relative flex border-[3px] border-foreground bg-background brutal-shadow-sm transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:brutal-shadow", layout === "list" ? "flex-row" : "flex-col"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$productId",
			params: { productId: product.id },
			className: cn("relative block shrink-0 overflow-hidden border-foreground bg-muted", layout === "list" ? "w-32 border-r-[3px] sm:w-48" : "border-b-[3px]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				width: 800,
				height: 800,
				loading: "lazy",
				className: "aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-2 top-2 flex flex-col items-start gap-1",
				children: product.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: badgeTone(b),
					children: b
				}, b))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col p-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs text-muted-foreground",
								children: product.categoryLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 truncate text-base sm:text-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$productId",
									params: { productId: product.id },
									className: "hover:underline",
									children: product.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 truncate text-xs text-muted-foreground",
								children: product.subtitle
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: wish,
						"aria-label": saved ? "Remove from wishlist" : "Add to wishlist",
						"aria-pressed": saved,
						className: "shrink-0 border-2 border-foreground p-1.5 transition-colors hover:bg-zap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							width: 16,
							height: 16,
							strokeWidth: 2.5,
							className: cn(saved && "fill-flare text-flare", beat && "animate-heart")
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
						value: product.rating,
						count: product.reviewCount
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-black",
						children: inr(product.price)
					}), product.compareAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground line-through",
						children: inr(product.compareAt)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "label-xs bg-flare px-1.5 py-0.5 text-background",
						children: [off, "% OFF"]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: quickAdd,
					className: "mt-4 flex w-full items-center justify-between border-[3px] border-foreground bg-background px-3 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-zap",
					children: ["Add to cart ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						width: 14,
						height: 14,
						strokeWidth: 3
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
