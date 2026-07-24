import { imageAssetFields } from "./queries/image-projection";

export const productsQuery = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  series,
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
  craftsmanship,
  packaging,
  shipping,
  reviews
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  series,
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
  craftsmanship,
  packaging,
  shipping,
  reviews
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  series,
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
  craftsmanship,
  packaging,
  shipping,
  reviews
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
  instagramImages[]{ ${imageAssetFields} }
}`;
