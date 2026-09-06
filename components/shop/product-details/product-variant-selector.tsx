"use client";

import React from "react";
import { cn } from "@heroui/react";

export interface ProductSizeOption {
  readonly id: string;
  readonly label: string;
  readonly available: boolean;
}

export interface ProductVariantSelectorProps {
  readonly sizes: readonly ProductSizeOption[];
  readonly selectedSize: string;
  readonly onSelectSize: (size: string) => void;
}

export function ProductVariantSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: ProductVariantSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-bold text-foreground uppercase tracking-wider">
        SIZE <span className="font-extrabold">{selectedSize.toUpperCase()}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((sz) => {
          const isSelected =
            selectedSize.toLowerCase() === sz.label.toLowerCase();

          if (!sz.available) {
            return (
              <button
                key={sz.id}
                type="button"
                disabled
                className="rounded-full h-8 px-3.5 flex items-center justify-center bg-surface-secondary border border-transparent text-muted text-xs font-semibold uppercase cursor-not-allowed select-none"
              >
                {sz.label.toUpperCase()}
              </button>
            );
          }

          return (
            <button
              key={sz.id}
              type="button"
              onClick={() => onSelectSize(sz.label)}
              className={cn(
                "rounded-full h-8 px-3.5 flex items-center justify-center text-xs font-semibold uppercase transition-colors duration-150 cursor-pointer focus:outline-none select-none border",
                isSelected
                  ? "bg-surface border-foreground text-foreground shadow-2xs font-bold"
                  : "bg-surface border-border text-muted hover:text-foreground hover:border-border/80",
              )}
            >
              {sz.label.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
