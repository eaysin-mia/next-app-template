"use client";

import React, { useState } from "react";
import { Chip } from "@heroui/react";
import {
  ShoppingBag,
  Shirt,
  Sparkles,
  Home,
  Dumbbell,
  Baby,
  Coffee,
} from "lucide-react";

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor?: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "women",
    label: "Women",
    icon: ShoppingBag,
    iconBg: "bg-slate-500",
    iconColor: "text-background",
  },
  {
    id: "men",
    label: "Men",
    icon: Shirt,
    iconBg: "bg-blue-600",
    iconColor: "text-background",
  },
  {
    id: "beauty",
    label: "Beauty",
    icon: Sparkles,
    iconBg: "bg-rose-800",
    iconColor: "text-background",
  },
  {
    id: "home",
    label: "Home",
    icon: Home,
    iconBg: "bg-emerald-600",
    iconColor: "text-background",
  },
  {
    id: "fitness",
    label: "Fitness & nutrition",
    icon: Dumbbell,
    iconBg: "bg-red-800",
    iconColor: "text-background",
  },
  {
    id: "baby",
    label: "Baby & toddler",
    icon: Baby,
    iconBg: "bg-amber-500",
    iconColor: "text-background",
  },
  {
    id: "food",
    label: "Food & drinks",
    icon: Coffee,
    iconBg: "bg-violet-400",
    iconColor: "text-background",
  },
];

export interface CategoryPillsProps {
  categories?: CategoryItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * Category Pills Component
 * Sized and styled per the Shop app reference:
 * - Height: 36px (h-9)
 * - Pill radius: 9999px (rounded-full)
 * - Surface: bg-surface
 * - Border: border-border
 * - Elevation shadow: 0 2px 8px rgba(0,0,0,0.06)
 * - 24px circular icon badge
 * - Typography: text-foreground
 * - Internal padding: pl-1.5 pr-4
 * - Horizontal rhythm gap: 12px (gap-3)
 */
export function CategoryPills({
  categories = CATEGORIES,
  selectedId,
  onSelect,
  className = "",
}: CategoryPillsProps) {
  const [active, setActive] = useState<string | undefined>(selectedId);

  const handleSelect = (id: string) => {
    setActive(id);
    if (onSelect) onSelect(id);
  };

  return (
    <nav
      aria-label="Product Categories"
      className={`w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-max mx-auto justify-start md:justify-center px-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = active === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              className="focus:outline-none transition-transform active:scale-[0.97]"
            >
              <Chip
                className={`flex items-center gap-2 pl-1.5 pr-4 h-9 rounded-full bg-surface border cursor-pointer transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-surface-secondary hover:border-foreground/20 ${
                  isSelected
                    ? "border-foreground/40 ring-1 ring-foreground/10 shadow-sm"
                    : "border-border"
                }`}
              >
                {/* 24px Circular Icon Badge */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${cat.iconBg} ${
                    cat.iconColor || "text-background"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>

                {/* 14px-15px Category Label */}
                <span className="text-[14px] sm:text-[14.5px] font-medium text-foreground tracking-[-0.015em] whitespace-nowrap select-none">
                  {cat.label}
                </span>
              </Chip>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
