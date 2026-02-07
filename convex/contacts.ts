import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a contact form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      status: "new",
    });
    return id;
  },
});

// Update contact submission status
export const updateStatus = mutation({
  args: {
    id: v.id("contactSubmissions"),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("replied"),
      v.literal("archived")
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = { status: args.status };
    if (args.status === "replied") {
      updates.repliedAt = Date.now();
    }
    if (args.notes !== undefined) {
      updates.notes = args.notes;
    }
    await ctx.db.patch(args.id, updates);
  },
});

// Get all contact submissions
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .collect();
  },
});

// Get contact submissions by status
export const listByStatus = query({
  args: {
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("replied"),
      v.literal("archived")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Get new submissions count
export const getNewCount = query({
  args: {},
  handler: async (ctx) => {
    const newSubmissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", "new"))
      .collect();
    return newSubmissions.length;
  },
});
