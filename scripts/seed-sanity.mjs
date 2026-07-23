import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = resolve(__dirname, "../public/images");

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

const uploadedAssets = new Map();

async function uploadImage(filename) {
  if (uploadedAssets.has(filename)) {
    return uploadedAssets.get(filename);
  }

  const fullPath = resolve(IMAGES_DIR, filename);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Missing image: ${filename}`);
    return null;
  }

  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: filename.endsWith(".jpg") ? "image/jpeg" : "image/png",
  });

  const ref = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };

  uploadedAssets.set(filename, ref);
  console.log(`  ✓ Uploaded ${filename}`);
  return ref;
}

async function uploadImages(filenames) {
  const refs = [];
  for (const filename of filenames) {
    const ref = await uploadImage(filename);
    if (ref) refs.push(ref);
  }
  return refs;
}

async function uploadSingle(filename) {
  return uploadImage(filename);
}

const products = [
  {
    _type: "product",
    _id: "product-audi-r8",
    name: "Audi R8 — Predator Edition",
    slug: { _type: "slug", current: "audi-r8-predator" },
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
    imageFiles: ["collection-audi-r8.png", "product-wall.png", "product-easel.png"],
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
  {
    _type: "product",
    _id: "product-rolls-royce",
    name: "Rolls Royce — Phantom Drift",
    slug: { _type: "slug", current: "rolls-royce-phantom" },
    series: "Cars Collection",
    manufacturer: "Rolls Royce",
    tagline: "Effortless grandeur.",
    description:
      "A Rolls Royce captured mid-drift through marbled grey resin with metallic smoke textures. The pinnacle of automotive luxury, frozen forever.",
    basePrice: 15000,
    compareAtPrice: 52000,
    editionCurrent: 4,
    editionTotal: 25,
    featured: true,
    collection: "cars",
    imageFiles: ["collection-rolls-royce.png", "product-topdown.png"],
    craftsmanship: [
      "Marbled resin pour technique",
      "Metallic smoke splash textures",
      "Premium diecast Rolls Royce model",
      "Hand-polished gloss finish",
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
  {
    _type: "product",
    _id: "product-mustang",
    name: "Ford Mustang — Ocean Classic",
    slug: { _type: "slug", current: "ford-mustang-classic" },
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
    imageFiles: ["collection-mustang.png", "product-easel.png"],
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
  {
    _type: "product",
    _id: "product-ferrari-f1",
    name: "Ferrari F1 — SF-23",
    slug: { _type: "slug", current: "ferrari-f1-sf23" },
    series: "Cars Collection",
    manufacturer: "Ferrari",
    tagline: "Prancing horse. Racing glory.",
    description:
      "The Ferrari SF-23 Formula 1 car immortalized on a bold Rosso Corsa resin canvas. For the Scuderia devotee who lives at the limit.",
    basePrice: 10000,
    compareAtPrice: 48000,
    editionCurrent: 2,
    editionTotal: 30,
    featured: true,
    collection: "cars",
    imageFiles: ["collection-ferrari-f1.png", "product-grid.png"],
    craftsmanship: [
      "Bold Rosso Corsa resin base",
      "Premium F1 diecast model",
      "Hand-polished gloss finish",
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
  {
    _type: "product",
    _id: "product-bmw-m1000rr",
    name: "BMW M 1000 RR — Motorrad Collage",
    slug: { _type: "slug", current: "bmw-m1000rr-motorrad" },
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
    imageFiles: ["collection-bmw-motorrad.png"],
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
  {
    _type: "product",
    _id: "product-suzuki-gsxr",
    name: "Suzuki GSX-R — Chrome Drift",
    slug: { _type: "slug", current: "suzuki-gsxr-chrome" },
    series: "Motorcycles Collection",
    manufacturer: "Suzuki",
    tagline: "Raw stone. Mirror black.",
    description:
      "A black Suzuki GSX-R frozen mid-drift across sculpted charcoal stone and deep mirror-gloss resin — chrome Suzuki branding embossed at the base.",
    basePrice: 36000,
    editionCurrent: 5,
    editionTotal: 40,
    featured: false,
    collection: "motorcycles",
    imageFiles: ["collection-suzuki-gsxr.png"],
    craftsmanship: [
      "Sculpted charcoal stone texture",
      "Mirror-gloss black resin pour",
      "Premium diecast GSX-R model",
      "Chrome embossed brand lettering",
      "UV resistant coating",
      "Solid gallery frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
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
      "A shattered Johnnie Walker Double Black bottle suspended in deep obsidian resin with subtle crimson glitter. A statement piece for the discerning collector's bar or study.",
    basePrice: 32000,
    editionCurrent: 6,
    editionTotal: 40,
    featured: true,
    collection: "wine-bottle",
    imageFiles: ["collection-johnnie-walker.png"],
    craftsmanship: [
      "Hand-shattered authentic glass fragments",
      "Deep obsidian resin pour with glitter inclusions",
      "Matte black gallery frame",
      "UV resistant museum coating",
      "Layered depth composition",
    ],
    packaging: [
      "Premium magnetic closure box",
      "Certificate of authenticity",
      "Microfiber cleaning cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days. Fully insured premium packaging.",
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
      "A green Jägermeister bottle exploded across rippling black resin — dynamic splashes frozen mid-motion. Raw energy meets refined gallery presentation.",
    basePrice: 28000,
    editionCurrent: 9,
    editionTotal: 50,
    featured: false,
    collection: "wine-bottle",
    imageFiles: ["collection-jagermeister.png"],
    craftsmanship: [
      "Dynamic splash resin sculpting",
      "Authentic green glass shards",
      "Embossed brand detail in resin base",
      "Matte black frame",
      "UV resistant coating",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
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
      "Ballantine's Finest Scotch Whisky shattered across a mirror-gloss black resin canvas. Amber glass fragments catch light like cut gemstones.",
    basePrice: 30000,
    editionCurrent: 4,
    editionTotal: 35,
    featured: false,
    collection: "wine-bottle",
    imageFiles: ["collection-ballantines.png"],
    craftsmanship: [
      "Mirror-gloss black resin base",
      "Hand-placed amber glass shards",
      "Original label preservation",
      "Matte black gallery frame",
      "UV resistant coating",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
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
      "Jack Daniel's Old No. 7 captured in explosive fragmentation with swirling white smoke resin and a hammered black luxury frame. Monochrome drama at its finest.",
    basePrice: 35000,
    editionCurrent: 3,
    editionTotal: 30,
    featured: true,
    collection: "wine-bottle",
    imageFiles: ["collection-jack-daniels.png"],
    craftsmanship: [
      "White smoke resin swirl technique",
      "Hammered texture luxury frame",
      "Authentic shattered bottle composition",
      "High-gloss layered resin pour",
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
  {
    _type: "product",
    _id: "product-bombay-sapphire",
    name: "Bombay Sapphire — Sapphire Shards",
    slug: { _type: "slug", current: "bombay-sapphire-gin" },
    series: "Wine Bottle Collection",
    manufacturer: "Bombay Sapphire",
    tagline: "Botanical beauty. Shattered light.",
    description:
      "Iconic blue Bombay Sapphire glass shards scattered across jet-black resin — botanical illustrations preserved in crystal fragments. Elegant contrast for the modern collector.",
    basePrice: 31000,
    editionCurrent: 7,
    editionTotal: 45,
    featured: false,
    collection: "wine-bottle",
    imageFiles: ["collection-bombay-sapphire.png"],
    craftsmanship: [
      "Translucent blue glass shard placement",
      "Jet-black high-gloss resin base",
      "Botanical label detail preservation",
      "Matte black gallery frame",
      "UV resistant coating",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
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
      "A sculpted 3D Spider-Man mask in glossy red and black webbing, mounted on a splattered crimson panel inside a deep shadow-box frame. Hand-signed by the artist.",
    basePrice: 34000,
    editionCurrent: 4,
    editionTotal: 35,
    featured: true,
    collection: "marvel",
    imageFiles: ["collection-spider-man.png"],
    craftsmanship: [
      "3D sculpted mask relief",
      "Gloss red and black webbing finish",
      "Splatter-textured crimson background",
      "Deep shadow-box gallery frame",
      "Hand-signed artist edition",
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
  {
    _type: "product",
    _id: "product-batman",
    name: "Batman — Dark Knight Relief",
    slug: { _type: "slug", current: "batman-dark-knight-relief" },
    series: "Marvel Collection",
    manufacturer: "DC",
    tagline: "The night belongs to the wall.",
    description:
      "A brooding 3D Batman cowl in high-gloss black resin, set against a smoky charcoal shadow-box interior. Dramatic highlights, deep shadows, unmistakable presence.",
    basePrice: 36000,
    editionCurrent: 2,
    editionTotal: 30,
    featured: false,
    collection: "marvel",
    imageFiles: ["collection-batman.png"],
    craftsmanship: [
      "3D sculpted cowl relief",
      "High-gloss black resin finish",
      "Smoky charcoal shadow-box interior",
      "Deep gallery frame with tiered molding",
      "Hand-signed artist edition",
      "UV resistant coating",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
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
    imageFile: "collection-car-grid.png",
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
    imageFile: "collection-bmw-motorrad.png",
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
    imageFile: "collection-johnnie-walker.png",
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
    imageFile: "collection-spider-man.png",
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
    imageFile: "product-wall.png",
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
    imageFile: "packaging-box.png",
  },
  {
    _type: "testimonial",
    _id: "testimonial-3",
    name: "Vikram Reddy",
    location: "Hyderabad, India",
    rating: 5,
    quote:
      "As an interior designer, I've specified ARK for three luxury projects. The craftsmanship is unmatched in the resin art space.",
    product: "BMW S1000RR — Impact",
    imageFile: "product-easel.png",
  },
  {
    _type: "testimonial",
    _id: "testimonial-4",
    name: "James Morrison",
    location: "Dubai, UAE",
    rating: 5,
    quote:
      "Edition 12 of 50. Knowing mine is one of only fifty makes it feel truly exclusive. The certificate of authenticity is a beautiful touch.",
    product: "Ferrari 488 — Velocity",
    imageFile: "product-topdown.png",
  },
];

const galleryImages = [
  { _id: "gallery-0", alt: "ARK car collection in luxury gallery setting", category: "Gallery Display", imageFile: "hero-bg.jpg" },
  { _id: "gallery-1", alt: "ARK art in luxury living room", category: "Luxury Homes", imageFile: "product-wall.png" },
  { _id: "gallery-2", alt: "ARK art in executive office", category: "Offices", imageFile: "product-easel.png" },
  { _id: "gallery-3", alt: "ARK art in car showroom", category: "Car Showrooms", imageFile: "product-grid.png" },
  { _id: "gallery-4", alt: "ARK art in gaming setup", category: "Gaming Rooms", imageFile: "product-topdown.png" },
  { _id: "gallery-5", alt: "ARK brand display wall", category: "Wall Mockups", imageFile: "brand-board-1.png" },
  { _id: "gallery-6", alt: "ARK packaging unboxing", category: "Luxury Homes", imageFile: "packaging-box.png" },
  { _id: "gallery-7", alt: "ARK collection display", category: "Offices", imageFile: "brand-board-2.png" },
  { _id: "gallery-8", alt: "ARK in automotive gallery", category: "Car Showrooms", imageFile: "collection-car-grid.png" },
];

async function seed() {
  console.log("🌱 Seeding Sanity project:", projectId);
  console.log("\n📸 Uploading images to Sanity CDN...\n");

  const productDocs = [];
  for (const { imageFiles, ...product } of products) {
    const images = await uploadImages(imageFiles);
    productDocs.push({ ...product, images });
  }

  const collectionDocs = [];
  for (const { imageFile, ...collection } of collections) {
    const image = await uploadSingle(imageFile);
    collectionDocs.push({ ...collection, ...(image ? { image } : {}) });
  }

  const testimonialDocs = [];
  for (const { imageFile, ...testimonial } of testimonials) {
    const image = await uploadSingle(imageFile);
    testimonialDocs.push({ ...testimonial, ...(image ? { image } : {}) });
  }

  const galleryDocs = [];
  for (const { imageFile, ...gallery } of galleryImages) {
    const image = await uploadSingle(imageFile);
    galleryDocs.push({
      _type: "galleryImage",
      ...gallery,
      ...(image ? { image } : {}),
    });
  }

  const [
    logo,
    heroImage,
    craftsmanshipPrimary,
    craftsmanshipSecondary,
    brandBoardPrimary,
    brandBoardSecondary,
    configuratorPreview,
    aboutHero,
    packagingBox,
    packagingCertificate,
    packagingMicrofiber,
    packagingThankYou,
  ] = await Promise.all([
    uploadSingle("logo.png"),
    uploadSingle("hero-bg.jpg"),
    uploadSingle("collection-audi-r8.png"),
    uploadSingle("collection-rolls-royce.png"),
    uploadSingle("brand-board-1.png"),
    uploadSingle("brand-board-2.png"),
    uploadSingle("product-easel.png"),
    uploadSingle("product-topdown.png"),
    uploadSingle("packaging-box.png"),
    uploadSingle("packaging-certificate.png"),
    uploadSingle("packaging-microfiber.png"),
    uploadSingle("packaging-thank-you.png"),
  ]);

  const instagramImages = await uploadImages([
    "product-wall.png",
    "product-easel.png",
    "product-grid.png",
    "packaging-box.png",
    "product-topdown.png",
    "brand-board-1.png",
  ]);

  const siteSettingsDoc = {
    _type: "siteSettings",
    _id: "siteSettings",
    ...(logo && { logo }),
    ...(heroImage && { heroImage }),
    ...(craftsmanshipPrimary && { craftsmanshipPrimary }),
    ...(craftsmanshipSecondary && { craftsmanshipSecondary }),
    ...(brandBoardPrimary && { brandBoardPrimary }),
    ...(brandBoardSecondary && { brandBoardSecondary }),
    ...(configuratorPreview && { configuratorPreview }),
    ...(aboutHero && { aboutHero }),
    ...(packagingBox && { packagingBox }),
    ...(packagingCertificate && { packagingCertificate }),
    ...(packagingMicrofiber && { packagingMicrofiber }),
    ...(packagingThankYou && { packagingThankYou }),
    ...(instagramImages.length > 0 && { instagramImages }),
  };

  console.log("\n💾 Saving documents...\n");

  const transaction = client.transaction();
  for (const doc of [
    ...productDocs,
    ...collectionDocs,
    ...testimonialDocs,
    ...galleryDocs,
    siteSettingsDoc,
  ]) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();

  console.log("✅ Seeded successfully:");
  console.log(`   • ${productDocs.length} products with images`);
  console.log(`   • ${collectionDocs.length} collections with cover images`);
  console.log(`   • ${testimonialDocs.length} testimonials`);
  console.log(`   • ${galleryDocs.length} gallery images`);
  console.log("   • Site settings (logo, hero, packaging, instagram)");
  console.log(`\n🖼  ${uploadedAssets.size} unique assets on cdn.sanity.io`);
  console.log("\n   Manage images in Studio: http://localhost:3000/studio");
}

seed().catch((err) => {
  const msg = err.message || String(err);
  if (msg.includes("Insufficient permissions") || msg.includes("permission")) {
    console.error(
      "\n❌ Token lacks write permission.\n\n" +
        "   Fix:\n" +
        "   1. Open https://www.sanity.io/manage/project/jvnzq2ee/api#tokens\n" +
        "   2. Create API token → Permissions: Editor\n" +
        "   3. Copy into .env.local as SANITY_API_TOKEN=...\n" +
        "   4. Run npm run seed again\n"
    );
  } else {
    console.error("Seed failed:", msg);
  }
  process.exit(1);
});
