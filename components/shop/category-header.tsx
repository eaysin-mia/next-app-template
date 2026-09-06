"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface CategoryHeaderProps {
  readonly title: string;
  readonly breadcrumbs: readonly { readonly label: string; readonly href?: string }[];
}

export function CategoryHeader({
  title = "Pants",
  breadcrumbs = [
    { label: "All Categories", href: "/categories" },
    { label: "Men", href: "/categories/men" },
    { label: "Pants" },
  ],
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-2 sm:pt-4 text-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-2 sm:mb-2.5">
        {title}
      </h1>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-muted font-medium">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <span key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors no-underline font-normal text-muted"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-foreground" : "font-normal text-muted"}>
                  {crumb.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
