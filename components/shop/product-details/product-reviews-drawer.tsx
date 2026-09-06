"use client";

import React, { useState, useMemo } from "react";
import {
  Avatar,
  Button,
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerCloseTrigger,
  Dropdown,
  ProgressBar,
  cn,
} from "@heroui/react";
import { Search, ChevronDown, X, ThumbsUp, MoreHorizontal } from "lucide-react";
import type {
  ProductDetailData,
  ReviewSortOption,
  ReviewRatingFilter,
} from "./types";

export interface ProductReviewsDrawerProps {
  readonly product: ProductDetailData;
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

const HISTOGRAM_DATA = [
  { star: 5, pct: 85 },
  { star: 4, pct: 12 },
  { star: 3, pct: 2 },
  { star: 2, pct: 1 },
  { star: 1, pct: 0 },
] as const;

export function ProductReviewsDrawer({
  product,
  isOpen,
  onOpenChange,
}: ProductReviewsDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<ReviewSortOption>("recent");
  const [ratingFilter, setRatingFilter] = useState<ReviewRatingFilter>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [helpfulReviews, setHelpfulReviews] = useState<readonly string[]>([]);

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      if (prev.includes(reviewId)) {
        return prev.filter((id) => id !== reviewId);
      }
      return [...prev, reviewId];
    });
  };

  const filteredReviews = useMemo(() => {
    if (!product.reviews) {
      return [];
    }

    let list = [...product.reviews];

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((r) => {
        const textMatch = r.text.toLowerCase().includes(q);
        const authorMatch = r.author.toLowerCase().includes(q);
        const sizeMatch = r.size ? r.size.toLowerCase().includes(q) : false;
        return textMatch || authorMatch || sizeMatch;
      });
    }

    if (ratingFilter !== "all") {
      list = list.filter((r) => r.rating === ratingFilter);
    }

    if (sizeFilter !== "all") {
      list = list.filter(
        (r) => r.size && r.size.toUpperCase() === sizeFilter.toUpperCase(),
      );
    }

    if (sortBy === "highest") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      list.sort((a, b) => a.rating - b.rating);
    }

    return list;
  }, [product.reviews, searchQuery, ratingFilter, sizeFilter, sortBy]);

  const formattedScore = product.reviewScore
    ? product.reviewScore.toFixed(1)
    : `${product.rating}.0`;

  const formattedCount =
    product.reviewCount >= 1000
      ? `${(product.reviewCount / 1000).toFixed(1)}K`
      : product.reviewCount.toString();

  const sortLabel = (() => {
    if (sortBy === "highest") return "Highest";
    if (sortBy === "lowest") return "Lowest";
    return "Sort by";
  })();

  const ratingLabel =
    ratingFilter === "all" ? "Rating" : `${ratingFilter} Stars`;

  const sizeLabel =
    sizeFilter === "all" ? "Choose Your Supply" : sizeFilter.toUpperCase();

  return (
    <DrawerRoot isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerBackdrop
        variant="opaque"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
      />
      <DrawerContent
        placement="right"
        className="fixed inset-0 z-50 flex justify-end pointer-events-none"
      >
        <DrawerDialog className="p-0 flex flex-col h-full w-full sm:w-[460px] md:w-[500px] max-w-full bg-surface text-foreground shadow-2xl border-l border-border sm:rounded-l-[28px] overflow-hidden pointer-events-auto outline-none">
          {/* Sticky Drawer Header */}
          <DrawerHeader className="flex flex-col gap-3 px-5 sm:px-6 pt-5 pb-4 shrink-0 border-b border-border/60 bg-surface">
            <DrawerCloseTrigger
              aria-label="Close reviews"
              className="size-7 sm:size-8 rounded-full bg-surface-secondary text-foreground hover:bg-surface-tertiary flex items-center justify-center transition-colors cursor-pointer border-none outline-none self-start"
            >
              <X className="size-4" />
            </DrawerCloseTrigger>

            <DrawerHeading className="text-[24px] font-semibold text-foreground tracking-[-1px] leading-[1.17] -mt-0.5">
              Reviews
            </DrawerHeading>

            {/* Score + Histogram */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="flex flex-col shrink-0">
                <span className="text-[38px] sm:text-4xl font-extrabold text-foreground leading-none tracking-tight">
                  {formattedScore}
                </span>
                <div className="flex items-center gap-1 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm sm:text-[15px] ${i < product.rating ? "text-warning" : "text-muted/30"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[12px] font-normal text-muted leading-[1.33] tracking-[-0.2px] mt-1">
                  {formattedCount} ratings
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                {HISTOGRAM_DATA.map((item) => (
                  <div key={item.star} className="flex items-center gap-2.5">
                    <span className="text-xs font-medium text-foreground/80 w-2.5 shrink-0 text-left">
                      {item.star}
                    </span>
                    <ProgressBar
                      aria-label={`${item.star} star ratings`}
                      value={item.pct}
                      className="flex-1"
                    >
                      <ProgressBar.Track className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                        <ProgressBar.Fill className="bg-foreground rounded-full transition-all" />
                      </ProgressBar.Track>
                    </ProgressBar>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer photo strip */}
            {product.customerPhotos && product.customerPhotos.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
                {product.customerPhotos.map((url, i) => (
                  <div
                    key={i}
                    className="size-14 sm:size-16 shrink-0 rounded-xl overflow-hidden bg-surface-secondary border border-border/40"
                  >
                    <img
                      src={url}
                      alt={`Customer photo ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3.5 bg-surface-secondary rounded-full border border-border/50 text-xs text-foreground placeholder:text-muted outline-none focus:border-border transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Sort by */}
              <Dropdown>
                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-3 h-7.5 font-medium text-xs shrink-0 gap-1 shadow-none border cursor-pointer",
                    sortBy !== "recent"
                      ? "bg-foreground text-background border-transparent"
                      : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                  )}
                >
                  <span>{sortLabel}</span>
                  <ChevronDown className="size-3 opacity-60" />
                </Button>
                <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[160px] z-[60] p-1">
                  <Dropdown.Menu
                    aria-label="Sort reviews"
                    selectionMode="single"
                    selectedKeys={new Set([sortBy])}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (
                        selected === "recent" ||
                        selected === "highest" ||
                        selected === "lowest"
                      ) {
                        setSortBy(selected);
                      }
                    }}
                  >
                    <Dropdown.Item
                      id="recent"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      Most Recent
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="highest"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      Highest Rating
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="lowest"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      Lowest Rating
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              {/* Rating */}
              <Dropdown>
                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-3 h-7.5 font-medium text-xs shrink-0 gap-1 shadow-none border cursor-pointer",
                    ratingFilter !== "all"
                      ? "bg-foreground text-background border-transparent"
                      : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                  )}
                >
                  <span>{ratingLabel}</span>
                  <ChevronDown className="size-3 opacity-60" />
                </Button>
                <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[140px] z-[60] p-1">
                  <Dropdown.Menu
                    aria-label="Filter by rating"
                    selectionMode="single"
                    selectedKeys={new Set([String(ratingFilter)])}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected === "all") {
                        setRatingFilter("all");
                      } else if (selected !== undefined) {
                        const parsed = Number(selected);
                        if (!isNaN(parsed)) {
                          setRatingFilter(parsed);
                        }
                      }
                    }}
                  >
                    <Dropdown.Item
                      id="all"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      All Ratings
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="5"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      5 Stars
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="4"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      4 Stars
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="3"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      3 Stars
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              {/* Choose Your Supply / Size */}
              <Dropdown>
                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-3 h-7.5 font-medium text-xs shrink-0 gap-1 shadow-none border cursor-pointer whitespace-nowrap",
                    sizeFilter !== "all"
                      ? "bg-foreground text-background border-transparent"
                      : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                  )}
                >
                  <span>{sizeLabel}</span>
                  <ChevronDown className="size-3 opacity-60" />
                </Button>
                <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[140px] z-[60] p-1">
                  <Dropdown.Menu
                    aria-label="Filter by size"
                    selectionMode="single"
                    selectedKeys={new Set([sizeFilter])}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (typeof selected === "string") {
                        setSizeFilter(selected);
                      }
                    }}
                  >
                    <Dropdown.Item
                      id="all"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      All
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="SMALL"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      SMALL
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="MEDIUM"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      MEDIUM
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="LARGE"
                      className="text-xs py-2 px-3 cursor-pointer"
                    >
                      LARGE
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          </DrawerHeader>

          {/* Scrollable Review Cards */}
          <DrawerBody className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filteredReviews.length === 0 ? (
              <div className="py-16 text-center text-xs text-muted">
                No reviews match your search.
              </div>
            ) : (
              filteredReviews.map((rev) => {
                const isHelpful = helpfulReviews.includes(rev.id);
                return (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl border border-border/70 bg-surface shadow-2xs flex flex-col gap-2.5 transition-shadow hover:shadow-xs"
                  >
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < rev.rating ? "text-warning" : "text-muted/30"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {rev.size && (
                      <span className="text-[11px] font-semibold text-muted tracking-tight">
                        {rev.size}
                      </span>
                    )}

                    <p className="text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px]">
                      {rev.text}
                    </p>

                    <div className="flex items-center justify-between pt-1 mt-0.5">
                      <div className="flex items-center gap-1.5">
                        <Avatar
                          size="sm"
                          className="size-5 text-[9px] font-bold bg-foreground text-background"
                        >
                          <Avatar.Fallback>{rev.avatarInitial}</Avatar.Fallback>
                        </Avatar>
                        <span className="text-xs text-muted font-normal">
                          <span className="font-semibold text-foreground">
                            {rev.author}
                          </span>{" "}
                          · {rev.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleHelpful(rev.id)}
                          className={cn(
                            "flex items-center gap-1 text-xs font-medium cursor-pointer transition-colors",
                            isHelpful
                              ? "text-foreground font-semibold"
                              : "text-muted hover:text-foreground",
                          )}
                        >
                          <ThumbsUp
                            className={cn(
                              "size-3",
                              isHelpful && "fill-foreground",
                            )}
                          />
                          <span>
                            Helpful
                            {rev.helpfulCount ? ` ${rev.helpfulCount}` : ""}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="text-muted hover:text-foreground cursor-pointer transition-colors p-0.5"
                          aria-label="More"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </DrawerBody>
        </DrawerDialog>
      </DrawerContent>
    </DrawerRoot>
  );
}
