import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Subscribe to newsletter
export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already subscribed
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      // Reactivate if unsubscribed
      if (!existing.isActive) {
        await ctx.db.patch(existing._id, {
          isActive: true,
          unsubscribedAt: undefined,
          subscribedAt: Date.now(),
        });
      }
      return existing._id;
    }

    // Create new subscriber
    const id = await ctx.db.insert("subscribers", {
      email: args.email,
      name: args.name,
      source: args.source,
      subscribedAt: Date.now(),
      isActive: true,
    });
    return id;
  },
});

// Unsubscribe from newsletter
export const unsubscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (subscriber) {
      await ctx.db.patch(subscriber._id, {
        isActive: false,
        unsubscribedAt: Date.now(),
      });
    }
  },
});

// Get all active subscribers
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("subscribers")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
  },
});

// Get subscriber count
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const active = await ctx.db
      .query("subscribers")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
    return active.length;
  },
});

// Check if email is subscribed
export const isSubscribed = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return subscriber?.isActive ?? false;
  },
});
