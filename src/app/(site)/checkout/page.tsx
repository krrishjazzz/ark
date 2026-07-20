"use client";

import { SectionHeading } from "@/components/animations/SectionHeading";
import { CheckoutEmpty, CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cartCount, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-grey">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          label="Checkout"
          title="Secure Payment"
          description="Complete your details below. You'll be redirected to Razorpay for UPI, cards, or netbanking."
          align="left"
        />

        {cartCount === 0 ? <CheckoutEmpty /> : <CheckoutForm />}
      </div>
    </div>
  );
}
