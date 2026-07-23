/**
 * Merges photo-only Sanity products into the correct catalog entries
 * and fills missing details from the local product catalog.
 *
 * Run: npm run sync:sanity
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const content = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
}

loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/** Photo-only Studio entries → canonical product slug */
const PHOTO_ALIASES = {
  mustang: "ford-mustang-classic",
  audi: "audi-r8-predator",
  bmw: "bmw-m1000rr-motorrad",
  mercedes: "mercedes-amg-silver-storm",
};

const CATALOG = {
  "ford-mustang-classic": {
    _id: "product-mustang",
    name: "Ford Mustang — Ocean Classic",
    slug: "ford-mustang-classic",
    series: "Cars Collection",
    manufacturer: "Ford",
    tagline: "American icon. Frozen tide.",
    description:
      "A classic black Ford Mustang on a topographical ocean resin landscape with snow-textured islands. Bold, timeless, unmistakably American.",
    basePrice: 8000,
    compareAtPrice: 40000,
    editionCurrent: 7,
    editionTotal: 40,
    featured: true,
    collection: "cars",
    craftsmanship: [
      "Topographical resin landscape",
      "Snow-textured island sculpting",
      "Premium diecast Mustang model",
      "Deep ocean blue resin pour",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
  },
  "audi-r8-predator": {
    _id: "product-audi-r8",
    name: "Audi R8 — Predator Edition",
    slug: "audi-r8-predator",
    series: "Cars Collection",
    manufacturer: "Audi",
    tagline: "Speed. Power. Precision.",
    description:
      "A white Audi R8 frozen in motion against volcanic obsidian resin with crimson serpent details. Museum-grade gloss finish with integrated LED ambient lighting.",
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
      "Solid walnut wood frame",
      "Integrated LED ambient lighting",
    ],
    packaging: [
      "Premium magnetic closure box",
      "Certificate of authenticity",
      "Microfiber cleaning cloth",
      "Wall hanging kit with level",
      "Handwritten thank you card",
    ],
    shipping: "Ships within 7-14 business days. Fully insured premium packaging.",
  },
  "bmw-m1000rr-motorrad": {
    _id: "product-bmw-m1000rr",
    name: "BMW M 1000 RR — Motorrad Collage",
    slug: "bmw-m1000rr-motorrad",
    series: "Motorcycles Collection",
    manufacturer: "BMW",
    tagline: "Born on the track. Built for the wall.",
    description:
      "A museum-grade BMW Motorrad tribute — M 1000 RR model, racing glove, action photography, and M-stripe details layered on brushed metal with a gold-trimmed gallery frame.",
    basePrice: 42000,
    editionCurrent: 3,
    editionTotal: 30,
    featured: false,
    collection: "motorcycles",
    craftsmanship: [
      "Multi-layer collage composition",
      "Premium BMW M 1000 RR scale model",
      "Brushed metal panel base",
      "Gold-trimmed luxury frame",
      "Hand-mounted racing glove element",
      "UV resistant museum coating",
    ],
    packaging: [
      "Premium magnetic closure box",
      "Certificate of authenticity",
      "Microfiber cleaning cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days. Fully insured premium packaging.",
  },
  "mercedes-amg-silver-storm": {
    _id: "product-mercedes-amg",
    name: "Mercedes-AMG — Silver Storm",
    slug: "mercedes-amg-silver-storm",
    series: "Cars Collection",
    manufacturer: "Mercedes",
    tagline: "Silver arrow. Frozen lightning.",
    description:
      "A Mercedes-AMG captured in sculpted silver-grey resin with metallic drift textures and deep gloss finish. Precision engineering immortalized as gallery art.",
    basePrice: 11000,
    compareAtPrice: 46000,
    editionCurrent: 5,
    editionTotal: 35,
    featured: true,
    collection: "cars",
    craftsmanship: [
      "Sculpted silver-grey resin pour",
      "Metallic drift texture detailing",
      "Premium diecast Mercedes-AMG model",
      "Hand-polished gloss finish",
      "UV resistant museum coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
  },
};

function uniqueImages(existing = [], incoming = []) {
  const seen = new Set();
  const merged = [];
  for (const img of [...existing, ...incoming]) {
    const key = img?.asset?._ref || JSON.stringify(img);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(img);
  }
  return merged;
}

async function sync() {
  console.log("🔄 Syncing photo-only Sanity products with catalog details...\n");

  const orphans = await client.fetch(
    `*[_type == "product" && slug.current in $slugs]{
      _id,
      "slug": slug.current,
      images
    }`,
    { slugs: Object.keys(PHOTO_ALIASES) }
  );

  const tx = client.transaction();

  for (const orphan of orphans) {
    const targetSlug = PHOTO_ALIASES[orphan.slug];
    const catalog = CATALOG[targetSlug];
    if (!catalog) continue;

    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{ _id, images }`,
      { slug: targetSlug }
    );

    const images = uniqueImages(existing?.images, orphan.images);

    tx.createOrReplace({
      _type: "product",
      ...catalog,
      slug: { _type: "slug", current: targetSlug },
      images,
    });

    if (orphan._id !== catalog._id && orphan._id !== existing?._id) {
      tx.delete(orphan._id);
      console.log(`  ✓ Merged photos from "${orphan.slug}" → ${targetSlug} (removed duplicate)`);
    } else {
      console.log(`  ✓ Updated ${targetSlug} with full details + photos`);
    }
  }

  // Ensure Mercedes exists even if orphan wasn't found
  if (!orphans.find((o) => o.slug === "mercedes")) {
    const mercedes = CATALOG["mercedes-amg-silver-storm"];
    tx.createOrReplace({
      _type: "product",
      ...mercedes,
      slug: { _type: "slug", current: mercedes.slug },
      images: [],
    });
    console.log("  ✓ Created mercedes-amg-silver-storm with full details");
  }

  // Fix cars collection count
  tx.patch("collection-cars", (p) => p.set({ productCount: 5 }));

  await tx.commit();
  console.log("\n✅ Sanity catalog synced. Refresh the site to see updates.");
}

sync().catch((err) => {
  console.error("Sync failed:", err.message || err);
  process.exit(1);
});
