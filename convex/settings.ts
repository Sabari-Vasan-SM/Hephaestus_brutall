import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import {
  seedProducts,
  seedTaxonomy,
  seedCoupons,
  seedDemoCustomers,
  seedDemoOrders,
} from "./seedData";

const defaultSettings = {
  key: "default",
  storeName: "BRUTAL.",
  tagline: "Streetwear With No Rules",
  announcement: "FREE DOMESTIC SHIPPING OVER ₹4,999 • USE CODE 'BRUTAL10' FOR 10% OFF",
  announcementActive: true,
  freeShippingThreshold: 4999,
  standardShippingFee: 199,
  expressShippingFee: 399,
  supportEmail: "support@brutal.com",
  supportPhone: "+91 80 4920 1820",
  currency: "INR",
};

export const get = query({
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("storeSettings")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    return doc || defaultSettings;
  },
});

export const update = mutation({
  args: {
    storeName: v.optional(v.string()),
    tagline: v.optional(v.string()),
    announcement: v.optional(v.string()),
    announcementActive: v.optional(v.boolean()),
    freeShippingThreshold: v.optional(v.number()),
    standardShippingFee: v.optional(v.number()),
    expressShippingFee: v.optional(v.number()),
    supportEmail: v.optional(v.string()),
    supportPhone: v.optional(v.string()),
    currency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let doc = await ctx.db
      .query("storeSettings")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!doc) {
      await ctx.db.insert("storeSettings", {
        ...defaultSettings,
        ...args,
      });
    } else {
      await ctx.db.patch(doc._id, args);
    }

    return { success: true };
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    // Check if products exist
    const existing = await ctx.db.query("products").first();
    if (existing) {
      return { status: "already_seeded" };
    }

    // 1. Seed Products
    for (const prod of seedProducts) {
      await ctx.db.insert("products", prod);
    }

    // 2. Seed Taxonomy
    const tax = await ctx.db.query("taxonomy").first();
    if (!tax) {
      await ctx.db.insert("taxonomy", seedTaxonomy);
    }

    // 3. Seed Coupons
    for (const cpn of seedCoupons) {
      await ctx.db.insert("coupons", cpn);
    }

    // 4. Seed Demo Customers
    for (const cust of seedDemoCustomers) {
      await ctx.db.insert("customers", cust);
    }

    // 5. Seed Demo Orders
    for (const ord of seedDemoOrders) {
      await ctx.db.insert("orders", ord);
    }

    // 6. Seed Settings
    const setDoc = await ctx.db.query("storeSettings").first();
    if (!setDoc) {
      await ctx.db.insert("storeSettings", defaultSettings);
    }

    // 7. Seed Admin
    const adminDoc = await ctx.db.query("admins").first();
    if (!adminDoc) {
      await ctx.db.insert("admins", {
        email: "admin@brutal.com",
        name: "Super Admin",
        password: "admin123",
        role: "superadmin",
      });
    }

    return { status: "seeded_successfully" };
  },
});

export const resetToDemoData = mutation({
  handler: async (ctx) => {
    // Delete existing records
    const allProducts = await ctx.db.query("products").collect();
    for (const p of allProducts) await ctx.db.delete(p._id);

    const allOrders = await ctx.db.query("orders").collect();
    for (const o of allOrders) await ctx.db.delete(o._id);

    const allLogs = await ctx.db.query("inventoryLogs").collect();
    for (const l of allLogs) await ctx.db.delete(l._id);

    const allCoupons = await ctx.db.query("coupons").collect();
    for (const c of allCoupons) await ctx.db.delete(c._id);

    const allTax = await ctx.db.query("taxonomy").collect();
    for (const t of allTax) await ctx.db.delete(t._id);

    const allSettings = await ctx.db.query("storeSettings").collect();
    for (const s of allSettings) await ctx.db.delete(s._id);

    const allHome = await ctx.db.query("homeConfig").collect();
    for (const h of allHome) await ctx.db.delete(h._id);

    // Re-seed fresh data
    for (const prod of seedProducts) {
      await ctx.db.insert("products", prod);
    }

    await ctx.db.insert("taxonomy", seedTaxonomy);

    for (const cpn of seedCoupons) {
      await ctx.db.insert("coupons", cpn);
    }

    for (const ord of seedDemoOrders) {
      await ctx.db.insert("orders", ord);
    }

    await ctx.db.insert("storeSettings", defaultSettings);

    return { success: true };
  },
});
