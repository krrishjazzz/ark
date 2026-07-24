/** Expand Sanity image/file assets so CDN URLs resolve reliably */
export const imageAssetFields = `
  ...,
  asset->{
    _id,
    url,
    mimeType,
    metadata {
      dimensions,
      lqip
    }
  }
`;
