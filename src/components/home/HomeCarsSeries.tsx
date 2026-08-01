"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductCard } from "@/components/product/ProductCard";
import { resolveImageSrc } from "@/lib/images";
import { productMatchesSeries } from "@/lib/series";
import {
  buildCollectionInterestMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import type { Collection, Product, ProductSeries } from "@/types";
import { cn } from "@/lib/utils";

const TAB_AUTO_MS = 2500;
const SWIPE_THRESHOLD_PX = 48;

interface HomeCarsSeriesProps {
  collections: Collection[];
  products: Product[];
  seriesList: ProductSeries[];
}

function ComingSoonStrip({ collections }: { collections: Collection[] }) {
  const firstInterestHref = buildWhatsAppUrl(
    buildCollectionInterestMessage(collections[0]?.name ?? "upcoming collection")
  );

  return (
    <div className="pt-8 md:pt-10 mt-10 md:mt-12 border-t border-border/50">
      <FadeIn>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-grey">
            Coming Soon
          </p>
          <div className="flex items-center gap-4">
            <a
              href={firstInterestHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-button text-[9px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors"
            >
              Notify me →
            </a>
            <Link
              href="/collections"
              className="font-button text-[9px] uppercase tracking-[0.2em] text-grey hover:text-gold transition-colors"
            >
              All →
            </Link>
          </div>
        </div>
      </FadeIn>

      <div
        className={cn(
          "grid gap-2 sm:gap-3",
          collections.length >= 3 ? "grid-cols-3" : "grid-cols-2 max-w-md"
        )}
      >
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group block"
          >
            <div className="relative aspect-[5/3] overflow-hidden rounded-[10px] border border-border/40 opacity-50 group-hover:opacity-75 transition-opacity duration-500">
              <Image
                src={resolveImageSrc(collection.image)}
                alt={collection.name}
                fill
                className="object-cover grayscale-[60%] group-hover:grayscale-[30%] transition-all duration-700"
                sizes="(max-width: 640px) 33vw, 240px"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
            <div className="mt-2">
              <p className="font-button text-[8px] uppercase tracking-[0.2em] text-grey/60 mb-0.5 flex items-center gap-1">
                <Clock size={9} />
                Soon
              </p>
              <h3 className="font-heading text-xs sm:text-sm font-light text-foreground/65 group-hover:text-foreground/85 transition-colors line-clamp-1">
                {collection.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HomeCarsSeries({
  collections,
  products,
  seriesList,
}: HomeCarsSeriesProps) {
  const upcoming = collections.filter((c) => c.comingSoon);
  const carsCollection = collections.find((c) => c.slug === "cars");

  const carProducts = useMemo(
    () => products.filter((p) => p.collection === "cars"),
    [products]
  );

  const [activeSlug, setActiveSlug] = useState(
    seriesList[0]?.slug ?? ""
  );
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const pauseTimer = useRef<number | null>(null);

  const activeSeries =
    seriesList.find((s) => s.slug === activeSlug) ?? seriesList[0] ?? null;
  const activeIndex = Math.max(
    0,
    seriesList.findIndex((s) => s.slug === (activeSeries?.slug ?? ""))
  );

  const seriesProducts = useMemo(() => {
    if (!activeSeries) return carProducts;
    return carProducts.filter((p) => productMatchesSeries(p, activeSeries));
  }, [activeSeries, carProducts]);

  // Desktop: swipe only when more than 3. Mobile: always horizontal row.
  const needsDesktopSwipe = seriesProducts.length > 3;

  const pauseAutoBriefly = () => {
    setPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(
      () => setPaused(false),
      TAB_AUTO_MS * 3
    );
  };

  const goToSeriesOffset = (offset: number) => {
    if (seriesList.length < 2) return;
    const next =
      seriesList[(activeIndex + offset + seriesList.length) % seriesList.length];
    if (next) {
      setActiveSlug(next.slug);
      pauseAutoBriefly();
    }
  };

  // Auto-cycle series tabs faster: Environment → Drift → Lego → Small Car → …
  useEffect(() => {
    if (seriesList.length < 2 || paused) return;

    const id = window.setInterval(() => {
      setActiveSlug((current) => {
        const index = seriesList.findIndex((s) => s.slug === current);
        const next =
          seriesList[(index + 1 + seriesList.length) % seriesList.length];
        return next?.slug ?? current;
      });
    }, TAB_AUTO_MS);

    return () => window.clearInterval(id);
  }, [seriesList, paused]);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  // Keep scroller at start when the active series changes
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeSlug]);

  const selectTab = (slug: string) => {
    setActiveSlug(slug);
    pauseAutoBriefly();
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
    didSwipe.current = false;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (swipeStartX.current == null || swipeStartY.current == null) return;
    const dx = e.clientX - swipeStartX.current;
    const dy = e.clientY - swipeStartY.current;
    swipeStartX.current = null;
    swipeStartY.current = null;

    // Prefer horizontal swipes for series change
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    // When the product row scrolls horizontally, only change series at the edges
    const el = scrollerRef.current;
    if (el && el.scrollWidth > el.clientWidth + 8) {
      const atStart = el.scrollLeft <= 8;
      const atEnd =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (dx < 0 && !atEnd) return; // swipe left → next series only at end
      if (dx > 0 && !atStart) return; // swipe right → prev series only at start
    }

    didSwipe.current = true;
    if (dx < 0) goToSeriesOffset(1);
    else goToSeriesOffset(-1);
  };

  const onClickCapture = (e: ReactMouseEvent) => {
    if (!didSwipe.current) return;
    e.preventDefault();
    e.stopPropagation();
    didSwipe.current = false;
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.92;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (seriesList.length === 0 && carProducts.length === 0) {
    return upcoming.length > 0 ? (
      <section className="section-padding px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ComingSoonStrip collections={upcoming} />
        </div>
      </section>
    ) : null;
  }

  return (
    <section
      className="section-padding px-6 lg:px-8"
      aria-label="Cars by series"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                Available Now
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                {carsCollection?.name ?? "Cars"}
              </h2>
              <p className="text-sm text-grey mt-2 max-w-xl">
                {carsCollection?.description ??
                  "Browse by series — select a line, then explore the pieces."}
              </p>
            </div>
            <Link
              href="/collections/cars"
              className="font-button text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors shrink-0"
            >
              View collection →
            </Link>
          </div>
        </FadeIn>

        {/* Series tabs — inspired by category nav */}
        {seriesList.length > 0 && (
          <FadeIn delay={0.05}>
            <div
              className="flex justify-center mb-10 md:mb-12 overflow-x-auto hide-scrollbar touch-pan-y select-none"
              role="tablist"
              aria-label="Car series"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                swipeStartX.current = null;
                swipeStartY.current = null;
              }}
            >
              <div className="flex items-stretch gap-0 min-w-min border-b border-border/60">
                {seriesList.map((series) => {
                  const active = series.slug === (activeSeries?.slug ?? "");
                  return (
                    <button
                      key={series.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectTab(series.slug)}
                      className={cn(
                        "relative px-4 sm:px-6 md:px-8 py-3 font-button text-[9px] sm:text-[10px] uppercase tracking-[0.22em] whitespace-nowrap transition-colors duration-300",
                        active
                          ? "text-foreground"
                          : "text-grey hover:text-foreground/80"
                      )}
                    >
                      {series.name}
                      <span
                        className={cn(
                          "absolute left-3 right-3 bottom-0 h-[2px] bg-gold transition-opacity duration-300",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Mobile: one card + half peek, horizontal swipe. Desktop: 3-up or swipe. */}
        <div
          className="relative"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onClickCapture={onClickCapture}
          onPointerCancel={() => {
            swipeStartX.current = null;
            swipeStartY.current = null;
          }}
        >
          {needsDesktopSwipe && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="hidden md:flex absolute -left-3 lg:-left-5 top-[38%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground hover:border-gold/40 hover:text-gold transition-colors shadow-luxury"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="hidden md:flex absolute -right-3 lg:-right-5 top-[38%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground hover:border-gold/40 hover:text-gold transition-colors shadow-luxury"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeries?.slug ?? "all"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div
                ref={scrollerRef}
                className={cn(
                  // Phone: always horizontal — ~1 card + half of next
                  "flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 overscroll-x-contain",
                  // Desktop: 3 equal columns, or keep swipe when >3
                  needsDesktopSwipe
                    ? "sm:gap-5"
                    : "sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:snap-none"
                )}
              >
                {seriesProducts.length === 0 ? (
                  <p className="text-sm text-grey py-10 w-full text-center">
                    No pieces in this series yet — check back soon.
                  </p>
                ) : (
                  seriesProducts.map((product) => (
                    <div
                      key={product.id || product.slug}
                      className={cn(
                        "h-full shrink-0 snap-start",
                        // ~62% width → one full card + clear half of the next
                        "w-[62%]",
                        needsDesktopSwipe
                          ? "sm:w-[calc((100%-2.5rem)/3)]"
                          : "sm:w-auto sm:shrink"
                      )}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {upcoming.length > 0 && <ComingSoonStrip collections={upcoming} />}
      </div>
    </section>
  );
}
