"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { calculateCartTotals, type CheckoutCustomer } from "@/lib/checkout";
import { formatPrice } from "@/lib/utils";
import { loadRazorpayScript } from "@/lib/payments/razorpay-client";
import { BRAND } from "@/lib/constants";

const initialCustomer: CheckoutCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => calculateCartTotals(cart), [cart]);

  const updateField = (field: keyof CheckoutCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map((item) => ({
            slug: item.slug,
            size: item.size,
            frame: item.frame,
            quantity: item.quantity,
          })),
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || "Could not start checkout");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay checkout");
      }

      const rzp = new window.Razorpay({
        key: createData.keyId,
        amount: createData.amount * 100,
        currency: createData.currency,
        name: BRAND.fullName,
        description: "Luxury resin art purchase",
        order_id: createData.orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#C9A45B" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                customer: createData.customer,
                items: createData.items,
                totals: createData.totals,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            sessionStorage.setItem(
              "ark-last-order",
              JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                total: createData.totals.total,
              })
            );

            clearCart();
            router.push(`/checkout/success?payment_id=${response.razorpay_payment_id}`);
          } catch (verifyError) {
            const message =
              verifyError instanceof Error ? verifyError.message : "Verification failed";
            router.push(`/checkout/failure?reason=${encodeURIComponent(message)}`);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.on("payment.failed", (response) => {
        const reason = response.error?.description || "Payment failed";
        router.push(`/checkout/failure?reason=${encodeURIComponent(reason)}`);
      });

      rzp.open();
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3 space-y-6">
        <div className="p-8 rounded-[20px] border border-border glass space-y-6">
          <h2 className="font-heading text-2xl font-light text-foreground">Shipping Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={customer.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={customer.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={customer.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Street, building, landmark"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={customer.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={customer.state}
                onChange={(e) => updateField("state", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code</Label>
              <Input
                id="pincode"
                value={customer.pincode}
                onChange={(e) => updateField("pincode", e.target.value)}
                pattern="[0-9]{6}"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="p-8 rounded-[20px] border border-border glass sticky top-28">
          <h2 className="font-heading text-2xl font-light text-foreground mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto hide-scrollbar">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                <div className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-grey">
                    {item.size} · Qty {item.quantity}
                  </p>
                  <p className="text-sm text-gold mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-grey">Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-grey">Shipping</span>
              <span>{totals.shipping === 0 ? "Complimentary" : formatPrice(totals.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg pt-3 border-t border-border">
              <span className="font-heading">Total</span>
              <span className="text-gold">{formatPrice(totals.total)}</span>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 mb-4 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3">
              {error}
            </p>
          )}

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock size={16} />
                Pay {formatPrice(totals.total)}
              </>
            )}
          </Button>

          <p className="text-xs text-grey text-center mt-4">
            Secured by Razorpay · UPI, cards & netbanking
          </p>
          <Link
            href="/cart"
            className="block text-center text-xs text-grey hover:text-gold transition-colors mt-3"
          >
            ← Back to cart
          </Link>
        </div>
      </div>
    </form>
  );
}

export function CheckoutEmpty() {
  return (
    <div className="text-center py-16">
      <ShoppingBag size={40} className="mx-auto text-grey mb-4" />
      <h2 className="font-heading text-2xl text-foreground mb-2">Nothing to checkout</h2>
      <p className="text-grey mb-8">Add a masterpiece to your cart first.</p>
      <Button asChild variant="gold">
        <Link href="/collections">Explore Collection</Link>
      </Button>
    </div>
  );
}
