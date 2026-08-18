import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as ArrowUpRight, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as products, g as SectionTitle, v as categories } from "./router-BOH_pa23.mjs";
import { t as ProductCard } from "./ProductCard-BkZmVWn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DSEQhEpw.js
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-TvNO3CIE.jpg";
var DEFAULT = [
	"NEW DROP",
	"LIMITED EDITION",
	"FREE SHIPPING OVER ₹4,999",
	"BRUTAL.",
	"NO RULES",
	"MADE IN INDIA"
];
function Marquee({ items = DEFAULT, invert = false }) {
	const row = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-y-[3px] border-foreground py-3 " + (invert ? "bg-zap text-foreground" : "bg-foreground text-background"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max animate-marquee",
			children: row.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-black uppercase tracking-[0.2em] sm:text-base",
					children: item
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-6 text-flare",
					"aria-hidden": true,
					children: "◆"
				})]
			}, i))
		})
	});
}
function Home() {
	const featured = products.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden border-b-[3px] border-foreground grid-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-6 lg:px-10 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs inline-block border-[3px] border-foreground bg-zap px-3 py-2",
							children: "DROP 04 / SS26"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-[clamp(3.2rem,13vw,8rem)]",
							children: [
								"New",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Season.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-foreground px-3 text-background",
									children: "No rules."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "Independent pieces for people who don't follow the usual. Made in small runs, built to outlive the trend."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								search: { sort: "new" },
								className: "inline-flex items-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow",
								children: ["Shop new drop ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									width: 18,
									height: 18,
									strokeWidth: 3
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: {},
								className: "inline-flex items-center gap-2 border-[3px] border-foreground bg-background px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] press brutal-shadow",
								children: "Explore collection"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-12 grid max-w-md grid-cols-3 gap-3",
							children: [
								["300", "UNITS / DROP"],
								["4.7★", "AVG RATING"],
								["48H", "METRO DELIVERY"]
							].map(([v, k]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-[3px] border-foreground bg-background p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-display text-2xl font-black",
									children: v
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "label-xs mt-1 text-muted-foreground",
									children: k
								})]
							}, k))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -left-6 -top-6 hidden h-28 w-28 border-[3px] border-foreground bg-zap sm:block"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -bottom-8 -right-4 hidden h-20 w-40 border-[3px] border-foreground bg-flare sm:block"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -right-2 top-1/3 hidden h-24 w-24 dotgrid opacity-60 lg:block"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_default,
							alt: "Model wearing an oversized all-black BRUTAL. outfit",
							width: 1008,
							height: 1264,
							className: "relative z-10 w-full border-[3px] border-foreground object-cover brutal-shadow-lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3 z-20 label-xs border-2 border-foreground bg-background px-2 py-1",
							children: "NEW DROP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-6 left-[-10px] z-20 label-xs border-2 border-foreground bg-zap px-2 py-1",
							children: "LIMITED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-4 top-8 z-20 label-xs border-2 border-foreground bg-foreground px-2 py-1 text-background",
							children: "2026"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, {
					kicker: "FEATURED",
					children: [
						"The",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"drop."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: {},
						className: "inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow",
						children: ["View everything ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							width: 18,
							height: 18,
							strokeWidth: 3
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y-[3px] border-foreground bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, {
					kicker: "BROWSE",
					children: [
						"Pick a",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"lane."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: categories.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: { category: c.slug },
						className: "group relative block overflow-hidden border-[3px] border-foreground bg-background brutal-shadow-sm transition-transform hover:-translate-y-1 " + (i % 2 === 1 ? "lg:mt-8" : ""),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image,
								alt: `${c.title.replace("\n", "")} collection`,
								width: 800,
								height: 1e3,
								loading: "lazy",
								className: "aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute right-3 top-3 h-8 w-8 border-2 border-foreground bg-zap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 border-t-[3px] border-foreground bg-background p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whitespace-pre-line font-display text-2xl font-black uppercase leading-[0.85]",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "label-xs text-muted-foreground",
									children: [c.count, " ITEMS"]
								})]
							})
						]
					}, c.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-[clamp(2.5rem,8vw,5rem)]",
				children: [
					"Built",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"different."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: [
					["SMALL RUNS", "Every piece is made in runs of 300 or fewer. When it's gone, it's gone."],
					["HEAVY FABRIC", "Nothing under 280 GSM. Structure over softness, always."],
					["NO LOGO NOISE", "Branding stays inside. The cut does the talking."]
				].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-[3px] border-foreground bg-background p-5 brutal-shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl",
						children: t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: d
					})]
				}, t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
			items: [
				"FREE RETURNS",
				"COD AVAILABLE",
				"SHIPS IN 24H",
				"BRUTAL."
			],
			invert: true
		})
	] });
}
//#endregion
export { Home as component };
