import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping",
  description: "ARK shipping information — insured premium delivery worldwide.",
};

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading title="Shipping" align="left" />
        <div className="prose prose-invert space-y-6 text-grey leading-relaxed">
          <p>All ARK pieces are shipped in premium magnetic closure boxes with full insurance coverage.</p>
          <p><strong className="text-foreground">Domestic (India):</strong> 7–14 business days. Complimentary shipping on orders above ₹50,000.</p>
          <p><strong className="text-foreground">International:</strong> 14–21 business days. Customs duties may apply.</p>
          <p>Every shipment includes tracking, insurance, and a certificate of authenticity.</p>
        </div>
      </div>
    </div>
  );
}
