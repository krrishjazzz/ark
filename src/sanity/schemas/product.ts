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
      description:
        "This is the price shown on the homepage and product page. Edit here — the site uses this value.",
      group: "commerce",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Original Price (INR) — optional",
      type: "number",
      description:
        "Only fill if you want a crossed-out “was” price. Leave empty to show sale price alone.",
      group: "commerce",
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      description:
        "Leave empty to use Site Settings (one size for all). Add only for product-specific sizes.",
      type: "array",
      of: [sizesArrayMember],
      group: "commerce",
    }),
    defineField({
      name: "frames",
      title: "Available Frame Materials",
      description:
        "Leave empty to use Site Settings (Acrylic only for now). Add Wooden later when ready.",
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