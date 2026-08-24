import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let orders = await ctx.db.query("orders").collect();

    if (args.status && args.status !== "ALL") {
      orders = orders.filter((o) => o.status === args.status);
    }

    if (args.search) {
      const q = args.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q)
      );
    }

    // Sort by newest first
    orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return orders.map((o) => ({
      ...o,
      id: o.orderNumber || o._id,
      _convexId: o._id,
    }));
  },
});

export const listByCustomer = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .collect();

    orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return orders.map((o) => ({
      ...o,
      id: o.orderNumber || o._id,
      _convexId: o._id,
    }));
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // 1. Try finding by orderNumber
    let order = await ctx.db
      .query("orders")
      .withIndex("by_orderNumber", (q) => q.eq("orderNumber", args.id))
      .first();

    if (!order) {
      try {
        order = await ctx.db.get(args.id as any);
      } catch {}
    }

    if (!order) return null;

    return {
      ...order,
      id: order.orderNumber || order._id,
      _convexId: order._id,
    };
  },
});

export const placeOrder = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        image: v.string(),
        size: v.string(),
        color: v.string(),
        qty: v.number(),
        price: v.number(),
        sku: v.string(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    discount: v.number(),
    couponCode: v.optional(v.string()),
    total: v.number(),
    paymentMethod: v.string(),
    paymentStatus: v.string(),
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
    delivery: v.string(),
    eta: v.string(),
  },
  handler: async (ctx, args) => {
    const randId = "BRT-" + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();
    const friendlyDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const initialTimeline = [
      {
        status: "PLACED",
        timestamp: friendlyDate,
        title: "ORDER PLACED & AUTHORIZED",
        note: `Payment verified via ${args.paymentMethod}. Tracking generated.`,
      },
    ];

    // 1. Insert Order
    const orderDocId = await ctx.db.insert("orders", {
      orderNumber: randId,
      date: now,
      customerName: args.customerName,
      email: args.email.toLowerCase().trim(),
      phone: args.phone,
      items: args.items,
      subtotal: args.subtotal,
      shipping: args.shipping,
      discount: args.discount,
      couponCode: args.couponCode,
      total: args.total,
      status: "PLACED",
      paymentMethod: args.paymentMethod,
      paymentStatus: args.paymentStatus,
      address: args.address,
      delivery: args.delivery,
      eta: args.eta,
      timeline: initialTimeline,
    });

    // 2. Decrement stock for ordered products & write inventory logs
    for (const item of args.items) {
      let prod = await ctx.db
        .query("products")
        .withIndex("by_customId", (q) => q.eq("customId", item.productId))
        .first();

      if (!prod) {
        try {
          prod = await ctx.db.get(item.productId as any);
        } catch {}
      }

      if (prod) {
        const nextStock = Math.max(0, prod.stock - item.qty);
        await ctx.db.patch(prod._id, { stock: nextStock });

        await ctx.db.insert("inventoryLogs", {
          logId: "inv-" + Math.random().toString(36).slice(2, 9),
          productId: prod.customId || prod._id,
          productName: prod.name,
          sku: prod.sku,
          type: "PURCHASE",
          qtyChange: -item.qty,
          newStock: nextStock,
          date: friendlyDate,
          note: `Order #${randId} placed by ${args.customerName}`,
        });
      }
    }

    // 3. Increment coupon usage count if applied
    if (args.couponCode) {
      const coupon = await ctx.db
        .query("coupons")
        .withIndex("by_code", (q) => q.eq("code", args.couponCode!.toUpperCase()))
        .first();

      if (coupon) {
        await ctx.db.patch(coupon._id, { usageCount: coupon.usageCount + 1 });
      }
    }

    const created = await ctx.db.get(orderDocId);
    return {
      ...created!,
      id: created!.orderNumber || created!._id,
      _convexId: created!._id,
    };
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let order = await ctx.db
      .query("orders")
      .withIndex("by_orderNumber", (q) => q.eq("orderNumber", args.orderId))
      .first();

    if (!order) {
      try {
        order = await ctx.db.get(args.orderId as any);
      } catch {}
    }

    if (!order) {
      throw new Error(`Order "${args.orderId}" not found.`);
    }

    const friendlyDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const statusTitles: Record<string, string> = {
      CONFIRMED: "ORDER CONFIRMED",
      PACKED: "PACKAGE PACKED & LABELED",
      SHIPPED: "HANDED OVER TO LOGISTICS",
      OUT_FOR_DELIVERY: "OUT FOR FINAL DELIVERY",
      DELIVERED: "PACKAGE DELIVERED",
      CANCELLED: "ORDER CANCELLED",
    };

    const newTimelineEvent = {
      status: args.status,
      timestamp: friendlyDate,
      title: statusTitles[args.status] || `STATUS UPDATED TO ${args.status}`,
      note: args.note || `Status progressed to ${args.status}.`,
    };

    let paymentStatus = order.paymentStatus;
    if (args.status === "DELIVERED" && order.paymentMethod === "COD") {
      paymentStatus = "PAID";
    } else if (args.status === "CANCELLED" && order.paymentStatus === "PAID") {
      paymentStatus = "REFUNDED";
    }

    await ctx.db.patch(order._id, {
      status: args.status,
      paymentStatus,
      timeline: [...order.timeline, newTimelineEvent],
    });

    const updated = await ctx.db.get(order._id);
    return {
      ...updated!,
      id: updated!.orderNumber || updated!._id,
      _convexId: updated!._id,
    };
  },
});

