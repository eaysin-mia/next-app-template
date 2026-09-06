"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import type { CartBrandGroup } from "@/components/shop/data/cart-data";

export interface CheckoutOrderSummaryProps {
  readonly brandGroup: CartBrandGroup;
  readonly discountCode: string;
  readonly onDiscountCodeChange: (value: string) => void;
  readonly onApplyDiscount: () => void;
  readonly discountError?: string;
  readonly discountSuccess?: string;
  readonly appliedDiscount: number | null;
  readonly discountAmount: number;
  readonly baseSubtotal: number;
  readonly totalValue: number;
  readonly formatCurrency: (val: number) => string;
  readonly showMobileSummary: boolean;
  readonly onToggleMobileSummary: () => void;
}

export function CheckoutOrderSummary({
  brandGroup,
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  discountError,
  discountSuccess,
  appliedDiscount,
  discountAmount,
  baseSubtotal,
  totalValue,
  formatCurrency,
  showMobileSummary,
  onToggleMobileSummary,
}: CheckoutOrderSummaryProps) {
  const primaryItem = brandGroup.items?.[0] ?? {
    id: "default-item",
    productId: brandGroup.productId ?? "womens-ribbed-henley-tan",
    title: brandGroup.productTitle,
    variant: brandGroup.variant ?? "LARGE",
    unitPriceFormatted: brandGroup.subtotal,
    quantity: brandGroup.quantity,
    imageUrl: brandGroup.imageUrl,
  };

  const productHref = `/product/${primaryItem.productId ?? brandGroup.productId ?? "womens-ribbed-henley-tan"}`;

  return (
    <>
      {/* Mobile Top Collapsible Order Summary Bar */}
      <div className="lg:hidden border-b border-border/80 bg-surface-secondary/50 px-4 py-3.5 shrink-0">
        <button
          type="button"
          onClick={onToggleMobileSummary}
          className="w-full flex items-center justify-between text-sm font-medium text-foreground cursor-pointer"
        >
          <div className="flex items-center gap-2 text-accent font-semibold">
            <ShoppingBag className="size-4.5" />
            <span>
              {showMobileSummary ? "Hide order summary" : "Show order summary"}
            </span>
            {showMobileSummary ? (
              <ChevronUp className="size-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="size-4 stroke-[2.5]" />
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted">{brandGroup.currencyCode}</span>
            <span className="font-bold text-base text-foreground">
              {formatCurrency(totalValue)}
            </span>
          </div>
        </button>

        {showMobileSummary && (
          <div className="mt-3.5 pt-3.5 border-t border-border/60 flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={productHref}
                className="flex items-center gap-3.5 group no-underline"
              >
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 z-10 size-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center shadow-xs">
                    {primaryItem.quantity}
                  </span>
                  <div className="size-14 rounded-xl overflow-hidden bg-surface border border-border/60 group-hover:scale-105 transition-transform">
                    <img
                      src={primaryItem.imageUrl}
                      alt={primaryItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                    {primaryItem.title}
                  </span>
                  <span className="text-xs text-muted uppercase mt-0.5">
                    {primaryItem.variant}
                  </span>
                </div>
              </Link>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {/* Discount row */}
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => onDiscountCodeChange(e.target.value)}
                className="flex-1 h-10 px-3.5 rounded-xl border border-border/80 bg-surface text-foreground text-xs sm:text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={onApplyDiscount}
                className="h-10 px-4 rounded-xl bg-surface-secondary hover:bg-surface-tertiary text-foreground text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Cost breakdown */}
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(baseSubtotal)}
                </span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-success font-semibold">
                  <span>Discount (10% off)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-success font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border/60">
                <span>Total</span>
                <span>{formatCurrency(totalValue)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Right Column */}
      <div className="hidden lg:flex lg:min-h-full border-l border-border/70 bg-surface-secondary/40 flex-col items-start justify-center py-8 px-4 sm:px-10 lg:px-8 xl:px-10 overflow-y-auto">
        <div className="w-full max-w-[460px] flex flex-col gap-5 my-auto">
          <div className="flex items-start justify-between gap-3.5">
            <Link
              href={productHref}
              className="flex items-start gap-3.5 min-w-0 group no-underline"
              title="View product details"
            >
              <div className="relative shrink-0">
                <span className="absolute -top-2 -right-2 z-10 size-5 rounded-full bg-foreground text-background text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {primaryItem.quantity}
                </span>
                <div className="size-16 rounded-xl overflow-hidden bg-surface-secondary border border-border/60 group-hover:scale-105 group-hover:border-foreground/30 transition-all">
                  <img
                    src={primaryItem.imageUrl}
                    alt={primaryItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col pt-0.5 min-w-0">
                <span className="text-sm font-bold text-foreground uppercase tracking-tight leading-snug truncate group-hover:text-accent transition-colors flex items-center gap-1">
                  {primaryItem.title}
                  <ExternalLink className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </span>
                <span className="text-xs text-muted uppercase mt-0.5 font-medium">
                  {primaryItem.variant}
                </span>
              </div>
            </Link>

            <span className="text-sm font-semibold text-foreground whitespace-nowrap pt-0.5">
              {formatCurrency(baseSubtotal)}
            </span>
          </div>

          {/* Discount Code Input */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => onDiscountCodeChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onApplyDiscount()}
                className="flex-1 h-10 px-3.5 rounded-xl border border-border/80 bg-surface text-foreground text-xs sm:text-sm placeholder:text-muted outline-none focus:border-accent transition-colors shadow-2xs"
              />
              <button
                type="button"
                onClick={onApplyDiscount}
                className="h-10 px-4 rounded-xl bg-surface-secondary hover:bg-surface-tertiary text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </div>

            {discountError && (
              <span className="text-xs text-danger font-medium">
                {discountError}
              </span>
            )}
            {discountSuccess && (
              <span className="text-xs text-success font-medium">
                {discountSuccess}
              </span>
            )}
          </div>

          {/* Financial Breakdown */}
          <div className="flex flex-col gap-3 pt-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted font-normal">Subtotal</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {appliedDiscount && (
              <div className="flex items-center justify-between text-success">
                <span>Discount (10% off)</span>
                <span className="font-semibold">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted">
                <span>Shipping</span>
                <Info className="size-3 text-muted/60" />
              </div>
              <span className="font-semibold text-success">Free</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted font-normal">Estimated taxes</span>
              <span className="text-xs text-muted">Included in price</span>
            </div>
          </div>

          {/* Total Row */}
          <div className="flex items-baseline justify-between pt-3 border-t border-border/70">
            <span className="text-base sm:text-lg font-bold text-foreground">
              Total
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted font-normal">
                {brandGroup.currencyCode}
              </span>
              <span className="text-xl font-bold text-foreground tracking-tight">
                {formatCurrency(totalValue)}
              </span>
            </div>
          </div>

          {/* Trust Assurance Section */}
          <div className="pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted">
            <ShieldCheck className="size-4 text-success shrink-0" />
            <span>Shop Guarantee · 30-day free returns and buyer protection</span>
          </div>
        </div>
      </div>
    </>
  );
}
