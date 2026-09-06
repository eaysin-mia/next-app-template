"use client";

import React from "react";
import { X, SlidersHorizontal, Plus, Minus } from "lucide-react";
import {
  Button,
  cn,
} from "@heroui/react";

export interface FilterState {
  onSale: boolean;
  rating: number; // 0 for all, 4, 3, 2, 1
  shipsTo: string;
  size?: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
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

const COLOR_OPTIONS = ["All", "Black", "Blue", "Brown", "Burgundy", "Navy"];
const SHIPS_TO_OPTIONS = ["BD", "US", "CA", "UK", "Worldwide"];

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const [isColorOpen, setIsColorOpen] = React.useState(true);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleDone = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-surface text-foreground shadow-2xl flex flex-col h-full overflow-hidden transition-transform animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight">Filters</h2>
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={onClose}
            aria-label="Close filters"
            className="rounded-full size-8 hover:bg-surface-secondary text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Sort by */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Sort by</h3>
            <div className="flex flex-col gap-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = localFilters.sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLocalFilters({ ...localFilters, sortBy: opt.id })}
                    className="flex items-center justify-between py-1.5 px-1 group cursor-pointer text-left"
                  >
                    <span className={cn("text-sm font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                      {opt.label}
                    </span>
                    <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                      {isSelected && <div className="size-1.5 rounded-full bg-background" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          {/* Color Accordion */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => setIsColorOpen(!isColorOpen)}
              className="flex items-center justify-between w-full text-left py-1 group cursor-pointer"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Color</h3>
              {isColorOpen ? <Minus className="size-4 text-muted" /> : <Plus className="size-4 text-muted" />}
            </button>
            {isColorOpen && (
              <div className="flex flex-wrap gap-2 pt-1">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = localFilters.color === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, color })}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer",
                        isSelected
                          ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
                          : "bg-surface-secondary text-foreground border-border hover:bg-surface-tertiary"
                      )}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-px w-full bg-border" />

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Price</h3>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 flex items-center gap-1 bg-surface-secondary px-3 py-2 rounded-xl border border-border">
                <span className="text-xs text-muted">$</span>
                <input
                  type="number"
                  value={localFilters.minPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-medium bg-transparent text-foreground focus:outline-none"
                />
              </div>
              <span className="text-xs text-muted">-</span>
              <div className="flex-1 flex items-center gap-1 bg-surface-secondary px-3 py-2 rounded-xl border border-border">
                <span className="text-xs text-muted">$</span>
                <input
                  type="number"
                  value={localFilters.maxPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) || 2000 })}
                  className="w-full text-xs font-medium bg-transparent text-foreground focus:outline-none"
                />
                <span className="text-xs text-muted">+</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          {/* Ratings */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Ratings</h3>
            <div className="flex flex-col gap-2">
              {RATING_OPTIONS.map((opt) => {
                const isSelected = localFilters.rating === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocalFilters({ ...localFilters, rating: opt.value })}
                    className="flex items-center justify-between py-1.5 px-1 group cursor-pointer text-left"
                  >
                    <span className={cn("text-sm font-medium transition-colors", isSelected ? "text-foreground font-semibold" : "text-foreground/80")}>
                      {opt.label}
                    </span>
                    <div className={cn("size-4 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>
                      {isSelected && <div className="size-1.5 rounded-full bg-background" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-surface flex items-center gap-3">
          <Button
            variant="tertiary"
            onPress={handleReset}
            className="flex-1 rounded-full bg-surface-secondary text-foreground hover:bg-surface-tertiary font-medium text-sm h-11 cursor-pointer"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onPress={handleDone}
            className="flex-1 rounded-full bg-foreground text-background hover:opacity-90 font-medium text-sm h-11 cursor-pointer"
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
