export interface SizeOption {
  label: string;
  value: string;
  priceMultiplier: number;
}

export interface FrameOption {
  label: string;
  value: string;
  hex: string;
}

export interface LabeledOption {
  label: string;
  value: string;
}

export interface ResinColorOption extends LabeledOption {
  hex: string;
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
  /** Frame finish options (editable in Sanity) */
  frames: FrameOption[];
  /** Garage / configurator manufacturer filters */
  manufacturers: string[];
  /** Configurator background textures */
  textures: LabeledOption[];
  /** Configurator resin colors */
  resinColors: ResinColorOption[];
  /** Configurator starting price before size multiplier */
  configuratorBasePrice: number;
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
};
