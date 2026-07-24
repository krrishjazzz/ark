/**
 * Quick check: do Sanity products return resolvable image URLs?
 * Run: npm run debug:images
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createImageUrlBuilder } from "@sanity/image-url";

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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId, dataset });

const imageAssetFields = `
  ...,
  asset->{
    _id,
    url,
    mimeType
  }
`;

const query = `*[_type == "product"] | order(name asc) {
  name,
  "slug": slug.current,
  images[]{ ${imageAssetFields} }
}`;

const docs = await client.fetch(query);

console.log("\n📸 Published product images (what the website reads):\n");

let missing = 0;

for (const doc of docs) {
  const urls = (doc.images || [])
    .filter(Boolean)
    .map((img) => {
      try {
        return builder.image(img).width(800).auto("format").url();
      } catch {
        return img?.asset?.url ? `${img.asset.url}?w=800` : null;
      }
    })
    .filter(Boolean);

  const status = urls.length > 0 ? "✓" : "✗ NO URL";
  if (urls.length === 0) missing++;
  console.log(`${status} ${doc.name} (${doc.slug}) — ${urls.length} image(s)`);
  urls.slice(0, 1).forEach((u) => console.log(`    ${u}`));
}

console.log(`\n${missing === 0 ? "✅" : "⚠️"} ${docs.length - missing}/${docs.length} products have published images`);
if (missing > 0) {
  console.log("\nIf Studio shows images but this says NO URL:");
  console.log("  1. Click the green Publish button in Studio (drafts are not on the site)");
  console.log("  2. Ensure photos are in the Images field, not only the media library");
  console.log("  3. Run npm run sync:sanity if you created photo-only products\n");
}
