import { defineField, defineType } from "sanity";
import {
  framesArrayMember,
  resinColorsArrayMember,
  sizesArrayMember,
  texturesArrayMember,
} from "./objects/commerceOptions";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "images", title: "Images", default: true },
    { name: "commerce", title: "Sizes & Frames" },
    { name: "configurator", title: "Configurator" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "craftsmanshipPrimary",
      title: "Craftsmanship — Primary",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "craftsmanshipSecondary",
      title: "Craftsmanship — Secondary",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "brandBoardPrimary",
      title: "Brand Board — Primary",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "brandBoardSecondary",
      title: "Brand Board — Secondary",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "configuratorPreview",
      title: "Configurator Preview",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "aboutHero",
      title: "About Page Hero",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "packagingBox",
      title: "Packaging — Magnetic Box",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "packagingCertificate",
      title: "Packaging — Certificate",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "packagingMicrofiber",
      title: "Packaging — Microfiber Cloth",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "packagingThankYou",
      title: "Packaging — Thank You Card",
      type: "image",
      options: { hotspot: true },
      group: "images",
    }),
    defineField({
      name: "instagramImages",
      title: "Instagram Feed Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.max(12),
      group: "images",
    }),

    defineField({
      name: "sizes",
      title: "Default Frame Sizes",
      description:
        "Global defaults used when a product has no sizes of its own. Override per product under Product → Sizes & Frames.",
      type: "array",
      of: [sizesArrayMember],
      group: "commerce",
    }),
    defineField({
      name: "frames",
      title: "Default Frame Finishes",
      description:
        "Global defaults used when a product has no frames of its own. Override per product under Product → Sizes & Frames.",
      type: "array",
      of: [framesArrayMember],
      group: "commerce",
    }),
    defineField({
      name: "manufacturers",
      title: "Manufacturers",
      description: "Used on Garage filters and the Configurator.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "commerce",
    }),

    defineField({
      name: "configuratorBasePrice",
      title: "Configurator Base Price",
      type: "number",
      description: "Starting price before size multiplier (INR).",
      initialValue: 40000,
      validation: (rule) => rule.min(0),
      group: "configurator",
    }),
    defineField({
      name: "textures",
      title: "Background Textures",
      type: "array",
      of: [texturesArrayMember],
      group: "configurator",
    }),
    defineField({
      name: "resinColors",
      title: "Resin Colors",
      type: "array",
      of: [resinColorsArrayMember],
      group: "configurator",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
