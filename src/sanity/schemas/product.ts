import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "series", title: "Series", type: "string" }),
    defineField({ name: "manufacturer", title: "Manufacturer", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "basePrice", title: "Sale Price (INR)", type: "number" }),
    defineField({
      name: "compareAtPrice",
      title: "Original Price (INR)",
      type: "number",
      description: "Shown crossed out when higher than the sale price.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "editionCurrent",
      title: "Edition Current",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "editionTotal",
      title: "Edition Total",
      type: "number",
      initialValue: 50,
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "collection", title: "Collection Slug", type: "string" }),
    defineField({
      name: "craftsmanship",
      title: "Craftsmanship",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "packaging",
      title: "Packaging",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "shipping", title: "Shipping Info", type: "text", rows: 2 }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "author", type: "string", title: "Author" },
            { name: "rating", type: "number", title: "Rating" },
            { name: "comment", type: "text", title: "Comment" },
            { name: "date", type: "date", title: "Date" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "images.0" },
  },
});
