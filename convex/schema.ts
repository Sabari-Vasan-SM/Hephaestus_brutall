import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. Product Catalog
  products: defineTable({
    customId: v.string(),
    name: v.string(),
    brand: v.string(),
    sku: v.string(),
    category: v.string(),
    categoryLabel: v.string(),
    subcategory: v.string(),
    subtitle: v.string(),
    price: v.number(),
    compareAt: v.optional(v.number()),
    rating: v.number(),
    reviewCount: v.number(),
    image: v.string(),
    gallery: v.array(v.string()),
    badges: v.array(v.string()),
    sizes: v.array(v.string()),
    colors: v.array(v.string()),
    description: v.string(),
    shortDescription: v.string(),
    materials: v.array(v.string()),
    reviews: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        rating: v.number(),
        date: v.string(),
        body: v.string(),
      })
    ),
    stock: v.number(),
    status: v.union(v.literal("active"), v.literal("draft")),
    featured: v.boolean(),
    trending: v.boolean(),
    newArrival: v.boolean(),
    createdAt: v.string(),
  })
    .index("by_customId", ["customId"])
    .index("by_sku", ["sku"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"])
    .index("by_trending", ["trending"])
    .index("by_brand", ["brand"]),

  // 2. Orders Pipeline
  orders: defineTable({
    orderNumber: v.string(),
    date: v.string(),
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
    status: v.string(), // "PLACED" | "CONFIRMED" | "PACKED" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" | "RETURNED"
    paymentMethod: v.string(), // "CARD" | "UPI" | "COD" | "DEMO"
    paymentStatus: v.string(), // "PAID" | "PENDING" | "REFUNDED"
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
    timeline: v.array(
      v.object({
        status: v.string(),
        timestamp: v.string(),
        title: v.string(),
        note: v.optional(v.string()),
      })
    ),
  })
    .index("by_orderNumber", ["orderNumber"])
    .index("by_email", ["email"])
    .index("by_status", ["status"]),

  // 3. Inventory Stock Audit Logs
  inventoryLogs: defineTable({
    logId: v.string(),
    productId: v.string(),
    productName: v.string(),
    sku: v.string(),
    type: v.string(), // "PURCHASE" | "RESTOCK" | "ADJUSTMENT" | "CANCEL_RESTORE"
    qtyChange: v.number(),
    newStock: v.number(),
    date: v.string(),
    note: v.string(),
  })
    .index("by_productId", ["productId"])
    .index("by_sku", ["sku"])
    .index("by_date", ["date"]),

  // 4. Customers & Profiles
  customers: defineTable({
    customId: v.string(),
    name: v.string(),
    email: v.string(),
    password: v.optional(v.string()),
    phone: v.string(),
    addresses: v.array(
      v.object({
        id: v.optional(v.string()),
        fullName: v.string(),
        phone: v.optional(v.string()),
        address: v.string(),
        city: v.string(),
        state: v.string(),
        postalCode: v.string(),
        country: v.string(),
        isDefault: v.optional(v.boolean()),
      })
    ),
    defaultAddressIndex: v.number(),
    createdAt: v.string(),
  }).index("by_email", ["email"]),

  // 5. Discount Coupons & Promo Engine
  coupons: defineTable({
    customId: v.string(),
    code: v.string(),
    type: v.union(v.literal("percent"), v.literal("flat")),
    value: v.number(),
    minOrder: v.number(),
    status: v.union(v.literal("active"), v.literal("expired")),
    usageCount: v.number(),
  }).index("by_code", ["code"]),

  // 6. Dynamic Taxonomy & Dropdowns
  taxonomy: defineTable({
    key: v.string(),
    brands: v.array(v.string()),
    categories: v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        image: v.string(),
        desc: v.optional(v.string()),
        count: v.optional(v.number()),
      })
    ),
    categoryLabels: v.array(v.string()),
    subtitlePresets: v.array(v.string()),
    badges: v.array(v.string()),
  }).index("by_key", ["key"]),

  // 7. Visual CMS Page Editor
  homeConfig: defineTable({
    key: v.string(),
    hero: v.object({
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
    }),
    marqueeTop: v.array(v.string()),
    marqueeBottom: v.array(v.string()),
    featuredTitle: v.string(),
    featuredKicker: v.string(),
    trendingTitle: v.string(),
    trendingKicker: v.string(),
    manifestoHeading: v.string(),
    manifestoPillars: v.array(
      v.object({
        title: v.string(),
        desc: v.string(),
      })
    ),
    footer: v.object({
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
    }),
  }).index("by_key", ["key"]),

  // 8. Global Store Settings
  storeSettings: defineTable({
    key: v.string(),
    storeName: v.string(),
    tagline: v.string(),
    announcement: v.string(),
    announcementActive: v.boolean(),
    freeShippingThreshold: v.number(),
    standardShippingFee: v.number(),
    expressShippingFee: v.number(),
    supportEmail: v.string(),
    supportPhone: v.string(),
    currency: v.string(),
  }).index("by_key", ["key"]),

  // 9. Admin Credentials
  admins: defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(),
    role: v.literal("superadmin"),
  }).index("by_email", ["email"]),
});
