"use client";

import { useState } from "react";
import { Chip } from "@heroui/react";
import { CATEGORIES } from "./data";
import type { CategoryItem } from "@/types";

export interface CategoryPillsProps {
  readonly categories?: readonly CategoryItem[];
  readonly selectedId?: string;
  readonly onSelect?: (id: string) => void;
  readonly className?: string;
}

export function CategoryPills({
  categories = CATEGORIES,
  selectedId,
  onSelect,
  className = "",
}: CategoryPillsProps) {
  const [activeId, setActiveId] = useState<string | undefined>(selectedId);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelect?.(id);
  };

  return (
    <nav
      aria-label="Product Categories"
      className={`w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-max mx-auto justify-start md:justify-center px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              className="focus:outline-none transition-transform active:scale-[0.97]"
            >
              <Chip
                className={`flex items-center gap-2 pl-1.5 pr-4 h-10 rounded-full bg-surface border cursor-pointer transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-surface-secondary hover:border-foreground/20 ${
                  isSelected
                    ? "border-foreground/40 ring-1 ring-foreground/10 shadow-sm"
                    : "border-border"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${cat.iconBgClass} text-background`}
                >
                  <Icon className="size-5 stroke-[2.2]" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-medium text-foreground tracking-[-0.025em] whitespace-nowrap select-none">
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
