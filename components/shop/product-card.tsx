"use client";

import React from "react";
import { Card } from "@heroui/react";

export interface ProductCardProps {
  id?: string;
  title: string;
  brand?: string;
  imageSrc?: string;
  imageAlt?: string;
  rating?: number;
  reviewCount?: number | string;
  price?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Generic Common Simple Product Card Component
 * Strictly follows design/design.md tokens:
 * - 28px card radius (rounded-[28px])
 * - Pure surface (bg-surface)
 * - Dual-layer soft shadow: 0 4px 6px -1px rgba(0,0,0,0.1) + 0 2px 4px -2px rgba(0,0,0,0.1)
 * - 20px inner image radius (rounded-[20px])
 * - Zero hard borders; shadow alone provides layer separation
 * - Typography: 14px semibold ink-black title (-0.014em tracking), 11px caption rating row
 */
export function ProductCard({
  title,
  brand,
  imageSrc,
  imageAlt = "Product Image",
  rating = 5,
  reviewCount = 24,
  price,
  badge,
  className = "",
  children,
  onClick,
}: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`group relative bg-surface rounded-[28px] p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),0_2px_4px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer border-0 select-none flex flex-col justify-between ${className}`}
    >
      {/* Optional Badge */}
      {badge && (
        <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-xs text-[10px] font-semibold tracking-tight text-foreground shadow-xs">
          {badge}
        </span>
      )}

      {/* 1:1 Product Image Container with 20px inner radius */}
      <div className="relative w-full aspect-square rounded-[20px] bg-surface-secondary overflow-hidden flex items-center justify-center">
        {children ? (
          children
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-3 text-muted">
            <span className="text-xs font-medium">{brand || "Shop"}</span>
          </div>
        )}
      </div>

      {/* Product Metadata beneath the image */}
      <div className="pt-2.5 px-1 pb-0.5 space-y-1">
        {brand && (
          <span className="block text-[11px] font-medium text-muted tracking-tight uppercase">
            {brand}
          </span>
        )}

        {/* 14px Semibold Title with tight tracking */}
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-foreground leading-tight tracking-[-0.014em] line-clamp-1">
          {title}
        </h3>

        {/* Star Rating and Review Count */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex items-center text-warning text-[11px]">
            {"★".repeat(Math.min(5, Math.floor(rating)))}
            {rating < 5 && (
              <span className="text-muted/40">
                {"★".repeat(5 - Math.floor(rating))}
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted font-medium tracking-tight">
            ({reviewCount})
          </span>

          {price && (
            <span className="ml-auto text-[13px] font-bold text-foreground">
              {price}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
