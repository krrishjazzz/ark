"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function ProductViewTracker({ slug }: { slug: string }) {
  const { addToRecentlyViewed } = useStore();

  useEffect(() => {
    addToRecentlyViewed(slug);
  }, [slug, addToRecentlyViewed]);

  return null;
}
