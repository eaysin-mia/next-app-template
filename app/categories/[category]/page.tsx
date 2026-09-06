"use client";

import React, { use, useState, useMemo } from "react";
import {
  CategoryHeader,
  CategoryFilterBar,
  ProductCard,
  ShopSearchBar,
  type FilterState,
} from "@/components/shop";
import { PANTS_PRODUCTS, type CategoryProductItem } from "@/components/shop/data/categories";

const INITIAL_FILTERS: FilterState = {
  onSale: false,
  rating: 0,
  shipsTo: "BD",
  color: "All",
  minPrice: 0,
  maxPrice: 2000,
  sortBy: "recommended",
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const rawCategory = resolvedParams.category || "pants";
  const categoryTitle = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PANTS_PRODUCTS];

    if (filters.onSale) {
      result = result.filter((p) => p.onSale);
    }

    if (filters.rating > 0) {
      result = result.filter((p) => (p.ratingValue || 5) >= filters.rating);
    }

    if (filters.color !== "All") {
      result = result.filter((p) => p.color?.toLowerCase() === filters.color.toLowerCase());
    }

    if (filters.minPrice > 0 || filters.maxPrice < 2000) {
      result = result.filter(
        (p) => (p.priceValue || 0) >= filters.minPrice && (p.priceValue || 0) <= filters.maxPrice
      );
    }

    if (filters.sortBy === "lowest") {
      result.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (filters.sortBy === "highest") {
      result.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    } else if (filters.sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [filters]);

  return (
    <div className="relative w-full min-h-full flex flex-col pt-2 sm:pt-4 pb-28 px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1440px] mx-auto">
      {/* 1. Header & Breadcrumbs */}
      <div className="mb-6 sm:mb-7">
        <CategoryHeader
          title={categoryTitle}
          breadcrumbs={[
            { label: "All Categories", href: "/categories" },
            { label: "Men", href: "/categories/men" },
            { label: categoryTitle },
          ]}
        />
      </div>

      {/* 2. Filter & Sort Bar */}
      <div className="w-full flex justify-start sm:justify-center mb-8 sm:mb-10">
        <CategoryFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />
      </div>

      {/* 3. 6-Column Responsive Product Grid */}
      <div className="w-full max-w-full mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3.5 sm:gap-x-4 gap-y-7 sm:gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="w-full"
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted">
            <p className="text-base font-medium">No products match your selected filters.</p>
            <button
              type="button"
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="mt-3 text-xs font-semibold text-foreground underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Bottom Pinned Floating Search Bar */}
      <div className="sticky bottom-4 inset-x-0 z-30 flex justify-center px-4 mt-12 pointer-events-none">
        <div className="pointer-events-auto shadow-xl rounded-full">
          <ShopSearchBar />
        </div>
      </div>
    </div>
  );
}
