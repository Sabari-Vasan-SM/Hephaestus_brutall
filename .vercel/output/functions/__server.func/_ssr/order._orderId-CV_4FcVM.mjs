import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Check, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Button, r as Route$1, u as inr, x as useStore } from "./router-BOH_pa23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._orderId-CV_4FcVM.js
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccess() {
	const { orderId } = Route$1.useParams();
	const { state } = useStore();
	const order = state.orders.find((o) => o.id === orderId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-14 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative border-[3px] border-foreground p-8 brutal-shadow-lg animate-pop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute -right-4 -top-4 h-16 w-16 border-[3px] border-foreground bg-zap"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute -bottom-5 left-8 h-10 w-24 border-[3px] border-foreground bg-flare"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "label-xs inline-flex items-center gap-2 border-[3px] border-foreground bg-zap px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						width: 14,
						height: 14,
						strokeWidth: 4
					}), " ORDER CONFIRMED"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 text-[clamp(2.6rem,10vw,5rem)]",
					children: [
						"Order",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"locked in."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-[3px] border-foreground p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "label-xs text-muted-foreground",
							children: "ORDER NUMBER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-xl font-black",
							children: orderId
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-[3px] border-foreground p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "label-xs text-muted-foreground",
							children: "ESTIMATED DELIVERY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-xl font-black",
							children: order?.eta ?? "WITHIN 6 DAYS"
						})]
					})]
				}),
				order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 border-[3px] border-foreground p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-sm text-muted-foreground",
						children: order.items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							i.qty,
							"× ",
							i.name,
							" — ",
							i.size,
							" / ",
							i.color
						] }, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between border-t-2 border-foreground pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs",
							children: "PAID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-black",
							children: inr(order.total)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "flare",
						size: "lg",
						onClick: () => toast("TRACKING", { description: `${orderId} is being packed.` }),
						children: ["Track order ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							width: 16,
							height: 16,
							strokeWidth: 3
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {},
						className: "inline-flex items-center gap-2 border-[3px] border-foreground px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] press brutal-shadow-sm",
						children: "Continue shopping"
					})]
				})
			]
		})
	});
}
//#endregion
export { OrderSuccess as component };
