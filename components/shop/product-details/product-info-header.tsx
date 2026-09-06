import React from "react";
import { Star } from "lucide-react";
import { Chip, cn } from "@heroui/react";

export interface ProductInfoHeaderProps {
  readonly title: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly price: string;
  readonly originalPrice?: string;
  readonly discountBadge?: string;
  readonly onReviewsClick: () => void;
}

export function ProductInfoHeader({
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
  discountBadge,
  onReviewsClick,
}: ProductInfoHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[24px] font-semibold text-foreground tracking-[-1px] leading-[1.17] uppercase text-pretty">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        <div
          role="img"
          aria-label={`${rating} out of 5 stars`}
          className="flex items-center gap-0.5 text-warning"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={cn(
                "size-3.5 fill-current stroke-[1.5]",
                index >= rating && "fill-transparent text-foreground/25",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onReviewsClick}
          className="text-xs text-muted font-medium underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
        >
          {reviewCount} ratings
        </button>
      </div>

      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {price}
        </span>
        {originalPrice && (
          <span className="text-sm sm:text-base text-muted line-through font-normal ml-1">
            {originalPrice}
          </span>
        )}
        {discountBadge && (
          <Chip
            size="sm"
            variant="primary"
            className="bg-foreground text-background font-bold text-[11px] ml-1.5 shadow-2xs"
          >
            {discountBadge}
          </Chip>
        )}
      </div>
    </div>
  );
}
