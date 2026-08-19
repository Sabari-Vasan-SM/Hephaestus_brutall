import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Flame, Sparkles, ShieldCheck, Zap } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/brutal";
import { categories } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRUTAL. — Heavyweight Streetwear & Limited Drops" },
      {
        name: "description",
        content:
          "Heavyweight streetwear built in limited runs. Shop the new drop from BRUTAL. — oversized tees, cargos, hoodies, sneakers and accessories.",
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
  const { activeProducts, state, categories, homeConfig } = useStore();

  const featured = activeProducts.filter((p) => p.featured).slice(0, 8);
  const trending = activeProducts.filter((p) => p.trending).slice(0, 4);
  const newArrivals = activeProducts.filter((p) => p.newArrival).slice(0, 4);

  const hero = homeConfig.hero;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b-[3px] border-foreground grid-paper">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-6 lg:px-10 lg:py-20">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              {hero.badge1 && (
                <span className="label-xs inline-block border-[3px] border-foreground bg-zap px-3 py-2">
                  {hero.badge1}
                </span>
              )}
              {hero.badge2 && (
                <span className="label-xs inline-block border-[2px] border-foreground bg-flare text-white px-2 py-1">
                  {activeProducts.length} {hero.badge2}
                </span>
              )}
            </div>
            <h1 className="mt-6 text-[clamp(3.2rem,13vw,7.5rem)] leading-[0.88] tracking-tight">
              {hero.headingLine1}
              <br />
              {hero.headingLine2}
              <br />
              <span className="bg-foreground px-3 text-background">{hero.headingHighlight}</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={hero.ctaPrimaryLink || "/shop"}
                search={{ sort: "new" }}
                className="inline-flex items-center gap-2 border-[3px] border-foreground bg-flare px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white press brutal-shadow"
              >
                {hero.ctaPrimaryText} <ArrowRight width={18} height={18} strokeWidth={3} />
              </Link>
              <Link
                to={hero.ctaSecondaryLink || "/shop"}
                search={{}}
                className="inline-flex items-center gap-2 border-[3px] border-foreground bg-background px-6 py-4 text-sm font-black uppercase tracking-[0.08em] press brutal-shadow"
              >
                {hero.ctaSecondaryText}
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-3">
              {hero.stats.map((s, idx) => (
                <div key={idx} className="border-[3px] border-foreground bg-background p-3 brutal-shadow-sm">
                  <dt className="font-display text-2xl font-black">{s.value}</dt>
                  <dd className="label-xs mt-1 text-muted-foreground">{s.label}</dd>
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
              src={hero.image || heroImage}
              alt="Hero Showcase"
              width={1008}
              height={1264}
              className="relative z-10 w-full border-[3px] border-foreground object-cover brutal-shadow-lg"
            />
            {hero.sticker1 && (
              <span className="absolute left-3 top-3 z-20 label-xs border-2 border-foreground bg-background px-2 py-1 font-black">
                {hero.sticker1}
              </span>
            )}
            {hero.sticker2 && (
              <span className="absolute bottom-6 left-[-10px] z-20 label-xs border-2 border-foreground bg-zap px-2 py-1 font-black">
                {hero.sticker2}
              </span>
            )}
            {hero.sticker3 && (
              <span className="absolute right-4 top-8 z-20 label-xs border-2 border-foreground bg-foreground px-2 py-1 text-background font-black">
                {hero.sticker3}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* TOP SCROLLING MARQUEE */}
      <Marquee items={homeConfig.marqueeTop} />

      {/* FLASH PROMO BANNER */}
      {state.settings.announcementActive && (
        <section className="border-b-[3px] border-foreground bg-zap py-4 px-4">
          <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-foreground shrink-0 fill-foreground" />
              <p className="font-display text-sm sm:text-base font-black uppercase tracking-tight">
                {state.settings.announcement}
              </p>
            </div>
            <Link
              to="/shop"
              className="label-xs border-[2px] border-foreground bg-foreground text-background px-4 py-2 font-black uppercase press hover:bg-background hover:text-foreground whitespace-nowrap"
            >
              REDEEM CODE NOW →
            </Link>
          </div>
        </section>
      )}

      {/* FEATURED DROPS */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionTitle kicker={homeConfig.featuredKicker}>
            {homeConfig.featuredTitle}
          </SectionTitle>
          <Link
            to="/shop"
            search={{}}
            className="label-xs flex items-center gap-1.5 border-[2px] border-foreground bg-background px-4 py-2 font-black press hover:bg-zap"
          >
            <span>VIEW ALL {activeProducts.length} PIECES</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRENDING RADAR SECTION */}
      {trending.length > 0 && (
        <section className="border-t-[3px] border-foreground bg-[#111111] text-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between border-b-[2px] border-zinc-800 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="border-[2px] border-flare bg-flare p-1.5 text-white">
                  <Flame className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <span className="label-xs text-flare block font-black">{homeConfig.trendingKicker}</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {homeConfig.trendingTitle}
                  </h2>
                </div>
              </div>
              <Link
                to="/shop"
                search={{ sort: "rating" }}
                className="label-xs text-zinc-400 hover:text-zap underline hidden sm:block"
              >
                BROWSE TOP RATED →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {trending.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES GRID */}
      <section className="border-y-[3px] border-foreground bg-smoke/70">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <SectionTitle kicker="COLLECTIONS">
            Pick a
            <br />
            lane.
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c, i) => {
              const count = activeProducts.filter((p) => p.category === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  to="/shop"
                  search={{ category: c.slug }}
                  className={
                    "group relative block overflow-hidden border-[3px] border-foreground bg-background brutal-shadow-sm transition-transform hover:-translate-y-1 " +
                    (i % 2 === 1 ? "lg:mt-4" : "")
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
                    className="absolute right-3 top-3 h-6 w-6 border-2 border-foreground bg-zap"
                  />
                  <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 border-t-[3px] border-foreground bg-background p-3">
                    <span className="whitespace-pre-line font-display text-xl font-black uppercase leading-[0.85]">
                      {c.title}
                    </span>
                    <span className="label-xs text-muted-foreground">{count} ITEMS</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND MANIFESTO */}
      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-20">
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] font-black uppercase font-display whitespace-pre-line">
          {homeConfig.manifestoHeading}
        </h2>
        <div className="grid gap-4">
          {homeConfig.manifestoPillars.map((p, idx) => (
            <div
              key={idx}
              className="border-[3px] border-foreground bg-background p-5 brutal-shadow-sm"
            >
              <h3 className="font-display text-lg font-black uppercase">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM SCROLLING MARQUEE */}
      <Marquee items={homeConfig.marqueeBottom} invert />
    </>
  );
}

