/**
 * Sets sale prices (₹5k–₹10k), clears original/compare prices,
 * and clears per-product size/frame overrides so Site Settings apply.
 *
 * Run: npm run seed:prices
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

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/** slug → sale price (INR) */
const PRICES = {
  "audi-r8-predator": 9000,
  "rolls-royce-phantom": 10000,
  "ford-mustang-classic": 5000,
  "ferrari-f1-sf23": 7000,
  "ferrari-f1-sf24": 7000,
  "mercedes-amg-silver-storm": 8000,
  "bmw-m1000rr-motorrad": 10000,
  "suzuki-gsxr-chrome": 9000,
  "johnnie-walker-double-black": 8000,
  "jagermeister-shattered": 6000,
  "ballantines-finest": 7000,
  "jack-daniels-no7": 9000,
  "bombay-sapphire-gin": 7500,
  "spider-man-web-relief": 8500,
  "batman-dark-knight-relief": 9500,
};

async function main() {
  const products = await client.fetch(
    `*[_type == "product"]{ _id, "slug": slug.current, basePrice, compareAtPrice }`
  );

  let updated = 0;
  const tx = client.transaction();

  for (const doc of products) {
    const sale = PRICES[doc.slug] ?? 8000;

    tx.patch(doc._id, {
      set: {
        basePrice: sale,
        sizes: [],
        frames: [],
      },
      unset: ["compareAtPrice"],
    });
    updated += 1;
    const note = PRICES[doc.slug] == null ? " (default ₹8000)" : "";
    console.log(`${doc.slug}: ₹${sale}${note}`);
  }

  if (updated === 0) {
    console.log("Nothing to update.");
    return;
  }

  await tx.commit();
  console.log(`\nUpdated ${updated} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
