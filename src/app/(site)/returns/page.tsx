import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";

export const metadata: Metadata = {
  title: "Returns",
  description: "ARK returns and exchange policy for handcrafted resin art.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading title="Returns & Exchanges" align="left" />
        <div className="space-y-6 text-grey leading-relaxed">
          <p>Due to the bespoke, handcrafted nature of ARK pieces, all sales are final on limited edition items.</p>
          <p>Custom orders cannot be returned or exchanged once production has begun.</p>
          <p>If your piece arrives damaged, contact us within 48 hours with photos. We will arrange a replacement or repair at no cost.</p>
        </div>
      </div>
    </div>
  );
}
