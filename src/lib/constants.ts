export const BRAND = {
  name: "ARK",
  fullName: "Aesthetic Resin Kreations",
  tagline: "Beyond Cars. Beyond Limits.",
  description:
    "Handcrafted resin masterpieces inspired by machines, emotion and timeless craftsmanship.",
  email: "hello@arkresin.art",
  phone: "+91 98765 43210",
  instagram: "https://instagram.com/ark.resin.art",
  facebook: "https://facebook.com/ark.resin.art",
  whatsapp: "https://wa.me/919876543210",
} as const;

export const IMAGES = {
  logo: "/images/logo.png",
  hero: "/images/hero-bg.png",
  heroBg: "/images/hero-bg.png",
  heroCinematic: "/images/hero-cinematic.png",
  productWall: "/images/product-wall.png",
  productTopdown: "/images/product-topdown.png",
  productEasel: "/images/product-easel.png",
  productGrid: "/images/product-grid.png",
  brandBoard1: "/images/brand-board-1.png",
  brandBoard2: "/images/brand-board-2.png",
  packaging: "/images/packaging.png",
  collectionCars: "/images/collection-car-grid.png",
  collectionAudiR8: "/images/collection-audi-r8.png",
  collectionRollsRoyce: "/images/collection-rolls-royce.png",
  collectionMustang: "/images/collection-mustang.png",
  collectionFerrariF1: "/images/collection-ferrari-f1.png",
  collectionWineBottle: "/images/collection-johnnie-walker.png",
  collectionJohnnieWalker: "/images/collection-johnnie-walker.png",
  collectionJagermeister: "/images/collection-jagermeister.png",
  collectionBallantines: "/images/collection-ballantines.png",
  collectionJackDaniels: "/images/collection-jack-daniels.png",
  collectionBombaySapphire: "/images/collection-bombay-sapphire.png",
  collectionBmwMotorrad: "/images/collection-bmw-motorrad.png",
  collectionSuzukiGsxr: "/images/collection-suzuki-gsxr.png",
  collectionSpiderMan: "/images/collection-spider-man.png",
  collectionBatman: "/images/collection-batman.png",
  collectionMarvel: "/images/collection-spider-man.png",
  /** Used when CMS/local data has no image */
  fallback: "/images/collection-car-grid.png",
} as const;

export const FALLBACK_IMAGE = IMAGES.fallback;

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
