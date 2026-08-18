import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Plus, f as Minus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QuantitySelector-y39tfhey.js
var import_jsx_runtime = require_jsx_runtime();
function QuantitySelector({ value, onChange, min = 1, max = 10 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-stretch border-[3px] border-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Decrease quantity",
				onClick: () => onChange(Math.max(min, value - 1)),
				disabled: value <= min,
				className: "px-3 py-2 transition-colors hover:bg-zap disabled:opacity-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
					width: 14,
					height: 14,
					strokeWidth: 3
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid w-10 place-items-center border-x-[3px] border-foreground font-display text-sm font-black",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Increase quantity",
				onClick: () => onChange(Math.min(max, value + 1)),
				disabled: value >= max,
				className: "px-3 py-2 transition-colors hover:bg-zap disabled:opacity-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					width: 14,
					height: 14,
					strokeWidth: 3
				})
			})
		]
	});
}
//#endregion
export { QuantitySelector as t };
