/**
 * Patch Site Settings with sizes, frames, manufacturers, configurator options.
 * Does not touch images or other content.
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

const commerce = {
  sizes: [
    { _key: "size-12x18", _type: "sizeOption", label: '12" × 18"', value: "12x18", priceMultiplier: 1 },
    { _key: "size-16x24", _type: "sizeOption", label: '16" × 24"', value: "16x24", priceMultiplier: 1.35 },
    { _key: "size-20x30", _type: "sizeOption", label: '20" × 30"', value: "20x30", priceMultiplier: 1.75 },
    { _key: "size-24x36", _type: "sizeOption", label: '24" × 36"', value: "24x36", priceMultiplier: 2.2 },
    { _key: "size-custom", _type: "sizeOption", label: "Custom Size", value: "custom", priceMultiplier: 2.5 },
  ],
  frames: [
    { _key: "frame-black", _type: "frameOption", label: "Matte Black", value: "black", hex: "#111111" },
    { _key: "frame-walnut", _type: "frameOption", label: "Walnut", value: "walnut", hex: "#5C4033" },
    { _key: "frame-natural", _type: "frameOption", label: "Natural Oak", value: "natural", hex: "#C4A77D" },
  ],
  manufacturers: [
    "Porsche",
    "BMW",
    "Audi",
    "Mercedes",
    "Ferrari",
    "Lamborghini",
    "McLaren",
    "Bentley",
  ],
  textures: [
    { _key: "tex-volcanic", _type: "textureOption", label: "Volcanic Obsidian", value: "volcanic" },
    { _key: "tex-splash", _type: "textureOption", label: "Resin Splash", value: "splash" },
    { _key: "tex-smoke", _type: "textureOption", label: "Smoke Flow", value: "smoke" },
    { _key: "tex-tracks", _type: "textureOption", label: "Tire Tracks", value: "tracks" },
    { _key: "tex-gold", _type: "textureOption", label: "Gold Veins", value: "gold" },
  ],
  resinColors: [
    { _key: "resin-black", _type: "resinColorOption", label: "Deep Black", value: "black", hex: "#111111" },
    { _key: "resin-charcoal", _type: "resinColorOption", label: "Charcoal", value: "charcoal", hex: "#333333" },
    { _key: "resin-grey", _type: "resinColorOption", label: "Smoky Grey", value: "grey", hex: "#666666" },
    { _key: "resin-gold", _type: "resinColorOption", label: "Gold Accent", value: "gold", hex: "#C9A45B" },
  ],
  configuratorBasePrice: 40000,
};

async function seed() {
  console.log("Seeding commerce options into Site Settings…");

  const existing = await client.fetch(`*[_id == "siteSettings"][0]._id`);

  if (existing) {
    await client.patch("siteSettings").set(commerce).commit();
  } else {
    await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      ...commerce,
    });
  }

  console.log("✅ Commerce options saved to Site Settings");
  console.log("   Edit in Studio → Site Settings → Sizes & Frames / Configurator");
  console.log("   http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("Failed:", err.message || err);
  process.exit(1);
});
