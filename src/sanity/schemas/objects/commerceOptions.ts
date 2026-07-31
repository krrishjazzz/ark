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
    name: "priceAdd",
    title: "Extra Price (₹)",
    type: "number",
    description: "Added to the product sale price. Keep 0 when you only have one size.",
    initialValue: 0,
    validation: (rule) => rule.required().min(0),
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
    name: "priceAdd",
    title: "Extra Price (₹)",
    type: "number",
    description: "Added to the product sale price. Acrylic = 0.",
    initialValue: 0,
    validation: (rule) => rule.required().min(0),
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

function formatAdd(add?: number) {
  if (add == null || add === 0) return "+₹0";
  return `+₹${add.toLocaleString("en-IN")}`;
}

export const sizesArrayMember = defineArrayMember({
  type: "object",
  name: "sizeOption",
  title: "Size",
  fields: sizeOptionFields,
  preview: {
    select: { title: "label", subtitle: "value", add: "priceAdd" },
    prepare({ title, subtitle, add }) {
      return {
        title: title || "Size",
        subtitle: `${subtitle || "—"} · ${formatAdd(add)}`,
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
      add: "priceAdd",
    },
    prepare({ title, subtitle, hex, add }) {
      return {
        title: title || "Frame",
        subtitle: `${subtitle || "—"} · ${hex || ""} · ${formatAdd(add)}`,
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
