export interface SizeOption {
  label: string;
  value: string;
  /** Extra ₹ on top of sale price (usually 0 when only one size) */
  priceAdd?: number;
  /** @deprecated use priceAdd */
  priceMultiplier?: number;
}

export interface FrameOption {
  label: string;
  value: string;
  hex: string;
  /** Extra ₹ on top of sale price (Acrylic = 0) */
  priceAdd?: number;
  /** @deprecated use priceAdd */
  priceMultiplier?: number;
}

export interface LabeledOption {
  label: string;
  value: string;
}

export interface ResinColorOption extends LabeledOption {
  hex: string;
}

export interface ContentFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PackagingContentItem {
  title: string;
  description: string;
  imageKey: "box" | "certificate" | "microfiber" | "thankYou";
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SiteSettings {
  logo: string;
  heroImage: string;
  craftsmanshipPrimary: string;
  craftsmanshipSecondary: string;
  brandBoardPrimary: string;
  brandBoardSecondary: string;
  configuratorPreview: string;
  aboutHero: string;
  packaging: {
    box: string;
    certificate: string;
    microfiber: string;
    thankYou: string;
  };
  instagramImages: string[];
  /** Product purchase + configurator size options (editable in Sanity) */
  sizes: SizeOption[];
  /** Frame materials (editable in Sanity) */
  frames: FrameOption[];
  /** Garage / configurator manufacturer filters */
  manufacturers: string[];
  /** Configurator background textures */
  textures: LabeledOption[];
  /** Configurator resin colors */
  resinColors: ResinColorOption[];
  /** Configurator starting sale price before size/frame extras */
  configuratorBasePrice: number;
  craftsmanshipFeatures: ContentFeature[];
  whyARK: ContentFeature[];
  packagingItems: PackagingContentItem[];
  timeline: TimelineItem[];
}

export const EMPTY_SITE_SETTINGS: SiteSettings = {
  logo: "",
  heroImage: "",
  craftsmanshipPrimary: "",
  craftsmanshipSecondary: "",
  brandBoardPrimary: "",
  brandBoardSecondary: "",
  configuratorPreview: "",
  aboutHero: "",
  packaging: {
    box: "",
    certificate: "",
    microfiber: "",
    thankYou: "",
  },
  instagramImages: [],
  sizes: [],
  frames: [],
  manufacturers: [],
  textures: [],
  resinColors: [],
  configuratorBasePrice: 0,
  craftsmanshipFeatures: [],
  whyARK: [],
  packagingItems: [],
  timeline: [],
};
