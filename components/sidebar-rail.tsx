"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Heart, Home, ShoppingBag, Tag, User } from "lucide-react";

import { Avatar, Button, cn } from "@heroui/react";

export function SidebarNavRail() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCategories = pathname.startsWith("/categories");
  const isCart = pathname.startsWith("/cart");
  const isWishlist = pathname.startsWith("/wishlist");
  const isAccount = pathname.startsWith("/account");

  return (
    <>
      <aside className="fixed top-0 left-0 z-[60] hidden h-screen w-[64px] flex-col items-center justify-between bg-background py-4 md:flex">
        <Link href="/" className="group flex flex-col items-center no-underline pt-1">
          <div className="flex size-9 items-center justify-center rounded-full bg-accent text-base font-semibold text-accent-foreground shadow-sm transition-transform group-hover:scale-105">
            d
          </div>
        </Link>

        <nav className="my-auto flex flex-col items-center gap-5">
          <NavItem href="/" icon={Home} isActive={isHome} label="Home" />
          <NavItem href="/categories" icon={Grid} isActive={isCategories} label="Categories" />
          <NavItem href="/cart" icon={ShoppingBag} isActive={isCart} label="Cart" />
          <NavItem href="/deals" icon={Tag} isActive={false} label="Deals" />
          <NavItem href="/wishlist" icon={Heart} isActive={isWishlist} label="Wishlist" />
        </nav>

        <div className="flex flex-col items-center pb-2">
          <Link
            href="/account"
            className="group flex flex-col items-center gap-0.5 no-underline transition-opacity hover:opacity-80"
          >
            <div className="flex size-9 items-center justify-center rounded-full text-foreground/75 transition-colors group-hover:text-foreground">
              <User className="size-5" />
            </div>
            <span className="text-[11px] font-medium tracking-[-0.014em] text-foreground/70 group-hover:text-foreground">
              Sign in
            </span>
          </Link>
        </div>
      </aside>

      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around bg-surface border-t border-border px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] md:hidden rounded-t-[28px] shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      >
        <MobileNavItem href="/" icon={Home} isActive={isHome} label="Home" />
        <MobileNavItem href="/categories" icon={Grid} isActive={isCategories} label="Categories" />
        <MobileNavItem href="/cart" icon={ShoppingBag} isActive={isCart} label="Cart" />
        <MobileNavItem href="/deals" icon={Tag} isActive={false} label="Deals" />
        <MobileNavItem href="/account" icon={User} isActive={isAccount} label="Account" />
      </nav>
    </>
  );
}

function MobileNavItem({
  href,
  icon: Icon,
  isActive,
  label,
}: {
  readonly href: string;
  readonly icon: typeof Home;
  readonly isActive: boolean;
  readonly label: string;
}) {
  return (
    <Link href={href} title={label} className="no-underline flex items-center justify-center">
      <Button
        isIconOnly
        variant="ghost"
        size="md"
        aria-label={label}
        className={cn(
          "size-11 rounded-full transition-all active:scale-95",
          isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground",
        )}
      >
        <Icon
          className={cn(
            "size-[22px] transition-colors",
            isActive
              ? "fill-foreground text-foreground stroke-foreground"
              : "text-foreground/70",
          )}
        />
      </Button>
    </Link>
  );
}

function NavItem({
  href,
  icon: Icon,
  isActive,
  label,
}: {
  readonly href: string;
  readonly icon: typeof Home;
  readonly isActive: boolean;
  readonly label: string;
}) {
  return (
    <Link href={href} title={label} className="no-underline">
      <Button
        isIconOnly
        variant="ghost"
        size="md"
        aria-label={label}
        className={cn(
          "size-10 rounded-full transition-all active:scale-95",
          isActive
            ? "text-foreground hover:bg-foreground/5"
            : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
        )}
      >
        <Icon
          className={cn(
            "size-[22px] transition-colors",
            isActive
              ? "fill-foreground text-foreground stroke-foreground"
              : "text-foreground/70",
          )}
        />
      </Button>
    </Link>
  );
}
