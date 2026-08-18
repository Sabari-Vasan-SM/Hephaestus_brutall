import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Button, m as Input, p as Field, x as useStore } from "./router-BOH_pa23.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B6Y6Eb-k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email("Enter a valid email").max(255),
	password: stringType().min(6, "At least 6 characters").max(72)
});
function Login() {
	const { signIn } = useStore();
	const navigate = useNavigate();
	const [values, setValues] = (0, import_react.useState)({
		email: "",
		password: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = (e) => {
		e.preventDefault();
		const parsed = schema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
			setErrors(next);
			return;
		}
		setErrors({});
		setLoading(true);
		window.setTimeout(() => {
			signIn({
				name: parsed.data.email.split("@")[0] ?? "Member",
				email: parsed.data.email
			});
			setLoading(false);
			toast.success("WELCOME BACK");
			navigate({ to: "/account" });
		}, 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-md px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-[clamp(2.5rem,10vw,4.5rem)]",
				children: [
					"Welcome",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"back."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Sign in to continue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 space-y-4 border-[3px] border-foreground p-6 brutal-shadow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "EMAIL",
						error: errors["email"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							autoComplete: "email",
							value: values.email,
							onChange: (e) => setValues((v) => ({
								...v,
								email: e.target.value
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "PASSWORD",
						error: errors["password"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							autoComplete: "current-password",
							value: values.password,
							onChange: (e) => setValues((v) => ({
								...v,
								password: e.target.value
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "label-xs underline",
						onClick: () => toast("PASSWORD RESET", { description: "Reset links are not available in this demo." }),
						children: "FORGOT PASSWORD?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "flare",
						size: "lg",
						full: true,
						disabled: loading,
						children: [
							loading ? "SIGNING IN…" : "Sign in",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								width: 16,
								height: 16,
								strokeWidth: 3
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 pt-2",
						children: ["CONTINUE WITH GOOGLE", "CONTINUE WITH APPLE"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => toast("SOCIAL SIGN-IN", { description: "Not connected in this demo." }),
							children: l
						}, l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "label-xs pt-2 text-muted-foreground",
						children: [
							"NEW HERE?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								className: "text-flare underline",
								children: "CREATE ACCOUNT"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
