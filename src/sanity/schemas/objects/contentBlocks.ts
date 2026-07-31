import { defineArrayMember, defineField } from "sanity";

export const featureItemMember = defineArrayMember({
  type: "object",
  name: "featureItem",
  title: "Feature",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name, e.g. Gem, Hand, Droplets",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

export const packagingItemMember = defineArrayMember({
  type: "object",
  name: "packagingItem",
  title: "Packaging Item",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageKey",
      title: "Image",
      type: "string",
      options: {
        list: [
          { title: "Magnetic Box", value: "box" },
          { title: "Certificate", value: "certificate" },
          { title: "Microfiber Cloth", value: "microfiber" },
          { title: "Thank You Card", value: "thankYou" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "imageKey" },
  },
});

export const timelineItemMember = defineArrayMember({
  type: "object",
  name: "timelineItem",
  title: "Timeline Item",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "year", subtitle: "title" },
  },
});
