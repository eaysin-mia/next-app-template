"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@heroui/react";
import { useScrollRail } from "@/hooks/use-scroll-rail";
import { CarouselNavButton } from "./carousel-nav-button";
import { CATEGORY_GRIDS } from "./data";
import type { CategoryBlock } from "@/types";

export interface CategoryGridProps {
  readonly categories?: readonly CategoryBlock[];
  readonly className?: string;
}

export function CategoryGrid({ categories = CATEGORY_GRIDS, className = "" }: CategoryGridProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } = useScrollRail();

  return (
    <div className={cn("relative w-full max-w-full mx-auto", className)}>
      <div
        ref={scrollRef}
        className="flex items-start gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory w-full px-0 py-1"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col shrink-0 select-none snap-start snap-always w-[calc((100%-16px)/1.25)] sm:w-[calc((100%-32px)/2.25)] md:w-[calc((100%-48px)/3.25)] lg:w-[calc((100%-80px)/5.25)]"
          >
            <button
              type="button"
              className="flex items-center gap-1.5 mb-2.5 text-left group w-fit cursor-pointer focus:outline-none"
            >
              <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-tight group-hover:opacity-75 transition-opacity">
                {category.name}
              </span>
              <ChevronRight
                className="size-4 text-foreground stroke-[2] transition-transform group-hover:translate-x-0.5 shrink-0"
                aria-hidden="true"
              />
            </button>

            <div className="w-full aspect-square rounded-[28px] overflow-hidden grid grid-cols-2 grid-rows-2 gap-px bg-surface shadow-sm">
              {category.tiles.map((tile, idx) => (
                <div
                  key={`${category.id}-${idx}-${tile.label}`}
                  className="relative w-full h-full overflow-hidden group cursor-pointer bg-surface-secondary"
                >
                  <img
                    src={tile.image}
                    alt={tile.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 inset-x-0 px-2 pb-2 pointer-events-none">
                    <span className="text-white text-sm font-medium tracking-tight truncate block select-none drop-shadow-sm">
                      {tile.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="shrink-0 w-4 sm:w-6 md:w-8 lg:w-10 pointer-events-none" aria-hidden="true" />
      </div>

      {canScrollRight && (
        <CarouselNavButton
          direction="right"
          onPress={() => scroll("right")}
          className="top-[58%] right-4 sm:right-6 md:right-8"
        />
      )}
      {canScrollLeft && (
        <CarouselNavButton
          direction="left"
          onPress={() => scroll("left")}
          className="top-[58%] left-4 sm:left-6 md:left-8"
        />
      )}
    </div>
  );
}
