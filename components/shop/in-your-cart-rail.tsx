import React from "react";
import Link from "next/link";
import { cn } from "@heroui/react";
import { ProductRail } from "./product-rail";
import { IN_YOUR_CART_ITEMS } from "./data/cart-data";
import type { CartBrandGroup } from "./data/cart-data";

export type { CartBrandGroup };

export interface CartCardProps {
  readonly item: CartBrandGroup;
  readonly className?: string;
}

export function CartCard({ item, className = "" }: CartCardProps) {
  const productHref = item.productId ? `/product/${item.productId}` : "/cart";

  return (
    <div
      className={cn(
        "snap-start snap-always shrink-0 w-[280px] sm:w-[305px] md:w-[315px] bg-surface rounded-[22px] p-4 sm:p-4.5 border border-border/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 select-none",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 min-w-0">
          <div
            className={cn(
              "size-8 rounded-full flex items-center justify-center font-black text-[7.5px] uppercase tracking-tighter shrink-0 border border-border/70",
              item.brandAvatarBg ?? "bg-foreground",
              item.brandAvatarTextColor ?? "text-background",
            )}
          >
            <span className="truncate px-0.5 text-center leading-tight">
              {item.brandAvatarText}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground uppercase tracking-wide truncate">
              {item.brand}
            </span>
            <div className="text-xs text-muted font-normal mt-0.5 whitespace-nowrap">
              Subtotal:{" "}
              <span className="font-bold text-foreground">{item.subtotal}</span>
            </div>
          </div>
        </div>

        <Link
          href={productHref}
          aria-label={`View ${item.productTitle}`}
          className="relative shrink-0 group no-underline"
        >
          <span className="absolute -top-1.5 -left-1.5 z-10 size-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shadow-xs">
            {item.quantity}
          </span>

          <div className="size-13 sm:size-14 rounded-xl overflow-hidden bg-surface-secondary border border-border/50 transition-transform group-hover:scale-105">
            <img
              src={item.imageUrl}
              alt={item.productTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      <Link
        href={`/checkout?brand=${item.id}`}
        className="w-full py-2.5 rounded-full bg-surface-secondary hover:bg-surface-tertiary text-foreground border border-border/60 font-semibold text-xs transition-all text-center no-underline active:scale-[0.99]"
      >
        Continue to checkout
      </Link>
    </div>
  );
}

export interface InYourCartRailProps {
  readonly items?: readonly CartBrandGroup[];
  readonly className?: string;
  readonly title?: string;
}

export function InYourCartRail({
  items = IN_YOUR_CART_ITEMS,
  className = "",
  title = "In your cart",
}: InYourCartRailProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ProductRail title={title} headerHref="/cart" className={className}>
      {items.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
    </ProductRail>
  );
}
