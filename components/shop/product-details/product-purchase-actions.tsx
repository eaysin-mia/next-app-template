"use client";

import React from "react";
import {
  Button,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverDialog,
  cn,
} from "@heroui/react";
import { Check, Heart, Share2 } from "lucide-react";

export interface ProductPurchaseActionsProps {
  readonly quantity: number;
  readonly onQuantityChange: (delta: number) => void;
  readonly isAddedToCart: boolean;
  readonly onAddToCart: () => void;
  readonly isSaved: boolean;
  readonly onToggleSaved: () => void;
}

export function ProductPurchaseActions({
  quantity,
  onQuantityChange,
  isAddedToCart,
  onAddToCart,
  isSaved,
  onToggleSaved,
}: ProductPurchaseActionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-xs sm:text-sm font-bold text-foreground">
          Quantity
        </span>
        <div className="h-10 bg-surface-secondary rounded-full p-1 flex items-center gap-1 w-fit select-none border border-border/50 overflow-hidden">
          <button
            type="button"
            onClick={() => onQuantityChange(-1)}
            className="size-8 flex items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface font-bold text-base focus:outline-none cursor-pointer"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="text-sm font-bold text-foreground min-w-[16px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(1)}
            className="size-8 flex items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface font-bold text-base focus:outline-none cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Main Action CTAs */}
      <div className="flex flex-col gap-3 pt-1">
        {/* Add to Cart */}
        <Button
          size="lg"
          onPress={onAddToCart}
          className={cn(
            "w-full min-h-11 rounded-full font-bold text-sm sm:text-base shadow-xs transition-all duration-200 cursor-pointer",
            isAddedToCart
              ? "bg-success text-success-foreground"
              : "bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground",
          )}
        >
          {isAddedToCart ? (
            <span className="flex items-center gap-2">
              <Check className="size-4" /> Added to Cart!
            </span>
          ) : (
            "Add to cart"
          )}
        </Button>

        {/* Buy Now */}
        <Button
          size="lg"
          className="w-full min-h-11 bg-foreground hover:bg-foreground/90 active:scale-[0.99] text-background font-bold text-sm sm:text-base rounded-full shadow-xs cursor-pointer"
        >
          Buy now
        </Button>

        {/* Save & Share Dual Buttons */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <Button
            variant="outline"
            onPress={onToggleSaved}
            className={cn(
              "flex-1 rounded-full text-xs sm:text-sm font-semibold h-11 transition-all cursor-pointer",
              isSaved
                ? "border-danger/30 text-danger bg-danger/10"
                : "border-border text-foreground hover:bg-surface-secondary bg-surface",
            )}
          >
            <Heart
              className={cn(
                "size-4",
                isSaved ? "fill-danger stroke-danger" : "stroke-current",
              )}
            />
            {isSaved ? "Saved" : "Save"}
          </Button>

          <PopoverRoot>
            <PopoverTrigger>
              <Button
                variant="outline"
                className="flex-1 rounded-full text-xs sm:text-sm font-semibold h-11 border-border text-foreground hover:bg-surface-secondary bg-surface transition-all cursor-pointer"
              >
                <Share2 className="size-4" />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-2xl shadow-xl border border-border bg-surface text-foreground z-50">
              <PopoverDialog className="p-3 text-xs font-medium">
                <p>Product link copied to clipboard!</p>
              </PopoverDialog>
            </PopoverContent>
          </PopoverRoot>
        </div>
      </div>
    </div>
  );
}
