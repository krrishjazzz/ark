import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { BRAND } from "@/lib/constants";
import { fetchSiteSettings } from "@/lib/cms";
import { resolveImageSrc } from "@/lib/images";

const footerLinks = {
  shop: [
    { href: "/collections", label: "Collections" },
    { href: "/garage", label: "Garage Collection" },
    { href: "/configurator", label: "Build Your Frame" },
    { href: "/custom-orders", label: "Custom Orders" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/craftsmanship", label: "Craftsmanship" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
  policies: [
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export async function Footer() {
  const { logo } = await fetchSiteSettings();

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src={resolveImageSrc(logo)}
                alt={BRAND.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <p className="font-button text-xs uppercase tracking-[0.3em] text-gold">
                  {BRAND.name}
                </p>
                <p className="text-[10px] text-grey mt-1 tracking-wider">
                  {BRAND.fullName}
                </p>
              </div>
            </Link>
            <p className="text-grey text-sm leading-relaxed max-w-sm mb-8">
              Handcrafted resin masterpieces for collectors, enthusiasts, and
              luxury interiors worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-border text-grey hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-border text-grey hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-border text-grey hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="font-button text-[10px] uppercase tracking-[0.2em] text-gold mb-6">
                {key}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-grey hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-button text-[10px] uppercase tracking-[0.2em] text-gold mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-grey mb-4">
              Be the first to know about new editions and exclusive releases.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-grey">
            &copy; {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold/60">
            Beyond Cars. Beyond Limits.
          </p>
        </div>
      </div>
    </footer>
  );
}
