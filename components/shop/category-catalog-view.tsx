"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  PageContainer,
  CategoryFilterBar,
  ProductCard,
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

const MAX_PRICE_THRESHOLD = 200000;

export interface CategoryCatalogViewProps {
  readonly initialCategory?: string;
}

function resolveCategoryTitle(categoryParam?: string): string {
  if (!categoryParam) {
    return "Products";
  }

  const normalized = categoryParam.toLowerCase();
  if (
    normalized === "pants" ||
    normalized === "products" ||
    normalized === "women"
  ) {
    return "Products";
  }

  return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
}

function filterProductsByQuery(
  products: readonly CategoryProductItem[],
  query: string,
): CategoryProductItem[] {
  const trimmed = query.toLowerCase().trim();
  if (trimmed.length === 0) {
    return [...products];
  }

  return products.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(trimmed);
    const brandMatch = p.brand ? p.brand.toLowerCase().includes(trimmed) : false;
    return titleMatch || brandMatch;
  });
}

function filterProductsByCriteria(
  products: readonly CategoryProductItem[],
  filters: FilterState,
): CategoryProductItem[] {
  return products.filter((product) => {
    if (filters.onSale && !product.onSale) {
      return false;
    }

    if (filters.rating > 0) {
      const currentRating = product.ratingValue ?? 5;
      if (currentRating < filters.rating) {
        return false;
      }
    }

    if (filters.color !== "All" && product.color) {
      if (product.color.toLowerCase() !== filters.color.toLowerCase()) {
        return false;
      }
    }

    const price = product.priceValue ?? 0;
    if (filters.minPrice > 0 && price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice < MAX_PRICE_THRESHOLD && price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

function sortProducts(
  products: CategoryProductItem[],
  sortBy: FilterState["sortBy"],
): CategoryProductItem[] {
  const result = [...products];

  switch (sortBy) {
    case "lowest":
      return result.sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    case "highest":
      return result.sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    case "newest":
      return result.reverse();
    case "recommended":
    default:
      return result;
  }
}

export function CategoryCatalogView({ initialCategory }: CategoryCatalogViewProps) {
  const categoryTitle = resolveCategoryTitle(initialCategory);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const searchMatches = filterProductsByQuery(ULLA_JOHNSON_PRODUCTS, searchQuery);
    const criteriaMatches = filterProductsByCriteria(searchMatches, filters);
    return sortProducts(criteriaMatches, filters.sortBy);
  }, [filters, searchQuery]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: categoryTitle },
  ];

  return (
    <PageContainer maxWidth="full">
      <PageContainer.Header
        title={categoryTitle}
        breadcrumbs={breadcrumbs}
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
        <div className="w-full mb-6 sm:mb-8">
          <CategoryFilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters(INITIAL_FILTERS)}
          />
        </div>

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
    </PageContainer>
  );
}
