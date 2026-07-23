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

export const SIZES = [
  { label: '12" × 18"', value: "12x18", priceMultiplier: 1 },
  { label: '16" × 24"', value: "16x24", priceMultiplier: 1.35 },
  { label: '20" × 30"', value: "20x30", priceMultiplier: 1.75 },
  { label: '24" × 36"', value: "24x36", priceMultiplier: 2.2 },
  { label: "Custom Size", value: "custom", priceMultiplier: 2.5 },
] as const;

export const FRAME_OPTIONS = [
  { label: "Matte Black", value: "black", hex: "#111111" },
  { label: "Walnut", value: "walnut", hex: "#5C4033" },
  { label: "Natural Oak", value: "natural", hex: "#C4A77D" },
] as const;

export const MANUFACTURERS = [
  "Porsche",
  "BMW",
  "Audi",
  "Mercedes",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Bentley",
] as const;
