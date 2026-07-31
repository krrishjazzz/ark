import { defineArrayMember, defineField } from "sanity";

export const sizeOptionFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    description: 'Display label, e.g. 16" × 24"',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "value",
    title: "Value",
    type: "string",
    description: "Stable ID used in cart/checkout, e.g. 16x24",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "priceMultiplier",
    title: "Price Multiplier",
    type: "number",
    description: "Multiplied by product base price",
    initialValue: 1,
    validation: (rule) => rule.required().positive(),
  }),
];

export const frameOptionFields = [
  defineField({
    name: "label",
    title: "Material",
    type: "string",
    description: "e.g. Acrylic, Wooden, Aluminum",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "value",
    title: "Value",
    type: "string",
    description: "Stable ID used in cart/checkout, e.g. acrylic",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "hex",
    title: "Swatch Color",
    type: "string",
    description: "Hex swatch shown on the product page, e.g. #C0C0C0",
    initialValue: "#888888",
    validation: (rule) =>
      rule.required().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
        name: "hex color",
        invert: false,
      }),
  }),
  defineField({
    name: "priceMultiplier",
    title: "Price Multiplier",
    type: "number",
    description:
      "Final price = base × size multiplier × frame multiplier. Acrylic 1, Wooden 1.15, Aluminum 1.3, etc.",
    initialValue: 1,
    validation: (rule) => rule.required().positive(),
  }),
];

export const labeledValueFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "value",
    title: "Value",
    type: "string",
    validation: (rule) => rule.required(),
  }),
];

export const resinColorFields = [
  ...labeledValueFields,
  defineField({
    name: "hex",
    title: "Color",
    type: "string",
    validation: (rule) =>
      rule.required().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
        name: "hex color",
        invert: false,
      }),
  }),
];

export const sizesArrayMember = defineArrayMember({
  type: "object",
  name: "sizeOption",
  title: "Size",
  fields: sizeOptionFields,
  preview: {
    select: { title: "label", subtitle: "value", multiplier: "priceMultiplier" },
    prepare({ title, subtitle, multiplier }) {
      return {
        title: title || "Size",
        subtitle: `${subtitle || "—"} · ×${multiplier ?? 1}`,
      };
    },
  },
});

export const framesArrayMember = defineArrayMember({
  type: "object",
  name: "frameOption",
  title: "Frame",
  fields: frameOptionFields,
  preview: {
    select: {
      title: "label",
      subtitle: "value",
      hex: "hex",
      multiplier: "priceMultiplier",
    },
    prepare({ title, subtitle, hex, multiplier }) {
      return {
        title: title || "Frame",
        subtitle: `${subtitle || "—"} · ${hex || ""} · ×${multiplier ?? 1}`,
      };
    },
  },
});

export const texturesArrayMember = defineArrayMember({
  type: "object",
  name: "textureOption",
  title: "Texture",
  fields: labeledValueFields,
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

export const resinColorsArrayMember = defineArrayMember({
  type: "object",
  name: "resinColorOption",
  title: "Resin Color",
  fields: resinColorFields,
  preview: {
    select: { title: "label", subtitle: "hex" },
  },
});
