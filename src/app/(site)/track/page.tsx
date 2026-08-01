"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PackageSearch, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type TrackResult = {
  trackingCode: string;
  status: string;
  statusLabel: string;
  paidAt: string;
  customerName: string;
  items: Array<{
    name: string;
    size: string;
    frame?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  courierTracking: string | null;
  city: string;
  state: string;
  pincode: string;
};

const STEPS = [
  { key: "paid", label: "Paid" },
  { key: "making", label: "Making" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

function stepIndex(status: string): number {
  if (status === "cancelled") return -1;
  const i = STEPS.findIndex((s) => s.key === status);
  return i >= 0 ? i : 0;
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [trackingCode, setTrackingCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) setTrackingCode(code.toUpperCase());
  }, [searchParams]);

  const lookup = async (e?: FormEvent) => {
    e?.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lookup failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  const activeStep = result ? stepIndex(result.status) : -1;
  const helpHref = result
    ? buildWhatsAppUrl(
        `Hi ARK! I'd like an update on order *${result.trackingCode}* (${result.statusLabel}).`
      )
    : buildWhatsAppUrl("Hi ARK! I need help tracking my order.");

  return (
    <div className="mx-auto max-w-2xl px-6">
      <SectionHeading
        label="Orders"
        title="Track Your Order"
        description="Enter your tracking code and the email or phone used at checkout."
      />

      <form
        onSubmit={lookup}
        className="mt-10 p-6 md:p-8 rounded-[20px] border border-border glass space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="trackingCode">Tracking code</Label>
          <Input
            id="trackingCode"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="ARK-A7K2M9"
            required
            className="uppercase tracking-wider"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
            />
          </div>
        </div>
        <p className="text-xs text-grey">Provide email or phone (same as checkout).</p>

        {error && (
          <p className="text-sm text-red-400 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3">
            {error}
          </p>
        )}

        <Button type="submit" variant="gold" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Looking up…
            </>
          ) : (
            <>
              <PackageSearch size={16} />
              Track order
            </>
          )}
        </Button>
      </form>

      {result && (
        <div className="mt-8 p-6 md:p-8 rounded-[20px] border border-border glass space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold">
                {result.trackingCode}
              </p>
              <h2 className="font-heading text-2xl font-light text-foreground mt-1">
                {result.statusLabel}
              </h2>
              <p className="text-sm text-grey mt-1">
                Hi {result.customerName} ·{" "}
                {result.city}
                {result.state ? `, ${result.state}` : ""} {result.pincode}
              </p>
            </div>
            <p className="text-sm text-grey">
              Paid{" "}
              {result.paidAt
                ? new Date(result.paidAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>

          {result.status !== "cancelled" && (
            <div className="grid grid-cols-4 gap-2">
              {STEPS.map((step, i) => {
                const done = i <= activeStep;
                return (
                  <div key={step.key} className="text-center">
                    <div
                      className={cn(
                        "h-1.5 rounded-full mb-2",
                        done ? "bg-gold" : "bg-border"
                      )}
                    />
                    <p
                      className={cn(
                        "font-button text-[8px] uppercase tracking-wider",
                        done ? "text-gold" : "text-grey"
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {result.courierTracking && (
            <p className="text-sm text-grey">
              Courier tracking:{" "}
              <span className="text-foreground">{result.courierTracking}</span>
            </p>
          )}

          <div className="space-y-3 pt-2 border-t border-border">
            {result.items.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="text-foreground">{item.name}</p>
                  <p className="text-xs text-grey">
                    {item.size}
                    {item.frame ? ` · ${item.frame}` : ""} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-gold shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-grey">Total</span>
              <span className="text-gold">{formatPrice(result.total)}</span>
            </div>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href={helpHref} target="_blank" rel="noopener noreferrer">
              WhatsApp us about this order
            </a>
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-grey mt-8">
        Lost your code?{" "}
        <Link href="/contact" className="text-gold hover:text-gold-light">
          Contact us
        </Link>
      </p>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="pt-32 pb-20">
      <Suspense fallback={<div className="text-center text-grey py-20">Loading…</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
