import type { FilteredResponseQueryOptions } from "next-sanity";

/** Re-fetch CMS content — no cache in dev, 60s ISR in production */
export const sanityFetchOptions: FilteredResponseQueryOptions = {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    tags: ["sanity"],
  },
};
