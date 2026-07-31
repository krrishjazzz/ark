import { imageAssetFields } from "./queries/image-projection";

const seriesProjection = `series->{
  _id,
  name,
  "slug": slug.current,
  collection,
  sortOrder,
  description,
  comingSoon
}`;

export const productsQuery = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  ${seriesProjection},
  manufacturer,
  tagline,
  description,
  basePrice,
  compareAtPrice,
  images[]{ ${imageAssetFields} },
  editionCurrent,
  editionTotal,
  featured,
  collection,
  sizes[]{ label, value, priceMultiplier },
  frames[]{ label, value, hex, priceMultiplier },
  craftsmanship,
  packaging,
  shipping,
  reviews
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  ${seriesProjection},
  manufacturer,
  tagline,
  description,
  basePrice,
  compareAtPrice,
  images[]{ ${imageAssetFields} },
  editionCurrent,
  editionTotal,
  featured,
  collection,
  sizes[]{ label, value, priceMultiplier },
  frames[]{ label, value, hex, priceMultiplier },
  craftsmanship,
  packaging,
  shipping,
  reviews
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  ${seriesProjection},
  manufacturer,
  tagline,
  description,
  basePrice,
  compareAtPrice,
  images[]{ ${imageAssetFields} },
  editionCurrent,
  editionTotal,
  featured,
  collection,
  sizes[]{ label, value, priceMultiplier },
  frames[]{ label, value, hex, priceMultiplier },
  craftsmanship,
  packaging,
  shipping,
  reviews
}`;

export const seriesByCollectionQuery = `*[_type == "productSeries" && collection == $collection] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current,
  collection,
  sortOrder,
  slotCount,
  description,
  comingSoon
}`;

export const siteSettingsSeriesQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  collectionSeries[]->{
    _id,
    name,
    "slug": slug.current,
    collection,
    sortOrder,
    slotCount,
    description,
    comingSoon
  }
}`;

export const collectionsQuery = `*[_type == "collection"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  tagline,
  description,
  image{ ${imageAssetFields} },
  productCount,
  comingSoon
}`;

export const collectionBySlugQuery = `*[_type == "collection" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  description,
  image{ ${imageAssetFields} },
  productCount,
  comingSoon
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  name,
  location,
  rating,
  quote,
  product,
  image{ ${imageAssetFields} }
}`;

export const galleryImagesQuery = `*[_type == "galleryImage"] | order(_createdAt desc) {
  _id,
  alt,
  category,
  image{ ${imageAssetFields} }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  logo{ ${imageAssetFields} },
  heroImage{ ${imageAssetFields} },
  craftsmanshipPrimary{ ${imageAssetFields} },
  craftsmanshipSecondary{ ${imageAssetFields} },
  brandBoardPrimary{ ${imageAssetFields} },
  brandBoardSecondary{ ${imageAssetFields} },
  configuratorPreview{ ${imageAssetFields} },
  aboutHero{ ${imageAssetFields} },
  packagingBox{ ${imageAssetFields} },
  packagingCertificate{ ${imageAssetFields} },
  packagingMicrofiber{ ${imageAssetFields} },
  packagingThankYou{ ${imageAssetFields} },
  instagramImages[]{ ${imageAssetFields} },
  sizes[]{ label, value, priceMultiplier },
  frames[]{ label, value, hex, priceMultiplier },
  manufacturers,
  collectionSeries[]->{
    _id,
    name,
    "slug": slug.current,
    collection,
    sortOrder,
    slotCount,
    description,
    comingSoon
  },
  textures[]{ label, value },
  resinColors[]{ label, value, hex },
  configuratorBasePrice,
  craftsmanshipFeatures[]{ icon, title, description },
  whyARK[]{ icon, title, description },
  packagingItems[]{ title, description, imageKey },
  timeline[]{ year, title, description }
}`;
