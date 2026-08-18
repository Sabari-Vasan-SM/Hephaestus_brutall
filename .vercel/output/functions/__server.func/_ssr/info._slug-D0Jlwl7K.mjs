import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as CONTENT, i as Route$2 } from "./router-BOH_pa23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/info._slug-D0Jlwl7K.js
var import_jsx_runtime = require_jsx_runtime();
function InfoPage() {
	const { slug } = Route$2.useParams();
	const page = CONTENT[slug];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-14 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[clamp(2.6rem,10vw,5rem)]",
			children: page?.title ?? "Information."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-4 border-[3px] border-foreground p-6 brutal-shadow-sm",
			children: (page?.body ?? ["This page is coming soon."]).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: p
			}, p))
		})]
	});
}
//#endregion
export { InfoPage as component };
