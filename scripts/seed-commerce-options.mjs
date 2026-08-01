/**
 * Patch Site Settings commerce + page content, and set Acrylic/Wooden/Aluminum
 * frames (with prices) on every product so each can be edited in Studio.
 *
 * Usage: npm run seed:commerce
 */
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
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (key) process.env[key] = value;
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
      "   Create one at: https://www.sanity.io/manage/project/jvnzq2ee/api\n"
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

const sizes = [
  { _key: "size-18x22", _type: "sizeOption", label: '18" × 22"', value: "18x22", priceAdd: 0 },
];

const legoSizes = [
  { _key: "size-20x31", _type: "sizeOption", label: '20" × 31"', value: "20x31", priceAdd: 0 },
];

const frames = [
  { _key: "frame-acrylic", _type: "frameOption", label: "Acrylic", value: "acrylic", hex: "#B8D4E3", priceAdd: 0 },
];

/** Lego only — Aluminum is 1.1× the Acrylic / sale price */
const legoFrames = [
  { _key: "frame-acrylic", _type: "frameOption", label: "Acrylic", value: "acrylic", hex: "#B8D4E3", priceAdd: 0 },
  {
    _key: "frame-aluminum",
    _type: "frameOption",
    label: "Aluminum",
    value: "aluminum",
    hex: "#C0C0C0",
    priceMultiplier: 1.1,
  },
];

const manufacturers = [
  "Porsche",
  "BMW",
  "Audi",
  "Mercedes",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Bentley",
];

const textures = [
  { _key: "tex-volcanic", _type: "textureOption", label: "Volcanic Obsidian", value: "volcanic" },
  { _key: "tex-splash", _type: "textureOption", label: "Resin Splash", value: "splash" },
  { _key: "tex-smoke", _type: "textureOption", label: "Smoke Flow", value: "smoke" },
  { _key: "tex-tracks", _type: "textureOption", label: "Tire Tracks", value: "tracks" },
  { _key: "tex-gold", _type: "textureOption", label: "Gold Veins", value: "gold" },
];

const resinColors = [
  { _key: "resin-black", _type: "resinColorOption", label: "Deep Black", value: "black", hex: "#111111" },
  { _key: "resin-charcoal", _type: "resinColorOption", label: "Charcoal", value: "charcoal", hex: "#333333" },
  { _key: "resin-grey", _type: "resinColorOption", label: "Smoky Grey", value: "grey", hex: "#666666" },
  { _key: "resin-gold", _type: "resinColorOption", label: "Gold Accent", value: "gold", hex: "#C9A45B" },
];

const craftsmanshipFeatures = [
  { _key: "cf-1", _type: "featureItem", icon: "Droplets", title: "Premium Resin", description: "7-layer museum-grade pour." },
  { _key: "cf-2", _type: "featureItem", icon: "Hand", title: "Handcrafted", description: "40+ hours, hand-finished." },
  { _key: "cf-3", _type: "featureItem", icon: "Sun", title: "UV Resistant", description: "Built to hold its brilliance." },
  { _key: "cf-4", _type: "featureItem", icon: "Gem", title: "Museum Finish", description: "Mirror-gloss polish." },
  { _key: "cf-5", _type: "featureItem", icon: "Award", title: "Limited Edition", description: "Numbered. Never reproduced." },
  { _key: "cf-6", _type: "featureItem", icon: "Frame", title: "Premium Frames", description: "Acrylic, wooden, or aluminum." },
];

const whyARK = [
  { _key: "wa-1", _type: "featureItem", icon: "Gem", title: "Premium Materials", description: "Only the finest resin, diecast models, and frame materials make it into an ARK piece." },
  { _key: "wa-2", _type: "featureItem", icon: "Hand", title: "Every Frame Handcrafted", description: "No mass production. Each piece is individually poured, sculpted, and finished by our artisans." },
  { _key: "wa-3", _type: "featureItem", icon: "FileCheck", title: "Certificate of Authenticity", description: "Every piece includes a numbered certificate signed by the founder." },
  { _key: "wa-4", _type: "featureItem", icon: "Award", title: "Collector's Edition", description: "Strictly limited runs. Your edition number is permanently recorded." },
  { _key: "wa-5", _type: "featureItem", icon: "Package", title: "Premium Packaging", description: "Magnetic closure box, microfiber cloth, and a handwritten thank you card." },
  { _key: "wa-6", _type: "featureItem", icon: "Infinity", title: "Lifetime Artwork", description: "Built to last generations. UV-resistant, scratch-resistant, museum-grade durability." },
];

