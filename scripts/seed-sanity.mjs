import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dirname, "../.env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const [key, ...vals] = line.split("=");
      if (key && vals.length) {
        process.env[key.trim()] = vals.join("=").trim();
      }
    }
  } catch {
    /* ignore */
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_API_TOKEN in .env.local\n" +
      "   Create one at: https://www.sanity.io/manage/project/jvnzq2ee/api\n" +
      "   Permissions: Editor\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const products = [
  {
    _type: "product",
    _id: "product-audi-r8",
    name: "Audi R8 — Predator Edition",
    slug: { _type: "slug", current: "audi-r8-predator" },
    series: "Velocity Series",
    manufacturer: "Audi",
    tagline: "Speed. Power. Precision.",
    description:
      "A white Audi R8 frozen in motion, coiled by a crimson serpent against volcanic obsidian resin.",
    basePrice: 12000,
    compareAtPrice: 45000,
    editionCurrent: 12,
    editionTotal: 50,
    featured: true,
    collection: "cars",
    craftsmanship: [
      "3D handcrafted volcanic textures",
      "High gloss resin pour with 7 layers",
      "Premium diecast Audi R8 model",
      "UV resistant museum coating",
    ],
    packaging: [
      "Premium magnetic closure box",
      "Certificate of authenticity",
      "Microfiber cleaning cloth",
    ],
    shipping: "Ships within 7-14 business days. Fully insured premium packaging.",
  },
  {
    _type: "product",
    _id: "product-porsche-911",
    name: "Porsche 911 GT3 RS — Velocity",
    slug: { _type: "slug", current: "porsche-911-velocity" },
    series: "Velocity Series",
    manufacturer: "Porsche",
    tagline: "Born to race. Built to display.",
    description: "A white Porsche 911 GT3 RS bursting through churning black resin waves.",
    basePrice: 42000,
    editionCurrent: 8,
    editionTotal: 100,
    featured: true,
    collection: "cars",
    craftsmanship: ["Explosive resin splash textures", "Premium diecast Porsche model"],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-bmw-m1000rr",
    name: "BMW M 1000 RR — Motorrad Collage",
    slug: { _type: "slug", current: "bmw-m1000rr-motorrad" },
    series: "Motorcycles Collection",
    manufacturer: "BMW",
    tagline: "Born on the track. Built for the wall.",
    description:
      "A museum-grade BMW Motorrad tribute with M 1000 RR model, racing glove, and M-stripe collage on brushed metal.",
    basePrice: 42000,
    editionCurrent: 3,
    editionTotal: 30,
    featured: true,
    collection: "motorcycles",
    craftsmanship: [
      "Multi-layer collage composition",
      "Premium BMW M 1000 RR scale model",
      "Gold-trimmed luxury frame",
    ],
    packaging: ["Premium magnetic closure box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-suzuki-gsxr",
    name: "Suzuki GSX-R — Chrome Drift",
    slug: { _type: "slug", current: "suzuki-gsxr-chrome" },
    series: "Motorcycles Collection",
    manufacturer: "Suzuki",
    tagline: "Raw stone. Mirror black.",
    description:
      "A black Suzuki GSX-R on sculpted charcoal stone and deep mirror-gloss resin with chrome branding.",
    basePrice: 36000,
    editionCurrent: 5,
    editionTotal: 40,
    featured: false,
    collection: "motorcycles",
    craftsmanship: [
      "Sculpted charcoal stone texture",
      "Mirror-gloss black resin pour",
      "Premium diecast GSX-R model",
    ],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-johnnie-walker",
    name: "Johnnie Walker — Double Black Shattered",
    slug: { _type: "slug", current: "johnnie-walker-double-black" },
    series: "Wine Bottle Collection",
    manufacturer: "Johnnie Walker",
    tagline: "Depth in every shard.",
    description:
      "A shattered Johnnie Walker Double Black bottle suspended in deep obsidian resin with subtle crimson glitter.",
    basePrice: 32000,
    editionCurrent: 6,
    editionTotal: 40,
    featured: true,
    collection: "wine-bottle",
    craftsmanship: [
      "Hand-shattered authentic glass fragments",
      "Deep obsidian resin pour with glitter inclusions",
      "Matte black gallery frame",
    ],
    packaging: ["Premium magnetic closure box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-jagermeister",
    name: "Jägermeister — Forest Burst",
    slug: { _type: "slug", current: "jagermeister-shattered" },
    series: "Wine Bottle Collection",
    manufacturer: "Jägermeister",
    tagline: "Wild. Frozen. Iconic.",
    description:
      "A green Jägermeister bottle exploded across rippling black resin — dynamic splashes frozen mid-motion.",
    basePrice: 28000,
    editionCurrent: 9,
    editionTotal: 50,
    featured: false,
    collection: "wine-bottle",
    craftsmanship: ["Dynamic splash resin sculpting", "Authentic green glass shards"],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-ballantines",
    name: "Ballantine's — Finest Explosion",
    slug: { _type: "slug", current: "ballantines-finest" },
    series: "Wine Bottle Collection",
    manufacturer: "Ballantine's",
    tagline: "Heritage, refracted.",
    description:
      "Ballantine's Finest Scotch Whisky shattered across a mirror-gloss black resin canvas.",
    basePrice: 30000,
    editionCurrent: 4,
    editionTotal: 35,
    featured: false,
    collection: "wine-bottle",
    craftsmanship: ["Mirror-gloss black resin base", "Hand-placed amber glass shards"],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-jack-daniels",
    name: "Jack Daniel's — Old No. 7 Smoke",
    slug: { _type: "slug", current: "jack-daniels-no7" },
    series: "Wine Bottle Collection",
    manufacturer: "Jack Daniel's",
    tagline: "Tennessee soul. Frozen fire.",
    description:
      "Jack Daniel's Old No. 7 captured in explosive fragmentation with swirling white smoke resin.",
    basePrice: 35000,
    editionCurrent: 3,
    editionTotal: 30,
    featured: true,
    collection: "wine-bottle",
    craftsmanship: ["White smoke resin swirl technique", "Hammered texture luxury frame"],
    packaging: ["Premium magnetic closure box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-bombay-sapphire",
    name: "Bombay Sapphire — Sapphire Shards",
    slug: { _type: "slug", current: "bombay-sapphire-gin" },
    series: "Wine Bottle Collection",
    manufacturer: "Bombay Sapphire",
    tagline: "Botanical beauty. Shattered light.",
    description:
      "Iconic blue Bombay Sapphire glass shards scattered across jet-black resin.",
    basePrice: 31000,
    editionCurrent: 7,
    editionTotal: 45,
    featured: false,
    collection: "wine-bottle",
    craftsmanship: ["Translucent blue glass shard placement", "Jet-black high-gloss resin base"],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-spider-man",
    name: "Spider-Man — Web Relief",
    slug: { _type: "slug", current: "spider-man-web-relief" },
    series: "Marvel Collection",
    manufacturer: "Marvel",
    tagline: "With great art comes great display.",
    description:
      "A sculpted 3D Spider-Man mask in glossy red and black webbing on a splattered crimson shadow-box panel.",
    basePrice: 34000,
    editionCurrent: 4,
    editionTotal: 35,
    featured: true,
    collection: "marvel",
    craftsmanship: ["3D sculpted mask relief", "Deep shadow-box gallery frame"],
    packaging: ["Premium magnetic closure box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
  {
    _type: "product",
    _id: "product-batman",
    name: "Batman — Dark Knight Relief",
    slug: { _type: "slug", current: "batman-dark-knight-relief" },
    series: "Marvel Collection",
    manufacturer: "DC",
    tagline: "The night belongs to the wall.",
    description:
      "A brooding 3D Batman cowl in high-gloss black resin against a smoky charcoal shadow-box interior.",
    basePrice: 36000,
    editionCurrent: 2,
    editionTotal: 30,
    featured: false,
    collection: "marvel",
    craftsmanship: ["3D sculpted cowl relief", "High-gloss black resin finish"],
    packaging: ["Premium magnetic box", "Certificate of authenticity"],
    shipping: "Ships within 7-14 business days.",
  },
];

const collections = [
  {
    _type: "collection",
    _id: "collection-cars",
    name: "Cars",
    slug: { _type: "slug", current: "cars" },
    tagline: "All cars possible.",
    description: "Every make. Every model. Handcrafted in museum-grade resin.",
    productCount: 4,
    comingSoon: false,
  },
  {
    _type: "collection",
    _id: "collection-motorcycles",
    name: "Motorcycles",
    slug: { _type: "slug", current: "motorcycles" },
    tagline: "Built to thrill.",
    description: "Two-wheeled icons embedded in raw resin energy.",
    productCount: 2,
    comingSoon: true,
  },
  {
    _type: "collection",
    _id: "collection-wine-bottle",
    name: "Wine Bottle",
    slug: { _type: "slug", current: "wine-bottle" },
    tagline: "Pour with passion.",
    description: "Luxury wine and spirits immortalized in flowing resin.",
    productCount: 5,
    comingSoon: true,
  },
  {
    _type: "collection",
    _id: "collection-marvel",
    name: "Marvel",
    slug: { _type: "slug", current: "marvel" },
    tagline: "Heroes immortalized.",
    description: "Iconic superheroes sculpted in 3D resin relief.",
    productCount: 2,
    comingSoon: true,
  },
];

const testimonials = [
  {
    _type: "testimonial",
    _id: "testimonial-1",
    name: "Arjun Kapoor",
    location: "Mumbai, India",
    rating: 5,
    quote:
      "The Audi R8 piece is the crown jewel of my collection. ARK doesn't make wall art — they make statements.",
    product: "Audi R8 — Predator Edition",
  },
  {
    _type: "testimonial",
    _id: "testimonial-2",
    name: "Sarah Chen",
    location: "Singapore",
    rating: 5,
    quote:
      "The attention to detail and packaging exceeded every luxury brand I've experienced.",
    product: "Custom Porsche 911",
  },
];

async function seed() {
  console.log("🌱 Seeding Sanity project:", projectId);

  const transaction = client.transaction();
  for (const doc of [...products, ...collections, ...testimonials]) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();
  console.log("✅ Seeded", products.length, "products,", collections.length, "collections,", testimonials.length, "testimonials");
  console.log("\n📸 Next: Upload images in Sanity Studio at http://localhost:3000/studio");
}

seed().catch((err) => {
  const msg = err.message || String(err);
  if (msg.includes("Insufficient permissions") || msg.includes("permission")) {
    console.error(
      "\n❌ Token lacks write permission.\n\n" +
        "   Fix:\n" +
        "   1. Open https://www.sanity.io/manage/project/jvnzq2ee/api#tokens\n" +
        "   2. Delete the old token (or create a new one)\n" +
        "   3. Add API token → Name: ARK Seed → Permissions: Editor\n" +
        "   4. Copy the token into .env.local as SANITY_API_TOKEN=...\n" +
        "   5. Run npm run seed again\n\n" +
        "   Note: Viewer / Read-only tokens cannot create documents.\n"
    );
  } else {
    console.error("Seed failed:", msg);
  }
  process.exit(1);
});
