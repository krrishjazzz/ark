"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Gallery" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/unboxing", label: "Unboxing" },
  { href: "/custom-orders", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  ...navLinks,
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useStore();
  const { logo } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || mobileOpen
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-gradient-to-b from-background/70 to-transparent"
        )}
      >
        <nav
          className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Left — mark + short wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src={resolveImageSrc(logo)}
              alt={BRAND.name}
              width={36}
              height={36}
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="font-button text-[11px] uppercase tracking-[0.28em] text-gold">
              {BRAND.name}
            </span>
          </Link>

          {/* Center — desktop links */}
          <div className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-button text-[10px] uppercase tracking-[0.18em] text-foreground/55 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link
              href="/search"
              className="hidden sm:flex h-9 w-9 items-center justify-center text-foreground/55 hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search size={17} />
            </Link>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center text-foreground/55 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={17} />
            </a>
            <Link
              href="/cart"
              className="relative h-9 w-9 flex items-center justify-center text-foreground/55 hover:text-gold transition-colors"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-background">
                  {cartCount}
                </span>
              )}
            </Link>
            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden md:inline-flex ml-1 h-9 px-4 text-[9px]"
            >
              <Link href="/collections">Shop</Link>
            </Button>
            <button
              className="lg:hidden h-9 w-9 flex items-center justify-center text-foreground/80 ml-0.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex flex-col items-center justify-center h-full gap-7 px-6"
            >
              <p className="font-button text-[9px] uppercase tracking-[0.3em] text-gold mb-2">
                {BRAND.fullName}
              </p>
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl text-foreground/85 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button asChild className="mt-4">
                <Link href="/collections" onClick={() => setMobileOpen(false)}>
                  Shop Collection
                </Link>
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
