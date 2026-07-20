import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "product", title: "Product Name", type: "string" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "image" },
  },
});
