"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { Button } from "@/components/ui/button";

function CheckoutFailureContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-400/10 text-red-400 mb-6">
        <XCircle size={32} />
      </div>
      <SectionHeading
        title="Payment Not Completed"
        description={
          reason ||
          "Your payment was cancelled or could not be processed. No amount was charged."
        }
      />
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Button asChild variant="gold">
          <Link href="/checkout">Try Again</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/cart">Back to Cart</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutFailurePage() {
  return (
    <div className="pt-32 pb-20">
      <Suspense fallback={<div className="text-center text-grey py-20">Loading...</div>}>
        <CheckoutFailureContent />
      </Suspense>
    </div>
  );
}
