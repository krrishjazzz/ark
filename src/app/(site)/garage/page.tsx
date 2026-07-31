import { fetchProducts, fetchSiteSettings } from "@/lib/cms";
import { GarageClient } from "@/components/garage/GarageClient";

export const revalidate = 60;

export default async function GaragePage() {
  const [products, settings] = await Promise.all([
    fetchProducts(),
    fetchSiteSettings(),
  ]);

  return (
    <GarageClient
      products={products}
      manufacturers={settings.manufacturers}
    />
  );
}
