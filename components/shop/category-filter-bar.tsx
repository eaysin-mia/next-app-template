"use client";

import React from "react";
import { SlidersHorizontal, ChevronDown, Star } from "lucide-react";
import {
  Button,
  Dropdown,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverDialog,
  cn,
} from "@heroui/react";
import { FilterDrawer, type FilterState } from "./filter-drawer";

export interface CategoryFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "lowest", label: "Lowest → Highest Price" },
  { id: "highest", label: "Highest → Lowest Price" },
];

const RATING_OPTIONS = [
  { value: 0, label: "All ratings" },
  { value: 4, stars: 4 },
  { value: 3, stars: 3 },
  { value: 2, stars: 2 },
  { value: 1, stars: 1 },
];

const SHIPS_TO_OPTIONS = ["BD", "US", "CA", "UK", "Worldwide"];
const SIZE_OPTIONS = ["All", "XS", "S", "M", "L", "XL", "XXL"];

export const COLOR_OPTIONS = [
  { id: "All", label: "All", bg: "bg-surface-secondary border border-border" },
  { id: "Black", label: "Black", bg: "bg-black" },
  { id: "Silver", label: "Silver", bg: "bg-slate-300 border border-slate-400/40" },
  { id: "White", label: "White", bg: "bg-white border border-border" },
  { id: "Blue", label: "Blue", bg: "bg-blue-600" },
  { id: "Grey", label: "Grey", bg: "bg-slate-400" },
  { id: "Red", label: "Red", bg: "bg-red-600" },
  { id: "Gold", label: "Gold", bg: "bg-amber-400" },
  { id: "Burgundy", label: "Burgundy", bg: "bg-rose-900" },
  { id: "Navy", label: "Navy", bg: "bg-slate-900" },
];

function RatingStarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "size-4",
              star <= count
                ? "fill-amber-400 text-amber-400"
                : "fill-muted/20 text-muted/30"
            )}
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-muted font-medium ml-1">& Up</span>
    </div>
  );
}

