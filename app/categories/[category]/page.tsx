"use client";

import React, { use, useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  PageContainer,
  CategoryFilterBar,
  ProductCard,
  ShopSearchBar,
  type FilterState,
} from "@/components/shop";
import {
  ULLA_JOHNSON_PRODUCTS,
  type CategoryProductItem,
} from "@/components/shop/data/categories";

const INITIAL_FILTERS: FilterState = {
  inStock: true,
  onSale: false,
  rating: 0,
  shipsTo: "BD",
  color: "All",
  minPrice: 0,
  maxPrice: 200000,
  sortBy: "recommended",
};

interface CategoryPageProps {
  readonly params: Promise<{ readonly category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const rawCategory = resolvedParams.category ?? "products";
  const categoryTitle =
    rawCategory === "pants" || rawCategory === "products" || rawCategory === "women"
      ? "Products"
      : rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...ULLA_JOHNSON_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (filters.onSale) {
      result = result.filter((p) => p.onSale);
    }

    if (filters.rating > 0) {
      result = result.filter((p) => (p.ratingValue ?? 5) >= filters.rating);
    }

    if (filters.color !== "All") {
      result = result.filter(
        (p) => p.color?.toLowerCase() === filters.color.toLowerCase()
      );
    }

    if (filters.minPrice > 0 || filters.maxPrice < 200000) {
      result = result.filter(
        (p) =>
          (p.priceValue ?? 0) >= filters.minPrice &&
          (p.priceValue ?? 0) <= filters.maxPrice
      );
    }

    if (filters.sortBy === "lowest") {
      result.sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    } else if (filters.sortBy === "highest") {
      result.sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    } else if (filters.sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [filters, searchQuery]);

  return (
    <PageContainer maxWidth="full">
      {/* 1. Header Bar: Breadcrumbs in middle, Title and Search */}
      <PageContainer.Header
        title={categoryTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: categoryTitle },
        ]}
        actions={
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-9 sm:h-9.5 pl-9 sm:pl-9.5 pr-4 bg-surface-secondary/70 hover:bg-surface-secondary focus:bg-surface border border-border/80 focus:border-foreground/30 rounded-full text-xs sm:text-sm font-medium text-foreground placeholder:text-muted outline-none transition-all shadow-2xs"
            />
          </div>
        }
      />

      <PageContainer.Body>
        {/* 2. Filter & Sort Bar */}
        <div className="w-full mb-6 sm:mb-8">
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
              <p className="text-base font-medium">
                No products match your selected filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilters(INITIAL_FILTERS);
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-foreground underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </PageContainer.Body>

      {/* 4. Bottom Pinned Floating Search Bar */}
      <PageContainer.FloatingBar>
        <ShopSearchBar />
      </PageContainer.FloatingBar>
    </PageContainer>
  );
}
