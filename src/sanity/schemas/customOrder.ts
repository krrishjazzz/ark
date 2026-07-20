import { defineField, defineType } from "sanity";

export const customOrder = defineType({
  name: "customOrder",
  title: "Custom Order",
  type: "document",
  fields: [
    defineField({ name: "brand", title: "Brand", type: "string" }),
    defineField({ name: "model", title: "Model", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "color", title: "Color", type: "string" }),
    defineField({ name: "customText", title: "Custom Text", type: "text" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["new", "in-progress", "completed", "cancelled"],
      },
      initialValue: "new",
    }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
  preview: {
    select: { title: "brand", subtitle: "model" },
  },
});
