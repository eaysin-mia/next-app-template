"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface CategoryTile {
  label: string;
  image: string;
}

export interface CategoryBlock {
  id: string;
  name: string;
  tiles: [CategoryTile, CategoryTile, CategoryTile, CategoryTile];
}

export const CATEGORY_GRIDS: CategoryBlock[] = [
  {
    id: "women",
    name: "Women",
    tiles: [
      {
        label: "Dresses",
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Shirts",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Sneakers",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Pants",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "men",
    name: "Men",
    tiles: [
      {
        label: "Hoodies",
        image:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Pants",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "T-shirts",
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Sneakers",
        image:
          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    tiles: [
      {
        label: "Lotion & moisturizer",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Hair styling products",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Anti-aging kits",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Perfume & cologne",
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "home",
    name: "Home",
    tiles: [
      {
        label: "Blankets",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Rugs",
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Home fragrances",
        image:
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Household appliances",
        image:
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "fitness",
    name: "Fitness & nutrition",
    tiles: [
      {
        label: "Exercise equipment",
        image:
          "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Supplements",
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Vitamins",
        image:
          "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Drinks & shakes",
        image:
          "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "baby",
    name: "Baby",
    tiles: [
      {
        label: "Formula & feeding",
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Toys & learning",
        image:
          "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Diapers & care",
        image:
          "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Baby clothes",
        image:
          "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "food",
    name: "Food & drinks",
    tiles: [
      {
        label: "Snacks & sweets",
        image:
          "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Coffee & tea",
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Pantry staples",
        image:
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop&q=80",
      },
      {
        label: "Artisan desserts",
        image:
          "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export interface CategoryGridProps {
  categories?: CategoryBlock[];
  className?: string;
}

/**
 * CategoryGrid Component
 * Replicating the Shop app category rail:
 * - 20px semibold GT Standard style header with chevron
 * - 2x2 grid card with 28px rounded outer corners (overflow-hidden)
 * - 2px hairline white dividers between tiles
 * - Full bleed imagery with bottom gradient overlay
 * - Direct white typography labels at bottom-left
 * - Circular 32px floating carousel navigation arrow
 */
export function CategoryGrid({
  categories = CATEGORY_GRIDS,
  className = "",
}: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      ref.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "right" ? 360 : -360;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={`relative w-full max-w-full mx-auto ${className}`}>
      {/* Scrollable Category Rail */}
      <div
        ref={scrollRef}
        className="flex items-start gap-4 sm:gap-5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-2 sm:px-4 py-1"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col shrink-0 select-none"
          >
            {/* Category Header with Chevron */}
            <button
              type="button"
              className="flex items-center gap-1.5 mb-2.5 text-left group w-fit cursor-pointer focus:outline-none"
            >
              <span className="text-[16px] sm:text-[18px] font-semibold text-foreground tracking-[-0.02em] leading-tight group-hover:opacity-75 transition-opacity">
                {category.name}
              </span>
              <ChevronRight
                className="size-4 text-foreground stroke-[2.2] transition-transform group-hover:translate-x-0.5 shrink-0"
                aria-hidden="true"
              />
            </button>

            {/* 2x2 Grid Product Card: True Shop App Proportions (320-350px wide, aspect-[1/0.92], 28px radius) */}
            <div className="w-[290px] sm:w-[325px] lg:w-[345px] aspect-[1/0.92] rounded-[24px] sm:rounded-[28px] overflow-hidden grid grid-cols-2 grid-rows-2 gap-[1.5px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-neutral-100">
              {category.tiles.map((tile, idx) => (
                <div
                  key={`${category.id}-${idx}-${tile.label}`}
                  className="relative w-full h-full overflow-hidden group cursor-pointer bg-neutral-100"
                >
                  {/* Product Image */}
                  <img
                    src={tile.image}
                    alt={tile.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />

                  {/* Clean bottom fade for text contrast */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Clean Direct White Text Label */}
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 pb-2.5 sm:pb-3 pointer-events-none">
                    <span className="text-white text-[13px] sm:text-[14px] font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] whitespace-nowrap overflow-hidden text-ellipsis block select-none">
                      {tile.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Carousel Next Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next categories"
          className="absolute right-1 sm:right-2 top-[56%] -translate-y-1/2 z-20 size-8 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          <ChevronRight className="size-4 text-foreground stroke-[2.2]" />
        </button>
      )}

      {/* Floating Carousel Prev Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous categories"
          className="absolute left-1 sm:left-2 top-[56%] -translate-y-1/2 z-20 size-8 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          <ChevronLeft className="size-4 text-foreground stroke-[2.2]" />
        </button>
      )}
    </div>
  );
}
