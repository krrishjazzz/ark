import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading title="Privacy Policy" align="left" />
        <div className="space-y-6 text-grey leading-relaxed text-sm">
          <p>ARK Aesthetic Resin Kreations respects your privacy. We collect only the information necessary to process orders and communicate with you.</p>
          <p>We do not sell or share your personal data with third parties except as required for order fulfillment and payment processing.</p>
          <p>For questions, contact hello@arkresin.art</p>
        </div>
      </div>
    </div>
  );
}
