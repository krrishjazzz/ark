/**
 * Create car series in Sanity and assign products:
 * 1. Environment — Audi, Mercedes, Mustang
 * 2. Drift — Rolls Royce
 * 3. Lego — Ferrari + Ford GT (if present)
 * 4. Small Car — empty / coming soon
 *
 * Usage: npm run seed:series
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
  console.error("\n❌ Missing SANITY_API_TOKEN in .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const seriesDocs = [
  {
    _id: "series-environment",
    _type: "productSeries",
    name: "Environment",
    slug: { _type: "slug", current: "environment" },
    collection: "cars",
    sortOrder: 1,
    slotCount: 3,
    description:
      "Machines set in sculpted landscapes and atmospheric resin worlds.",
    comingSoon: false,
  },
  {
    _id: "series-drift",
    _type: "productSeries",
    name: "Drift",
    slug: { _type: "slug", current: "drift" },
    collection: "cars",
    sortOrder: 2,
    slotCount: 3,
    description: "Motion frozen mid-slide — smoke, marble, and speed.",
    comingSoon: false,
  },
  {
    _id: "series-lego",
    _type: "productSeries",
    name: "Lego",
    slug: { _type: "slug", current: "lego" },
    collection: "cars",
    sortOrder: 3,
    slotCount: 3,
    description: "Iconic builds reimagined as resin gallery pieces.",
    comingSoon: false,
  },
  {
    _id: "series-small-car",
    _type: "productSeries",
    name: "Small Car",
    slug: { _type: "slug", current: "small-car" },
    collection: "cars",
    sortOrder: 4,
    slotCount: 3,
    description: "Compact icons, big presence.",
    comingSoon: true,
  },
];

/** slug → series document id */
const assignmentsBySlug = {
  "audi-r8-predator": "series-environment",
  "mercedes-amg-silver-storm": "series-environment",
  "ford-mustang-classic": "series-environment",
  "rolls-royce-phantom": "series-drift",
  "ferrari-f1-sf23": "series-lego",
  "ferrari-f1-sf24": "series-lego",
};

async function seed() {
  console.log("Seeding car series…");

  const tx = client.transaction();
  for (const doc of seriesDocs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log("✅ Series: Environment → Drift → Lego → Small Car");

  const products = await client.fetch(
    `*[_type == "product" && collection == "cars"]{ _id, "slug": slug.current, name }`
  );

  const productTx = client.transaction();
  let assigned = 0;

  for (const product of products) {
    let seriesId = assignmentsBySlug[product.slug];

    // Ford GT → Lego (match by slug or name)
    if (
      !seriesId &&
      (product.slug?.includes("ford-gt") ||
        /ford\s*gt/i.test(product.name || ""))
    ) {
      seriesId = "series-lego";
    }

    // Loose manufacturer fallbacks for known cars
    if (!seriesId) {
      const name = (product.name || "").toLowerCase();
      if (name.includes("audi") || name.includes("mercedes") || name.includes("mustang")) {
        seriesId = "series-environment";
      } else if (name.includes("rolls") || name.includes("drift")) {
        seriesId = "series-drift";
      } else if (name.includes("ferrari") || name.includes("ford gt")) {
        seriesId = "series-lego";
      }
    }

    if (seriesId) {
      productTx.patch(product._id, (p) =>
        p.set({
          series: { _type: "reference", _ref: seriesId },
        })
      );
      assigned += 1;
      console.log(`  · ${product.name || product.slug} → ${seriesId.replace("series-", "")}`);
    } else {
      console.log(`  · skipped (no series match): ${product.name || product.slug}`);
    }
  }

  if (assigned > 0) {
    await productTx.commit();
  }

  console.log(`✅ Assigned ${assigned} car products to series`);

  // Wire Site Settings → Collection Series Order (add/remove/reorder here)
  const seriesRefs = seriesDocs.map((s) => ({
    _key: `cs-${s._id}`,
    _type: "reference",
    _ref: s._id,
  }));

  const settingsExist = await client.fetch(`*[_id == "siteSettings"][0]._id`);
  if (settingsExist) {
    await client.patch("siteSettings").set({ collectionSeries: seriesRefs }).commit();
  } else {
    await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      collectionSeries: seriesRefs,
    });
  }
  console.log("✅ Site Settings → Series order linked");
  console.log("   Edit in Studio → Series, or Site Settings → Series");
  console.log("   http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("Failed:", err.message || err);
  process.exit(1);
});
