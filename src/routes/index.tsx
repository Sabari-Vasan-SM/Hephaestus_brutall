import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/brutal";
import { categories, products } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRUTAL. — New Season. No Rules." },
      {
        name: "description",
        content:
          "Heavyweight streetwear built in limited runs. Shop the new drop from BRUTAL. — oversized tees, cargos, hoodies and accessories.",
      },
      { property: "og:title", content: "BRUTAL. — New Season. No Rules." },
      {
        property: "og:description",
        content: "Independent pieces for people who don't follow the usual. Shop the new drop.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-[3px] border-foreground grid-paper">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-6 lg:px-10 lg:py-20">
          <div className="relative z-10">
            <span className="label-xs inline-block border-[3px] border-foreground bg-zap px-3 py-2">
              DROP 04 / SS26
            </span>
            <h1 className="mt-6 text-[clamp(3.2rem,13vw,8rem)]">
              New
              <br />
              Season.
              <br />
              <span className="bg-foreground px-3 text-background">No rules.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Independent pieces for people who don't follow the usual. Made in small runs, built to
              outlive the trend.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                search={{ sort: "new" }}
                className="inline-flex items-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow"
              >
                Shop new drop <ArrowRight width={18} height={18} strokeWidth={3} />
              </Link>
              <Link
                to="/shop"
                search={{}}
                className="inline-flex items-center gap-2 border-[3px] border-foreground bg-background px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] press brutal-shadow"
              >
                Explore collection
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-3">
              {[
                ["300", "UNITS / DROP"],
                ["4.7★", "AVG RATING"],
                ["48H", "METRO DELIVERY"],
              ].map(([v, k]) => (
                <div key={k} className="border-[3px] border-foreground bg-background p-3">
                  <dt className="font-display text-2xl font-black">{v}</dt>
                  <dd className="label-xs mt-1 text-muted-foreground">{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-6 -top-6 hidden h-28 w-28 border-[3px] border-foreground bg-zap sm:block"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -right-4 hidden h-20 w-40 border-[3px] border-foreground bg-flare sm:block"
            />
            <div
              aria-hidden
              className="absolute -right-2 top-1/3 hidden h-24 w-24 dotgrid opacity-60 lg:block"
            />
            <img
              src={heroImage}
              alt="Model wearing an oversized all-black BRUTAL. outfit"
              width={1008}
              height={1264}
              className="relative z-10 w-full border-[3px] border-foreground object-cover brutal-shadow-lg"
            />
            <span className="absolute left-3 top-3 z-20 label-xs border-2 border-foreground bg-background px-2 py-1">
              NEW DROP
            </span>
            <span className="absolute bottom-6 left-[-10px] z-20 label-xs border-2 border-foreground bg-zap px-2 py-1">
              LIMITED
            </span>
            <span className="absolute right-4 top-8 z-20 label-xs border-2 border-foreground bg-foreground px-2 py-1 text-background">
              2026
            </span>
          </div>
        </div>
      </section>

      <Marquee />

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <SectionTitle kicker="FEATURED">
          The
          <br />
          drop.
        </SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/shop"
            search={{}}
            className="inline-flex items-center gap-2 border-[3px] border-foreground bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background press brutal-shadow"
          >
            View everything <ArrowUpRight width={18} height={18} strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y-[3px] border-foreground bg-muted">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <SectionTitle kicker="BROWSE">
            Pick a
            <br />
            lane.
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug }}
                className={
                  "group relative block overflow-hidden border-[3px] border-foreground bg-background brutal-shadow-sm transition-transform hover:-translate-y-1 " +
                  (i % 2 === 1 ? "lg:mt-8" : "")
                }
              >
                <img
                  src={c.image}
                  alt={`${c.title.replace("\n", "")} collection`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute right-3 top-3 h-8 w-8 border-2 border-foreground bg-zap"
                />
                <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 border-t-[3px] border-foreground bg-background p-3">
                  <span className="whitespace-pre-line font-display text-2xl font-black uppercase leading-[0.85]">
                    {c.title}
                  </span>
                  <span className="label-xs text-muted-foreground">{c.count} ITEMS</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-20">
        <h2 className="text-[clamp(2.5rem,8vw,5rem)]">
          Built
          <br />
          different.
        </h2>
        <div className="grid gap-4">
          {[
            [
              "SMALL RUNS",
              "Every piece is made in runs of 300 or fewer. When it's gone, it's gone.",
            ],
            ["HEAVY FABRIC", "Nothing under 280 GSM. Structure over softness, always."],
            ["NO LOGO NOISE", "Branding stays inside. The cut does the talking."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm"
            >
              <h3 className="text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={["FREE RETURNS", "COD AVAILABLE", "SHIPS IN 24H", "BRUTAL."]} invert />
    </>
  );
}
