"use client";

import React from "react";

export interface ShopWordmarkProps {
  className?: string;
}

/**
 * Official Shop Wordmark Component
 * Uses official HeroUI semantic text-accent token:
 * - text-accent (Shop Violet from theme)
 * - text-[36px] md:text-[42px]
 * - tracking-[-0.07em]
 */
export function ShopWordmark({ className = "" }: ShopWordmarkProps) {
  return (
    <div
      className={`flex items-center justify-center select-none py-1.5 ${className}`}
    >
      <span
        className="text-[36px] md:text-[42px] font-black text-accent lowercase tracking-[-0.07em] leading-none transition-transform hover:scale-105 duration-200 cursor-pointer"
        style={{
          fontFamily:
            "'GT Standard', var(--font-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        shop
      </span>
    </div>
  );
}
