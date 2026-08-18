import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as Trash2, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as QuantitySelector } from "./QuantitySelector-y39tfhey.mjs";
import { f as Button, m as Input, u as inr, x as useStore } from "./router-BOH_pa23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-qAv2cLro.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function CartPage() {
	const { cartLines, setQty, removeFromCart, ready } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[clamp(2.8rem,10vw,6rem)]",
			children: [
				"Your",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"cart."
			]
		}), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4",
			children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse border-[3px] border-foreground bg-muted" }, i))
		}) : cartLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border-[3px] border-foreground p-12 text-center brutal-shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Empty in here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Nothing in the bag yet. The drop is waiting."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: {},
						className: "label-xs inline-flex items-center gap-2 border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm",
						children: ["START SHOPPING ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							width: 16,
							height: 16,
							strokeWidth: 3
						})]
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4",
				children: cartLines.map(({ item, product }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4 border-[3px] border-foreground p-3 brutal-shadow-sm sm:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$productId",
						params: { productId: product.id },
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.image,
							alt: product.name,
							width: 200,
							height: 200,
							loading: "lazy",
							className: "h-24 w-24 border-[3px] border-foreground object-cover sm:h-32 sm:w-32"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate text-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/product/$productId",
										params: { productId: product.id },
										className: "hover:underline",
										children: product.name
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "label-xs mt-1 text-muted-foreground",
									children: [
										item.size,
										" / ",
										item.color
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove ${product.name}`,
								onClick: () => {
									removeFromCart(item.key);
									toast("REMOVED FROM CART", { description: product.name });
								},
								className: "shrink-0 border-2 border-foreground p-1.5 transition-colors hover:bg-destructive hover:text-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									width: 16,
									height: 16,
									strokeWidth: 2.5
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex flex-wrap items-center justify-between gap-3 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantitySelector, {
								value: item.qty,
								onChange: (v) => setQty(item.key, v)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-black",
								children: inr(product.price * item.qty)
							})]
						})]
					})]
				}, item.key))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:sticky lg:top-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderSummary, { cta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					className: "flex w-full items-center justify-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow-sm",
					children: ["Checkout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						width: 16,
						height: 16,
						strokeWidth: 3
					})]
				}) })
			})]
		})]
	});
}
//#endregion
export { OrderSummary, CartPage as component };
