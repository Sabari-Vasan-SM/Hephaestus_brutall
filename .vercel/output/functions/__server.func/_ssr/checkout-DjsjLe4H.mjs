import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as OrderSummary, f as Button, m as Input, p as Field, u as inr, x as useStore } from "./router-BOH_pa23.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DjsjLe4H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email("Enter a valid email").max(255),
	phone: stringType().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
	fullName: stringType().trim().min(2, "Enter your full name").max(100),
	address: stringType().trim().min(5, "Enter your address").max(200),
	city: stringType().trim().min(2, "Enter your city").max(80),
	state: stringType().trim().min(2, "Enter your state").max(80),
	postalCode: stringType().trim().regex(/^[0-9]{5,6}$/, "Enter a valid postal code"),
	country: stringType().trim().min(2).max(80)
});
var DELIVERY = [{
	id: "STANDARD",
	title: "STANDARD DELIVERY",
	note: "4–6 business days",
	cost: 0
}, {
	id: "EXPRESS",
	title: "EXPRESS DELIVERY",
	note: "1–2 business days",
	cost: 199
}];
var PAYMENTS = [
	{
		id: "UPI",
		title: "UPI",
		note: "GPay, PhonePe, Paytm"
	},
	{
		id: "CARD",
		title: "CREDIT / DEBIT CARD",
		note: "Visa, Mastercard, Rupay"
	},
	{
		id: "NETBANKING",
		title: "NET BANKING",
		note: "All major banks"
	},
	{
		id: "COD",
		title: "CASH ON DELIVERY",
		note: "₹49 handling fee"
	}
];
function Checkout() {
	const { cartLines, totals, placeOrder, state } = useStore();
	const navigate = useNavigate();
	const [values, setValues] = (0, import_react.useState)({
		email: state.user?.email ?? "",
		phone: "",
		fullName: state.user?.name ?? "",
		address: "",
		city: "",
		state: "",
		postalCode: "",
		country: "India"
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [delivery, setDelivery] = (0, import_react.useState)("STANDARD");
	const [payment, setPayment] = (0, import_react.useState)("UPI");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const deliveryCost = DELIVERY.find((d) => d.id === delivery)?.cost ?? 0;
	const codFee = payment === "COD" ? 49 : 0;
	const grand = totals.total + deliveryCost + codFee;
	const field = (k) => ({
		value: values[k],
		onChange: (e) => setValues((v) => ({
			...v,
			[k]: e.target.value
		}))
	});
	if (cartLines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[clamp(2.5rem,9vw,5rem)]",
				children: "Nothing to pay for."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Your cart is empty, so checkout is on hold."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {},
					className: "label-xs inline-flex border-[3px] border-foreground bg-zap px-6 py-4 press brutal-shadow-sm",
					children: "BROWSE THE DROP"
				})
			})
		]
	});
	const submit = (e) => {
		e.preventDefault();
		const parsed = schema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
			setErrors(next);
			toast.error("CHECK THE FORM", { description: "Some fields need fixing." });
			return;
		}
		setErrors({});
		setSubmitting(true);
		window.setTimeout(() => {
			const order = placeOrder({
				email: parsed.data.email,
				address: {
					fullName: parsed.data.fullName,
					address: parsed.data.address,
					city: parsed.data.city,
					state: parsed.data.state,
					postalCode: parsed.data.postalCode,
					country: parsed.data.country
				},
				delivery,
				payment
			});
			setSubmitting(false);
			toast.success("ORDER PLACED", { description: order.id });
			navigate({
				to: "/order/$orderId",
				params: { orderId: order.id }
			});
		}, 700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[clamp(2.8rem,10vw,6rem)]",
			children: [
				"Check",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"out."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "label-xs bg-foreground px-2 py-1 text-background",
							children: "CONTACT INFORMATION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "EMAIL",
								error: errors["email"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									autoComplete: "email",
									placeholder: "you@email.com",
									...field("email")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PHONE",
								error: errors["phone"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "tel",
									autoComplete: "tel",
									placeholder: "98765 43210",
									...field("phone")
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "label-xs bg-foreground px-2 py-1 text-background",
							children: "SHIPPING ADDRESS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "FULL NAME",
										error: errors["fullName"],
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											autoComplete: "name",
											...field("fullName")
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "ADDRESS",
										error: errors["address"],
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											autoComplete: "street-address",
											...field("address")
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "CITY",
									error: errors["city"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										autoComplete: "address-level2",
										...field("city")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "STATE",
									error: errors["state"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										autoComplete: "address-level1",
										...field("state")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "POSTAL CODE",
									error: errors["postalCode"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "numeric",
										autoComplete: "postal-code",
										...field("postalCode")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "COUNTRY",
									error: errors["country"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										autoComplete: "country-name",
										...field("country")
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "label-xs bg-foreground px-2 py-1 text-background",
							children: "DELIVERY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: DELIVERY.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								name: "delivery",
								checked: delivery === d.id,
								onChange: () => setDelivery(d.id),
								title: d.title,
								note: d.note,
								right: d.cost === 0 ? "FREE" : inr(d.cost)
							}, d.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "border-[3px] border-foreground p-5 brutal-shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "label-xs bg-foreground px-2 py-1 text-background",
							children: "PAYMENT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: PAYMENTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								name: "payment",
								checked: payment === p.id,
								onChange: () => setPayment(p.id),
								title: p.title,
								note: p.note
							}, p.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 lg:sticky lg:top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderSummary, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-[3px] border-foreground p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs",
									children: "DELIVERY"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: deliveryCost === 0 ? "FREE" : inr(deliveryCost)
								})]
							}),
							codFee > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs",
									children: "COD FEE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: inr(codFee)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-baseline justify-between border-t-[3px] border-foreground pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs",
									children: "PAY NOW"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl font-black",
									children: inr(grand)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "flare",
						size: "lg",
						full: true,
						disabled: submitting,
						children: [
							submitting ? "PLACING ORDER…" : "Place order",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								width: 16,
								height: 16,
								strokeWidth: 3
							})
						]
					})
				]
			})]
		})]
	});
}
function Choice({ name, checked, onChange, title, note, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-start gap-3 border-[3px] border-foreground p-4 transition-colors " + (checked ? "bg-zap" : "hover:bg-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "radio",
				name,
				checked,
				onChange,
				className: "sr-only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-[3px] border-foreground bg-background",
				children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 bg-flare" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-sm font-black uppercase",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted-foreground",
					children: note
				})]
			}),
			right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label-xs",
				children: right
			})
		]
	});
}
//#endregion
export { Checkout as component };
