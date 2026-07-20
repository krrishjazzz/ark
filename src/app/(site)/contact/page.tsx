"use client";

import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Connect"
          title="Get in Touch"
          description="Whether it's a custom commission, collaboration, or simply a question — we'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <FadeIn>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 p-8 md:p-10 rounded-[20px] border border-border glass"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="you@email.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} required />
              </div>
              <Button type="submit" variant="gold" className="w-full">
                <Send size={16} />
                Send Message
              </Button>
            </form>
          </FadeIn>

          {/* Contact info + CTAs */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div className="p-8 rounded-[20px] border border-border">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin size={20} className="text-gold mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Studio</h3>
                    <p className="text-sm text-grey mt-1">
                      ARK Studio, Mumbai, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-gold mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Email</h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-sm text-grey hover:text-gold transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" className="flex-1">
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="default" className="flex-1">
                  <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon size={16} />
                    Instagram
                  </a>
                </Button>
              </div>

              {/* Map placeholder */}
              <div className="rounded-[20px] border border-border overflow-hidden aspect-video bg-card flex items-center justify-center">
                <iframe
                  title="ARK Studio Location"
                  src="https://maps.google.com/maps?q=Mumbai%2C%20India&z=12&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
