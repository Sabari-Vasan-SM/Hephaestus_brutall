import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    category: v.optional(v.string()),
    brand: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let prods = await ctx.db.query("products").collect();

    if (args.status && args.status !== "all") {
      prods = prods.filter((p) => p.status === args.status);
    }
    if (args.category && args.category !== "all") {
      prods = prods.filter((p) => p.category === args.category);
    }
    if (args.brand && args.brand !== "all") {
      prods = prods.filter((p) => p.brand === args.brand);
    }
    if (args.search) {
      const q = args.search.toLowerCase();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    return prods.map((p) => ({
      ...p,
      id: p.customId || p._id,
      _convexId: p._id,
    }));
  },
});

export const listActive = query({
  handler: async (ctx) => {
    const prods = await ctx.db
      .query("products")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    return prods.map((p) => ({
      ...p,
      id: p.customId || p._id,
      _convexId: p._id,
    }));
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // 1. Try finding by customId
    const byCustomId = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.id))
      .first();

    if (byCustomId) {
      return {
        ...byCustomId,
        id: byCustomId.customId || byCustomId._id,
        _convexId: byCustomId._id,
      };
    }

    // 2. Try finding by _id
    try {
      const byId = await ctx.db.get(args.id as any);
      if (byId) {
        return {
          ...byId,
          id: byId.customId || byId._id,
          _convexId: byId._id,
        };
      }
    } catch {
      // not a valid convex ID
    }

    return null;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    brand: v.string(),
    sku: v.string(),
    category: v.string(),
    categoryLabel: v.string(),
    subcategory: v.string(),
    subtitle: v.string(),
    price: v.number(),
    compareAt: v.optional(v.number()),
    stock: v.number(),
    image: v.string(),
    gallery: v.array(v.string()),
    badges: v.array(v.string()),
    sizes: v.array(v.string()),
    colors: v.array(v.string()),
    description: v.string(),
    shortDescription: v.string(),
    materials: v.array(v.string()),
    status: v.union(v.literal("active"), v.literal("draft")),
    featured: v.boolean(),
    trending: v.boolean(),
    newArrival: v.boolean(),
  },
  handler: async (ctx, args) => {
    const customId =
      args.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Math.floor(100 + Math.random() * 900);

    const docId = await ctx.db.insert("products", {
      ...args,
      customId,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
    });

    const created = await ctx.db.get(docId);
    return {
      ...created!,
      id: created!.customId || created!._id,
      _convexId: created!._id,
    };
  },
});

export const update = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    brand: v.optional(v.string()),
    sku: v.optional(v.string()),
    category: v.optional(v.string()),
    categoryLabel: v.optional(v.string()),
    subcategory: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    price: v.optional(v.number()),
    compareAt: v.optional(v.number()),
    stock: v.optional(v.number()),
    image: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    badges: v.optional(v.array(v.string())),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    materials: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("active"), v.literal("draft"))),
    featured: v.optional(v.boolean()),
    trending: v.optional(v.boolean()),
    newArrival: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Find document by customId or _id
    let doc = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", id))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(id as any);
      } catch {
        // invalid ID
      }
    }

    if (!doc) {
      throw new Error(`Product with ID "${id}" not found.`);
    }

    await ctx.db.patch(doc._id, updates);
    const updated = await ctx.db.get(doc._id);
    return {
      ...updated!,
      id: updated!.customId || updated!._id,
      _convexId: updated!._id,
    };
  },
});

export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.id))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.id as any);
      } catch {
        // invalid ID
      }
    }

    if (!doc) {
      throw new Error(`Product with ID "${args.id}" not found.`);
    }

    await ctx.db.delete(doc._id);
    return { success: true };
  },
});

export const duplicate = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.id))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.id as any);
      } catch {}
    }

    if (!doc) {
      throw new Error(`Product with ID "${args.id}" not found.`);
    }

    const { _id, _creationTime, ...data } = doc;
    const rand = Math.floor(100 + Math.random() * 900);
    const newDocId = await ctx.db.insert("products", {
      ...data,
      name: `${data.name} (Copy)`,
      sku: `${data.sku}-COPY-${rand}`,
      customId: `${data.customId}-copy-${rand}`,
      status: "draft",
      createdAt: new Date().toISOString(),
    });

    const newDoc = await ctx.db.get(newDocId);
    return {
      ...newDoc!,
      id: newDoc!.customId || newDoc!._id,
      _convexId: newDoc!._id,
    };
  },
});

export const toggleStatus = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.id))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.id as any);
      } catch {}
    }

    if (!doc) {
      throw new Error(`Product with ID "${args.id}" not found.`);
    }

    const nextStatus = doc.status === "active" ? "draft" : "active";
    await ctx.db.patch(doc._id, { status: nextStatus });
    return { status: nextStatus };
  },
});

export const addReview = mutation({
  args: {
    productId: v.string(),
    name: v.string(),
    rating: v.number(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.productId))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.productId as any);
      } catch {}
    }

    if (!doc) {
      throw new Error(`Product with ID "${args.productId}" not found.`);
    }

    const newReview = {
      id: "rev-" + Math.random().toString(36).slice(2, 9),
      name: args.name.trim() || "Verified Buyer",
      rating: Math.max(1, Math.min(5, args.rating)),
      date: new Date().toISOString().split("T")[0]!,
      body: args.body.trim(),
    };

    const reviews = [...doc.reviews, newReview];
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalRating / reviews.length).toFixed(1));

    await ctx.db.patch(doc._id, {
      reviews,
      rating: avgRating,
      reviewCount: reviews.length,
    });

    return newReview;
  },
});
