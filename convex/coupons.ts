import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const coupons = await ctx.db.query("coupons").collect();
    return coupons.map((c) => ({
      ...c,
      id: c.customId || c._id,
      _convexId: c._id,
    }));
  },
});

export const validate = query({
  args: {
    code: v.string(),
    subtotal: v.number(),
  },
  handler: async (ctx, args) => {
    const codeUpper = args.code.toUpperCase().trim();
    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", codeUpper))
      .first();

    if (!coupon) {
      return { valid: false, message: "Invalid coupon code." };
    }

    if (coupon.status !== "active") {
      return { valid: false, message: "This promo code has expired." };
    }

    if (args.subtotal < coupon.minOrder) {
      return {
        valid: false,
        message: `Minimum order amount of ₹${coupon.minOrder.toLocaleString("en-IN")} required.`,
      };
    }

    const discountAmount =
      coupon.type === "percent"
        ? Math.round((args.subtotal * coupon.value) / 100)
        : Math.min(coupon.value, args.subtotal);

    return {
      valid: true,
      coupon: {
        ...coupon,
        id: coupon.customId || coupon._id,
        _convexId: coupon._id,
      },
      discountAmount,
      message: `Coupon "${coupon.code}" applied!`,
    };
  },
});

export const create = mutation({
  args: {
    code: v.string(),
    type: v.union(v.literal("percent"), v.literal("flat")),
    value: v.number(),
    minOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const codeUpper = args.code.toUpperCase().trim();

    const existing = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", codeUpper))
      .first();

    if (existing) {
      throw new Error(`Coupon with code "${codeUpper}" already exists.`);
    }

    const customId = "cpn-" + Math.random().toString(36).slice(2, 9);
    const docId = await ctx.db.insert("coupons", {
      customId,
      code: codeUpper,
      type: args.type,
      value: args.value,
      minOrder: args.minOrder,
      status: "active",
      usageCount: 0,
    });

    const created = await ctx.db.get(docId);
    return {
      ...created!,
      id: created!.customId || created!._id,
      _convexId: created!._id,
    };
  },
});

export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", args.id.toUpperCase()))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.id as any);
      } catch {}
    }

    if (!doc) throw new Error("Coupon not found.");

    await ctx.db.delete(doc._id);
    return { success: true };
  },
});

export const toggleStatus = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", args.id.toUpperCase()))
      .first();

    if (!doc) {
      try {
        doc = await ctx.db.get(args.id as any);
      } catch {}
    }

    if (!doc) throw new Error("Coupon not found.");

    const nextStatus = doc.status === "active" ? "expired" : "active";
    await ctx.db.patch(doc._id, { status: nextStatus });
    return { status: nextStatus };
  },
});
