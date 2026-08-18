import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Heart, l as Ruler, r as Truck, u as RotateCcw, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as QuantitySelector } from "./QuantitySelector-y39tfhey.mjs";
import { _ as badgeTone, b as products, d as Badge, f as Button, h as Rating, l as discountPct, n as Route, u as inr, x as useStore, y as cn } from "./router-BOH_pa23.mjs";
import { t as ProductCard } from "./ProductCard-BkZmVWn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._productId-BptgWwta.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const navigate = useNavigate();
	const { addToCart, toggleWishlist, inWishlist } = useStore();
	const [size, setSize] = (0, import_react.useState)(product.sizes[Math.min(2, product.sizes.length - 1)] ?? "");
	const [color, setColor] = (0, import_react.useState)(product.colors[0] ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	const [active, setActive] = (0, import_react.useState)(0);
	const [sizeError, setSizeError] = (0, import_react.useState)(false);
	const saved = inWishlist(product.id);
	const off = discountPct(product.price, product.compareAt);
	const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
	const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);
	const add = () => {
		if (!size) {
			setSizeError(true);
			toast.error("PICK A SIZE FIRST");
			return false;
		}
		addToCart(product, size, color, qty);
		toast.success("ADDED TO CART", { description: `${product.name} — ${size} / ${color}` });
		return true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Breadcrumb",
				className: "label-xs mb-6 flex flex-wrap items-center gap-2 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "HOME"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: { category: product.category },
						className: "hover:text-foreground",
						children: product.category.toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: product.name.toUpperCase()
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-[84px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-2 flex gap-3 sm:order-1 sm:flex-col",
						children: product.gallery.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActive(i),
							"aria-label": `View image ${i + 1}`,
							"aria-pressed": active === i,
							className: cn("h-20 w-20 shrink-0 overflow-hidden border-[3px] border-foreground", active === i && "brutal-shadow-sm"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g,
								alt: "",
								width: 200,
								height: 200,
								loading: "lazy",
								className: "h-full w-full object-cover"
							})
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative order-1 sm:order-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.gallery[active] ?? product.image,
							alt: product.name,
							width: 800,
							height: 800,
							className: "aspect-square w-full border-[3px] border-foreground object-cover brutal-shadow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3 flex flex-col gap-1",
							children: product.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: badgeTone(b),
								children: b
							}, b))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-xs text-muted-foreground",
						children: product.categoryLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-[clamp(2.2rem,7vw,3.8rem)]",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: product.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
							value: product.rating,
							count: product.reviewCount,
							size: 18
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-baseline gap-3 border-y-[3px] border-foreground py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-4xl font-black",
								children: inr(product.price)
							}),
							product.compareAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted-foreground line-through",
								children: inr(product.compareAt)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "flare",
								children: [off, "% OFF"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs ml-auto text-muted-foreground",
								children: "INCL. OF ALL TAXES"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm leading-relaxed text-muted-foreground",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "label-xs",
									children: "SIZE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "label-xs flex items-center gap-1 underline",
									onClick: () => toast("SIZE GUIDE", { description: "Sizes run oversized. Take your usual size for a boxy fit, one down for regular." }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, {
										width: 12,
										height: 12,
										strokeWidth: 3
									}), " SIZE GUIDE"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSize(s);
										setSizeError(false);
									},
									"aria-pressed": size === s,
									className: cn("min-w-12 border-[3px] border-foreground px-3 py-2 text-sm font-bold uppercase transition-colors", size === s ? "bg-foreground text-background" : "hover:bg-zap"),
									children: s
								}, s))
							}),
							sizeError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.7rem] font-bold uppercase text-destructive",
								children: "Select a size"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "label-xs mb-2",
							children: ["COLOUR — ", color]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setColor(c),
								"aria-pressed": color === c,
								className: cn("label-xs border-[3px] border-foreground px-3 py-2 transition-colors", color === c ? "bg-flare text-background" : "hover:bg-zap"),
								children: c
							}, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "label-xs",
							children: "QTY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantitySelector, {
							value: qty,
							onChange: setQty
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "solid",
								size: "lg",
								onClick: add,
								type: "button",
								children: "Add to cart"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "flare",
								size: "lg",
								type: "button",
								onClick: () => {
									if (add()) navigate({ to: "/checkout" });
								},
								children: ["Buy now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									width: 16,
									height: 16,
									strokeWidth: 3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								type: "button",
								"aria-label": saved ? "Remove from wishlist" : "Save to wishlist",
								"aria-pressed": saved,
								onClick: () => {
									toggleWishlist(product.id);
									toast(saved ? "REMOVED FROM WISHLIST" : "SAVED TO WISHLIST");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									width: 18,
									height: 18,
									strokeWidth: 3,
									className: saved ? "fill-flare text-flare" : ""
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
								width: 16,
								height: 16,
								strokeWidth: 3
							}),
							title: "FREE SHIPPING",
							children: "On orders over ₹4,999. Metro delivery in 48h."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								width: 16,
								height: 16,
								strokeWidth: 3
							}),
							title: "14-DAY RETURNS",
							children: "Unworn, tags on, no questions asked."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border-[3px] border-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "label-xs border-b-[3px] border-foreground bg-muted px-4 py-3",
							children: "DETAILS & MATERIALS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 p-4 text-sm text-muted-foreground",
							children: product.materials.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-flare",
										children: "◆"
									}),
									" ",
									m
								]
							}, m))
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[clamp(2rem,6vw,3.5rem)]",
					children: "Reviews."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-2",
					children: product.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs text-muted-foreground",
									children: r.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, { value: r.rating })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: r.body
							})
						]
					}, r.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[clamp(2rem,6vw,3.5rem)]",
					children: "Goes with."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: (related.length ? related : fallbackRelated).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 z-40 -mx-4 mt-12 flex items-center gap-3 border-t-[3px] border-foreground bg-background p-3 sm:-mx-6 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-sm font-black uppercase",
						children: product.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-black",
						children: inr(product.price)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "flare",
					onClick: add,
					type: "button",
					children: "Add to cart"
				})]
			})
		]
	});
}
function InfoTile({ icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-[3px] border-foreground p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "label-xs flex items-center gap-2",
			children: [
				icon,
				" ",
				title
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children
		})]
	});
}
//#endregion
export { ProductPage as component };
