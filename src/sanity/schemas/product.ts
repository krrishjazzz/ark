import { defineField, defineType } from "sanity";
import {
  framesArrayMember,
  sizesArrayMember,
} from "./objects/commerceOptions";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "commerce", title: "Price, Sizes & Frames" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
      group: "details",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
      group: "details",
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "productSeries" }],
      description:
        "Sub-series within a collection (Environment, Drift, Lego, Small Car…). Create/edit under Series in Studio.",
      group: "details",
    }),
    defineField({
      name: "manufacturer",
      title: "Manufacturer",
      type: "string",
      group: "details",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "details" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "details",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "details",
    }),
    defineField({
      name: "editionCurrent",
      title: "Edition Current",
      type: "number",
      initialValue: 1,
      group: "details",
    }),
    defineField({
      name: "editionTotal",
      title: "Edition Total",
      type: "number",
      initialValue: 50,
      group: "details",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "collection",
      title: "Collection Slug",
      type: "string",
      group: "details",
    }),

    defineField({
      name: "basePrice",
      title: "Sale Price (INR)",
      type: "number",
      description: "This product’s own price — set per product.",
      group: "commerce",
    }),
    defineField({
      name: "compareAtPrice",
      title: "Original Price (INR)",
      type: "number",
      description: "Shown crossed out when higher than the sale price.",
      group: "commerce",
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      description:
        "Sizes & multipliers for this product only.",
      type: "array",
      of: [sizesArrayMember],
      group: "commerce",
    }),
    defineField({
      name: "frames",
      title: "Available Frame Materials",
      description:
        "Acrylic, Wooden, Aluminum — each with its own price multiplier for this product.",
      type: "array",
      of: [framesArrayMember],
      group: "commerce",
    }),

    defineField({
      name: "craftsmanship",
      title: "Craftsmanship",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "packaging",
      title: "Packaging",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "shipping",
      title: "Shipping Info",
      type: "text",
      rows: 2,
      group: "content",
    }),
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
      group: "content",
    }),
  ],
  preview: {
    select: { title: "name", media: "images.0" },
  },
});