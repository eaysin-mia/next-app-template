"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button, Chip, cn } from "@heroui/react";

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
 * Implemented using the official HeroUI design system and tokens:
 * - Semantic surface & contrast colors (bg-surface-secondary, text-foreground, text-muted)
 * - Standard HeroUI radii (rounded-2xl) and typography scale (text-xs, text-sm)
 * - HeroUI Chip for badges and HeroUI Button for interactive actions
 */
export function ProductCard({
  product,
  className = "",
  onWishlistToggle,
  onClick,
}: ProductCardProps) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      router.push(`/products/${product.id || "m1-grey-syzygy"}`);
    }
  };

  const handleHeartClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextState = !wishlisted;
    setWishlisted(nextState);
    if (onWishlistToggle) {
      onWishlistToggle(product.id, nextState);
    }
  };

  const isContain = product.imageFit === "contain";

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group flex flex-col shrink-0 select-none cursor-pointer min-w-0",
        className
      )}
    >
      {/* 1. 1:1 Product Image Container on HeroUI secondary surface */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-secondary flex items-center justify-center">
        {/* Optional Promo Badge with HeroUI Chip */}
        {product.badge && (
          <Chip
            size="sm"
            variant="secondary"
            className="absolute top-2.5 left-2.5 z-10 font-medium text-xs shadow-xs"
          >
            {product.badge}
          </Chip>
        )}

        {/* Product Imagery */}
        <img
          src={product.imageSrc}
          alt={product.imageAlt || product.title}
          loading="lazy"
          className={cn(
            "w-full h-full transition-transform duration-300 ease-out group-hover:scale-105",
            isContain ? "object-contain p-2.5" : "object-cover"
          )}
        />

        {/* Wishlist Action using HeroUI Button */}
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onPress={() => handleHeartClick()}
          className={cn(
            "absolute bottom-2.5 right-2.5 z-10 rounded-full transition-all duration-200",
            wishlisted
              ? "bg-surface text-danger shadow-sm scale-105"
              : "bg-foreground/25 hover:bg-foreground/35 text-background backdrop-blur-xs active:scale-95"
          )}
        >
          <Heart
            className={cn(
              "size-3.5 transition-transform",
              wishlisted ? "fill-danger stroke-danger" : "stroke-current stroke-[2]"
            )}
          />
        </Button>
      </div>

      {/* 2. Structured Metadata with HeroUI Typography Tokens */}
      <div className="pt-2 px-0.5 flex flex-col flex-1 min-w-0">
        {/* Brand Name */}
        <p className="text-xs text-muted font-normal leading-tight tracking-tight truncate">
          {product.brand}
        </p>

        {/* Product Title */}
        <h3 className="text-sm font-medium text-foreground leading-snug tracking-tight truncate group-hover:opacity-80 transition-opacity">
          {product.title}
        </h3>

        {/* Rating Row */}
        <div className="h-4 flex items-center gap-1 pt-0.5">
          {product.rating !== undefined && (
            <>
              <div className="flex items-center text-amber-500 text-xs leading-none">
                {"★".repeat(Math.min(5, Math.floor(product.rating)))}
              </div>
              {product.reviewCount !== undefined && (
                <span className="text-xs text-muted font-normal tracking-tight leading-none">
                  ({product.reviewCount})
                </span>
              )}
            </>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-1.5 pt-0.5 mt-auto">
          <span className="text-sm font-medium text-foreground tracking-tight">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted line-through font-normal">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

