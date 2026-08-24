import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const defaultHero = {
  badge1: "DROP 04 / SS26",
  badge2: "PIECES LIVE",
  headingLine1: "New",
  headingLine2: "Season.",
  headingHighlight: "No rules.",
  description:
    "Independent streetwear engineered with heavy GSM fabrics and architectural silhouettes. Built to outlive fast fashion trends.",
  ctaPrimaryText: "SHOP NEW DROP",
  ctaPrimaryLink: "/shop",
  ctaSecondaryText: "EXPLORE ALL PIECES",
  ctaSecondaryLink: "/shop",
  stats: [
    { value: "300", label: "UNITS / DROP" },
    { value: "4.8★", label: "CLIENT RATING" },
    { value: "24-48H", label: "FAST DISPATCH" },
  ],
  image: "",
  sticker1: "LIMITED RUN",
  sticker2: "RAW 280-450 GSM",
  sticker3: "SS26 ARCHIVE",
};

const defaultMarqueeTop = [
  "ARCHITECTURAL SILHOUETTES",
  "GARMENT DYED",
  "YKK HARDWARE",
  "ZERO FAST FASHION",
  "BRUTAL. LABS",
];

const defaultMarqueeBottom = [
  "FREE RETURNS",
  "COD ACCEPTED",
  "FAST EXPRESS DISPATCH",
  "100% SECURE CHECKOUT",
];

const defaultPillars = [
  {
    title: "LIMITED PRODUCTION RUNS",
    desc: "Every single silhouette is crafted in runs of 300 or fewer units worldwide. Once archived, pieces never return.",
  },
  {
    title: "HEAVYWEIGHT TEXTILES",
    desc: "Nothing below 280 GSM. Custom loopback terry, 18oz duck canvas, and rigid Japanese denim.",
  },
  {
    title: "STRUCTURAL MINIMALISM",
    desc: "Zero loud exterior branding. The boxy drape and industrial finish define the piece.",
  },
];

const defaultFooter = {
  tagline: "We make\neveryday\nobjects\nless boring.",
  socials: [
    { label: "INSTAGRAM", url: "https://instagram.com" },
    { label: "X", url: "https://x.com" },
    { label: "TIKTOK", url: "https://tiktok.com" },
  ],
  copyright: "© 2026 BRUTAL. ALL RIGHTS RESERVED. BUILT DIFFERENT.",
  newsletterTitle: "Get the drop.",
  newsletterText: "Secret promo drops 2h before public release.",
};

export const get = query({
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("homeConfig")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    return doc;
  },
});

export const update = mutation({
  args: {
    hero: v.optional(
      v.object({
        badge1: v.string(),
        badge2: v.string(),
        headingLine1: v.string(),
        headingLine2: v.string(),
        headingHighlight: v.string(),
        description: v.string(),
        ctaPrimaryText: v.string(),
        ctaPrimaryLink: v.string(),
        ctaSecondaryText: v.string(),
        ctaSecondaryLink: v.string(),
        stats: v.array(
          v.object({
            value: v.string(),
            label: v.string(),
          })
        ),
        image: v.string(),
        sticker1: v.string(),
        sticker2: v.string(),
        sticker3: v.string(),
      })
    ),
    marqueeTop: v.optional(v.array(v.string())),
    marqueeBottom: v.optional(v.array(v.string())),
    featuredTitle: v.optional(v.string()),
    featuredKicker: v.optional(v.string()),
    trendingTitle: v.optional(v.string()),
    trendingKicker: v.optional(v.string()),
    manifestoHeading: v.optional(v.string()),
    manifestoPillars: v.optional(
      v.array(
        v.object({
          title: v.string(),
          desc: v.string(),
        })
      )
    ),
    footer: v.optional(
      v.object({
        tagline: v.string(),
        socials: v.array(
          v.object({
            label: v.string(),
            url: v.string(),
          })
        ),
        copyright: v.string(),
        newsletterTitle: v.string(),
        newsletterText: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("homeConfig")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) {
      await ctx.db.insert("homeConfig", {
        key: "default",
        hero: args.hero || defaultHero,
        marqueeTop: args.marqueeTop || defaultMarqueeTop,
        marqueeBottom: args.marqueeBottom || defaultMarqueeBottom,
        featuredTitle: args.featuredTitle || "The\ndrop.",
        featuredKicker: args.featuredKicker || "FEATURED PICKS",
        trendingTitle: args.trendingTitle || "TRENDING RIGHT NOW",
        trendingKicker: args.trendingKicker || "HIGH DEMAND",
        manifestoHeading: args.manifestoHeading || "Built\ndifferent.",
        manifestoPillars: args.manifestoPillars || defaultPillars,
        footer: args.footer || defaultFooter,
      });
    } else {
      await ctx.db.patch(doc._id, args);
    }

    return { success: true };
  },
});

export const reset = mutation({
  handler: async (ctx) => {
    let doc = await ctx.db
      .query("homeConfig")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    const defaults = {
      key: "default",
      hero: defaultHero,
      marqueeTop: defaultMarqueeTop,
      marqueeBottom: defaultMarqueeBottom,
      featuredTitle: "The\ndrop.",
      featuredKicker: "FEATURED PICKS",
      trendingTitle: "TRENDING RIGHT NOW",
      trendingKicker: "HIGH DEMAND",
      manifestoHeading: "Built\ndifferent.",
      manifestoPillars: defaultPillars,
      footer: defaultFooter,
    };

    if (doc) {
      await ctx.db.patch(doc._id, defaults);
    } else {
      await ctx.db.insert("homeConfig", defaults);
    }

    return { success: true };
  },
});
