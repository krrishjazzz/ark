/** Re-fetch CMS content every 60s so Studio uploads appear without a rebuild */
export const sanityFetchOptions = {
  next: { revalidate: 60, tags: ["sanity"] },
} as const;
