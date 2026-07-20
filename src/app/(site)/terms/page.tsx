import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading title="Terms of Service" align="left" />
        <div className="space-y-6 text-grey leading-relaxed text-sm">
          <p>By purchasing from ARK, you agree to these terms. All artwork is sold as described with numbered edition certificates.</p>
          <p>Prices are listed in INR and may change without notice. Custom orders require a 50% deposit before production begins.</p>
          <p>ARK retains all intellectual property rights to designs, textures, and artistic compositions.</p>
        </div>
      </div>
    </div>
  );
}
