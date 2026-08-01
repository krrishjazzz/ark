"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const codeFromUrl = searchParams.get("code");
  const [total, setTotal] = useState<number | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(codeFromUrl);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ark-last-order");
      if (saved) {
        const order = JSON.parse(saved);
        setTotal(order.total ?? null);
        if (order.trackingCode) setTrackingCode(order.trackingCode);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const trackHref = trackingCode
    ? `/track?code=${encodeURIComponent(trackingCode)}`
    : "/track";

  const waHref = trackingCode
    ? buildWhatsAppUrl(
        `Hi ARK! I just placed order *${trackingCode}*. Please confirm when crafting begins.`
      )
    : buildWhatsAppUrl("Hi ARK! I just completed a purchase and need confirmation.");

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
        <CheckCircle2 size={32} />
      </div>
      <SectionHeading
        title="Payment Successful"
        description="Thank you for your order. Save your tracking code to follow progress anytime."
      />
      <div className="mt-8 p-6 rounded-[20px] border border-border glass text-left space-y-3">
        {trackingCode && (
          <div>
            <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold mb-1">
              Your tracking code
            </p>
            <p className="font-heading text-2xl text-foreground tracking-wide">
              {trackingCode}
            </p>
          </div>
        )}
        {paymentId && (
          <p className="text-sm text-grey">
            Payment ID: <span className="text-foreground">{paymentId}</span>
          </p>
        )}
        {total !== null && (
          <p className="text-sm text-grey">
            Amount paid: <span className="text-gold">{formatPrice(total)}</span>
          </p>
        )}
        <p className="text-sm text-grey pt-2">
          Crafting typically takes 7–14 business days. You can track status anytime with
          your code + checkout email or phone.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Button asChild variant="gold">
          <Link href={trackHref}>Track this order</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </Button>
      </div>
      <Link
        href="/collections"
        className="inline-block mt-6 text-xs text-grey hover:text-gold transition-colors"
      >
        Continue shopping →
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-32 pb-20">
      <Suspense fallback={<div className="text-center text-grey py-20">Loading...</div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
