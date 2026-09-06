"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, ShoppingBag, Tag, User } from "lucide-react";
import { cn } from "@heroui/react";
import { IN_YOUR_CART_ITEMS } from "@/components/shop/data";

export function SidebarNavRail() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCategories = pathname.startsWith("/categories");
  const isCart = pathname.startsWith("/cart");
  const isDeals = pathname.startsWith("/deals");
  const isWishlist =
    pathname.startsWith("/wishlist") || pathname.startsWith("/saved");
  const isAccount = pathname.startsWith("/account");

  const cartItemCount = IN_YOUR_CART_ITEMS.length;

  return (
    <>
      {/* Desktop Sidebar Rail */}
      <aside
        aria-label="Sidebar Navigation"
        className="fixed top-0 left-0 z-[60] hidden h-screen w-[64px] flex-col items-center justify-between bg-background py-4 select-none md:flex"
      >
        {/* Top Logo Mark */}
        <Link
          href="/"
          title="Shop Home"
          aria-label="Shop Home"
          className="group flex items-center justify-center no-underline pt-1 focus-visible:outline-none"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-[#2f5cf6] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-[#2f5cf6]/50">
            <ShoppingBag
              className="size-4.5 stroke-[2.2] fill-white/20 text-white"
              aria-hidden="true"
            />
          </div>
        </Link>

        {/* Primary Navigation Icons */}
        <nav
          aria-label="Main"
          className="my-auto flex flex-col items-center gap-4"
        >
          <NavItem href="/" icon={Home} isActive={isHome} label="Home" />
          <NavItem
            href="/categories"
            icon={LayoutGrid}
            isActive={isCategories}
            label="Categories"
          />
          <NavItem
            href="/cart"
            icon={ShoppingBag}
            isActive={isCart}
            label="Cart"
            badge={cartItemCount > 0 ? cartItemCount : undefined}
          />
          <NavItem href="/deals" icon={Tag} isActive={isDeals} label="Deals" />
          <NavItem
            href="/wishlist"
            icon={Heart}
            isActive={isWishlist}
            label="Wishlist"
          />
        </nav>

        {/* Bottom Account / Sign In */}
        <div className="flex flex-col items-center pb-2">
          <Link
            href="/account"
            title="Account"
            aria-label="Account"
            aria-current={isAccount ? "page" : undefined}
            className={cn(
              "group relative flex flex-col items-center gap-1 no-underline transition-all duration-150 rounded-xl p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
              isAccount
                ? "text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {isAccount && (
              <span
                className="absolute -left-2.5 top-2 bottom-2 w-1 rounded-r-full bg-foreground"
                aria-hidden="true"
              />
            )}
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-xl transition-all duration-150",
                isAccount
                  ? "bg-surface-secondary text-foreground shadow-2xs"
                  : "text-muted group-hover:text-foreground group-hover:bg-surface-secondary/70",
              )}
            >
              <User
                className={cn(
                  "size-5 transition-transform duration-150 group-hover:scale-105",
                  isAccount ? "stroke-[2.2] text-foreground" : "stroke-[1.8]",
                )}
                aria-hidden="true"
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium tracking-tight transition-colors",
                isAccount
                  ? "text-foreground font-semibold"
                  : "text-muted group-hover:text-foreground",
              )}
            >
              Sign in
            </span>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around bg-surface/95 backdrop-blur-md border-t border-border px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] md:hidden rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      >
        <MobileNavItem href="/" icon={Home} isActive={isHome} label="Home" />
        <MobileNavItem
          href="/categories"
          icon={LayoutGrid}
          isActive={isCategories}
          label="Categories"
        />
        <MobileNavItem
          href="/cart"
          icon={ShoppingBag}
          isActive={isCart}
          label="Cart"
          badge={cartItemCount > 0 ? cartItemCount : undefined}
        />
        <MobileNavItem
          href="/deals"
          icon={Tag}
          isActive={isDeals}
          label="Deals"
        />
        <MobileNavItem
          href="/account"
          icon={User}
          isActive={isAccount}
          label="Account"
        />
      </nav>
    </>
  );
}

interface NavItemProps {
  readonly href: string;
  readonly icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  readonly isActive: boolean;
  readonly label: string;
  readonly badge?: number | string;
}

function NavItem({ href, icon: Icon, isActive, label, badge }: NavItemProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Active Left Indicator Bar */}
      {isActive && (
        <span
          className="absolute -left-3.5 top-2 bottom-2 w-1 rounded-r-full bg-foreground transition-all duration-200"
          aria-hidden="true"
        />
      )}

      <Link
        href={href}
        title={label}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group relative flex size-10 items-center justify-center rounded-xl no-underline transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
          isActive
            ? "bg-surface-secondary text-foreground shadow-2xs"
            : "text-muted hover:text-foreground hover:bg-surface-secondary/70",
        )}
      >
        <Icon
          className={cn(
            "size-5 transition-transform duration-150 group-hover:scale-105",
            isActive
              ? "stroke-[2.2] text-foreground"
              : "stroke-[1.8] text-muted group-hover:text-foreground",
          )}
          aria-hidden="true"
        />

        {/* Counter / Notification Badge */}
        {badge !== undefined && (
          <span
            className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2f5cf6] px-1 text-[10px] font-bold text-white shadow-xs"
            aria-label={`${badge} items in cart`}
          >
            {badge}
          </span>
        )}
      </Link>
    </div>
  );
}

interface MobileNavItemProps {
  readonly href: string;
  readonly icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  readonly isActive: boolean;
  readonly label: string;
  readonly badge?: number | string;
}

function MobileNavItem({
  href,
  icon: Icon,
  isActive,
  label,
  badge,
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex size-11 flex-col items-center justify-center rounded-2xl no-underline transition-all duration-150 active:scale-90 focus-visible:outline-none",
        isActive
          ? "text-foreground bg-surface-secondary/80"
          : "text-muted hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-[22px] transition-transform duration-150",
          isActive
            ? "stroke-[2.2] text-foreground"
            : "stroke-[1.8] text-muted group-hover:text-foreground",
        )}
        aria-hidden="true"
      />

      {/* Active Indicator Dot */}
      {isActive && (
        <span
          className="absolute bottom-1 size-1 rounded-full bg-foreground"
          aria-hidden="true"
        />
      )}

      {/* Counter / Notification Badge */}
      {badge !== undefined && (
        <span
          className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2f5cf6] px-1 text-[10px] font-bold text-white shadow-xs"
          aria-label={`${badge} items in cart`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
