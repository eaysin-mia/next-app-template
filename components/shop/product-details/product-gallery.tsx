"use client";

import React from "react";
import { Button, cn } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  readonly id: string;
  readonly alt: string;
  readonly url: string;
}

export interface ProductGalleryProps {
  readonly gallery: readonly GalleryImage[];
  readonly selectedImageIndex: number;
  readonly onSelectImage: (index: number) => void;
  readonly onPrevImage: () => void;
  readonly onNextImage: () => void;
}

export function ProductGallery({
  gallery,
  selectedImageIndex,
  onSelectImage,
  onPrevImage,
  onNextImage,
}: ProductGalleryProps) {
  const activeImage = gallery[selectedImageIndex] ?? gallery[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center justify-center lg:sticky lg:top-8 self-start min-w-0">
      {/* 1. Vertical Thumbnail Strip (Desktop Only) */}
      <div className="hidden lg:flex flex-col gap-2 shrink-0 py-0.5">
        {gallery.slice(0, 8).map((img, idx) => {
          const isSelected = idx === selectedImageIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={cn(
                "relative w-9 h-12 sm:w-11 sm:h-14 lg:w-[48px] lg:h-[62px] rounded-xl overflow-hidden shrink-0 transition-all duration-150 focus:outline-none cursor-pointer p-0.5",
                isSelected
                  ? "border-2 border-foreground p-[2px] bg-surface shadow-xs scale-[1.02]"
                  : "border border-transparent hover:border-border opacity-75 hover:opacity-100 bg-surface-secondary hover:scale-[1.03]",
              )}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover rounded-[7px] sm:rounded-[10px]"
              />
            </button>
          );
        })}
      </div>

      {/* Centered Left Arrow - Desktop Only */}
      <div className="hidden lg:flex items-center justify-center shrink-0 px-2.5 sm:px-4 md:px-6 xl:px-8">
        <Button
          isIconOnly
          variant="outline"
          onPress={onPrevImage}
          aria-label="Previous image"
          className="size-10 rounded-full bg-surface shadow-md hover:shadow-lg border-border text-foreground hover:bg-surface-secondary active:scale-95 cursor-pointer shrink-0"
        >
          <ChevronLeft className="size-5 stroke-[2.2]" />
        </Button>
      </div>

      {/* 2. Main Hero Image Container: Responsive */}
      <div className="w-full max-w-[420px] sm:max-w-[460px] lg:w-[450px] xl:w-[480px] aspect-[4/5] max-h-[580px] sm:max-h-[600px] lg:max-h-[calc(100vh-170px)] xl:max-h-[610px] bg-surface-secondary rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden relative flex items-center justify-center shadow-sm shrink-0">
        <img
          src={activeImage.url}
          alt={activeImage.alt}
          className="w-full h-full object-cover"
        />

        {/* Mobile Floating Left Arrow */}
        <Button
          isIconOnly
          variant="outline"
          size="sm"
          onPress={onPrevImage}
          aria-label="Previous image"
          className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-surface/90 backdrop-blur-xs shadow-md border-border text-foreground active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="size-4 stroke-[2.2]" />
        </Button>

        {/* Mobile Floating Right Arrow */}
        <Button
          isIconOnly
          variant="outline"
          size="sm"
          onPress={onNextImage}
          aria-label="Next image"
          className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-surface/90 backdrop-blur-xs shadow-md border-border text-foreground active:scale-95 cursor-pointer"
        >
          <ChevronRight className="size-4 stroke-[2.2]" />
        </Button>

        {/* Mobile Image Index Pill */}
        <div className="lg:hidden absolute bottom-3 right-3 z-10 bg-foreground/75 backdrop-blur-xs text-background text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
          {selectedImageIndex + 1} / {gallery.length}
        </div>
      </div>

      {/* Centered Right Arrow - Desktop Only */}
      <div className="hidden lg:flex items-center justify-center shrink-0 px-2.5 sm:px-4 md:px-6 xl:px-8">
        <Button
          isIconOnly
          variant="outline"
          onPress={onNextImage}
          aria-label="Next image"
          className="size-10 rounded-full bg-surface shadow-md hover:shadow-lg border-border text-foreground hover:bg-surface-secondary active:scale-95 cursor-pointer shrink-0"
        >
          <ChevronRight className="size-5 stroke-[2.2]" />
        </Button>
      </div>

      {/* Mobile Horizontal Thumbnail Strip */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-3 w-full max-w-[420px] sm:max-w-[460px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {gallery.slice(0, 8).map((img, idx) => {
          const isSelected = idx === selectedImageIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={cn(
                "relative w-11 h-14 sm:w-12 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all duration-150 focus:outline-none cursor-pointer p-0.5",
                isSelected
                  ? "border-2 border-foreground p-[2px] bg-surface shadow-xs scale-105"
                  : "border border-transparent hover:border-border opacity-70 hover:opacity-100 bg-surface-secondary",
              )}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover rounded-[7px]"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
