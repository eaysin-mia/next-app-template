"use client";

import React from "react";
import { X, Plus, Minus, Star } from "lucide-react";
import {
  Button,
  cn,
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerFooter,
  DrawerCloseTrigger,
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
  { value: 4, stars: 4 },
  { value: 3, stars: 3 },
  { value: 2, stars: 2 },
  { value: 1, stars: 1 },
];

const COLOR_OPTIONS = ["All", "Black", "Blue", "Brown", "Burgundy", "Navy"];
const SIZE_OPTIONS = ["All", "XS", "S", "M", "L", "XL", "XXL"];

function RatingStarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "size-3.5",
              star <= count
                ? "fill-amber-400 text-amber-400"
                : "fill-muted/20 text-muted/30"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted font-medium ml-1">& Up</span>
    </div>
  );
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const [isColorOpen, setIsColorOpen] = React.useState(false);
  const [isSizeOpen, setIsSizeOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleDone = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  const minPercent = Math.min(100, Math.max(0, (localFilters.minPrice / 2000) * 100));
  const maxPercent = Math.min(100, Math.max(0, (localFilters.maxPrice / 2000) * 100));

  return (
    <DrawerRoot isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerBackdrop variant="opaque" className="fixed inset-0 z-50">
        <DrawerContent
          placement="left"
          className="fixed inset-0 md:left-[64px] z-50 flex justify-start pointer-events-none"
        >
          <DrawerDialog className="p-0 flex flex-col h-full w-[310px] sm:w-[330px] max-w-[calc(100vw-5rem)] bg-surface text-foreground shadow-2xl border-r border-border rounded-r-[28px] overflow-hidden pointer-events-auto outline-none">
            {/* Drawer Header */}
            <DrawerHeader className="relative flex flex-row items-center justify-between px-6 py-4 shrink-0 border-b border-border">
              <DrawerHeading className="text-base font-bold tracking-tight text-foreground">
                Filters
              </DrawerHeading>
              <DrawerCloseTrigger
                aria-label="Close filters"
                className="absolute top-4 right-5 size-7 rounded-full bg-surface-secondary text-foreground hover:bg-surface-tertiary flex items-center justify-center transition-colors cursor-pointer border-none outline-none"
              >
                <X className="size-4" />
              </DrawerCloseTrigger>
            </DrawerHeader>

            {/* Drawer Body Content */}
            <DrawerBody className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden m-0">
              {/* 1. Sort by Section */}
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-xs font-semibold text-muted tracking-wider uppercase">
                  Sort by
                </h3>
                <div className="flex flex-col gap-1">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = localFilters.sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setLocalFilters({ ...localFilters, sortBy: opt.id })}
                        className="flex items-center justify-between py-1.5 cursor-pointer text-left w-full group"
                      >
                        <span
                          className={cn(
                            "text-xs sm:text-sm font-medium transition-colors",
                            isSelected ? "text-foreground font-semibold" : "text-foreground/80"
                          )}
                        >
                          {opt.label}
                        </span>
                        <div
                          className={cn(
                            "size-4.5 rounded-full border flex items-center justify-center transition-all shrink-0",
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-surface"
                          )}
                        >
                          {isSelected && <div className="size-1.5 rounded-full bg-background" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              {/* 2. Color Accordion */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsColorOpen(!isColorOpen)}
                  className="flex items-center justify-between w-full text-left py-1 cursor-pointer group"
                >
                  <h3 className="text-xs font-semibold text-muted tracking-wider uppercase">
                    Color
                  </h3>
                  {isColorOpen ? (
                    <Minus className="size-4 text-foreground/70" />
                  ) : (
                    <Plus className="size-4 text-foreground/70" />
                  )}
                </button>
                {isColorOpen && (
                  <div className="flex flex-wrap gap-1.5 pt-1 pb-1">
                    {COLOR_OPTIONS.map((c) => {
                      const isSelected = localFilters.color === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setLocalFilters({ ...localFilters, color: c })}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer",
                            isSelected
                              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
                              : "bg-surface-secondary text-foreground border-border hover:bg-surface-tertiary"
                          )}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-border" />

              {/* 3. Size Accordion */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                  className="flex items-center justify-between w-full text-left py-1 cursor-pointer group"
                >
                  <h3 className="text-xs font-semibold text-muted tracking-wider uppercase">
                    Size
                  </h3>
                  {isSizeOpen ? (
                    <Minus className="size-4 text-foreground/70" />
                  ) : (
                    <Plus className="size-4 text-foreground/70" />
                  )}
                </button>
                {isSizeOpen && (
                  <div className="flex flex-wrap gap-1.5 pt-1 pb-1">
                    {SIZE_OPTIONS.map((sz) => {
                      const isSelected = localFilters.size === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setLocalFilters({ ...localFilters, size: sz })}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer",
                            isSelected
                              ? "bg-foreground text-background border-transparent font-semibold shadow-xs"
                              : "bg-surface-secondary text-foreground border-border hover:bg-surface-tertiary"
                          )}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-border" />

              {/* 4. Price Section */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-muted tracking-wider uppercase">
                  Price
                </h3>

                {/* Slider track visualization */}
                <div className="relative w-full h-7 flex items-center px-1">
                  <div className="relative w-full h-2 rounded-full bg-surface-secondary overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-primary rounded-full"
                      style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                      }}
                    />
                  </div>
                  {/* Dual range thumbs */}
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={localFilters.minPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val <= localFilters.maxPrice) {
                        setLocalFilters({ ...localFilters, minPrice: val });
                      }
                    }}
                    className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={localFilters.maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= localFilters.minPrice) {
                        setLocalFilters({ ...localFilters, maxPrice: val });
                      }
                    }}
                    className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>

                {/* Min and Max input pills */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-full border border-border bg-surface-secondary">
                    <span className="text-xs text-muted font-medium">$</span>
                    <input
                      type="number"
                      value={localFilters.minPrice}
                      onChange={(e) =>
                        setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) || 0 })
                      }
                      className="w-10 text-xs font-semibold text-foreground bg-transparent outline-none text-center"
                    />
                  </div>
                  <span className="text-xs text-muted font-medium">-</span>
                  <div className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-full border border-border bg-surface-secondary">
                    <span className="text-xs text-muted font-medium">$</span>
                    <input
                      type="number"
                      value={localFilters.maxPrice}
                      onChange={(e) =>
                        setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) || 2000 })
                      }
                      className="w-14 text-xs font-semibold text-foreground bg-transparent outline-none text-center"
                    />
                    <span className="text-xs text-muted font-medium">+</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              {/* 5. Ratings Section */}
              <div className="flex flex-col gap-2 pb-2">
                <h3 className="text-xs font-semibold text-muted tracking-wider uppercase">
                  Ratings
                </h3>
                <div className="flex flex-col gap-1">
                  {RATING_OPTIONS.map((opt) => {
                    const isSelected = localFilters.rating === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setLocalFilters({ ...localFilters, rating: opt.value })}
                        className="flex items-center justify-between py-1.5 cursor-pointer text-left w-full group"
                      >
                        {opt.stars ? (
                          <RatingStarRow count={opt.stars} />
                        ) : (
                          <span
                            className={cn(
                              "text-xs sm:text-sm font-medium transition-colors",
                              isSelected ? "text-foreground font-semibold" : "text-foreground/80"
                            )}
                          >
                            {opt.label}
                          </span>
                        )}
                        <div
                          className={cn(
                            "size-4.5 rounded-full border flex items-center justify-center transition-all shrink-0",
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-surface"
                          )}
                        >
                          {isSelected && <div className="size-1.5 rounded-full bg-background" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </DrawerBody>

            {/* Drawer Footer Actions */}
            <DrawerFooter className="p-4 border-t border-border bg-surface flex items-center gap-3 shrink-0">
              <Button
                size="sm"
                variant="tertiary"
                onPress={handleReset}
                className="flex-1 rounded-full bg-surface-secondary text-foreground hover:bg-surface-tertiary font-semibold text-xs h-10 cursor-pointer"
              >
                Reset
              </Button>
              <Button
                size="sm"
                variant="primary"
                onPress={handleDone}
                className="flex-1 rounded-full bg-foreground text-background hover:opacity-90 font-semibold text-xs h-10 cursor-pointer"
              >
                Done
              </Button>
            </DrawerFooter>
          </DrawerDialog>
        </DrawerContent>
      </DrawerBackdrop>
    </DrawerRoot>
  );
}
