"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Sparkles, ArrowRight } from "lucide-react";

export interface DynamicPosterCardProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  brand?: string;
  rating?: number;
  reviewCount?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Generic common simple card component for the dynamic hero poster.
 * Uses official HeroUI Card component with clean Tailwind styling.
 */
export function DynamicPosterCard({
  title = "Curated Daily Essentials",
  subtitle = "Discover luxury skincare, body care & wellness crafted for modern living",
  tag = "Featured Spotlight",
  brand = "OSEA • SALT & STONE",
  rating = 4.9,
  reviewCount = "1.2k+ reviews",
  className = "",
  children,
}: DynamicPosterCardProps) {
  return (
    <Card
      className={`w-full max-w-3xl mx-auto rounded-[28px] bg-surface border-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_-3px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden ${className}`}
    >
      <Card.Content className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {children ? (
          children
        ) : (
          <>
            {/* Left Info Column */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tag}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {brand}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                  {title}
                </h2>
                <p className="text-sm text-muted max-w-md line-clamp-2">
                  {subtitle}
                </p>
              </div>

              {/* Rating and Social Proof */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted">
                <div className="flex items-center text-warning">
                  {"★".repeat(5)}
                </div>
                <span className="font-semibold text-foreground">{rating}</span>
                <span>•</span>
                <span>{reviewCount}</span>
              </div>
            </div>

            {/* Right Showcase Visual Item */}
            <div className="flex items-center justify-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-[20px] bg-gradient-to-b from-surface to-surface-secondary p-4 flex flex-col items-center justify-center text-center shadow-inner transition-transform duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 rounded-full bg-surface/80 shadow-xs flex items-center justify-center mb-2">
                    <span className="text-xs font-semibold text-foreground/80 tracking-wider">OSEA</span>
                  </div>
                  <span className="text-[11px] font-medium text-foreground/70 line-clamp-1">Undaria Algae</span>
                  <span className="text-[10px] text-muted">Body Butter</span>
                </div>
              </div>

              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-[20px] bg-gradient-to-b from-surface to-surface-secondary p-4 flex flex-col items-center justify-center text-center shadow-inner transition-transform duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 rounded-full bg-surface/80 shadow-xs flex items-center justify-center mb-2">
                    <span className="text-[10px] font-semibold text-foreground/80 tracking-wider">SALT & STONE</span>
                  </div>
                  <span className="text-[11px] font-medium text-foreground/70 line-clamp-1">Natural Wash</span>
                  <span className="text-[10px] text-muted">Bergamot & Hinoki</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card.Content>
    </Card>
  );
}
