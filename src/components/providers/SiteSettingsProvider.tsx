"use client";

import { createContext, useContext } from "react";
import {
  EMPTY_SITE_SETTINGS,
  type SiteSettings,
} from "@/types/site-settings";

const SiteSettingsContext = createContext<SiteSettings>(EMPTY_SITE_SETTINGS);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