export function CategoryFilterBar({
  filters,
  onFilterChange,
  onReset,
  className = "",
}: CategoryFilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleOnSale = () => {
    onFilterChange({ ...filters, onSale: !filters.onSale });
  };

  const toggleInStock = () => {
    onFilterChange({ ...filters, inStock: !filters.inStock });
  };

  return (
    <div className={cn("flex items-center justify-start gap-2 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full max-w-full min-w-0", className)}>
      {/* 1. Drawer Trigger Button */}
      <Button
        isIconOnly
        size="sm"
        variant="outline"
        onPress={() => setIsDrawerOpen(true)}
        aria-label="Open filter sidebar"
        className="rounded-full size-8.5 shrink-0 bg-surface text-foreground border border-border/80 hover:bg-surface-secondary cursor-pointer shadow-2xs"
      >
        <SlidersHorizontal className="size-3.5 stroke-[2]" />
      </Button>

      {/* 2. Sort by HeroUI Dropdown */}
      <Dropdown>
        <Button
          size="sm"
          variant={filters.sortBy !== "recommended" ? "primary" : "outline"}
          className={cn(
            "rounded-full px-3.5 h-8.5 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
            filters.sortBy !== "recommended"
              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
              : "bg-surface text-foreground border border-border/80 hover:bg-surface-secondary"
          )}
        >
          <span>{filters.sortBy !== "recommended" ? SORT_OPTIONS.find(s => s.id === filters.sortBy)?.label : "Sort by"}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
        </Button>
        <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[220px] z-50">
          <Dropdown.Menu
            aria-label="Sort options"
            selectionMode="single"
            selectedKeys={new Set([filters.sortBy])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                onFilterChange({ ...filters, sortBy: selected });
              }
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <Dropdown.Item key={opt.id} id={opt.id} className="text-xs sm:text-sm font-medium py-2 px-3 cursor-pointer">
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* 3. On Sale Toggle Button */}
      <Button
        size="sm"
        variant={filters.onSale ? "primary" : "outline"}
        onPress={toggleOnSale}
        className={cn(
          "rounded-full px-3.5 h-8.5 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer",
          filters.onSale
            ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
            : "bg-surface text-foreground border border-border/80 hover:bg-surface-secondary"
        )}
      >
        On sale
      </Button>

      {/* 4. Price Range Popover */}
      <PopoverRoot>
        <PopoverTrigger>
          <Button
            size="sm"
            variant={filters.minPrice > 0 || filters.maxPrice < 2000 ? "primary" : "outline"}
            className={cn(
              "rounded-full px-3.5 h-8.5 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
              filters.minPrice > 0 || filters.maxPrice < 2000
                ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
                : "bg-surface text-foreground border border-border/80 hover:bg-surface-secondary"
            )}
          >
            <span>Price</span>
            <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[260px] z-50">
          <PopoverDialog className="flex flex-col gap-3 outline-none">
            <p className="text-xs sm:text-sm text-muted font-medium">Price Range ($)</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) || 0 })}
                className="w-22 px-3 py-1.5 bg-surface-secondary border border-border rounded-full text-xs sm:text-sm font-medium text-foreground outline-none text-center"
                placeholder="Min"
              />
              <span className="text-xs text-muted">-</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) || 2000 })}
                className="w-22 px-3 py-1.5 bg-surface-secondary border border-border rounded-full text-xs sm:text-sm font-medium text-foreground outline-none text-center"
                placeholder="Max"
              />
            </div>
          </PopoverDialog>
        </PopoverContent>
      </PopoverRoot>

      {/* 5. In-stock Toggle Button */}
      <Button
        size="sm"
        variant={filters.inStock ? "primary" : "outline"}
        onPress={toggleInStock}
        className={cn(
          "rounded-full px-3.5 h-8.5 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer",
          filters.inStock
            ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
            : "bg-surface text-foreground border border-border/80 hover:bg-surface-secondary"
        )}
      >
        In-stock
      </Button>

      {/* 3. Ratings HeroUI Dropdown */}
      <Dropdown>
        <Button
          size="sm"
          variant={filters.rating > 0 ? "primary" : "outline"}
          className={cn(
            "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
            filters.rating > 0
              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
              : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
          )}
        >
          <span>{filters.rating > 0 ? `${filters.rating}★ & Up` : "Ratings"}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
        </Button>
        <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[200px] z-50">
          <Dropdown.Menu
            aria-label="Filter by ratings"
            selectionMode="single"
            selectedKeys={new Set([String(filters.rating)])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected !== undefined) {
                onFilterChange({ ...filters, rating: Number(selected) });
              }
            }}
          >
            {RATING_OPTIONS.map((opt) => (
              <Dropdown.Item key={String(opt.value)} id={String(opt.value)} className="text-xs sm:text-sm font-medium py-2 px-3 cursor-pointer">
                {opt.stars ? <RatingStarRow count={opt.stars} /> : opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* 4. Ships to HeroUI Dropdown */}
      <Dropdown>
        <Button
          size="sm"
          variant={filters.shipsTo !== "BD" ? "primary" : "outline"}
          className={cn(
            "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
            filters.shipsTo !== "BD"
              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
              : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
          )}
        >
          <span>Ships to - {filters.shipsTo}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
        </Button>
        <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[180px] z-50">
          <Dropdown.Menu
            aria-label="Filter by destination"
            selectionMode="single"
            selectedKeys={new Set([filters.shipsTo])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                onFilterChange({ ...filters, shipsTo: selected });
              }
            }}
          >
            {SHIPS_TO_OPTIONS.map((country) => (
              <Dropdown.Item key={country} id={country} className="text-xs sm:text-sm font-medium py-2 px-3 cursor-pointer">
                {country}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* 5. Size HeroUI Dropdown */}
      <Dropdown>
        <Button
          size="sm"
          variant={filters.size !== undefined && filters.size !== "All" ? "primary" : "outline"}
          className={cn(
            "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
            filters.size !== undefined && filters.size !== "All"
              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
              : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
          )}
        >
          <span>{filters.size && filters.size !== "All" ? `Size: ${filters.size}` : "Size"}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
        </Button>
        <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[160px] z-50">
          <Dropdown.Menu
            aria-label="Filter by size"
            selectionMode="single"
            selectedKeys={new Set([filters.size || "All"])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                onFilterChange({ ...filters, size: selected });
              }
            }}
          >
            {SIZE_OPTIONS.map((sz) => (
              <Dropdown.Item key={sz} id={sz} className="text-xs sm:text-sm font-medium py-2 px-3 cursor-pointer">
                {sz}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* 6. Color HeroUI Dropdown */}
      <Dropdown>
        <Button
          size="sm"
          variant={filters.color !== "All" ? "primary" : "outline"}
          className={cn(
            "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer gap-1.5",
            filters.color !== "All"
              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
              : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
          )}
        >
          <span>{filters.color !== "All" ? `Color: ${filters.color}` : "Color"}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" />
        </Button>
        <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface text-foreground min-w-[190px] z-50">
          <Dropdown.Menu
            aria-label="Filter by color"
            selectionMode="single"
            selectedKeys={new Set([filters.color])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) {
                onFilterChange({ ...filters, color: selected });
              }
            }}
          >
            {COLOR_OPTIONS.map((c) => (
              <Dropdown.Item key={c.id} id={c.id} className="text-xs sm:text-sm font-medium py-2 px-3 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <span className={cn("size-3.5 rounded-full shrink-0 shadow-xs", c.bg)} aria-hidden="true" />
                  <span>{c.label}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>


      {/* Slide-out Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    </div>
  );
}
