"use client";

import React, { useState } from "react";
import { CategoryHeader } from "./category-header";
import { ProductCard, type ProductItem } from "./product-card";
import { ShopSearchBar } from "./search-bar";
import { ProductRail } from "./product-rail";
import { INITIAL_SAVED_PRODUCTS } from "./data/wishlist-data";
import { BESTSELLER_PRODUCTS } from "./data/products";

export function WishlistView() {
  const [savedProducts, setSavedProducts] = useState<ProductItem[]>(INITIAL_SAVED_PRODUCTS);

  const handleWishlistToggle = (id: string, isWishlisted: boolean) => {
    if (!isWishlisted) {
      setSavedProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="relative w-full min-h-full flex flex-col pt-2 sm:pt-4 pb-28 px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1440px] mx-auto gap-6 sm:gap-8">
      {/* 1. Header & Breadcrumbs using standard CategoryHeader */}
      <div className="mb-2 sm:mb-4">
        <CategoryHeader
          title="Saved"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Saved" },
          ]}
        />
      </div>

      {/* 2. Saved Items Section */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            Saved
          </h2>
          <span className="text-xs text-muted font-normal">
            {savedProducts.length} {savedProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3.5 sm:gap-x-4 gap-y-7 sm:gap-y-8">
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
            <p className="text-sm font-medium text-foreground">No saved items yet.</p>
            <p className="text-xs text-muted max-w-xs">
              Items you heart while browsing will be saved here.
            </p>
            <button
              type="button"
              onClick={() => setSavedProducts(INITIAL_SAVED_PRODUCTS)}
              className="mt-2 text-xs font-semibold text-[#2f5cf6] hover:underline cursor-pointer"
            >
              Restore saved items
            </button>
          </div>
        )}
      </div>

      {/* 3. Reusable Recommendations Rail */}
      <div className="w-full mt-4">
        <ProductRail
          title="You might also like"
          products={BESTSELLER_PRODUCTS}
        />
      </div>

      {/* 4. Bottom Pinned Floating Search Bar using standard ShopSearchBar */}
      <div className="sticky bottom-4 inset-x-0 z-30 flex justify-center px-4 mt-8 pointer-events-none">
        <div className="pointer-events-auto shadow-xl rounded-full">
          <ShopSearchBar />
        </div>
      </div>
    </div>
  );
}