export const cancelOrder = mutation({
  args: {
    orderId: v.string(),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let order = await ctx.db
      .query("orders")
      .withIndex("by_orderNumber", (q) => q.eq("orderNumber", args.orderId))
      .first();

    if (!order) {
      try {
        order = await ctx.db.get(args.orderId as any);
      } catch {}
    }

    if (!order) {
      throw new Error(`Order "${args.orderId}" not found.`);
    }

    if (order.status === "DELIVERED" || order.status === "CANCELLED") {
      return false;
    }

    const friendlyDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. Restore product inventory stock & create audit logs
    for (const item of order.items) {
      let prod = await ctx.db
        .query("products")
        .withIndex("by_customId", (q) => q.eq("customId", item.productId))
        .first();

      if (!prod) {
        try {
          prod = await ctx.db.get(item.productId as any);
        } catch {}
      }

      if (prod) {
        const nextStock = prod.stock + item.qty;
        await ctx.db.patch(prod._id, { stock: nextStock });

        await ctx.db.insert("inventoryLogs", {
          logId: "inv-" + Math.random().toString(36).slice(2, 9),
          productId: prod.customId || prod._id,
          productName: prod.name,
          sku: prod.sku,
          type: "CANCEL_RESTORE",
          qtyChange: item.qty,
          newStock: nextStock,
          date: friendlyDate,
          note: `Restored ${item.qty} units from cancelled order #${order.orderNumber}`,
        });
      }
    }

    // 2. Update order status and record timeline event
    const cancelEvent = {
      status: "CANCELLED",
      timestamp: friendlyDate,
      title: "ORDER CANCELLED",
      note: args.reason || "Cancelled by customer request.",
    };

    await ctx.db.patch(order._id, {
      status: "CANCELLED",
      paymentStatus: order.paymentStatus === "PAID" ? "REFUNDED" : order.paymentStatus,
      timeline: [...order.timeline, cancelEvent],
    });

    return true;
  },
});

export const getMetrics = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    const products = await ctx.db.query("products").collect();
    const customers = await ctx.db.query("customers").collect();

    const activeOrders = orders.filter((o) => o.status !== "CANCELLED");
    const grossRevenue = activeOrders.reduce((sum, o) => sum + o.total, 0);
    const totalUnitsSold = activeOrders.reduce(
      (sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.qty, 0),
      0
    );
    const lowStockCount = products.filter((p) => p.stock <= 10).length;
    const pendingOrdersCount = orders.filter(
      (o) => o.status === "PLACED" || o.status === "CONFIRMED" || o.status === "PACKED"
    ).length;

    return {
      grossRevenue,
      totalOrders: orders.length,
      totalUnitsSold,
      lowStockCount,
      pendingOrdersCount,
      totalProducts: products.length,
      totalCustomers: customers.length,
    };
  },
});
