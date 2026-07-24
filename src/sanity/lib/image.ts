import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

function assetDirectUrl(source: SanityImageSource, width: number): string | undefined {
  if (!source || typeof source !== "object") return undefined;
  const asset = (source as { asset?: { url?: string } }).asset;
  if (asset?.url) {
    const sep = asset.url.includes("?") ? "&" : "?";
    return `${asset.url}${sep}w=${width}&auto=format&q=85`;
  }
  return undefined;
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | undefined,
  width = 1200
): string | undefined {
  if (!source) return undefined;

  if (typeof source === "string") {
    return source.startsWith("http") ? source : undefined;
  }

  try {
    const built = builder.image(source).width(width).auto("format").quality(85).url();
    if (built) return built;
  } catch {
    /* fall through to direct asset URL */
  }

  return assetDirectUrl(source, width);
}
