"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  CircleUserRound,
  Headphones,
  Link2,
  Lock,
  LogOut,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Button, cn } from "@heroui/react";
import { PageContainer, PageBody } from "./page-container";
import { ProductRail } from "./product-rail";
import { ProductCard } from "./product-card";
import {
  ACCOUNT_DESKTOP_NAV_ITEMS,
  ACCOUNT_MOBILE_NAV_ITEMS,
  ACCOUNT_RECENTLY_VIEWED,
  ACCOUNT_SAVED_PRODUCTS,
  ACCOUNT_USER,
  type AccountNavItem,
} from "./data/account-data";

interface PhoneIllustrationProps {
  readonly className?: string;
}

function PhoneIllustration({ className = "" }: PhoneIllustrationProps) {
  return (
    <svg
      width="34"
      height="54"
      viewBox="0 0 34 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 drop-shadow-2xs", className)}
      aria-hidden="true"
    >
      {/* Phone Chassis: Semantic Foreground & Border */}
      <rect
        x="1"
        y="1"
        width="32"
        height="52"
        rx="8"
        className="fill-foreground stroke-border"
        strokeWidth="1.5"
      />
      {/* Top Sensor Slit */}
      <rect
        x="13"
        y="3.5"
        width="8"
        height="1.5"
        rx="0.75"
        className="fill-surface/40"
      />

      {/* Screen Speech Bubble: Semantic Surface */}
      <rect
        x="8"
        y="20"
        width="16"
        height="12"
        rx="3.5"
        className="fill-surface"
      />
      <path d="M9.5 30L8 33L13 32H9.5V30Z" className="fill-surface" />

      {/* Notification Dot: Semantic Danger Token */}
      <circle cx="23.5" cy="19.5" r="3.75" className="fill-danger" />
      <text
        x="23.5"
        y="21.5"
        fontSize="5.5"
        fontWeight="bold"
        className="fill-danger-foreground"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        1
      </text>

      {/* Bottom Bar */}
      <rect
        x="13.5"
        y="48"
        width="7"
        height="1"
        rx="0.5"
        className="fill-surface/30"
      />
    </svg>
  );
}

interface UserProfileCardProps {
  readonly email: string;
  readonly initial: string;
  readonly onClick?: () => void;
}

function UserProfileCard({ email, initial, onClick }: UserProfileCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
      className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xs transition-all hover:border-foreground/20 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-bold text-base shadow-2xs transition-transform duration-150 group-hover:scale-105">
          {initial}
        </div>
        <span className="truncate text-sm sm:text-[15px] font-semibold text-foreground tracking-tight">
          {email}
        </span>
      </div>

      <ChevronRight
        className="size-4 shrink-0 stroke-[2.2] text-foreground transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </div>
  );
}

interface CheckoutFasterCardProps {
  readonly onAddPhone?: () => void;
}

function CheckoutFasterCard({ onAddPhone }: CheckoutFasterCardProps) {
  return (
    <div className="w-full rounded-3xl border border-border bg-surface p-6 sm:p-7 shadow-2xs transition-all">
      {/* Desktop Layout: Centered Phone, Title, Subtitle, Pill Button */}
      <div className="hidden md:flex flex-col items-center text-center">
        <PhoneIllustration className="mb-3.5" />
        <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
          Check out faster
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-normal text-muted leading-relaxed max-w-sm">
          Enter and verify a phone number for faster checkout at millions of
          stores
        </p>
        <Button
          onPress={onAddPhone}
          className="mt-4 min-w-[150px] rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-2 text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          Add phone
        </Button>
      </div>

      {/* Mobile Layout: Row with Text on Left, Phone on Right, Full-width Button */}
      <div className="flex md:hidden flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0 pr-1">
            <h2 className="text-base font-bold text-foreground tracking-tight">
              Check out faster
            </h2>
            <p className="mt-1 text-xs text-muted leading-snug">
              Enter and verify a phone number for faster checkout at millions of
              stores
            </p>
          </div>

          <PhoneIllustration />
        </div>

        <Button
          onPress={onAddPhone}
          className="w-full mt-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          Add phone
        </Button>
      </div>
    </div>
  );
}

interface SavedRailSectionProps {
  readonly onHeaderClick?: () => void;
}

function SavedRailSection({ onHeaderClick }: SavedRailSectionProps) {
  return (
    <section className="w-full">
      <ProductRail
        title="Saved"
        bleed={false}
        onHeaderClick={onHeaderClick}
        headerHref="/wishlist"
      >
        {ACCOUNT_SAVED_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            minimal
            isWishlisted={true}
            className="w-[125px] sm:w-[135px] md:w-[150px] lg:w-[160px] shrink-0 snap-start snap-always"
          />
        ))}
      </ProductRail>
    </section>
  );
}

interface RecentlyViewedRailSectionProps {
  readonly onHeaderClick?: () => void;
}

function RecentlyViewedRailSection({
  onHeaderClick,
}: RecentlyViewedRailSectionProps) {
  return (
    <section className="w-full">
      <ProductRail
        title="Recently viewed"
        bleed={false}
        onHeaderClick={onHeaderClick}
        headerHref="/products"
      >
        {ACCOUNT_RECENTLY_VIEWED.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            minimal
            isWishlisted={product.isWishlisted}
            className="w-[125px] sm:w-[135px] md:w-[150px] lg:w-[160px] shrink-0 snap-start snap-always"
          />
        ))}
      </ProductRail>
    </section>
  );
}

