import type { FilteredResponseQueryOptions } from "next-sanity";

/** Re-fetch CMS content every 60s so Studio uploads appear without a rebuild */
export const sanityFetchOptions: FilteredResponseQueryOptions = {
  next: { revalidate: 60, tags: ["sanity"] },
};
