"use client";

import React, { useState } from "react";
import { PageContainer } from "./page-container";
import { ProductCard, type ProductItem } from "./product-card";
import { ShopSearchBar } from "./search-bar";
import { ProductRail } from "./product-rail";
import { INITIAL_SAVED_PRODUCTS } from "./data/wishlist-data";
import { BESTSELLER_PRODUCTS } from "./data/products";

export function WishlistView() {
  const [savedProducts, setSavedProducts] = useState<readonly ProductItem[]>(
    INITIAL_SAVED_PRODUCTS,
  );

  const handleWishlistToggle = (id: string, isWishlisted: boolean) => {
    if (!isWishlisted) {
      setSavedProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Saved" },
  ] as const;

  return (
    <PageContainer maxWidth="full" rightBleed>
      <div className="w-full pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex flex-col">
        {/* 1. Header with Breadcrumbs and Item Count */}
        <PageContainer.Header
          title="Saved"
          breadcrumbs={breadcrumbs}
          actions={
            <span className="text-xs text-muted font-normal">
              {savedProducts.length}{" "}
              {savedProducts.length === 1 ? "item" : "items"}
            </span>
          }
        />

        {/* 2. Main Body Content */}
        <PageContainer.Body className="gap-6 sm:gap-8">
          {savedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3.5 sm:gap-x-4 gap-y-7 sm:gap-y-8 w-full">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={true}
                  onWishlistToggle={handleWishlistToggle}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-foreground">
                No saved items yet.
              </p>
              <p className="text-xs text-muted max-w-xs">
                Items you heart while browsing will be saved here.
              </p>
              <button
                type="button"
                onClick={() => setSavedProducts(INITIAL_SAVED_PRODUCTS)}
                className="mt-2 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Restore saved items
              </button>
            </div>
          )}
        </PageContainer.Body>
      </div>

      {/* 3. Reusable Recommendations Rail bleeds to right edge of screen */}
      <section className="w-full mt-12 sm:mt-16">
        <ProductRail
          title="You might also like"
          products={BESTSELLER_PRODUCTS}
          bleed
        />
      </section>

      {/* 4. Bottom Sticky Floating Search Bar */}
      <PageContainer.FloatingBar>
        <ShopSearchBar />
      </PageContainer.FloatingBar>
    </PageContainer>
  );
}
