import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({ name: "alt", title: "Alt Text", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "category", media: "image" },
  },
});
