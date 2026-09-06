"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@heroui/react";
import { useScrollRail } from "@/hooks/use-scroll-rail";
import { CarouselNavButton } from "./carousel-nav-button";
import { BESTSELLER_PRODUCTS } from "./data";
import { ProductCard } from "./product-card";
import type { ProductItem } from "./product-card";

export interface ProductRailProps {
  readonly title?: string;
  readonly products?: readonly ProductItem[];
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly onProductClick?: (product: ProductItem) => void;
  readonly onHeaderClick?: () => void;
  readonly headerHref?: string;
}

export function ProductRail({
  title = "Bestsellers",
  products = BESTSELLER_PRODUCTS,
  children,
  className = "",
  onProductClick,
  onHeaderClick,
  headerHref,
}: ProductRailProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } = useScrollRail();

  const renderHeaderContent = () => (
    <>
      <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-tight group-hover:opacity-75 transition-opacity">
        {title}
      </span>
      <ChevronRight
        className="size-4 text-foreground stroke-[2] transition-transform group-hover:translate-x-0.5 shrink-0"
        aria-hidden="true"
      />
    </>
  );

  return (
    <div className={cn("relative w-full max-w-full mx-auto", className)}>
      <div className="mb-2.5">
        {headerHref ? (
          <Link
            href={headerHref}
            className="flex items-center gap-1.5 text-left group w-fit cursor-pointer focus:outline-none no-underline"
          >
            {renderHeaderContent()}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onHeaderClick}
            className="flex items-center gap-1.5 text-left group w-fit cursor-pointer focus:outline-none"
          >
            {renderHeaderContent()}
          </button>
        )}
      </div>

      <div className="relative w-full group/rail">
        <div
          ref={scrollRef}
          className="flex items-start gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory w-full px-0 py-1"
        >
          {children
            ? children
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={onProductClick}
                  className="snap-start snap-always shrink-0 w-[calc((100%-24px)/2.25)] sm:w-[calc((100%-36px)/3.25)] md:w-[calc((100%-48px)/4.25)] lg:w-[calc((100%-72px)/6.25)]"
                />
              ))}
        </div>

        {canScrollRight && (
          <CarouselNavButton
            direction="right"
            onPress={() => scroll("right")}
            className="top-1/2 hidden sm:flex"
          />
        )}
        {canScrollLeft && (
          <CarouselNavButton
            direction="left"
            onPress={() => scroll("left")}
            className="top-1/2 hidden sm:flex"
          />
        )}

      </div>
    </div>
  );
}

