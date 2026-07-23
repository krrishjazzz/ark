import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Arjun Kapoor",
    location: "Mumbai, India",
    rating: 5,
    quote:
      "The Audi R8 piece is the crown jewel of my collection. Every guest stops to admire it. ARK doesn't make wall art — they make statements.",
    image: "",
    product: "Audi R8 — Predator Edition",
  },
  {
    id: "2",
    name: "Sarah Chen",
    location: "Singapore",
    rating: 5,
    quote:
      "I ordered a custom Porsche piece for my husband's birthday. The attention to detail and packaging exceeded every luxury brand I've experienced.",
    image: "",
    product: "Custom Porsche 911",
  },
  {
    id: "3",
    name: "Vikram Reddy",
    location: "Hyderabad, India",
    rating: 5,
    quote:
      "As an interior designer, I've specified ARK for three luxury projects. The craftsmanship is unmatched in the resin art space.",
    image: "",
    product: "BMW S1000RR — Impact",
  },
  {
    id: "4",
    name: "James Morrison",
    location: "Dubai, UAE",
    rating: 5,
    quote:
      "Edition 12 of 50. Knowing mine is one of only fifty makes it feel truly exclusive. The certificate of authenticity is a beautiful touch.",
    image: "",
    product: "Ferrari 488 — Velocity",
  },
];

export const customerGallery = [
  { id: "0", image: "", category: "Gallery Display", alt: "ARK car collection in luxury gallery setting" },
  { id: "1", image: "", category: "Luxury Homes", alt: "ARK art in luxury living room" },
  { id: "2", image: "", category: "Offices", alt: "ARK art in executive office" },
  { id: "3", image: "", category: "Car Showrooms", alt: "ARK art in car showroom" },
  { id: "4", image: "", category: "Gaming Rooms", alt: "ARK art in gaming setup" },
  { id: "5", image: "", category: "Wall Mockups", alt: "ARK brand display wall" },
  { id: "6", image: "", category: "Luxury Homes", alt: "ARK packaging unboxing" },
  { id: "7", image: "", category: "Offices", alt: "ARK collection display" },
  { id: "8", image: "", category: "Car Showrooms", alt: "ARK in automotive gallery" },
];

export const instagramPosts = [
  { id: "1", image: "", likes: 1240, caption: "Predator Edition — now available" },
  { id: "2", image: "", likes: 987, caption: "Crafted with precision" },
  { id: "3", image: "", likes: 1560, caption: "Every angle tells a story" },
  { id: "4", image: "", likes: 834, caption: "The unboxing experience" },
  { id: "5", image: "", likes: 1102, caption: "Frozen in time" },
  { id: "6", image: "", likes: 945, caption: "Beyond cars. Beyond limits." },
];

export const craftsmanshipFeatures = [
  {
    icon: "Droplets",
    title: "Premium Resin",
    description: "Museum-grade epoxy resin with 7-layer pour technique for depth and clarity.",
  },
  {
    icon: "Hand",
    title: "Handcrafted",
    description: "Every texture, every detail sculpted by hand over 40+ hours of meticulous work.",
  },
  {
    icon: "Sun",
    title: "UV Resistant",
    description: "Professional UV coating ensures your artwork retains its brilliance for decades.",
  },
  {
    icon: "Gem",
    title: "Museum Finish",
    description: "Hand-polished to a mirror gloss that rivals the finest gallery installations.",
  },
  {
    icon: "Award",
    title: "Limited Edition",
    description: "Numbered editions with certificate of authenticity. Once sold, never reproduced.",
  },
  {
    icon: "Frame",
    title: "Solid Wood Frame",
    description: "Premium hardwood frames with precision-mitered corners and hidden mounting.",
  },
];

export const whyARK = [
  {
    title: "Premium Materials",
    description: "Only the finest resin, diecast models, and hardwood frames make it into an ARK piece.",
    icon: "Gem",
  },
  {
    title: "Every Frame Handcrafted",
    description: "No mass production. Each piece is individually poured, sculpted, and finished by our artisans.",
    icon: "Hand",
  },
  {
    title: "Certificate of Authenticity",
    description: "Every piece includes a numbered certificate signed by the founder.",
    icon: "FileCheck",
  },
  {
    title: "Collector's Edition",
    description: "Strictly limited runs. Your edition number is permanently recorded.",
    icon: "Award",
  },
  {
    title: "Premium Packaging",
    description: "Magnetic closure box, microfiber cloth, and a handwritten thank you card.",
    icon: "Package",
  },
  {
    title: "Lifetime Artwork",
    description: "Built to last generations. UV-resistant, scratch-resistant, museum-grade durability.",
    icon: "Infinity",
  },
];

export const packagingItems = [
  {
    title: "Magnetic Box",
    description: "Heavy-duty matte black box with gold ARK monogram and magnetic closure.",
    imageKey: "box" as const,
  },
  {
    title: "Certificate",
    description: "Premium black card with gold foil — edition number, materials, and signature.",
    imageKey: "certificate" as const,
  },
  {
    title: "Microfiber Cloth",
    description: "Ultra-soft cleaning cloth to maintain the pristine gloss finish.",
    imageKey: "microfiber" as const,
  },
  {
    title: "Thank You Card",
    description: "Handwritten note from the founder, thanking you for joining the ARK family.",
    imageKey: "thankYou" as const,
  },
];

export const timeline = [
  { year: "2019", title: "The Spark", description: "Founded in a small studio with a passion for cars and resin art." },
  { year: "2020", title: "First Collection", description: "Launched the Velocity Series with 5 supercar pieces." },
  { year: "2021", title: "Global Recognition", description: "Featured in luxury automotive publications worldwide." },
  { year: "2022", title: "Badge Series", description: "Introduced sculptural automotive crest artworks." },
  { year: "2023", title: "500+ Collectors", description: "Reached 500 collectors across 15 countries." },
  { year: "2024", title: "Custom Studio", description: "Opened dedicated custom order studio for bespoke pieces." },
  { year: "2025", title: "ARK Today", description: "Continuing to push the boundaries of resin art craftsmanship." },
];
