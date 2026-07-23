import { AppProviders } from "@/components/providers/AppProviders";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { fetchSiteSettings } from "@/lib/cms";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await fetchSiteSettings();

  return (
    <SiteSettingsProvider settings={siteSettings}>
      <AppProviders>
        <Navbar />
        <ScrollProgress />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </AppProviders>
    </SiteSettingsProvider>
  );
}
