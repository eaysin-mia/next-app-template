"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { cn } from "@heroui/react";
import { useCart } from "@/hooks/use-cart";
import type { CartBrandGroup, CartItem } from "./data/cart-data";
import { PageContainer } from "./page-container";
import { ProductRail } from "./product-rail";
import { BESTSELLER_PRODUCTS } from "./data/products";

interface CartItemRowProps {
  readonly storeId: string;
  readonly currencySymbol: string;
  readonly item: CartItem;
  readonly onUpdateQuantity: (
    storeId: string,
    itemId: string,
    delta: number,
  ) => void;
  readonly onRemoveItem: (storeId: string, itemId: string) => void;
}

function CartItemRow({
  storeId,
  currencySymbol,
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemRowProps) {
  const itemTotal = (item.unitPrice * item.quantity).toLocaleString();
  const productHref = item.productId ? `/product/${item.productId}` : "/cart";

  return (
    <div className="py-4 first:pt-3.5 last:pb-2 flex items-start gap-3.5 sm:gap-4">
      <Link href={productHref} className="relative shrink-0 group no-underline">
        <div className="size-20 sm:size-22 rounded-xl overflow-hidden bg-surface-secondary border border-border/50 transition-transform group-hover:scale-105">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0 pr-1">
            <Link
              href={productHref}
              className="text-sm font-semibold text-foreground line-clamp-2 hover:text-accent transition-colors no-underline leading-snug"
            >
              {item.title}
            </Link>
            {item.variant && (
              <span className="text-xs text-muted mt-0.5">{item.variant}</span>
            )}
          </div>

          <div className="flex flex-col items-end shrink-0 pt-0.5 text-right">
            <span className="text-sm font-bold text-foreground">
              {currencySymbol}
              {itemTotal}.00
            </span>
            {item.quantity > 1 && (
              <span className="text-[11px] text-muted">
                {currencySymbol}
                {item.unitPrice.toLocaleString()}.00 each
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 bg-surface-secondary rounded-full p-1 border border-border/70">
            <button
              type="button"
              onClick={() => onUpdateQuantity(storeId, item.id, -1)}
              className="size-6 rounded-full flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3 stroke-[2.5]" />
            </button>
            <span className="text-xs font-semibold w-5 text-center font-mono select-none">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(storeId, item.id, 1)}
              className="size-6 rounded-full flex items-center justify-center text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="size-3 stroke-[2.5]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemoveItem(storeId, item.id)}
            className="text-xs text-muted hover:text-danger font-medium transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

interface CartStoreCardProps {
  readonly store: CartBrandGroup;
  readonly onUpdateQuantity: (
    storeId: string,
    itemId: string,
    delta: number,
  ) => void;
  readonly onRemoveItem: (storeId: string, itemId: string) => void;
}

function CartStoreCard({
  store,
  onUpdateQuantity,
  onRemoveItem,
}: CartStoreCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-2xl bg-surface border border-border/80 p-5 sm:p-6 shadow-2xs transition-all">
      <div className="flex items-center justify-between pb-3.5 border-b border-border/60">
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
            <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wide truncate">
              {store.brand}
            </span>
            <span className="text-[11px] text-muted">
              {store.quantity} {store.quantity === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-medium text-muted">
          Free shipping eligible
        </span>
      </div>

      <div className="flex flex-col divide-y divide-border/50">
        {store.items.map((item) => (
          <CartItemRow
            key={item.id}
            storeId={store.id}
            currencySymbol={store.currencySymbol}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-border/60 mt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-muted">Store subtotal</span>
          <span className="font-bold text-foreground text-sm sm:text-base">
            {store.subtotal}
          </span>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/checkout?brand=${store.id}`)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs transition-all cursor-pointer active:scale-[0.99] text-center"
        >
          Check out with {store.brand}
        </button>
      </div>
    </div>
  );
}

interface CartOrderSummaryProps {
  readonly cartStores: readonly CartBrandGroup[];
  readonly totalItemCount: number;
}

function CartOrderSummary({
  cartStores,
  totalItemCount,
}: CartOrderSummaryProps) {
  const router = useRouter();
  const primaryBrandId = cartStores[0]?.id ?? "cart-flag-nor-fail";

  return (
    <div className="lg:col-span-4 bg-surface rounded-2xl border border-border/80 shadow-2xs p-5 sm:p-6 flex flex-col gap-4 sticky top-6 select-none">
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

      <div className="border-t border-border/60 pt-3.5 flex flex-col gap-2">
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

      <button
        type="button"
        onClick={() => router.push(`/checkout?brand=${primaryBrandId}`)}
        className="w-full py-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm transition-all text-center cursor-pointer active:scale-[0.99] shadow-xs mt-1"
      >
        Continue to checkout
      </button>
    </div>
  );
}

function CartEmptyState() {
  return (
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
  );
}

export function CartView() {
  const { cartStores, totalItemCount, isEmpty, updateQuantity, removeItem } =
    useCart();

  const handleUpdateQuantity = (
    storeId: string,
    itemId: string,
    delta: number,
  ) => {
    updateQuantity({ storeId, itemId, delta });
  };

  const handleRemoveItem = (storeId: string, itemId: string) => {
    removeItem({ storeId, itemId });
  };

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Cart" }];

  return (
    <PageContainer maxWidth="full">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col">
        <PageContainer.Header
          title="Cart"
          breadcrumbs={breadcrumbs}
          actions={
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-surface-secondary hover:bg-surface-tertiary border border-border/70 text-xs font-semibold text-foreground transition-all no-underline active:scale-[0.99]"
            >
              Continue shopping
            </Link>
          }
        />

        <PageContainer.Body className="gap-6 sm:gap-8">
          {isEmpty ? (
            <CartEmptyState />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
              <div className="lg:col-span-8 flex flex-col gap-5 w-full">
                {cartStores.map((store) => (
                  <CartStoreCard
                    key={store.id}
                    store={store}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>

              <CartOrderSummary
                cartStores={cartStores}
                totalItemCount={totalItemCount}
              />
            </div>
          )}
        </PageContainer.Body>
      </div>

      <section className="w-full mt-14 sm:mt-20 pt-7">
        <ProductRail
          title="You might also like"
          products={BESTSELLER_PRODUCTS}
          bleed
        />
      </section>
    </PageContainer>
  );
}
