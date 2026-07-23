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
};
