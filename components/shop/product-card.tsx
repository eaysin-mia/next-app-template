"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

export interface ProductItem {
  id: string;
  title: string;
  brand: string;
  imageSrc: string;
  imageAlt?: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number | string;
  badge?: string;
  imageFit?: "cover" | "contain";
}

export interface ProductCardProps {
  product: ProductItem;
  className?: string;
  onWishlistToggle?: (id: string, isWishlisted: boolean) => void;
  onClick?: (product: ProductItem) => void;
}

/**
 * ProductCard Component
 * Follows industry-standard modern e-commerce & Shop app UX/UI design system:
 * - 1:1 Square aspect ratio (global e-commerce catalog standard for universal product feeds)
 * - 20px-22px pillow-soft inner radius with neutral canvas contrast
 * - Accessible 32px (size-8) translucent floating wishlist action with micro-animations
 * - Fixed metadata baseline alignment so prices and titles across all 6 cards align horizontally
 * - Strict typography hierarchy: muted secondary brand, medium primary title, amber rating, bold/medium price
 */
export function ProductCard({
  product,
  className = "",
  onWishlistToggle,
  onClick,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !wishlisted;
    setWishlisted(nextState);
    if (onWishlistToggle) {
      onWishlistToggle(product.id, nextState);
    }
  };

  const isContain = product.imageFit === "contain";

  return (
    <div
      onClick={() => onClick?.(product)}
      className={`group flex flex-col shrink-0 select-none cursor-pointer ${className}`}
    >
      {/* 1. Standard 1:1 Product Image Container */}
      <div className="relative w-full aspect-square rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#e6e7e8] flex items-center justify-center">
        {/* Optional Promo Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-medium tracking-tight shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Product Imagery */}
        <img
          src={product.imageSrc}
          alt={product.imageAlt || product.title}
          loading="lazy"
          className={`w-full h-full transition-transform duration-300 ease-out group-hover:scale-104 ${
            isContain ? "object-contain p-2.5" : "object-cover"
          }`}
        />

        {/* Accessible 32px Wishlist Tap Target */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute bottom-2.5 right-2.5 z-10 size-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none ${
            wishlisted
              ? "bg-white text-danger shadow-xs scale-105"
              : "bg-black/30 hover:bg-black/45 text-white backdrop-blur-xs active:scale-95"
          }`}
        >
          <Heart
            className={`size-3.5 transition-transform ${
              wishlisted ? "fill-danger stroke-danger" : "stroke-white stroke-[2]"
            }`}
          />
        </button>
      </div>

      {/* 2. Structured Metadata with Consistent Baseline Alignment */}
      <div className="pt-2 px-0.5 flex flex-col flex-1">
        {/* Brand Name */}
        <p className="text-[11.5px] sm:text-[12px] text-muted font-normal leading-tight tracking-[-0.01em] truncate">
          {product.brand}
        </p>

        {/* Product Title */}
        <h3 className="text-[13px] sm:text-[13.5px] font-medium text-foreground leading-snug tracking-[-0.014em] truncate group-hover:opacity-80 transition-opacity">
          {product.title}
        </h3>

        {/* Standard Rating Slot with Fixed Height for Grid Baseline Coherence */}
        <div className="h-4 flex items-center gap-1 pt-0.5">
          {product.rating !== undefined && (
            <>
              <div className="flex items-center text-amber-500 text-[11px] leading-none">
                {"★".repeat(Math.min(5, Math.floor(product.rating)))}
              </div>
              {product.reviewCount !== undefined && (
                <span className="text-[11px] text-muted font-normal tracking-[-0.014em] leading-none">
                  ({product.reviewCount})
                </span>
              )}
            </>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-1.5 pt-0.5 mt-auto">
          <span className="text-[13px] sm:text-[13.5px] font-medium text-foreground tracking-[-0.014em]">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[11.5px] sm:text-[12px] text-muted line-through font-normal">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
