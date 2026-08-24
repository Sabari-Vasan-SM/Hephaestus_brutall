import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    return doc;
  },
});

export const addBrand = mutation({
  args: { brand: v.string() },
  handler: async (ctx, args) => {
    const brandName = args.brand.trim().toUpperCase();
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    if (!doc.brands.includes(brandName)) {
      await ctx.db.patch(doc._id, {
        brands: [...doc.brands, brandName],
      });
    }
    return { brands: [...doc.brands, brandName] };
  },
});

export const deleteBrand = mutation({
  args: { brand: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const filtered = doc.brands.filter((b) => b !== args.brand);
    await ctx.db.patch(doc._id, { brands: filtered });
    return { brands: filtered };
  },
});

export const addCategory = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    image: v.string(),
    desc: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const newCat = {
      slug: args.slug.toLowerCase().trim(),
      title: args.title.trim(),
      image: args.image.trim(),
      desc: args.desc,
      count: 0,
    };

    const categories = [...doc.categories.filter((c) => c.slug !== newCat.slug), newCat];
    await ctx.db.patch(doc._id, { categories });
    return { categories };
  },
});

export const deleteCategory = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const filtered = doc.categories.filter((c) => c.slug !== args.slug);
    await ctx.db.patch(doc._id, { categories: filtered });
    return { categories: filtered };
  },
});

export const addCategoryLabel = mutation({
  args: { label: v.string() },
  handler: async (ctx, args) => {
    const label = args.label.trim().toUpperCase();
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    if (!doc.categoryLabels.includes(label)) {
      const updated = [...doc.categoryLabels, label];
      await ctx.db.patch(doc._id, { categoryLabels: updated });
    }
    return { success: true };
  },
});

export const deleteCategoryLabel = mutation({
  args: { label: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const filtered = doc.categoryLabels.filter((l) => l !== args.label);
    await ctx.db.patch(doc._id, { categoryLabels: filtered });
    return { success: true };
  },
});

export const addSubtitlePreset = mutation({
  args: { subtitle: v.string() },
  handler: async (ctx, args) => {
    const subtitle = args.subtitle.trim();
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    if (!doc.subtitlePresets.includes(subtitle)) {
      const updated = [...doc.subtitlePresets, subtitle];
      await ctx.db.patch(doc._id, { subtitlePresets: updated });
    }
    return { success: true };
  },
});

export const deleteSubtitlePreset = mutation({
  args: { subtitle: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const filtered = doc.subtitlePresets.filter((s) => s !== args.subtitle);
    await ctx.db.patch(doc._id, { subtitlePresets: filtered });
    return { success: true };
  },
});

export const addBadge = mutation({
  args: { badge: v.string() },
  handler: async (ctx, args) => {
    const badge = args.badge.trim().toUpperCase();
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    if (!doc.badges.includes(badge)) {
      const updated = [...doc.badges, badge];
      await ctx.db.patch(doc._id, { badges: updated });
    }
    return { success: true };
  },
});

export const deleteBadge = mutation({
  args: { badge: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("taxonomy")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) return;

    const filtered = doc.badges.filter((b) => b !== args.badge);
    await ctx.db.patch(doc._id, { badges: filtered });
    return { success: true };
  },
});
