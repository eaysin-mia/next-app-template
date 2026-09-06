"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button, cn } from "@heroui/react";
import { FilterPopover } from "./filter-popover";
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
  { value: 4, label: "★★★★☆ & Up" },
  { value: 3, label: "★★★☆☆ & Up" },
  { value: 2, label: "★★☆☆☆ & Up" },
  { value: 1, label: "★☆☆☆☆ & Up" },
];

const SHIPS_TO_OPTIONS = ["BD", "US", "CA", "UK", "Worldwide"];
const SIZE_OPTIONS = ["All", "XS", "S", "M", "L", "XL", "XXL"];
const COLOR_OPTIONS = ["All", "Black", "Blue", "Brown", "Burgundy", "Navy"];

export function CategoryFilterBar({
  filters,
  onFilterChange,
  onReset,
  className = "",
}: CategoryFilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [tempSortBy, setTempSortBy] = React.useState(filters.sortBy);
  const [tempRating, setTempRating] = React.useState(filters.rating);
  const [tempShipsTo, setTempShipsTo] = React.useState(filters.shipsTo);
  const [tempSize, setTempSize] = React.useState(filters.size || "All");
  const [tempColor, setTempColor] = React.useState(filters.color);

  React.useEffect(() => {
    setTempSortBy(filters.sortBy);
    setTempRating(filters.rating);
    setTempShipsTo(filters.shipsTo);
    setTempSize(filters.size || "All");
    setTempColor(filters.color);
  }, [filters]);

  const toggleOnSale = () => {
    onFilterChange({ ...filters, onSale: !filters.onSale });
  };

  return (
    <div className={cn("flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full max-w-full min-w-0", className)}>
      {/* 1. Drawer Trigger Button */}
      <Button
        isIconOnly
        size="sm"
        variant="primary"
        onPress={() => setIsDrawerOpen(true)}
        aria-label="Open filter sidebar"
        className="rounded-full size-9 shrink-0 bg-foreground text-background hover:opacity-90 cursor-pointer shadow-xs"
      >
        <SlidersHorizontal className="size-4 stroke-[2]" />
      </Button>

      {/* 2. On Sale Toggle Button */}
      <Button
        size="sm"
        variant={filters.onSale ? "primary" : "outline"}
        onPress={toggleOnSale}
        className={cn(
          "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer",
          filters.onSale
            ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
            : "bg-surface text-foreground border-border hover:bg-surface-secondary"
        )}
      >
        On sale
      </Button>

      {/* 3. Ratings Popover */}
      <FilterPopover
        label="Ratings"
        isActive={filters.rating > 0}
        valueLabel={filters.rating > 0 ? `${filters.rating}★ & Up` : "Ratings"}
        onReset={() => {
          setTempRating(0);
          onFilterChange({ ...filters, rating: 0 });
        }}
        onDone={() => {
          onFilterChange({ ...filters, rating: tempRating });
        }}
      >
        {RATING_OPTIONS.map((opt) => {
          const isSelected = tempRating === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTempRating(opt.value)}
              className="flex items-center justify-between py-1.5 px-1 cursor-pointer text-left w-full group"
            >
              <span className={cn("text-xs font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                {opt.label}
              </span>
              <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                {isSelected && <div className="size-1.5 rounded-full bg-background" />}
              </div>
            </button>
          );
        })}
      </FilterPopover>

      {/* 4. Ships to Popover */}
      <FilterPopover
        label="Ships to - BD"
        isActive={filters.shipsTo !== "BD"}
        valueLabel={`Ships to - ${filters.shipsTo}`}
        onReset={() => {
          setTempShipsTo("BD");
          onFilterChange({ ...filters, shipsTo: "BD" });
        }}
        onDone={() => {
          onFilterChange({ ...filters, shipsTo: tempShipsTo });
        }}
      >
        {SHIPS_TO_OPTIONS.map((country) => {
          const isSelected = tempShipsTo === country;
          return (
            <button
              key={country}
              type="button"
              onClick={() => setTempShipsTo(country)}
              className="flex items-center justify-between py-1.5 px-1 cursor-pointer text-left w-full group"
            >
              <span className={cn("text-xs font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                {country}
              </span>
              <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                {isSelected && <div className="size-1.5 rounded-full bg-background" />}
              </div>
            </button>
          );
        })}
      </FilterPopover>

      {/* 5. Size Popover */}
      <FilterPopover
        label="Size"
        isActive={filters.size !== undefined && filters.size !== "All"}
        valueLabel={filters.size && filters.size !== "All" ? `Size: ${filters.size}` : "Size"}
        onReset={() => {
          setTempSize("All");
          onFilterChange({ ...filters, size: "All" });
        }}
        onDone={() => {
          onFilterChange({ ...filters, size: tempSize });
        }}
      >
        {SIZE_OPTIONS.map((sz) => {
          const isSelected = tempSize === sz;
          return (
            <button
              key={sz}
              type="button"
              onClick={() => setTempSize(sz)}
              className="flex items-center justify-between py-1.5 px-1 cursor-pointer text-left w-full group"
            >
              <span className={cn("text-xs font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                {sz}
              </span>
              <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                {isSelected && <div className="size-1.5 rounded-full bg-background" />}
              </div>
            </button>
          );
        })}
      </FilterPopover>

      {/* 6. Color Popover */}
      <FilterPopover
        label="Color"
        isActive={filters.color !== "All"}
        valueLabel={filters.color !== "All" ? `Color: ${filters.color}` : "Color"}
        onReset={() => {
          setTempColor("All");
          onFilterChange({ ...filters, color: "All" });
        }}
        onDone={() => {
          onFilterChange({ ...filters, color: tempColor });
        }}
      >
        {COLOR_OPTIONS.map((c) => {
          const isSelected = tempColor === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setTempColor(c)}
              className="flex items-center justify-between py-1.5 px-1 cursor-pointer text-left w-full group"
            >
              <span className={cn("text-xs font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                {c}
              </span>
              <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                {isSelected && <div className="size-1.5 rounded-full bg-background" />}
              </div>
            </button>
          );
        })}
      </FilterPopover>

      {/* 6. Price Popover */}
      <FilterPopover
        label="Price"
        isActive={filters.minPrice > 0 || filters.maxPrice < 2000}
        valueLabel="Price"
        onReset={() => {
          onFilterChange({ ...filters, minPrice: 0, maxPrice: 2000 });
        }}
        onDone={() => {
          onFilterChange({ ...filters });
        }}
      >
        <div className="flex flex-col gap-2 py-1">
          <p className="text-xs text-muted">Price Range ($)</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) || 0 })}
              className="w-20 px-2 py-1 bg-surface-secondary border border-border rounded-lg text-xs font-medium"
              placeholder="Min"
            />
            <span className="text-xs text-muted">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) || 2000 })}
              className="w-20 px-2 py-1 bg-surface-secondary border border-border rounded-lg text-xs font-medium"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterPopover>

      {/* 7. Sort by Popover */}
      <FilterPopover
        label="Sort by"
        isActive={filters.sortBy !== "recommended"}
        valueLabel="Sort by"
        onReset={() => {
          setTempSortBy("recommended");
          onFilterChange({ ...filters, sortBy: "recommended" });
        }}
        onDone={() => {
          onFilterChange({ ...filters, sortBy: tempSortBy });
        }}
      >
        {SORT_OPTIONS.map((opt) => {
          const isSelected = tempSortBy === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTempSortBy(opt.id)}
              className="flex items-center justify-between py-1.5 px-1 cursor-pointer text-left w-full group"
            >
              <span className={cn("text-xs font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                {opt.label}
              </span>
              <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                {isSelected && <div className="size-1.5 rounded-full bg-background" />}
              </div>
            </button>
          );
        })}
      </FilterPopover>

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
