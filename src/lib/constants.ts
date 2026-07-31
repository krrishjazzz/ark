export const BRAND = {
  name: "ARK",
  fullName: "Aesthetic Resin Kreations",
  tagline: "Beyond Cars. Beyond Limits.",
  description:
    "Handcrafted resin masterpieces inspired by machines, emotion and timeless craftsmanship.",
  email: "aestheticresinkreations@gmail.com",
  phone: "+91 91630 34822",
  phoneRaw: "9163034822",
  location: "PS Abacus Newtown, AA-2D, Kolkata, India",
  instagram: "https://www.instagram.com/aestheticresinkreations/",
  facebook: "https://www.facebook.com/profile.php?id=61591768516700",
  instagramHandle: "aestheticresinkreations",
  whatsapp: "https://wa.me/919163034822",
} as const;

/** Fallback defaults when Sanity Site Settings commerce arrays are empty */
export const DEFAULT_SIZES = [
  { label: '12" × 18"', value: "12x18", priceMultiplier: 1 },
  { label: '16" × 24"', value: "16x24", priceMultiplier: 1.35 },
  { label: '20" × 30"', value: "20x30", priceMultiplier: 1.75 },
  { label: '24" × 36"', value: "24x36", priceMultiplier: 2.2 },
  { label: "Custom Size", value: "custom", priceMultiplier: 2.5 },
] as const;

export const DEFAULT_FRAME_OPTIONS = [
  { label: "Matte Black", value: "black", hex: "#111111" },
  { label: "Walnut", value: "walnut", hex: "#5C4033" },
  { label: "Natural Oak", value: "natural", hex: "#C4A77D" },
] as const;

export const DEFAULT_MANUFACTURERS = [
  "Porsche",
  "BMW",
  "Audi",
  "Mercedes",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Bentley",
] as const;

export const DEFAULT_TEXTURES = [
  { label: "Volcanic Obsidian", value: "volcanic" },
  { label: "Resin Splash", value: "splash" },
  { label: "Smoke Flow", value: "smoke" },
  { label: "Tire Tracks", value: "tracks" },
  { label: "Gold Veins", value: "gold" },
] as const;

export const DEFAULT_RESIN_COLORS = [
  { label: "Deep Black", value: "black", hex: "#111111" },
  { label: "Charcoal", value: "charcoal", hex: "#333333" },
  { label: "Smoky Grey", value: "grey", hex: "#666666" },
  { label: "Gold Accent", value: "gold", hex: "#C9A45B" },
] as const;

export const DEFAULT_CONFIGURATOR_BASE_PRICE = 40000;

/** @deprecated Use DEFAULT_SIZES — kept for any lingering imports */
export const SIZES = DEFAULT_SIZES;
/** @deprecated Use DEFAULT_FRAME_OPTIONS */
export const FRAME_OPTIONS = DEFAULT_FRAME_OPTIONS;
/** @deprecated Use DEFAULT_MANUFACTURERS */
export const MANUFACTURERS = DEFAULT_MANUFACTURERS;
