import { defineField, defineType } from "sanity";

export const productSeries = defineType({
  name: "productSeries",
  title: "Series",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. Environment, Drift, Lego, Small Car",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection Slug",
      type: "string",
      description: 'Parent collection, e.g. "cars"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first on the collection page (1 = first).",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "slotCount",
      title: "Slots (row)",
      type: "number",
      description:
        "How many cards to show in this series row (usually 3). Empty slots show as blanks until products are added.",
      initialValue: 3,
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "comingSoon",
      title: "Coming Soon",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [
        { field: "collection", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      collection: "collection",
      order: "sortOrder",
    },
    prepare({ title, collection, order }) {
      return {
        title: title || "Series",
        subtitle: `${collection || "—"} · #${order ?? "?"}`,
      };
    },
  },
});
