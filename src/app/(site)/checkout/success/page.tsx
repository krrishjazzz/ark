"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ark-last-order");
      if (saved) {
        const order = JSON.parse(saved);
        setTotal(order.total ?? null);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
        <CheckCircle2 size={32} />
      </div>
      <SectionHeading
        title="Payment Successful"
        description="Thank you for your order. Our team will confirm shipping details shortly."
      />
      <div className="mt-8 p-6 rounded-[20px] border border-border glass text-left space-y-2">
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
          A confirmation will be sent to your email. Delivery in 7–14 business days with
          insured premium packaging.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Button asChild variant="gold">
          <Link href="/collections">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
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
