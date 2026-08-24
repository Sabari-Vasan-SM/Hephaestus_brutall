import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const emailNorm = args.email.toLowerCase().trim();

    // Check database admins table or fallback admin credentials
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", emailNorm))
      .first();

    if (admin) {
      if (admin.password === args.password) {
        return {
          ok: true,
          admin: {
            email: admin.email,
            name: admin.name,
            role: admin.role,
          },
        };
      }
      return { ok: false, message: "Invalid credentials." };
    }

    // Default Super Admin credential
    if (emailNorm === "admin@brutal.com" && args.password === "admin123") {
      return {
        ok: true,
        admin: {
          email: "admin@brutal.com",
          name: "Super Admin",
          role: "superadmin",
        },
      };
    }

    return { ok: false, message: "Admin account not found or password incorrect." };
  },
});

export const getSession = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emailNorm = args.email.toLowerCase().trim();
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", emailNorm))
      .first();

    if (!admin) {
      if (emailNorm === "admin@brutal.com") {
        return {
          email: "admin@brutal.com",
          name: "Super Admin",
          role: "superadmin",
        };
      }
      return null;
    }

    return {
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
  },
});
