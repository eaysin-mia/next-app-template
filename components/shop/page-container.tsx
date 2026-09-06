"use client";

import React, { type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@heroui/react";

export interface PageBreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

export interface PageContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  readonly fullHeight?: boolean;
  readonly rightBleed?: boolean;
}

export interface PageHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly breadcrumbs?: readonly PageBreadcrumbItem[];
  readonly actions?: ReactNode;
  readonly className?: string;
  readonly align?: "left" | "center";
}

export interface PageBodyProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface PageFloatingBarProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const MAX_WIDTH_MAP: Record<
  NonNullable<PageContainerProps["maxWidth"]>,
  string
> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1640px]",
  "2xl": "max-w-[1760px]",
  full: "max-w-full",
};

/**
 * Standard PageContainer Root
 * Enforces unified gutter padding, max-width bounds, responsive vertical flow,
 * and semantic HeroUI surface styling across all application pages.
 */
export function PageContainer({
  children,
  className = "",
  maxWidth = "xl",
  fullHeight = false,
  rightBleed = false,
}: PageContainerProps) {
  const maxWidthClass = MAX_WIDTH_MAP[maxWidth] ?? MAX_WIDTH_MAP.xl;

  return (
    <div
      className={cn(
        "relative w-full mx-auto flex flex-col bg-surface text-foreground select-none",
        maxWidthClass,
        fullHeight
          ? "h-full min-h-0 overflow-hidden"
          : cn(
              "min-h-full pt-3 sm:pt-5 pb-44 sm:pb-56 lg:pb-64",
              rightBleed
                ? "pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-0"
                : "px-4 sm:px-6 md:px-8 lg:px-10",
            ),
        className,
      )}
    >
      {children}
      <div
        className="h-[calc(4rem+env(safe-area-inset-bottom))] min-h-[4rem] shrink-0 md:hidden"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * Standard Page Header
 * Unified across all pages:
 * 1. Top breadcrumbs
 * 2. Title on left, actions/search on right if needed
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={cn("w-full flex flex-col gap-2 mb-4 sm:mb-6", className)}
    >
      {/* 1. Top Breadcrumbs (Middle Central) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center text-center gap-1.5 text-xs text-muted font-normal mb-1.5 w-full"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            if (isLast || !crumb.href) {
              return (
                <span
                  key={`${crumb.label}-${index}`}
                  className={cn(
                    "truncate",
                    isLast ? "text-foreground font-medium" : "text-muted",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              );
            }

            return (
              <React.Fragment key={`${crumb.label}-${index}`}>
                <Link
                  href={crumb.href}
                  className="text-muted hover:text-foreground transition-colors truncate no-underline"
                >
                  {crumb.label}
                </Link>
                <ChevronRight
                  className="size-3 text-muted/60 shrink-0"
                  aria-hidden="true"
                />
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* 2. Title and Right-Side Actions/Search */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="flex flex-col min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight truncate">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-muted font-normal mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto w-full sm:w-auto">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * Standard Page Body
 * Content slot providing clean rhythm.
 */
export function PageBody({ children, className = "" }: PageBodyProps) {
  return (
    <section className={cn("w-full flex-1 flex flex-col min-w-0", className)}>
      {children}
    </section>
  );
}

/**
 * Standard Sticky Bottom Floating Bar
 * Clean positioning for persistent interaction elements (e.g. ShopSearchBar).
 */
export function PageFloatingBar({
  children,
  className = "",
}: PageFloatingBarProps) {
  return (
    <div
      className={cn(
        "sticky bottom-4 inset-x-0 z-30 flex justify-center px-4 mt-8 sm:mt-12 pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto shadow-xl rounded-full">
        {children}
      </div>
    </div>
  );
}

// Compound component pattern export
PageContainer.Header = PageHeader;
PageContainer.Body = PageBody;
PageContainer.FloatingBar = PageFloatingBar;
