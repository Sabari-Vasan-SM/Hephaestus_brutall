import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listStock = query({
  args: {
    filter: v.optional(v.string()), // "all" | "low" | "out" | "good"
  },
  handler: async (ctx, args) => {
    let prods = await ctx.db.query("products").collect();

    if (args.filter === "low") {
      prods = prods.filter((p) => p.stock > 0 && p.stock <= 10);
    } else if (args.filter === "out") {
      prods = prods.filter((p) => p.stock === 0);
    } else if (args.filter === "good") {
      prods = prods.filter((p) => p.stock > 10);
    }

    return prods.map((p) => ({
      ...p,
      id: p.customId || p._id,
      _convexId: p._id,
    }));
  },
});

export const listLogs = query({
  handler: async (ctx) => {
    const logs = await ctx.db.query("inventoryLogs").collect();
    // Sort newest first by creation / id
    logs.reverse();
    return logs.map((l) => ({
      ...l,
      id: l.logId || l._id,
      _convexId: l._id,
    }));
  },
});

export const updateStock = mutation({
  args: {
    productId: v.string(),
    newStock: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let prod = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.productId))
      .first();

    if (!prod) {
      try {
        prod = await ctx.db.get(args.productId as any);
      } catch {}
    }

    if (!prod) {
      throw new Error(`Product "${args.productId}" not found.`);
    }

    const currentStock = prod.stock;
    const nextStock = Math.max(0, args.newStock);
    const diff = nextStock - currentStock;

    if (diff === 0) return prod;

    const friendlyDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await ctx.db.patch(prod._id, { stock: nextStock });

    await ctx.db.insert("inventoryLogs", {
      logId: "inv-" + Math.random().toString(36).slice(2, 9),
      productId: prod.customId || prod._id,
      productName: prod.name,
      sku: prod.sku,
      type: diff > 0 ? "RESTOCK" : "ADJUSTMENT",
      qtyChange: diff,
      newStock: nextStock,
      date: friendlyDate,
      note: args.note || `Manual adjustment from ${currentStock} to ${nextStock}`,
    });

    const updated = await ctx.db.get(prod._id);
    return {
      ...updated!,
      id: updated!.customId || updated!._id,
      _convexId: updated!._id,
    };
  },
});

export const adjustStock = mutation({
  args: {
    productId: v.string(),
    delta: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let prod = await ctx.db
      .query("products")
      .withIndex("by_customId", (q) => q.eq("customId", args.productId))
      .first();

    if (!prod) {
      try {
        prod = await ctx.db.get(args.productId as any);
      } catch {}
    }

    if (!prod) {
      throw new Error(`Product "${args.productId}" not found.`);
    }

    const currentStock = prod.stock;
    const nextStock = Math.max(0, currentStock + args.delta);
    const actualDelta = nextStock - currentStock;

    if (actualDelta === 0) return prod;

    const friendlyDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await ctx.db.patch(prod._id, { stock: nextStock });

    await ctx.db.insert("inventoryLogs", {
      logId: "inv-" + Math.random().toString(36).slice(2, 9),
      productId: prod.customId || prod._id,
      productName: prod.name,
      sku: prod.sku,
      type: actualDelta > 0 ? "RESTOCK" : "ADJUSTMENT",
      qtyChange: actualDelta,
      newStock: nextStock,
      date: friendlyDate,
      note: args.note || `Quick stock adjustment (${actualDelta > 0 ? `+${actualDelta}` : actualDelta})`,
    });

    const updated = await ctx.db.get(prod._id);
    return {
      ...updated!,
      id: updated!.customId || updated!._id,
      _convexId: updated!._id,
    };
  },
});
