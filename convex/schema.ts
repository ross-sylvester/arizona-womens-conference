import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Attendees / Ticket purchases
  attendees: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    ticketType: v.union(v.literal("general"), v.literal("vip")),
    stripeSessionId: v.optional(v.string()),
    stripePaymentId: v.optional(v.string()),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    amountPaid: v.optional(v.number()),
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),
    dietaryRestrictions: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_stripeSessionId", ["stripeSessionId"])
    .index("by_paymentStatus", ["paymentStatus"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("replied"),
      v.literal("archived")
    ),
    repliedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  // Newsletter subscribers
  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()),
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
    isActive: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_isActive", ["isActive"]),

  // Speakers
  speakers: defineTable({
    name: v.string(),
    title: v.string(),
    company: v.optional(v.string()),
    bio: v.string(),
    imageUrl: v.optional(v.string()),
    sessionTitle: v.optional(v.string()),
    sessionDescription: v.optional(v.string()),
    sessionTime: v.optional(v.string()),
    isKeynote: v.boolean(),
    isAnnounced: v.boolean(),
    sortOrder: v.number(),
    socialLinks: v.optional(
      v.object({
        linkedin: v.optional(v.string()),
        twitter: v.optional(v.string()),
        instagram: v.optional(v.string()),
        website: v.optional(v.string()),
      })
    ),
  })
    .index("by_isAnnounced", ["isAnnounced"])
    .index("by_sortOrder", ["sortOrder"]),

  // Schedule items
  scheduleItems: defineTable({
    time: v.string(),
    endTime: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    speakerId: v.optional(v.id("speakers")),
    location: v.optional(v.string()),
    type: v.union(
      v.literal("keynote"),
      v.literal("panel"),
      v.literal("workshop"),
      v.literal("networking"),
      v.literal("break"),
      v.literal("other")
    ),
    sortOrder: v.number(),
  }).index("by_sortOrder", ["sortOrder"]),

  // Sponsors
  sponsors: defineTable({
    name: v.string(),
    tier: v.union(
      v.literal("title"),
      v.literal("platinum"),
      v.literal("gold"),
      v.literal("silver"),
      v.literal("partner")
    ),
    logoUrl: v.string(),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.number(),
  })
    .index("by_tier", ["tier"])
    .index("by_isActive", ["isActive"]),
});