interface MobileNavCardProps {
  readonly items: readonly AccountNavItem[];
  readonly onItemClick?: (item: AccountNavItem) => void;
}

function MobileNavCard({ items, onItemClick }: MobileNavCardProps) {
  const getNavIcon = (id: string) => {
    switch (id) {
      case "profile":
        return CircleUserRound;
      case "orders":
        return Package;
      case "sign-in-security":
        return ShieldCheck;
      case "connections":
        return Link2;
      case "data-privacy":
        return Lock;
      default:
        return CircleUserRound;
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xs divide-y divide-border/60 md:hidden">
      {items.map((item) => {
        const IconComponent = getNavIcon(item.id);

        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onItemClick?.(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onItemClick?.(item);
              }
            }}
            className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-surface-secondary/50 cursor-pointer focus-visible:outline-none"
          >
            <div className="flex items-center gap-3">
              <IconComponent
                className="size-5 stroke-[2] text-foreground"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {item.label}
              </span>
            </div>

            <ChevronRight
              className="size-4 stroke-[2.2] text-foreground"
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}

interface DesktopNavSidebarProps {
  readonly items: readonly AccountNavItem[];
  readonly activeId: string;
  readonly onItemSelect: (id: string) => void;
}

function DesktopNavSidebar({
  items,
  activeId,
  onItemSelect,
}: DesktopNavSidebarProps) {
  return (
    <aside
      aria-label="Account Navigation"
      className="hidden md:flex w-36 lg:w-44 xl:w-48 shrink-0 flex-col pt-1 select-none"
    >
      <h1 className="text-base font-bold text-foreground tracking-tight mb-4">
        Account
      </h1>
      <nav className="flex flex-col space-y-2.5" aria-label="Account Sections">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemSelect(item.id)}
              className={cn(
                "w-fit text-left text-sm transition-colors py-0.5 cursor-pointer focus-visible:outline-none",
                isActive
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

interface FooterActionsProps {
  readonly onSupportClick?: () => void;
  readonly onSignOutClick?: () => void;
}

function FooterActions({ onSupportClick, onSignOutClick }: FooterActionsProps) {
  return (
    <footer className="flex flex-col items-center justify-center gap-1.5 pt-3 pb-16 text-foreground">
      <Button
        variant="ghost"
        size="sm"
        onPress={onSupportClick}
        className="flex items-center gap-2 text-foreground/80 hover:text-foreground font-semibold text-xs sm:text-sm rounded-full px-4 h-9 cursor-pointer transition-colors"
      >
        <Headphones className="size-4 stroke-[2.2]" aria-hidden="true" />
        <span>Support</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onPress={onSignOutClick}
        className="flex items-center gap-2 text-foreground/80 hover:text-foreground font-semibold text-xs sm:text-sm rounded-full px-4 h-9 cursor-pointer transition-colors"
      >
        <LogOut className="size-4 stroke-[2.2]" aria-hidden="true" />
        <span>Sign out</span>
      </Button>
    </footer>
  );
}

export function AccountView() {
  const router = useRouter();
  const [activeNavId, setActiveNavId] = useState<string>("profile");

  const handleNavSelect = (id: string) => {
    setActiveNavId(id);
    if (id === "orders") {
      router.push("/cart");
    }
  };

  const handleMobileItemClick = (item: AccountNavItem) => {
    setActiveNavId(item.id);
    if (item.id === "orders") {
      router.push("/cart");
    }
  };

  const handleRecentlyViewedHeaderClick = () => {
    router.push("/products");
  };

  const handleSavedHeaderClick = () => {
    router.push("/wishlist");
  };

  const handleProfileCardClick = () => {
    setActiveNavId("profile");
  };

  const handleAddPhone = () => {
    // Interactive action handler
  };

  return (
    <PageContainer maxWidth="full" className="py-6 sm:py-10">
      <PageBody>
        <div className="w-full flex justify-center">
          <div className="flex flex-col md:flex-row md:items-start justify-center gap-8 lg:gap-14 xl:gap-20 w-full max-w-5xl xl:max-w-6xl">
            {/* Desktop Left Sidebar Navigation */}
            <DesktopNavSidebar
              items={ACCOUNT_DESKTOP_NAV_ITEMS}
              activeId={activeNavId}
              onItemSelect={handleNavSelect}
            />

            {/* Main Account Content Column */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-5 sm:gap-6">
              {/* 1. User Profile Card */}
              <UserProfileCard
                email={ACCOUNT_USER.email}
                initial={ACCOUNT_USER.initial}
                onClick={handleProfileCardClick}
              />

              {/* 2. Check out faster Promotional Card */}
              <CheckoutFasterCard onAddPhone={handleAddPhone} />

              {/* 3. Saved Products Rail (styled like Recently viewed) */}
              <SavedRailSection onHeaderClick={handleSavedHeaderClick} />

              {/* 4. Recently Viewed Products Rail */}
              <RecentlyViewedRailSection
                onHeaderClick={handleRecentlyViewedHeaderClick}
              />

              {/* 5. Mobile Navigation Menu Card */}
              <MobileNavCard
                items={ACCOUNT_MOBILE_NAV_ITEMS}
                onItemClick={handleMobileItemClick}
              />

              {/* 6. Footer Support & Sign out Actions */}
              <FooterActions />
            </div>
          </div>
        </div>
      </PageBody>
    </PageContainer>
  );
}
