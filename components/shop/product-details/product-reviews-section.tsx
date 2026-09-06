"use client";

import React from "react";
import { Avatar, Button, ProgressBar } from "@heroui/react";
import type { ProductDetailData } from "./types";

export interface ProductReviewsSectionProps {
  readonly product: ProductDetailData;
  readonly onOpenReviews: () => void;
}

const HISTOGRAM_DATA = [
  { star: 5, pct: 85 },
  { star: 4, pct: 12 },
  { star: 3, pct: 2 },
  { star: 2, pct: 1 },
  { star: 1, pct: 0 },
] as const;

export function ProductReviewsSection({
  product,
  onOpenReviews,
}: ProductReviewsSectionProps) {
  const formattedScore = product.reviewScore
    ? product.reviewScore.toFixed(1)
    : `${product.rating}.0`;

  const formattedCount =
    product.reviewCount >= 1000
      ? `${(product.reviewCount / 1000).toFixed(1)}K`
      : product.reviewCount.toString();

  const hasPhotos = product.customerPhotos && product.customerPhotos.length > 0;
  const hasReviews = product.reviews && product.reviews.length > 0;

  return (
    <div
      id="reviews-section"
      className="flex flex-col gap-3 pt-3.5 border-t border-border/60 text-foreground"
    >
      <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
        Reviews
      </p>

      {/* Rating Overview & Histogram */}
      <div className="flex items-center gap-5 sm:gap-6">
        <div className="flex flex-col items-start shrink-0">
          <span className="text-[38px] sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
            {formattedScore}
          </span>
          <div className="flex items-center gap-1 text-warning text-sm sm:text-[15px] mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < product.rating ? "text-warning" : "text-muted/30"
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-[12px] font-normal text-muted leading-[1.33] tracking-[-0.2px] mt-1">
            {formattedCount} ratings
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {HISTOGRAM_DATA.map((item) => (
            <div key={item.star} className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-foreground/80 w-2.5 shrink-0 text-left">
                {item.star}
              </span>
              <ProgressBar
                aria-label={`${item.star} star ratings`}
                value={item.pct}
                className="flex-1"
              >
                <ProgressBar.Track className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                  <ProgressBar.Fill className="bg-foreground rounded-full transition-all" />
                </ProgressBar.Track>
              </ProgressBar>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Photo Strip */}
      {hasPhotos && (
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
          {product.customerPhotos.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={onOpenReviews}
              className="size-11 sm:size-12 shrink-0 rounded-xl overflow-hidden bg-surface-secondary cursor-pointer hover:opacity-85 transition-opacity border border-border/40"
            >
              <img
                src={url}
                alt="Customer review photo"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 2-Column Mini Review Cards */}
      {hasReviews && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {product.reviews.slice(0, 2).map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col gap-1.5 p-3 bg-surface-secondary/60 rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < rev.rating ? "text-warning" : "text-muted/30"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[13px] sm:text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px] line-clamp-4">
                  {rev.text}
                </p>
                <div className="flex items-center gap-1.5 mt-auto pt-1">
                  <Avatar
                    size="sm"
                    className="size-5 text-[9px] font-bold bg-foreground text-background"
                  >
                    <Avatar.Fallback>{rev.avatarInitial}</Avatar.Fallback>
                  </Avatar>
                  <span className="text-xs text-muted truncate">
                    <span className="font-semibold text-foreground">
                      {rev.author}
                    </span>{" "}
                    · {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            onPress={onOpenReviews}
            className="w-full h-9 rounded-xl text-xs font-semibold text-foreground bg-surface-secondary hover:bg-surface-tertiary border-0 transition-colors cursor-pointer"
          >
            Read more reviews
          </Button>
        </div>
      )}
    </div>
  );
}
