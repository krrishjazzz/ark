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
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Gallery" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useStore();
  const { logo } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3 group">
            <Image
              src={resolveImageSrc(logo)}
              alt={BRAND.name}
              width={40}
              height={40}
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="hidden sm:block font-button text-[10px] uppercase tracking-[0.3em] text-gold">
              {BRAND.name}
            </span>
          </Link>

          {/* Center Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-button text-[10px] uppercase tracking-[0.15em] text-foreground/60 hover:text-gold transition-colors duration-500 gold-line pb-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-foreground/60 hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-foreground/60 hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <Link
              href="/cart"
              className="relative h-10 w-10 flex items-center justify-center rounded-full text-foreground/60 hover:text-gold transition-colors duration-300"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-background">
                  {cartCount}
                </span>
              )}
            </Link>
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
              <Link href="/collections">Shop Collection</Link>
            </Button>
            <button
              className="lg:hidden h-10 w-10 flex items-center justify-center text-foreground/80"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl text-foreground/80 hover:text-gold transition-colors duration-300"
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
