"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { MANUFACTURERS, SIZES, FRAME_OPTIONS, IMAGES } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

const textures = [
  { label: "Volcanic Obsidian", value: "volcanic" },
  { label: "Resin Splash", value: "splash" },
  { label: "Smoke Flow", value: "smoke" },
  { label: "Tire Tracks", value: "tracks" },
  { label: "Gold Veins", value: "gold" },
];

const resinColors = [
  { label: "Deep Black", value: "black", hex: "#111111" },
  { label: "Charcoal", value: "charcoal", hex: "#333333" },
  { label: "Smoky Grey", value: "grey", hex: "#666666" },
  { label: "Gold Accent", value: "gold", hex: "#C9A45B" },
];

export default function ConfiguratorPage() {
  const [manufacturer, setManufacturer] = useState<string>(MANUFACTURERS[0]);
  const [model, setModel] = useState("911 GT3 RS");
  const [texture, setTexture] = useState(textures[0].value);
  const [resin, setResin] = useState(resinColors[0].value);
  const [size, setSize] = useState<string>(SIZES[1].value);
  const [frame, setFrame] = useState<string>(FRAME_OPTIONS[0].value);

  const basePrice = 40000;
  const sizeMultiplier = SIZES.find((s) => s.value === size)?.priceMultiplier ?? 1;
  const price = Math.round(basePrice * sizeMultiplier);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Configurator"
          title="Build Your Frame"
          description="Design your bespoke ARK masterpiece. Choose every detail — from the machine to the finish."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Preview */}
          <FadeIn direction="left">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden border border-border shadow-luxury">
                <Image
                  src={IMAGES.productEasel}
                  alt="Configurator preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-button text-[9px] uppercase tracking-[0.2em] text-gold mb-2">
                    Your Configuration
                  </p>
                  <h3 className="font-heading text-2xl text-foreground">
                    {manufacturer} {model}
                  </h3>
                  <p className="text-gold text-xl mt-2">{formatPrice(price)}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Options */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-10">
              {/* Manufacturer */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Manufacturer
                </p>
                <div className="flex flex-wrap gap-2">
                  {MANUFACTURERS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setManufacturer(m)}
                      className={cn(
                        "font-button text-[9px] uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all duration-300",
                        manufacturer === m
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-grey hover:border-gold/30"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Model
                </p>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="flex h-12 w-full rounded-[20px] border border-border bg-card px-5 text-sm text-foreground focus:border-gold/40 focus:outline-none"
                  placeholder="Enter model name"
                />
              </div>

              {/* Texture */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Background Texture
                </p>
                <div className="flex flex-wrap gap-2">
                  {textures.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTexture(t.value)}
                      className={cn(
                        "font-button text-[9px] uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all duration-300",
                        texture === t.value
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-grey hover:border-gold/30"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resin color */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Resin Color
                </p>
                <div className="flex flex-wrap gap-3">
                  {resinColors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setResin(c.value)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300",
                        resin === c.value
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/30"
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-button text-[9px] uppercase tracking-wider text-grey">
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Frame Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSize(s.value)}
                      className={cn(
                        "font-button text-[9px] uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all duration-300",
                        size === s.value
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-grey hover:border-gold/30"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame */}
              <div>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-4">
                  Frame Finish
                </p>
                <div className="flex gap-3">
                  {FRAME_OPTIONS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFrame(f.value)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300",
                        frame === f.value
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/30"
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: f.hex }}
                      />
                      <span className="font-button text-[9px] uppercase tracking-wider text-grey">
                        {f.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="gold" size="lg" className="w-full">
                Request This Configuration
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
