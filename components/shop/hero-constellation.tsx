"use client";

import React from "react";
import Image from "next/image";
import { ProductCard } from "./product-card";

export interface HeroConstellationProps {
  className?: string;
}

/**
 * Hero Constellation Component
 * Perfectly balanced to match the Shop app layout:
 * - Left Product Card: 140px wide, 26px radius, real product image in 18px radius
 * - Left Tile: 88px rounded brand tile (Owala FreeSip)
 * - Center: Dynamic hero bottles showcase (OSEA, Salt & Stone, fragrance)
 * - Right Product Card: 140px wide, 26px radius, real product image in 18px radius
 * - Right Tile: 88px rounded brand tile (TRUFF)
 */
export function HeroConstellation({ className = "" }: HeroConstellationProps) {
  return (
    <div
      className={`relative w-full max-w-5xl mx-auto flex items-center justify-center pt-1 pb-2 px-2 ${className}`}
    >
      {/* Desktop Floating Constellation */}
      <div className="hidden md:flex items-center justify-between w-full gap-3 lg:gap-6">
        {/* Left Floating Card: Kale Chips */}
        <div className="w-[136px] lg:w-[142px] shrink-0 transition-transform duration-300 hover:-translate-y-1">
          <ProductCard
            title="Kale Chips | Raw Ranch"
            rating={4}
            reviewCount={24}
            className="p-2.5 rounded-[26px] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="relative w-full h-[98px] rounded-[18px] bg-surface-secondary overflow-hidden flex items-center justify-center">
              <Image
                src="/images/products/kale-chips-product.png"
                alt="Kale Chips"
                fill
                className="object-cover"
              />
            </div>
          </ProductCard>
        </div>

        {/* Left Secondary Brand Tile: Owala */}
        <div className="w-[84px] h-[84px] lg:w-[90px] lg:h-[90px] rounded-[24px] bg-gradient-to-br from-orange-500 via-rose-500 to-emerald-400 p-3 flex flex-col items-center justify-center text-background shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] shrink-0 transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <span className="text-sm font-extrabold tracking-tight lowercase select-none">
            owala
          </span>
          <span className="text-[10px] text-background/85 font-medium pt-0.5">FreeSip</span>
        </div>

        {/* Center Dynamic Product Showcase */}
        <div className="flex-1 max-w-[270px] lg:max-w-[300px] mx-auto flex items-center justify-center px-2">
          <div className="relative w-full h-[115px] lg:h-[125px] transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/shop-hero-poster-clean.png"
              alt="Curated Daily Essentials"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Floating Card: Seeded Bar */}
        <div className="w-[136px] lg:w-[142px] shrink-0 transition-transform duration-300 hover:-translate-y-1">
          <ProductCard
            title="Seeded Bar | 2oz"
            brand="Elissa Goodman"
            rating={5}
            reviewCount={11}
            className="p-2.5 rounded-[26px] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="relative w-full h-[98px] rounded-[18px] bg-surface-secondary overflow-hidden flex items-center justify-center">
              <div className="relative w-[52px] h-[78px]">
                <Image
                  src="/images/products/seeded-bar-product.png"
                  alt="Seeded Bar"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </ProductCard>
        </div>

        {/* Right Secondary Brand Tile: TRUFF */}
        <div className="w-[84px] h-[84px] lg:w-[90px] lg:h-[90px] rounded-[24px] bg-foreground p-3 flex flex-col items-center justify-center text-background shadow-[0_4px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] shrink-0 transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <span className="text-sm font-black tracking-widest uppercase select-none text-background">
            truff
          </span>
          <span className="text-[10px] text-background/70 font-medium pt-0.5">Hot Sauce</span>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden items-center justify-center w-full py-1">
        <div className="relative w-[260px] h-[105px]">
          <Image
            src="/images/shop-hero-poster-clean.png"
            alt="Curated Daily Essentials"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
