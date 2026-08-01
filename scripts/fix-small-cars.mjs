/**
 * Fill details for the two new Small Car products and activate the series.
 * Run: node scripts/fix-small-cars.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(resolve(__dirname, "../.env.local"), "utf8").split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i === -1) continue;
  process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const craftsmanship = [
  "Hand-mounted scale model",
  "Sculpted resin motion trail",
  "Raised ARK monogram detail",
  "Museum-grade gloss finish",
  "UV resistant coating",
  '18" × 22" acrylic gallery frame',
];

const packaging = [
  "Premium magnetic closure box",
  "Certificate of authenticity",
  "Microfiber cleaning cloth",
  "Wall hanging kit",
  "Handwritten thank you card",
];

const shipping =
  "Ships within 7-14 business days. Fully insured premium packaging.";

/** Existing draft docs → full Small Car product data */
const patches = [
  {
    _id: "310abc82-d9e4-4966-893b-feb8226f0f38",
    data: {
      name: "Ford Mustang — Shadow Trail",
      slug: { _type: "slug", current: "ford-mustang-shadow-trail" },
      series: {
        _type: "reference",
        _ref: "series-small-car",
      },
      manufacturer: "Ford",
      tagline: "Compact icon. Bold presence.",
      description:
        "A black Ford Mustang mounted on a light sculpted relief with a textured motion trail. Gold ARK monogram and raised Mustang emblem — a compact gallery piece with unmistakable attitude.",
      basePrice: 5500,
      editionCurrent: 1,
      editionTotal: 40,
      featured: true,
      collection: "cars",
      craftsmanship,
      packaging,
      shipping,
      sizes: [],
      frames: [],
    },
  },
  {
    _id: "fa699291-1986-47d0-afca-6aa4e7ab6108",
    data: {
      name: "Audi — Obsidian Drift",
      slug: { _type: "slug", current: "audi-obsidian-drift" },
      series: {
        _type: "reference",
        _ref: "series-small-car",
      },
      manufacturer: "Audi",
      tagline: "Four rings. Frozen motion.",
      description:
        "A dark scale Audi set against deep black resin with a sculpted drift trail and raised four-ring emblem. Gold ARK monogram, high-gloss finish — compact, dramatic, built for the wall.",
      basePrice: 6000,
      editionCurrent: 1,
      editionTotal: 40,
      featured: true,
      collection: "cars",
      craftsmanship,
      packaging,
      shipping,
      sizes: [],
      frames: [],
    },
  },
];

async function main() {
  // Activate Small Car series
  await client
    .patch("series-small-car")
    .set({
      comingSoon: false,
      description: "Compact icons with sculpted trails — big presence in a focused frame.",
      slotCount: 3,
    })
    .commit();
  console.log("✅ Small Car series live (comingSoon: false)");

  const tx = client.transaction();
  for (const { _id, data } of patches) {
    tx.patch(_id, (p) => p.set(data).unset(["compareAtPrice"]));
    console.log(`→ ${_id}: ${data.name} (${data.slug.current})`);
  }
  await tx.commit();
  console.log("✅ Filled details for 2 Small Car products");
  console.log("   /products/ford-mustang-shadow-trail");
  console.log("   /products/audi-obsidian-drift");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
