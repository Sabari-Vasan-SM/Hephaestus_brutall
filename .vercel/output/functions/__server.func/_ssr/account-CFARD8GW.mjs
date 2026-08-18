import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as products, d as Badge, f as Button, u as inr, x as useStore } from "./router-BOH_pa23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CFARD8GW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"OVERVIEW",
	"ORDERS",
	"WISHLIST",
	"ADDRESSES",
	"PROFILE",
	"SETTINGS"
];
function statusTone(status) {
	if (status === "DELIVERED") return "zap";
	if (status === "CANCELLED") return "paper";
	if (status === "SHIPPED") return "flare";
	return "ink";
}
function Account() {
	const { state, signOut } = useStore();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("OVERVIEW");
	if (!state.user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-20 text-center sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[clamp(2.2rem,9vw,4rem)]",
				children: "Sign in first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Your account lives behind the door."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "label-xs border-[3px] border-foreground bg-flare px-6 py-4 text-background press brutal-shadow-sm",
					children: "SIGN IN"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "label-xs border-[3px] border-foreground px-6 py-4 press brutal-shadow-sm",
					children: "CREATE ACCOUNT"
				})]
			})
		]
	});
	const saved = products.filter((p) => state.wishlist.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[clamp(2.5rem,9vw,5rem)]",
			children: [
				"Hey,",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				state.user.name,
				"."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Account",
				className: "grid gap-2",
				children: [TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t),
					"aria-pressed": tab === t,
					className: "label-xs border-[3px] border-foreground px-4 py-3 text-left transition-colors " + (tab === t ? "bg-foreground text-background" : "hover:bg-zap"),
					children: t
				}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						signOut();
						toast("SIGNED OUT");
						navigate({ to: "/" });
					},
					children: "Logout"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-[3px] border-foreground p-6 brutal-shadow-sm",
				children: [
					tab === "OVERVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							["ORDERS", String(state.orders.length)],
							["WISHLIST", String(state.wishlist.length)],
							["IN CART", String(state.cart.reduce((n, c) => n + c.qty, 0))]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-[3px] border-foreground p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl font-black",
								children: v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-xs mt-1 text-muted-foreground",
								children: k
							})]
						}, k))
					}),
					tab === "ORDERS" && (state.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "No orders yet.",
						note: "Once you place an order it shows up here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-4",
						children: state.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-[3px] border-foreground p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-black",
										children: o.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-xs text-muted-foreground",
										children: o.date
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: statusTone(o.status),
										children: o.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1 text-sm text-muted-foreground",
									children: o.items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										i.qty,
										"× ",
										i.name,
										" — ",
										i.size,
										" / ",
										i.color
									] }, idx))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between border-t-2 border-foreground pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-xs",
										children: "TOTAL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl font-black",
										children: inr(o.total)
									})]
								})
							]
						}, o.id))
					})),
					tab === "WISHLIST" && (saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "Nothing saved.",
						note: "Tap the heart on any product."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3",
						children: saved.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 border-[3px] border-foreground p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: "",
									width: 120,
									height: 120,
									loading: "lazy",
									className: "h-16 w-16 border-2 border-foreground object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$productId",
									params: { productId: p.id },
									className: "flex-1 font-display font-black uppercase hover:underline",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-black",
									children: inr(p.price)
								})
							]
						}, p.id))
					})),
					tab === "ADDRESSES" && (state.addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "No addresses.",
						note: "Addresses are saved when you place an order."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3 sm:grid-cols-2",
						children: state.addresses.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-[3px] border-foreground p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-black uppercase",
								children: a.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-muted-foreground",
								children: [
									a.address,
									", ",
									a.city,
									", ",
									a.state,
									" ",
									a.postalCode,
									", ",
									a.country
								]
							})]
						}, i))
					})),
					tab === "PROFILE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-[3px] border-foreground p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "label-xs text-muted-foreground",
								children: "NAME"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-bold",
								children: state.user.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-[3px] border-foreground p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "label-xs text-muted-foreground",
								children: "EMAIL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-bold",
								children: state.user.email
							})]
						})]
					}),
					tab === "SETTINGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Preferences for drop alerts and order updates."
						}), [
							"DROP ALERTS",
							"ORDER UPDATES",
							"RESTOCK NOTICES"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between border-[3px] border-foreground p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: s
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true,
								className: "h-5 w-5 accent-[oklch(0.667_0.234_39.5)]"
							})]
						}, s))]
					})
				]
			})]
		})]
	});
}
function Empty({ title, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: note
		})]
	});
}
//#endregion
export { Account as component };
