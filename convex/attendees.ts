import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new attendee record when checkout starts
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    ticketType: v.union(v.literal("general"), v.literal("vip")),
    stripeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const attendeeId = await ctx.db.insert("attendees", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      ticketType: args.ticketType,
      stripeSessionId: args.stripeSessionId,
      paymentStatus: "pending",
      checkedIn: false,
    });
    return attendeeId;
  },
});

// Update attendee after successful payment
export const updatePaymentStatus = mutation({
  args: {
    stripeSessionId: v.string(),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    stripePaymentId: v.optional(v.string()),
    amountPaid: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const attendee = await ctx.db
      .query("attendees")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first();

    if (!attendee) {
      throw new Error("Attendee not found");
    }

    await ctx.db.patch(attendee._id, {
      paymentStatus: args.paymentStatus,
      stripePaymentId: args.stripePaymentId,
      amountPaid: args.amountPaid,
    });

    return attendee._id;
  },
});

// Check in an attendee
export const checkIn = mutation({
  args: {
    attendeeId: v.id("attendees"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.attendeeId, {
      checkedIn: true,
      checkedInAt: Date.now(),
    });
  },
});

// Get all attendees
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("attendees").collect();
  },
});

// Get attendees by payment status
export const listByStatus = query({
  args: {
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attendees")
      .withIndex("by_paymentStatus", (q) =>
        q.eq("paymentStatus", args.paymentStatus)
      )
      .collect();
  },
});

// Get attendee by email
export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attendees")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get attendee by Stripe session ID
export const getByStripeSessionId = query({
  args: {
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attendees")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first();
  },
});

// Get stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("attendees").collect();
    const completed = all.filter((a) => a.paymentStatus === "completed");
    const general = completed.filter((a) => a.ticketType === "general");
    const vip = completed.filter((a) => a.ticketType === "vip");
    const checkedIn = completed.filter((a) => a.checkedIn);

    return {
      total: completed.length,
      general: general.length,
      vip: vip.length,
      checkedIn: checkedIn.length,
      revenue: completed.reduce((sum, a) => sum + (a.amountPaid || 0), 0),
    };
  },
});
