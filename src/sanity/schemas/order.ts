import { defineArrayMember, defineField, defineType } from "sanity";

const orderStatuses = [
  { title: "Paid", value: "paid" },
  { title: "Making", value: "making" },
  { title: "Shipped", value: "shipped" },
  { title: "Delivered", value: "delivered" },
  { title: "Cancelled", value: "cancelled" },
];

export const order = defineType({
  name: "order",
  title: "Shop Order",
  type: "document",
  fields: [
    defineField({
      name: "trackingCode",
      title: "Tracking Code",
      type: "string",
      description: "Customer-facing code, e.g. ARK-A7K2M9",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: orderStatuses, layout: "radio" },
      initialValue: "paid",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "razorpayOrderId",
      title: "Razorpay Order ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "razorpayPaymentId",
      title: "Razorpay Payment ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "customerPhone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "pincode", title: "PIN Code", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "orderItem",
          fields: [
            defineField({ name: "slug", type: "string", title: "Slug" }),
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "size", type: "string", title: "Size" }),
            defineField({ name: "frame", type: "string", title: "Frame" }),
            defineField({ name: "quantity", type: "number", title: "Qty" }),
            defineField({ name: "price", type: "number", title: "Unit Price (₹)" }),
            defineField({ name: "image", type: "string", title: "Image URL" }),
          ],
          preview: {
            select: { title: "name", subtitle: "size", qty: "quantity" },
            prepare({ title, subtitle, qty }) {
              return {
                title: title || "Item",
                subtitle: `${subtitle || "—"} · ×${qty ?? 1}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "subtotal",
      title: "Subtotal (₹)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "shipping",
      title: "Shipping (₹)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "total",
      title: "Total (₹)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "courierTracking",
      title: "Courier Tracking No.",
      type: "string",
      description: "Add when you ship (shown on customer track page).",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paidAt",
      title: "Paid At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "paidAtDesc",
      by: [{ field: "paidAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "trackingCode",
      name: "customerName",
      status: "status",
      total: "total",
    },
    prepare({ title, name, status, total }) {
      const amount =
        typeof total === "number"
          ? `₹${total.toLocaleString("en-IN")}`
          : "";
      return {
        title: title || "Order",
        subtitle: [name, status, amount].filter(Boolean).join(" · "),
      };
    },
  },
});
