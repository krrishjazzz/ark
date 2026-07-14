"use client";

import { useState } from "react";
import { Upload, Send } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          label="Bespoke"
          title="Custom Orders"
          description="Commission a one-of-a-kind ARK masterpiece featuring your vehicle, your story, your vision."
        />

        {submitted ? (
          <FadeIn>
            <div className="text-center py-20 rounded-[20px] border border-border glass">
              <p className="font-heading text-3xl text-gold mb-4">Thank You</p>
              <p className="text-grey max-w-md mx-auto">
                Your custom order enquiry has been received. Our team will contact
                you within 48 hours to discuss your vision.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image upload */}
              <div className="rounded-[20px] border border-dashed border-border p-12 text-center hover:border-gold/30 transition-colors duration-500 cursor-pointer">
                <Upload size={32} className="mx-auto text-grey mb-4" />
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey">
                  Upload Vehicle Image
                </p>
                <p className="text-xs text-grey/60 mt-2">
                  PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="vehicle-image"
                  aria-label="Upload vehicle image"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="e.g. Porsche" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="e.g. 911 GT3 RS" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" placeholder="e.g. 2024" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="e.g. Guards Red" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-text">Custom Text / Special Requests</Label>
                <Textarea
                  id="custom-text"
                  placeholder="Describe your vision — textures, colors, special details..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                <Send size={16} />
                Submit Enquiry
              </Button>
            </form>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