const packagingItems = [
  { _key: "pk-1", _type: "packagingItem", title: "Magnetic Box", description: "Heavy-duty matte black box with gold ARK monogram and magnetic closure.", imageKey: "box" },
  { _key: "pk-2", _type: "packagingItem", title: "Certificate", description: "Premium black card with gold foil — edition number, materials, and signature.", imageKey: "certificate" },
  { _key: "pk-3", _type: "packagingItem", title: "Microfiber Cloth", description: "Ultra-soft cleaning cloth to maintain the pristine gloss finish.", imageKey: "microfiber" },
  { _key: "pk-4", _type: "packagingItem", title: "Thank You Card", description: "Handwritten note from the founder, thanking you for joining the ARK family.", imageKey: "thankYou" },
];

const timeline = [
  { _key: "tl-2019", _type: "timelineItem", year: "2019", title: "The Spark", description: "Founded in a small studio with a passion for cars and resin art." },
  { _key: "tl-2020", _type: "timelineItem", year: "2020", title: "First Collection", description: "Launched the Velocity Series with 5 supercar pieces." },
  { _key: "tl-2021", _type: "timelineItem", year: "2021", title: "Global Recognition", description: "Featured in luxury automotive publications worldwide." },
  { _key: "tl-2022", _type: "timelineItem", year: "2022", title: "Badge Series", description: "Introduced sculptural automotive crest artworks." },
  { _key: "tl-2023", _type: "timelineItem", year: "2023", title: "500+ Collectors", description: "Reached 500 collectors across 15 countries." },
  { _key: "tl-2024", _type: "timelineItem", year: "2024", title: "Custom Studio", description: "Opened dedicated custom order studio for bespoke pieces." },
  { _key: "tl-2025", _type: "timelineItem", year: "2025", title: "ARK Today", description: "Continuing to push the boundaries of resin art craftsmanship." },
];

const sitePatch = {
  sizes,
  frames,
  manufacturers,
  textures,
  resinColors,
  configuratorBasePrice: 8000,
  craftsmanshipFeatures,
  whyARK,
  packagingItems,
  timeline,
};

async function seed() {
  console.log("Seeding commerce + content into Site Settings…");

  const existing = await client.fetch(`*[_id == "siteSettings"][0]._id`);
  if (existing) {
    await client.patch("siteSettings").set(sitePatch).commit();
  } else {
    await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      ...sitePatch,
    });
  }
  console.log('✅ Site Settings: default size 18" × 22", frame Acrylic');

  // Lego series products → 20" × 31" only
  const legoIds = await client.fetch(`
    *[_type == "product" && series->slug.current == "lego"]._id
  `);

  if (legoIds?.length) {
    const tx = client.transaction();
    for (const id of legoIds) {
      tx.patch(id, (p) =>
        p.set({ sizes: legoSizes, frames: legoFrames })
      );
    }
    await tx.commit();
    console.log(
      `✅ Lego products (${legoIds.length}): size 20" × 31", frames Acrylic + Aluminum (×1.1)`
    );
  } else {
    console.log("ℹ️ No Lego-series products found to assign 20×31");
  }

  // Clear size overrides on non-lego so they inherit 18×22 from Site Settings
  const otherIds = await client.fetch(`
    *[_type == "product" && (
      !defined(series) || series->slug.current != "lego"
    )]._id
  `);
  if (otherIds?.length) {
    const tx = client.transaction();
    for (const id of otherIds) {
      tx.patch(id, (p) => p.set({ sizes: [], frames: [] }));
    }
    await tx.commit();
    console.log(`✅ Other products (${otherIds.length}): inherit 18" × 22"`);
  }

  console.log("   http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("Failed:", err.message || err);
  process.exit(1);
});
