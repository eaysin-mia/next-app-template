"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard, ProductItem } from "./product-card";

export const BESTSELLER_PRODUCTS: ProductItem[] = [
  {
    id: "elwood-cap",
    brand: "Elwood Clothing",
    title: "TRADEMARK CAP",
    imageSrc:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: 85,
    price: "$50.00",
    imageFit: "contain",
  },
  {
    id: "buck-mason-coat",
    brand: "Buck Mason",
    title: "Heather Stone Felted Chore Coat",
    imageSrc:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: 25,
    price: "$268.00",
    imageFit: "contain",
  },
  {
    id: "kith-salomon",
    brand: "Kith",
    title: "Kith for Salomon XT-EVO - Black Coffee /...",
    imageSrc:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    price: "BDT 25,400.00",
    imageFit: "contain",
  },
  {
    id: "pool-house-jeans",
    brand: "Pool House New York",
    title: "Tokyo Jeans | Straight-Wide Leg",
    imageSrc:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: 29,
    price: "BDT 30,000.00",
    imageFit: "cover",
  },
  {
    id: "bylt-polo",
    brand: "BYLT Basics",
    title: "Drop-Cut: LUX Polo",
    badge: "25% off",
    imageSrc:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "1.1k",
    price: "BDT 6,900.00",
    originalPrice: "BDT 9,200.00",
    imageFit: "cover",
  },
  {
    id: "brunt-pant",
    brand: "BRUNT Workwear",
    title: "The Costello Tech Pant",
    imageSrc:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "2.6k",
    price: "$69.99",
    imageFit: "cover",
  },
  {
    id: "alo-hoodie",
    brand: "Alo Yoga",
    title: "Accolade Hoodie",
    imageSrc:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "4.2k",
    price: "$128.00",
    imageFit: "cover",
  },
  {
    id: "caraway-cookware",
    brand: "Caraway",
    title: "Non-Stick Ceramic Cookware",
    imageSrc:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "15.3k",
    price: "$395.00",
    imageFit: "cover",
  },
  {
    id: "owala-bottle",
    brand: "Owala",
    title: "FreeSip Stainless Steel Water Bottle 24oz",
    imageSrc:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "8.9k",
    price: "$37.99",
    imageFit: "contain",
  },
  {
    id: "vuori-short",
    brand: "Vuori",
    title: "Kore Short 7\" - Lined Performance Short",
    imageSrc:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "5.1k",
    price: "$68.00",
    imageFit: "cover",
  },
  {
    id: "dagne-bag",
    brand: "Dagne Dover",
    title: "Landon Carryall Neoprene Duffle Bag",
    imageSrc:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "2.4k",
    price: "$215.00",
    imageFit: "contain",
  },
  {
    id: "on-cloud",
    brand: "On Running",
    title: "Cloud 5 Waterproof All-Day Sneaker",
    imageSrc:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: "6.7k",
    price: "$169.99",
    imageFit: "contain",
  },
];

export interface ProductRailProps {
  title?: string;
  products?: ProductItem[];
  className?: string;
  onProductClick?: (product: ProductItem) => void;
  onHeaderClick?: () => void;
}

/**
 * ProductRail Component
 * Replicating the Shop app "Bestsellers" horizontal product carousel:
 * - Exactly 6 items visible across one full screen row on desktop with zero cutoff
 * - Compact card height matching the Shop app visual proportion
 * - Section header with chevron: "Bestsellers ›"
 * - Smooth horizontal scroll rail with hidden scrollbar
 * - Floating right carousel arrow button positioned over the 6th item's right edge
 */
export function ProductRail({
  title = "Bestsellers",
  products = BESTSELLER_PRODUCTS,
  className = "",
  onProductClick,
  onHeaderClick,
}: ProductRailProps) {
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
    // Scroll by exact container viewport width so a full set of 6 items slides in
    const amount = direction === "right" 
      ? scrollRef.current.clientWidth 
      : -scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={`relative w-full max-w-full mx-auto ${className}`}>
      {/* Section Header with Chevron */}
      <div className="mb-2.5">
        <button
          type="button"
          onClick={onHeaderClick}
          className="flex items-center gap-1.5 text-left group w-fit cursor-pointer focus:outline-none"
        >
          <span className="text-[17px] sm:text-[20px] font-semibold text-foreground tracking-[-0.05em] leading-tight group-hover:opacity-75 transition-opacity">
            {title}
          </span>
          <ChevronRight
            className="size-4 text-foreground stroke-[2] transition-transform group-hover:translate-x-0.5 shrink-0"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Scrollable Product Rail: exactly 6 cards in one screen row on desktop */}
      <div
        ref={scrollRef}
        className="flex items-start gap-2.5 sm:gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth w-full py-1"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            className="w-[calc((100%-10px)/2)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-36px)/4)] lg:w-[calc((100%-60px)/6)] min-w-[calc((100%-10px)/2)] sm:min-w-[calc((100%-20px)/3)] md:min-w-[calc((100%-36px)/4)] lg:min-w-[calc((100%-60px)/6)] shrink-0"
          />
        ))}
      </div>

      {/* Floating Carousel Next Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next products"
          className="absolute right-0 sm:right-0.5 top-[36%] -translate-y-1/2 z-20 size-8 sm:size-8.5 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          <ChevronRight className="size-4 text-foreground stroke-[2.2]" />
        </button>
      )}

      {/* Floating Carousel Prev Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous products"
          className="absolute left-0 sm:left-0.5 top-[36%] -translate-y-1/2 z-20 size-8 sm:size-8.5 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          <ChevronLeft className="size-4 text-foreground stroke-[2.2]" />
        </button>
      )}
    </div>
  );
}
