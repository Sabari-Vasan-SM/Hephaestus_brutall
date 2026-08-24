import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const customers = await ctx.db.query("customers").collect();
    const orders = await ctx.db.query("orders").collect();

    return customers.map((c) => {
      const userOrders = orders.filter(
        (o) => o.email.toLowerCase() === c.email.toLowerCase() && o.status !== "CANCELLED"
      );
      const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

      return {
        ...c,
        id: c.customId || c._id,
        _convexId: c._id,
        ordersCount: userOrders.length,
        totalSpent,
      };
    });
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const customer = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();

    if (!customer) return null;

    const { password, ...safeCustomer } = customer;
    return {
      ...safeCustomer,
      id: customer.customId || customer._id,
      _convexId: customer._id,
    };
  },
});

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const customId = "cust-" + Math.random().toString(36).slice(2, 9);
    const now = new Date().toISOString();

    const defaultAddress = {
      id: "addr-1",
      fullName: args.name,
      phone: args.phone || "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: true,
    };

    const docId = await ctx.db.insert("customers", {
      customId,
      name: args.name.trim(),
      email: normalizedEmail,
      password: args.password,
      phone: args.phone || "",
      addresses: [defaultAddress],
      defaultAddressIndex: 0,
      createdAt: now,
    });

    const user = await ctx.db.get(docId);
    const { password, ...safeUser } = user!;
    return {
      ...safeUser,
      id: safeUser.customId || safeUser._id,
      _convexId: safeUser._id,
    };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    const user = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!user || user.password !== args.password) {
      throw new Error("Invalid email or password.");
    }

    const { password, ...safeUser } = user;
    return {
      ...safeUser,
      id: safeUser.customId || safeUser._id,
      _convexId: safeUser._id,
    };
  },
});

export const updateProfile = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    const user = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!user) {
      throw new Error("Customer profile not found.");
    }

    await ctx.db.patch(user._id, {
      name: args.name.trim(),
      phone: args.phone.trim(),
    });

    const updated = await ctx.db.get(user._id);
    const { password, ...safeUser } = updated!;
    return {
      ...safeUser,
      id: safeUser.customId || safeUser._id,
      _convexId: safeUser._id,
    };
  },
});

export const addAddress = mutation({
  args: {
    email: v.string(),
    address: v.object({
      id: v.optional(v.string()),
      fullName: v.string(),
      phone: v.optional(v.string()),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      isDefault: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();

    if (!user) throw new Error("Customer profile not found.");

    const newAddr = {
      ...args.address,
      id: args.address.id || "addr-" + Math.random().toString(36).slice(2, 9),
    };

    const addresses = [...user.addresses, newAddr];
    let defaultAddressIndex = user.defaultAddressIndex;

    if (args.address.isDefault) {
      defaultAddressIndex = addresses.length - 1;
    }

    await ctx.db.patch(user._id, {
      addresses,
      defaultAddressIndex,
    });

    return { addresses, defaultAddressIndex };
  },
});

export const deleteAddress = mutation({
  args: {
    email: v.string(),
    addressIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();

    if (!user) throw new Error("Customer profile not found.");

    const addresses = user.addresses.filter((_, i) => i !== args.addressIndex);
    let defaultAddressIndex = user.defaultAddressIndex;
    if (defaultAddressIndex >= addresses.length) {
      defaultAddressIndex = Math.max(0, addresses.length - 1);
    }

    await ctx.db.patch(user._id, {
      addresses,
      defaultAddressIndex,
    });

    return { addresses, defaultAddressIndex };
  },
});

export const setDefaultAddress = mutation({
  args: {
    email: v.string(),
    addressIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();

    if (!user) throw new Error("Customer profile not found.");

    await ctx.db.patch(user._id, {
      defaultAddressIndex: args.addressIndex,
    });

    return { defaultAddressIndex: args.addressIndex };
  },
});
