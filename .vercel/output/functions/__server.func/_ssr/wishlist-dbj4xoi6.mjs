import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as products, x as useStore } from "./router-BOH_pa23.mjs";
import { t as ProductCard } from "./ProductCard-BkZmVWn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-dbj4xoi6.js
var import_jsx_runtime = require_jsx_runtime();
function Wishlist() {
	const { state } = useStore();
	const saved = products.filter((p) => state.wishlist.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[clamp(2.8rem,10vw,6rem)]",
			children: [
				"Your",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"wishlist."
			]
		}), saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border-[3px] border-foreground p-12 text-center brutal-shadow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Nothing saved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tap the heart on anything you like."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {},
						className: "label-xs border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm",
						children: "BROWSE THE DROP"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4",
			children: saved.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
		})]
	});
}
//#endregion
export { Wishlist as component };
