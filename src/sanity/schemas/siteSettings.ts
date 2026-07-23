import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "craftsmanshipPrimary",
      title: "Craftsmanship — Primary",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "craftsmanshipSecondary",
      title: "Craftsmanship — Secondary",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "brandBoardPrimary",
      title: "Brand Board — Primary",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "brandBoardSecondary",
      title: "Brand Board — Secondary",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "configuratorPreview",
      title: "Configurator Preview",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutHero",
      title: "About Page Hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "packagingBox",
      title: "Packaging — Magnetic Box",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "packagingCertificate",
      title: "Packaging — Certificate",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "packagingMicrofiber",
      title: "Packaging — Microfiber Cloth",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "packagingThankYou",
      title: "Packaging — Thank You Card",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "instagramImages",
      title: "Instagram Feed Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
