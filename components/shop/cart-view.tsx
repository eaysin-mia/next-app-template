"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { cn } from "@heroui/react";
import { IN_YOUR_CART_ITEMS } from "./data/cart-data";
import type { CartBrandGroup } from "./data/cart-data";
import { PageContainer } from "./page-container";
import { ProductRail } from "./product-rail";
import { BESTSELLER_PRODUCTS } from "./data/products";

export function CartView() {
  const router = useRouter();
  const [cartStores, setCartStores] =
    useState<readonly CartBrandGroup[]>(IN_YOUR_CART_ITEMS);

  // Update item quantity without illegal type casting
  const handleUpdateQuantity = (
    storeId: string,
    itemId: string,
    delta: number,
  ) => {
    setCartStores((prevStores) => {
      const updatedStores: CartBrandGroup[] = [];

      for (const store of prevStores) {
        if (store.id !== storeId) {
          updatedStores.push(store);
          continue;
        }

        const nextItems = store.items
          .map((item) => {
            if (item.id !== itemId) return item;
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          })
          .filter((item) => item.quantity > 0);

        if (nextItems.length > 0) {
          const newTotalQty = nextItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0,
          );
          const newSubtotalVal = nextItems.reduce(
            (acc, curr) => acc + curr.unitPrice * curr.quantity,
            0,
          );

          updatedStores.push({
            ...store,
            quantity: newTotalQty,
            subtotalValue: newSubtotalVal,
            subtotal: `${store.currencySymbol}${newSubtotalVal.toLocaleString()}.00`,
            items: nextItems,
          });
        }
      }

      return updatedStores;
    });
  };

  const handleRemoveItem = (storeId: string, itemId: string) => {
    handleUpdateQuantity(storeId, itemId, -999);
  };

  const totalItemCount = cartStores.reduce(
    (acc, store) => acc + store.quantity,
    0,
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Cart" },
  ] as const;

  return (
    <PageContainer maxWidth="full" rightBleed>
      <div className="w-full pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex flex-col">
        {/* 1. Header with Breadcrumbs */}
        <PageContainer.Header title="Cart" breadcrumbs={breadcrumbs} />

        <PageContainer.Body className="gap-6 sm:gap-8">
          {cartStores.length === 0 ? (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-surface-secondary/40 rounded-[22px] border border-dashed border-border/80 p-8 my-4">
              <div className="size-16 rounded-full bg-surface shadow-xs flex items-center justify-center text-muted">
                <ShoppingBag className="size-8" />
              </div>
              <div className="flex flex-col gap-1 max-w-xs">
                <h3 className="text-base font-bold text-foreground">
                  Your cart is empty
                </h3>
                <p className="text-xs text-muted">
                  Looks like you haven&apos;t added anything to your cart yet.
                </p>
              </div>
              <Link
                href="/"
                className="mt-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90 transition-all no-underline shadow-xs"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            /* Store Groups & Summary Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start w-full">
              {/* Left Column: Store Cards */}
              <div className="lg:col-span-8 flex flex-col gap-4 w-full">
                {cartStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex flex-col rounded-[22px] bg-surface border border-border/80 p-4 sm:p-5 shadow-xs transition-all hover:border-border"
                  >
                    {/* Store Title Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "size-7 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-tight",
                            store.brandAvatarBg ?? "bg-foreground",
                            store.brandAvatarTextColor ?? "text-background",
                          )}
                        >
                          {store.brandAvatarText}
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-foreground uppercase tracking-wide truncate">
                            {store.brand}
                          </span>
                          <span className="text-[11px] text-muted">
                            {store.quantity}{" "}
                            {store.quantity === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted">
                        <span>Subtotal:</span>
                        <span className="font-bold text-foreground">
                          {store.subtotal}
                        </span>
                      </div>
                    </div>

                    {/* Items in this Store */}
                    <div className="flex flex-col divide-y divide-border/50">
                      {store.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3 sm:gap-4"
                        >
                          <Link
                            href={
                              item.productId
                                ? `/product/${item.productId}`
                                : "#"
                            }
                            className="relative shrink-0 group no-underline"
                          >
                            <span className="absolute -top-1.5 -left-1.5 z-10 size-5 rounded-full bg-surface-secondary border border-border/80 text-foreground font-bold text-[10px] flex items-center justify-center shadow-xs">
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
                              href={
                                item.productId
                                  ? `/product/${item.productId}`
                                  : "#"
                              }
                              className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight truncate hover:text-accent transition-colors no-underline block"
                            >
                              {item.title}
                            </Link>
                            <span className="text-xs font-medium text-muted uppercase">
                              {item.variant}
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 bg-surface-secondary rounded-full p-0.5 border border-border/60">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateQuantity(store.id, item.id, -1)
                                  }
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
                                  onClick={() =>
                                    handleUpdateQuantity(store.id, item.id, 1)
                                  }
                                  className="size-5 rounded-full flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer text-xs font-bold"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="size-2.5 stroke-[2.5]" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem(store.id, item.id)
                                }
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
                              {(
                                item.unitPrice * item.quantity
                              ).toLocaleString()}
                              .00
                            </span>
                            <span className="text-xs text-muted">
                              {store.currencySymbol}
                              {item.unitPrice.toLocaleString()}.00 each
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Checkout Button */}
                    <div className="pt-2 border-t border-border/60">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/checkout?brand=${store.id}`)
                        }
                        className="w-full py-2.5 rounded-full bg-surface-secondary hover:bg-surface-tertiary text-foreground border border-border/70 font-semibold text-xs transition-all text-center cursor-pointer active:scale-[0.99]"
                      >
                        Continue to checkout
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-4 bg-surface rounded-[22px] border border-border/80 shadow-xs p-4 sm:p-5 flex flex-col gap-4 sticky top-6 select-none">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Total stores</span>
                    <span className="font-semibold text-foreground">
                      {cartStores.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Total items</span>
                    <span className="font-semibold text-foreground">
                      {totalItemCount}
                    </span>
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
                        <span
                          key={s.id}
                          className="text-sm sm:text-base font-bold text-foreground"
                        >
                          {s.subtotal}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Taxes and shipping calculated at checkout.
                  </p>
                </div>

                {/* Checkout Button with semantic accent token */}
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/checkout?brand=${cartStores[0]?.id ?? "cart-flag-nor-fail"}`,
                    )
                  }
                  className="w-full py-2.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs sm:text-sm transition-all text-center cursor-pointer active:scale-[0.99] shadow-xs"
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          )}
        </PageContainer.Body>
      </div>

      {/* Bottom Recommendations */}
      <section className="w-full mt-12 sm:mt-16">
        <ProductRail
          title="You might also like"
          products={BESTSELLER_PRODUCTS}
          bleed
        />
      </section>
    </PageContainer>
  );
}
