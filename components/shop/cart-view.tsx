"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Minus, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@heroui/react";
import { IN_YOUR_CART_ITEMS } from "./data/cart-data";
import type { CartBrandGroup } from "./data/cart-data";
import { CategoryHeader } from "./category-header";
import { ProductRail } from "./product-rail";
import { RECOMMENDED_PRODUCTS } from "./data/products-data";

export function CartView() {
  const router = useRouter();
  const [cartStores, setCartStores] = useState<CartBrandGroup[]>(IN_YOUR_CART_ITEMS);

  // Update item quantity
  const handleUpdateQuantity = (storeId: string, itemId: string, delta: number) => {
    setCartStores((prevStores) =>
      prevStores
        .map((store) => {
          if (store.id !== storeId) return store;
          const updatedItems = store.items
            .map((item) => {
              if (item.id !== itemId) return item;
              const newQty = Math.max(0, item.quantity + delta);
              return { ...item, quantity: newQty };
            })
            .filter((item) => item.quantity > 0);

          if (updatedItems.length === 0) {
            return null as unknown as CartBrandGroup;
          }

          const newTotalQty = updatedItems.reduce((acc, curr) => acc + curr.quantity, 0);
          const newSubtotalVal = updatedItems.reduce(
            (acc, curr) => acc + curr.unitPrice * curr.quantity,
            0
          );

          return {
            ...store,
            quantity: newTotalQty,
            subtotalValue: newSubtotalVal,
            subtotal: `${store.currencySymbol}${newSubtotalVal.toLocaleString()}.00`,
            items: updatedItems,
          };
        })
        .filter(Boolean)
    );
  };

  // Remove item completely
  const handleRemoveItem = (storeId: string, itemId: string) => {
    handleUpdateQuantity(storeId, itemId, -999);
  };

  const totalItemCount = cartStores.reduce((acc, store) => acc + store.quantity, 0);

  return (
    <div className="relative w-full min-h-full flex flex-col pt-2 sm:pt-4 pb-28 px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1440px] mx-auto gap-6 sm:gap-8">
      {/* 1. Header & Breadcrumbs using CategoryHeader from design system */}
      <div className="mb-2 sm:mb-4">
        <CategoryHeader
          title="Cart"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
        />
      </div>

      {cartStores.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-surface-secondary/40 rounded-[22px] border border-dashed border-border/80 p-8 my-4">
          <div className="size-16 rounded-full bg-surface shadow-xs flex items-center justify-center text-muted">
            <ShoppingBag className="size-8" />
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <h3 className="text-base font-bold text-foreground">Your cart is empty</h3>
            <p className="text-xs text-muted">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 rounded-full bg-[#2f5cf6] text-white text-xs font-semibold hover:bg-[#254edb] transition-all no-underline shadow-xs"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        /* Store Groups & Summary Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start w-full">
          {/* Left Column: Store Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            {cartStores.map((store) => (
              <div
                key={store.id}
                className="bg-surface rounded-[22px] border border-border/80 shadow-xs p-4 sm:p-5 flex flex-col gap-4 transition-all select-none"
              >
                {/* Store Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    {/* Brand Avatar Circle matching CartCard */}
                    <div
                      className={cn(
                        "size-8 rounded-full flex items-center justify-center font-bold text-[9px] uppercase tracking-tight shrink-0 border border-border/70",
                        store.brandAvatarBg || "bg-black",
                        store.brandAvatarTextColor || "text-white"
                      )}
                    >
                      <span className="truncate px-0.5 text-center leading-tight">
                        {store.brandAvatarText}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground uppercase tracking-wide truncate">
                        {store.brand}
                      </span>
                      <span className="text-xs text-muted font-normal">
                        {store.items.length} {store.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>

                  {/* Subtotal in header matching CartCard */}
                  <div className="text-xs text-muted font-normal whitespace-nowrap">
                    Subtotal:{" "}
                    <span className="font-bold text-foreground">{store.subtotal}</span>
                  </div>
                </div>

                {/* Items in this store */}
                <div className="flex flex-col divide-y divide-border/50">
                  {store.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 sm:gap-3.5"
                    >
                      {/* Left: Product Thumbnail with Quantity Badge matching CartCard */}
                      <Link
                        href={item.productId ? `/product/${item.productId}` : "#"}
                        className="relative shrink-0 cursor-pointer group"
                      >
                        <span className="absolute -top-1.5 -left-1.5 z-10 size-5 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-xs">
                          {item.quantity}
                        </span>
                        <div className="size-14 sm:size-16 rounded-xl overflow-hidden bg-surface-secondary border border-border/50 transition-transform group-hover:scale-102">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Middle: Details & Stepper */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <Link
                          href={item.productId ? `/product/${item.productId}` : "#"}
                          className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight truncate hover:text-[#2f5cf6] transition-colors no-underline block"
                        >
                          {item.title}
                        </Link>
                        <span className="text-xs font-medium text-muted uppercase">
                          {item.variant}
                        </span>

                        {/* Quantity Stepper matching system */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 bg-surface-secondary rounded-full p-0.5 border border-border/60">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(store.id, item.id, -1)}
                              className="size-5 rounded-full flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer text-xs font-bold"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-2.5 stroke-[2.5]" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center font-mono select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(store.id, item.id, 1)}
                              className="size-5 rounded-full flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer text-xs font-bold"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-2.5 stroke-[2.5]" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(store.id, item.id)}
                            className="text-xs text-muted hover:text-danger font-medium transition-colors cursor-pointer ml-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Right: Item Total */}
                      <div className="flex flex-col items-end shrink-0 pt-0.5">
                        <span className="text-xs sm:text-sm font-bold text-foreground">
                          {store.currencySymbol}
                          {(item.unitPrice * item.quantity).toLocaleString()}.00
                        </span>
                        <span className="text-xs text-muted">
                          {store.currencySymbol}
                          {item.unitPrice.toLocaleString()}.00 each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Checkout Button - No Icon, matching CartCard */}
                <div className="pt-2 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => router.push(`/checkout?brand=${store.id}`)}
                    className="w-full py-2.5 rounded-full bg-[#f2f4f7] dark:bg-zinc-800 hover:bg-[#e6e8ec] dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-100 font-semibold text-xs transition-all text-center cursor-pointer active:scale-[0.99]"
                  >
                    Continue to checkout
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card matching system */}
          <div className="lg:col-span-4 bg-surface rounded-[22px] border border-border/80 shadow-xs p-4 sm:p-5 flex flex-col gap-4 sticky top-6 select-none">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
              Order Summary
            </h2>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted">
                <span>Total stores</span>
                <span className="font-semibold text-foreground">{cartStores.length}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Total items</span>
                <span className="font-semibold text-foreground">{totalItemCount}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Estimated shipping</span>
                <span className="text-foreground font-semibold">Free</span>
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-foreground uppercase">
                  Estimated Total
                </span>
                <div className="flex flex-col items-end">
                  {cartStores.map((s) => (
                    <span key={s.id} className="text-sm sm:text-base font-bold text-foreground">
                      {s.subtotal}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Taxes and shipping calculated at checkout.
              </p>
            </div>

            {/* Checkout Button - No Icon, matching system */}
            <button
              type="button"
              onClick={() =>
                router.push(`/checkout?brand=${cartStores[0]?.id || "cart-flag-nor-fail"}`)
              }
              className="w-full py-2.5 rounded-full bg-[#2f5cf6] hover:bg-[#254edb] text-white font-semibold text-xs sm:text-sm transition-all text-center cursor-pointer active:scale-[0.99] shadow-xs"
            >
              Continue to checkout
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted pt-0.5">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Safe & Secure Checkout</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Bottom Reusable ProductRail */}
      <section className="w-full pt-4">
        <ProductRail
          title="You might also like"
          products={RECOMMENDED_PRODUCTS.map((p) => ({
            id: p.id,
            title: p.title,
            brand: p.brand,
            imageSrc: p.imageUrl || "",
            price: p.price || "",
            originalPrice: p.originalPrice,
            badge: p.discountBadge,
            rating: p.rating,
            reviewCount: p.reviewCount,
          }))}
          onProductClick={(p) => router.push(`/product/${p.id}`)}
        />
      </section>
    </div>
  );
}
