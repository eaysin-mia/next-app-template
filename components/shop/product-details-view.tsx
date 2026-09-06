"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  Heart,
  Share2,
  MoreHorizontal,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Truck,
  RotateCcw,
  Search,
  ThumbsUp,
  Star,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverDialog,
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerCloseTrigger,
  Avatar,
  Chip,
  Separator,
  ProgressBar,
  cn,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { PageContainer } from "./page-container";
import { getProductData, RECOMMENDED_PRODUCTS } from "./data/products-data";
import { ProductCard } from "./product-card";
import { ProductRail } from "./product-rail";

export interface ProductDetailsViewProps {
  productId?: string;
}

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const router = useRouter();
  const product = getProductData(productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(
    productId === "womens-ribbed-henley-tan" ? 3 : 0,
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0
      ? product.colors[3]?.label || product.colors[0].label
      : "",
  );
  const [selectedSize, setSelectedSize] = useState(
    productId === "womens-ribbed-henley-tan"
      ? "MEDIUM"
      : product.sizes.find((s) => s.available)?.label || product.sizes[0].label,
  );
  const [quantity, setQuantity] = useState(
    productId === "womens-ribbed-henley-tan" ? 5 : 1,
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [zipCode, setZipCode] = useState("1000");
  const [searchValue, setSearchValue] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [isFollowingBrand, setIsFollowingBrand] = useState(false);

  // Reviews Drawer State
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [reviewSortBy, setReviewSortBy] = useState<
    "recent" | "highest" | "lowest"
  >("recent");
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | "all">(
    "all",
  );
  const [reviewSizeFilter, setReviewSizeFilter] = useState<string | "all">(
    "all",
  );
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);

  const toggleHelpful = (id: string) => {
    setHelpfulReviews((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredReviews = useMemo(() => {
    let list = [...(product.reviews || [])];

    if (reviewSearchQuery.trim()) {
      const q = reviewSearchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.text.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          (r.size && r.size.toLowerCase().includes(q)),
      );
    }

    if (reviewRatingFilter !== "all") {
      list = list.filter((r) => r.rating === reviewRatingFilter);
    }

    if (reviewSizeFilter !== "all") {
      list = list.filter(
        (r) =>
          r.size && r.size.toUpperCase() === reviewSizeFilter.toUpperCase(),
      );
    }

    if (reviewSortBy === "highest") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (reviewSortBy === "lowest") {
      list.sort((a, b) => a.rating - b.rating);
    }

    return list;
  }, [
    product.reviews,
    reviewSearchQuery,
    reviewRatingFilter,
    reviewSizeFilter,
    reviewSortBy,
  ]);

  const toggleLikeItem = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const gallery = product.galleryImages;
  const activeImage = gallery[selectedImageIndex] || gallery[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1,
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2500);
  };

  const scrollToReviews = () => {
    const reviewsEl = document.getElementById("reviews-section");
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageContainer maxWidth="full">
      {/* Centered content block with max-width cap */}
      <div className="w-full max-w-[1280px] mx-auto flex flex-col">
        {/* Main 2-Column Layout: Gallery (Left) + Details Column (Right) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10 xl:gap-12 w-full">
          {/* LEFT GALLERY: Thumbnails + Arrows + Main Hero Image */}
          <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center justify-center lg:sticky lg:top-8 self-start min-w-0">
            {/* 1. Proportional Vertical Thumbnail Strip (8 items) - Desktop Only */}
            <div className="hidden lg:flex flex-col gap-2 shrink-0 py-0.5">
              {gallery.slice(0, 8).map((img, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      "relative w-9 h-12 sm:w-11 sm:h-14 lg:w-[48px] lg:h-[62px] rounded-xl overflow-hidden shrink-0 transition-all duration-150 focus:outline-none cursor-pointer p-0.5",
                      isSelected
                        ? "border-2 border-foreground p-[2px] bg-surface shadow-xs scale-[1.02]"
                        : "border border-transparent hover:border-border opacity-75 hover:opacity-100 bg-surface-secondary hover:scale-[1.03]",
                    )}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover rounded-[7px] sm:rounded-[10px]"
                    />
                  </button>
                );
              })}
            </div>

            {/* Centered Left Arrow - Desktop Only */}
            <div className="hidden lg:flex items-center justify-center shrink-0 px-2.5 sm:px-4 md:px-6 xl:px-8">
              <Button
                isIconOnly
                variant="outline"
                onPress={handlePrevImage}
                aria-label="Previous image"
                className="size-10 rounded-full bg-surface shadow-md hover:shadow-lg border-border text-foreground hover:bg-surface-secondary active:scale-95 cursor-pointer shrink-0"
              >
                <ChevronLeft className="size-5 stroke-[2.2]" />
              </Button>
            </div>

            {/* 2. Main Hero Image Container: Responsive */}
            <div className="w-full max-w-[420px] sm:max-w-[460px] lg:w-[450px] xl:w-[480px] aspect-[4/5] max-h-[580px] sm:max-h-[600px] lg:max-h-[calc(100vh-170px)] xl:max-h-[610px] bg-surface-secondary rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden relative flex items-center justify-center shadow-sm shrink-0">
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="w-full h-full object-cover"
              />

              {/* Mobile Floating Left Arrow */}
              <Button
                isIconOnly
                variant="outline"
                size="sm"
                onPress={handlePrevImage}
                aria-label="Previous image"
                className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-surface/90 backdrop-blur-xs shadow-md border-border text-foreground active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="size-4 stroke-[2.2]" />
              </Button>

              {/* Mobile Floating Right Arrow */}
              <Button
                isIconOnly
                variant="outline"
                size="sm"
                onPress={handleNextImage}
                aria-label="Next image"
                className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-surface/90 backdrop-blur-xs shadow-md border-border text-foreground active:scale-95 cursor-pointer"
              >
                <ChevronRight className="size-4 stroke-[2.2]" />
              </Button>

              {/* Mobile Image Index Pill */}
              <div className="lg:hidden absolute bottom-3 right-3 z-10 bg-foreground/75 backdrop-blur-xs text-background text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
                {selectedImageIndex + 1} / {gallery.length}
              </div>
            </div>

            {/* Centered Right Arrow - Desktop Only */}
            <div className="hidden lg:flex items-center justify-center shrink-0 px-2.5 sm:px-4 md:px-6 xl:px-8">
              <Button
                isIconOnly
                variant="outline"
                onPress={handleNextImage}
                aria-label="Next image"
                className="size-10 rounded-full bg-surface shadow-md hover:shadow-lg border-border text-foreground hover:bg-surface-secondary active:scale-95 cursor-pointer shrink-0"
              >
                <ChevronRight className="size-5 stroke-[2.2]" />
              </Button>
            </div>

            {/* Mobile Horizontal Thumbnail Strip */}
            <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-3 w-full max-w-[420px] sm:max-w-[460px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {gallery.slice(0, 8).map((img, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      "relative w-11 h-14 sm:w-12 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all duration-150 focus:outline-none cursor-pointer p-0.5",
                      isSelected
                        ? "border-2 border-foreground p-[2px] bg-surface shadow-xs scale-105"
                        : "border border-transparent hover:border-border opacity-70 hover:opacity-100 bg-surface-secondary",
                    )}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover rounded-[7px]"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated content column */}
          <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-6 pt-0.5 pb-12 lg:pb-8">
     

            {/* Title & Star Ratings */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[24px] font-semibold text-foreground tracking-[-1px] leading-[1.17] uppercase text-pretty">
                {product.title}
              </h1>

              {/* Ratings Row */}
              <div className="flex items-center gap-2">
                <div
                  role="img"
                  aria-label={`${product.rating} out of 5 stars`}
                  className="flex items-center gap-0.5 text-warning"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      className={cn(
                        "size-3.5 fill-current stroke-[1.5]",
                        index >= product.rating &&
                          "fill-transparent text-foreground/25",
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={scrollToReviews}
                  className="text-xs text-muted font-medium underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
                >
                  {product.reviewCount} ratings
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base text-muted line-through font-normal ml-1">
                    {product.originalPrice}
                  </span>
                )}
                {product.discountBadge && (
                  <Chip
                    size="sm"
                    variant="primary"
                    className="bg-foreground text-background font-bold text-[11px] ml-1.5 shadow-2xs"
                  >
                    {product.discountBadge}
                  </Chip>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                SIZE{" "}
                <span className="font-extrabold">
                  {selectedSize.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((sz) => {
                  const isSelected =
                    selectedSize.toLowerCase() === sz.label.toLowerCase();
                  if (!sz.available) {
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        disabled
                        className="rounded-full h-8 px-3.5 flex items-center justify-center bg-surface-secondary border border-transparent text-muted text-xs font-semibold uppercase cursor-not-allowed select-none"
                      >
                        {sz.label.toUpperCase()}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setSelectedSize(sz.label)}
                      className={cn(
                        "rounded-full h-8 px-3.5 flex items-center justify-center text-xs font-semibold uppercase transition-colors duration-150 cursor-pointer focus:outline-none select-none border",
                        isSelected
                          ? "bg-surface border-foreground text-foreground shadow-2xs font-bold"
                          : "bg-surface border-border text-muted hover:text-foreground hover:border-border/80",
                      )}
                    >
                      {sz.label.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs sm:text-sm font-bold text-foreground">
                Quantity
              </span>
              <div className="h-10 bg-surface-secondary rounded-full p-1 flex items-center gap-1 w-fit select-none border border-border/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="size-8 flex items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface font-bold text-base focus:outline-none cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-sm font-bold text-foreground min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="size-8 flex items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface font-bold text-base focus:outline-none cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-col gap-3 pt-1">
              {/* Add to Cart */}
              <Button
                size="lg"
                onPress={handleAddToCart}
                className={cn(
                  "w-full min-h-11 rounded-full font-bold text-sm sm:text-base shadow-xs transition-all duration-200 cursor-pointer",
                  isAddedToCart
                    ? "bg-success text-success-foreground"
                    : "bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground",
                )}
              >
                {isAddedToCart ? (
                  <span className="flex items-center gap-2">
                    <Check className="size-4" /> Added to Cart!
                  </span>
                ) : (
                  "Add to cart"
                )}
              </Button>

              {/* Buy Now */}
              <Button
                size="lg"
                className="w-full min-h-11 bg-foreground hover:bg-foreground/90 active:scale-[0.99] text-background font-bold text-sm sm:text-base rounded-full shadow-xs cursor-pointer"
              >
                Buy now
              </Button>

              {/* Save & Share Dual Buttons */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <Button
                  variant="outline"
                  onPress={() => setIsSaved(!isSaved)}
                  className={cn(
                    "flex-1 rounded-full text-xs sm:text-sm font-semibold h-11 transition-all cursor-pointer",
                    isSaved
                      ? "border-danger/30 text-danger bg-danger/10"
                      : "border-border text-foreground hover:bg-surface-secondary bg-surface",
                  )}
                >
                  <Heart
                    className={cn(
                      "size-4",
                      isSaved ? "fill-danger stroke-danger" : "stroke-current",
                    )}
                  />
                  {isSaved ? "Saved" : "Save"}
                </Button>

                <PopoverRoot>
                  <PopoverTrigger>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full text-xs sm:text-sm font-semibold h-11 border-border text-foreground hover:bg-surface-secondary bg-surface transition-all cursor-pointer"
                    >
                      <Share2 className="size-4" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-2xl shadow-xl border border-border bg-surface text-foreground z-50">
                    <PopoverDialog className="p-3 text-xs font-medium">
                      <p>Product link copied to clipboard!</p>
                    </PopoverDialog>
                  </PopoverContent>
                </PopoverRoot>
              </div>
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-2 pt-3 border-t border-border/60">
              <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
                Description
              </p>

              <div className="text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px] flex flex-col gap-1.5">
                {product.descriptionParagraphs &&
                product.descriptionParagraphs.length > 0 ? (
                  <>
                    {!isDescriptionExpanded ? (
                      <>
                        {product.descriptionParagraphs
                          .slice(0, 4)
                          .map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        {product.descriptionParagraphs.length > 4 && (
                          <button
                            type="button"
                            onClick={() => setIsDescriptionExpanded(true)}
                            className="font-semibold text-foreground hover:underline cursor-pointer inline text-left mt-0.5 text-[14px]"
                          >
                            View more
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {product.descriptionParagraphs.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsDescriptionExpanded(false)}
                          className="font-semibold text-foreground hover:underline cursor-pointer inline text-left mt-0.5 text-[14px]"
                        >
                          View less
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <p>Designed for everyday comfort and premium durability.</p>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div
              id="reviews-section"
              className="flex flex-col gap-3 pt-3.5 border-t border-border/60 text-foreground"
            >
              <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
                Reviews
              </p>

              {/* Rating Overview & Histogram */}
              <div className="flex items-center gap-5 sm:gap-6">
                {/* Score */}
                <div className="flex flex-col items-start shrink-0">
                  <span className="text-[38px] sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
                    {product.reviewScore
                      ? product.reviewScore.toFixed(1)
                      : `${product.rating}.0`}
                  </span>
                  <div className="flex items-center gap-1 text-warning text-sm sm:text-[15px] mt-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < product.rating ? "text-warning" : "text-muted/30"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] font-normal text-muted leading-[1.33] tracking-[-0.2px] mt-1">
                    {product.reviewCount
                      ? product.reviewCount >= 1000
                        ? `${(product.reviewCount / 1000).toFixed(1)}K`
                        : product.reviewCount
                      : "14.8K"}{" "}
                    ratings
                  </p>
                </div>

                {/* Histogram with HeroUI ProgressBar */}
                <div className="flex-1 flex flex-col gap-2">
                  {[
                    { star: 5, pct: 85 },
                    { star: 4, pct: 12 },
                    { star: 3, pct: 2 },
                    { star: 2, pct: 1 },
                    { star: 1, pct: 0 },
                  ].map((item) => (
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

              {/* Customer Photo Strip */}
              {product.customerPhotos && product.customerPhotos.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
                  {product.customerPhotos.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIsReviewsOpen(true)}
                      className="size-11 sm:size-12 shrink-0 rounded-xl overflow-hidden bg-surface-secondary cursor-pointer hover:opacity-85 transition-opacity border border-border/40"
                    >
                      <img
                        src={url}
                        alt="Customer review photo"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* 2-Column Mini Review Cards */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {product.reviews.slice(0, 2).map((rev) => (
                      <div
                        key={rev.id}
                        className="flex flex-col gap-1.5 p-3 bg-surface-secondary/60 rounded-xl border border-border/50"
                      >
                        {/* Stars */}
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
                        {/* Text */}
                        <p className="text-[13px] sm:text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px] line-clamp-4">
                          {rev.text}
                        </p>
                        {/* Footer */}
                        <div className="flex items-center gap-1.5 mt-auto pt-1">
                          <Avatar
                            size="sm"
                            className="size-5 text-[9px] font-bold bg-foreground text-background"
                          >
                            <Avatar.Fallback>
                              {rev.avatarInitial}
                            </Avatar.Fallback>
                          </Avatar>
                          <span className="text-xs text-muted truncate">
                            <span className="font-semibold text-foreground">
                              {rev.author}
                            </span>{" "}
                            · {rev.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Read more reviews button */}
                  <Button
                    variant="secondary"
                    onPress={() => setIsReviewsOpen(true)}
                    className="w-full h-9 rounded-xl text-xs font-semibold text-foreground bg-surface-secondary hover:bg-surface-tertiary border-0 transition-colors cursor-pointer"
                  >
                    Read more reviews
                  </Button>
                </div>
              )}
            </div>

            {/* Delivery & Returns Section */}
            <div className="flex flex-col gap-3 pt-3.5 border-t border-border/60 text-foreground">
              <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
                Delivery & Returns
              </p>

              <div className="flex flex-col gap-3 text-[14px] text-muted leading-[1.29]">
                <div className="flex items-start gap-3">
                  <Truck className="size-4.5 text-foreground shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-[14px]">
                      Standard Delivery
                    </span>
                    <span className="text-muted mt-0.5 leading-[1.29] text-[14px]">
                      Estimated delivery within 3–5 business days. Free shipping
                      on orders over BDT 5,000.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border/40">
                  <RotateCcw className="size-4.5 text-foreground shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-[14px]">
                      30-Day Hassle-Free Returns
                    </span>
                    <span className="text-muted mt-0.5 leading-[1.29] text-[14px]">
                      Not completely satisfied? Return unworn items within 30
                      days.{" "}
                      <button
                        type="button"
                        onClick={() => setIsReturnPolicyOpen(true)}
                        className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 inline ml-0.5 cursor-pointer"
                      >
                        Read policy
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Follow Banner */}
            <div className="bg-foreground text-background rounded-2xl p-4 flex items-center justify-between mt-1 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar
                  size="md"
                  className="size-9 rounded-full bg-background text-foreground font-bold text-[9px] uppercase tracking-wider shrink-0"
                >
                  <Avatar.Fallback>{product.brandAvatarText}</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background">
                    {product.brand}
                  </span>
                  <span className="text-xs text-background/70 font-medium">
                    {product.brandRating}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                variant="secondary"
                onPress={() => setIsFollowingBrand(!isFollowingBrand)}
                className={cn(
                  "rounded-full text-xs font-semibold px-4 cursor-pointer transition-all",
                  isFollowingBrand
                    ? "bg-background/20 text-background border border-background/30 hover:bg-background/30"
                    : "bg-background text-foreground hover:bg-background/90",
                )}
              >
                {isFollowingBrand ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* "YOU MIGHT ALSO LIKE" SECTION Bleeds Edge-to-Edge */}
      <section className="w-full mt-14 sm:mt-20 pt-10 border-t border-border/40">
        <ProductRail
          title="You might also like"
          bleed
          products={RECOMMENDED_PRODUCTS.map((item) => ({
            id: item.id,
            title: item.title,
            brand: item.brand,
            imageSrc: item.imageUrl || "",
            price: item.price || "",
            originalPrice: item.originalPrice,
            badge: item.discountBadge,
            rating: item.rating,
            reviewCount: item.reviewCount,
          }))}
          onProductClick={(p) => {
            router.push(`/product/${p.id}`);
          }}
        />
      </section>

      {/* FLOATING SEARCH INPUT PILL AT BOTTOM CENTER */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[460px] px-4 pointer-events-auto">
        <div className="bg-surface/95 backdrop-blur-md border border-border shadow-xl rounded-full px-5 py-2.5 flex items-center justify-between gap-3 w-full transition-shadow hover:shadow-2xl">
          <input
            type="text"
            placeholder="What are you shopping for today?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none font-normal"
          />
          <Button
            isIconOnly
            size="sm"
            variant="secondary"
            className="size-8 rounded-full bg-surface-secondary hover:bg-surface-tertiary text-foreground transition-all shrink-0 cursor-pointer"
            aria-label="Search"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Return Policy Modal */}
      <ModalRoot
        isOpen={isReturnPolicyOpen}
        onOpenChange={setIsReturnPolicyOpen}
      >
        <ModalBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50" />
        <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <ModalDialog className="bg-surface text-foreground border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 relative">
            <ModalHeader>
              <ModalHeading className="font-bold text-lg text-foreground">
                Return Policy
              </ModalHeading>
            </ModalHeader>
            <ModalBody className="text-sm text-muted leading-relaxed">
              <p className="font-semibold text-foreground mb-1">
                30-Day Hassle-Free Returns & Exchanges
              </p>
              <p>
                We want you to love your purchase. If you're not completely
                satisfied, you can return or exchange eligible items within 30
                days of delivery.
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Items must be unworn, unwashed, and with tags attached.</li>
                <li>Free return shipping on all domestic exchanges.</li>
                <li>
                  Refunds processed back to your original payment method within
                  5 business days.
                </li>
              </ul>
            </ModalBody>
            <ModalFooter className="pt-2 flex justify-end">
              <Button
                variant="primary"
                onPress={() => setIsReturnPolicyOpen(false)}
                className="rounded-full font-semibold bg-foreground text-background hover:bg-foreground/90"
              >
                Got it
              </Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </ModalRoot>

      {/* REVIEWS SLIDE-OVER DRAWER */}
      <DrawerRoot
        isOpen={isReviewsOpen}
        onOpenChange={(open) => setIsReviewsOpen(open)}
      >
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
              {/* Close button at top-left */}
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
                {/* Score */}
                <div className="flex flex-col shrink-0">
                  <span className="text-[38px] sm:text-4xl font-extrabold text-foreground leading-none tracking-tight">
                    {product.reviewScore
                      ? product.reviewScore.toFixed(1)
                      : `${product.rating}.0`}
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
                    {product.reviewCount
                      ? product.reviewCount >= 1000
                        ? `${(product.reviewCount / 1000).toFixed(1)}K`
                        : product.reviewCount
                      : "14.8K"}{" "}
                    ratings
                  </p>
                </div>

                {/* Histogram with HeroUI ProgressBar */}
                <div className="flex-1 flex flex-col gap-2">
                  {[
                    { star: 5, pct: 85 },
                    { star: 4, pct: 12 },
                    { star: 3, pct: 2 },
                    { star: 2, pct: 1 },
                    { star: 1, pct: 0 },
                  ].map((item) => (
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
                  value={reviewSearchQuery}
                  onChange={(e) => setReviewSearchQuery(e.target.value)}
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
                      reviewSortBy !== "recent"
                        ? "bg-foreground text-background border-transparent"
                        : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                    )}
                  >
                    <span>
                      {reviewSortBy === "recent"
                        ? "Sort by"
                        : reviewSortBy === "highest"
                          ? "Highest"
                          : "Lowest"}
                    </span>
                    <ChevronDown className="size-3 opacity-60" />
                  </Button>
                  <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[160px] z-[60] p-1">
                    <Dropdown.Menu
                      aria-label="Sort reviews"
                      selectionMode="single"
                      selectedKeys={new Set([reviewSortBy])}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        if (val)
                          setReviewSortBy(
                            val as "recent" | "highest" | "lowest",
                          );
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
                      reviewRatingFilter !== "all"
                        ? "bg-foreground text-background border-transparent"
                        : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                    )}
                  >
                    <span>
                      {reviewRatingFilter === "all"
                        ? "Rating"
                        : `${reviewRatingFilter} Stars`}
                    </span>
                    <ChevronDown className="size-3 opacity-60" />
                  </Button>
                  <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[140px] z-[60] p-1">
                    <Dropdown.Menu
                      aria-label="Filter by rating"
                      selectionMode="single"
                      selectedKeys={new Set([String(reviewRatingFilter)])}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        if (val !== undefined)
                          setReviewRatingFilter(
                            val === "all" ? "all" : Number(val),
                          );
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
                      reviewSizeFilter !== "all"
                        ? "bg-foreground text-background border-transparent"
                        : "bg-surface text-foreground border-border hover:bg-surface-secondary",
                    )}
                  >
                    <span>
                      {reviewSizeFilter === "all"
                        ? "Choose Your Supply"
                        : reviewSizeFilter.toUpperCase()}
                    </span>
                    <ChevronDown className="size-3 opacity-60" />
                  </Button>
                  <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-surface min-w-[140px] z-[60] p-1">
                    <Dropdown.Menu
                      aria-label="Filter by size"
                      selectionMode="single"
                      selectedKeys={new Set([reviewSizeFilter])}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0];
                        if (val !== undefined)
                          setReviewSizeFilter(val as string);
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
                      {/* Stars */}
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

                      {/* Variant / Size tag */}
                      {rev.size && (
                        <span className="text-[11px] font-semibold text-muted tracking-tight">
                          {rev.size}
                        </span>
                      )}

                      {/* Review body */}
                      <p className="text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px]">
                        {rev.text}
                      </p>

                      {/* Footer row */}
                      <div className="flex items-center justify-between pt-1 mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <Avatar
                            size="sm"
                            className="size-5 text-[9px] font-bold bg-foreground text-background"
                          >
                            <Avatar.Fallback>
                              {rev.avatarInitial}
                            </Avatar.Fallback>
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
    </PageContainer>
  );
}
