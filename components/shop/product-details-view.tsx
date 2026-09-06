"use client";

import React, { useState, useRef } from "react";
import {
  Heart,
  Share2,
  MoreHorizontal,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Truck,
  RotateCcw,
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
  cn,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { getProductData, RECOMMENDED_PRODUCTS } from "./data/products-data";
import { ProductCard } from "./product-card";

export interface ProductDetailsViewProps {
  productId?: string;
}

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const router = useRouter();
  const product = getProductData(productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(
    productId === "womens-ribbed-henley-tan" ? 3 : 0
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[3]?.label || product.colors[0].label : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    productId === "womens-ribbed-henley-tan" ? "MEDIUM" : (product.sizes.find((s) => s.available)?.label || product.sizes[0].label)
  );
  const [quantity, setQuantity] = useState(productId === "womens-ribbed-henley-tan" ? 5 : 1);
  const [isSaved, setIsSaved] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [zipCode, setZipCode] = useState("1000");
  const [searchValue, setSearchValue] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [isFollowingBrand, setIsFollowingBrand] = useState(false);

  const toggleLikeItem = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const gallery = product.galleryImages;
  const activeImage = gallery[selectedImageIndex] || gallery[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
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
    <div className="w-full min-h-full pb-32 pt-6 sm:pt-8 lg:pt-8 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1420px] mx-auto text-foreground flex flex-col justify-start">
      {/* Main 2-Section Balanced Layout: Gallery (Left) + Details Column (Right) */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14 w-full">
        
        {/* LEFT GALLERY: Thumbnails + Left Arrow + Main Hero Image + Right Arrow */}
        <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-end lg:sticky lg:top-8 self-start shrink-0 min-w-0">
          
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
                      ? "border-2 border-black p-[2px] bg-white shadow-xs scale-[1.02]"
                      : "border border-transparent hover:border-slate-300 opacity-75 hover:opacity-100 bg-[#eef0f3] hover:scale-[1.03]"
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
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200/90 flex items-center justify-center text-slate-800 transition-all duration-150 active:scale-95 cursor-pointer hover:bg-slate-50 shrink-0"
            >
              <ChevronLeft className="size-4.5 stroke-[2.2] text-slate-700" />
            </button>
          </div>

          {/* 2. Main Hero Image Container: Responsive */}
          <div className="w-full max-w-[420px] sm:max-w-[460px] lg:w-[450px] xl:w-[480px] aspect-[4/5] max-h-[580px] sm:max-h-[600px] lg:max-h-[calc(100vh-170px)] xl:max-h-[610px] bg-[#e4e6ea] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden relative flex items-center justify-center shadow-sm shrink-0">
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="w-full h-full object-cover"
            />

            {/* Mobile Floating Left Arrow */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-slate-200/90 flex items-center justify-center text-slate-800 active:scale-95 cursor-pointer hover:bg-white"
            >
              <ChevronLeft className="size-4 stroke-[2.2]" />
            </button>

            {/* Mobile Floating Right Arrow */}
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-slate-200/90 flex items-center justify-center text-slate-800 active:scale-95 cursor-pointer hover:bg-white"
            >
              <ChevronRight className="size-4 stroke-[2.2]" />
            </button>

            {/* Mobile Image Index Pill */}
            <div className="lg:hidden absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none">
              {selectedImageIndex + 1} / {gallery.length}
            </div>
          </div>

          {/* Centered Right Arrow - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center shrink-0 px-2.5 sm:px-4 md:px-6 xl:px-8">
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200/90 flex items-center justify-center text-slate-800 transition-all duration-150 active:scale-95 cursor-pointer hover:bg-slate-50 shrink-0"
            >
              <ChevronRight className="size-4.5 stroke-[2.2] text-slate-700" />
            </button>
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
                      ? "border-2 border-black p-[2px] bg-white shadow-xs scale-105"
                      : "border border-transparent hover:border-slate-300 opacity-70 hover:opacity-100 bg-[#eef0f3]"
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
        <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 flex flex-col gap-3.5 pt-0.5 pb-12 lg:pb-8">
          
          {/* Brand Header & More Menu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Brand Avatar */}
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center overflow-hidden font-bold text-[8px] tracking-tight uppercase text-center leading-tight">
                <span>{product.brandAvatarText}</span>
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-xs sm:text-[13px] font-bold text-foreground uppercase tracking-wide leading-tight">
                  {product.brand}
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  {product.brandRating}
                </span>
              </div>
            </div>

            {/* Overflow Menu */}
            <Dropdown>
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label="More options"
                className="w-8 h-8 min-w-8 rounded-full text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <MoreHorizontal className="size-4" />
              </Button>
              <Dropdown.Popover className="rounded-2xl shadow-xl border border-border bg-white text-foreground min-w-[160px] z-50 p-1">
                <Dropdown.Menu aria-label="Brand Actions">
                  <Dropdown.Item id="visit-store" className="text-xs font-medium py-2 px-3 cursor-pointer">
                    Visit Store
                  </Dropdown.Item>
                  <Dropdown.Item id="copy-link" className="text-xs font-medium py-2 px-3 cursor-pointer">
                    Copy Link
                  </Dropdown.Item>
                  <Dropdown.Item id="report" className="text-xs font-medium py-2 px-3 cursor-pointer text-danger">
                    Report Item
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* Title & Star Ratings */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-lg sm:text-xl xl:text-[22px] font-extrabold text-foreground tracking-tight leading-snug uppercase">
              {product.title}
            </h1>

            {/* Ratings Row */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400 text-sm tracking-tighter">
                {"★".repeat(product.rating)}
              </div>
              <button
                type="button"
                onClick={scrollToReviews}
                className="text-xs sm:text-[13px] text-slate-600 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer ml-0.5"
              >
                {product.reviewCount} ratings
              </button>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through font-normal ml-1">
                  {product.originalPrice}
                </span>
              )}
              {product.discountBadge && (
                <span className="bg-black text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-1.5">
                  {product.discountBadge}
                </span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-2 pt-0.5">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              SIZE <span className="font-extrabold text-slate-900">{selectedSize.toUpperCase()}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize.toLowerCase() === sz.label.toLowerCase();
                if (!sz.available) {
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      disabled
                      className="rounded-full px-5 py-2 bg-[#f4f5f7] text-slate-400 text-xs font-bold uppercase cursor-not-allowed select-none"
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
                      "rounded-full px-5 py-2 text-xs font-bold uppercase transition-all duration-150 cursor-pointer focus:outline-none select-none",
                      isSelected
                        ? "bg-white border-2 border-black text-foreground shadow-xs scale-[1.02]"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                    )}
                  >
                    {sz.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <span className="text-xs font-bold text-slate-800">Quantity</span>
            <div className="bg-[#f4f5f7] rounded-full px-3.5 py-1 flex items-center gap-3.5 w-fit select-none">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="text-slate-600 hover:text-black font-semibold text-sm px-1 focus:outline-none cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-xs font-bold text-foreground min-w-[14px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="text-slate-600 hover:text-black font-semibold text-sm px-1 focus:outline-none cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Add to Cart */}
            <Button
              size="lg"
              onPress={handleAddToCart}
              className={cn(
                "w-full rounded-full font-bold text-sm sm:text-base py-3 sm:py-3.5 shadow-xs transition-all duration-200 cursor-pointer",
                isAddedToCart
                  ? "bg-emerald-600 text-white"
                  : "bg-[#2b59ff] hover:bg-[#204ce8] active:scale-[0.99] text-white"
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
              className="w-full bg-black hover:bg-neutral-900 active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-full shadow-xs cursor-pointer"
            >
              Buy now
            </Button>

            {/* Save & Share Dual Buttons */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "flex-1 bg-white hover:bg-slate-50 border text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer",
                  isSaved
                    ? "border-rose-300 text-rose-600 bg-rose-50/50"
                    : "border-slate-200 text-slate-800"
                )}
              >
                <Heart
                  className={cn(
                    "size-4",
                    isSaved ? "fill-rose-500 stroke-rose-500" : "stroke-current"
                  )}
                />
                {isSaved ? "Saved" : "Save"}
              </button>

              <PopoverRoot>
                <PopoverTrigger>
                  <button
                    type="button"
                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                  >
                    <Share2 className="size-4" />
                    Share
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 rounded-xl shadow-lg border border-slate-200 bg-white text-slate-800 z-50">
                  <PopoverDialog className="p-3 text-xs font-medium">
                    <p>Product link copied to clipboard!</p>
                  </PopoverDialog>
                </PopoverContent>
              </PopoverRoot>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex flex-col gap-1.5 pt-2.5 border-t border-slate-100">
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Description</h3>
            
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
              {!isDescriptionExpanded ? (
                <>
                  Designed for everyday wear with endless possibilities, our new Women's Henley's is a staple piece for any closet. Crafted from our premium, lightweight ribbed material (also used in our Women's Ribbed Athletic Collection) these Henley's fea...{" "}
                  <button
                    type="button"
                    onClick={() => setIsDescriptionExpanded(true)}
                    className="font-bold text-foreground hover:underline cursor-pointer inline"
                  >
                    View more
                  </button>
                </>
              ) : (
                <>
                  Designed for everyday wear with endless possibilities, our new Women's Henley's is a staple piece for any closet. Crafted from our premium, lightweight ribbed material (also used in our Women's Ribbed Athletic Collection) these Henley's feature a flattering contoured fit, custom tonal buttons, and an embroidered sleeve emblem. Perfect for casual layering or athletic downtime.{" "}
                  <button
                    type="button"
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="font-bold text-foreground hover:underline cursor-pointer inline ml-1"
                  >
                    View less
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Reviews Card Section */}
          <div
            id="reviews-section"
            className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col gap-3 mt-1"
          >
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Reviews</h3>

            {/* Rating Overview & Histogram */}
            <div className="flex items-center gap-6">
              {/* Score summary */}
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
                  {product.reviewScore ? product.reviewScore.toFixed(1) : `${product.rating}.0`}
                </span>
                <div className="flex items-center text-amber-400 text-xs tracking-tighter mt-1.5">
                  {"★".repeat(product.rating)}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  {product.reviewCount} ratings
                </span>
              </div>

              {/* Histogram rating bars */}
              <div className="flex-1 flex flex-col gap-1.5 max-w-[210px]">
                {[
                  { star: "5", width: "w-[85%]" },
                  { star: "4", width: "w-[15%]" },
                  { star: "3", width: "w-0" },
                  { star: "2", width: "w-0" },
                  { star: "1", width: "w-0" },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-medium w-2">
                      {item.star}
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full bg-black rounded-full", item.width)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Customer Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                {product.reviews.slice(0, 2).map((rev) => (
                  <div key={rev.id} className="p-3 bg-slate-50/80 rounded-2xl flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px]", rev.avatarBg)}>
                          {rev.avatarInitial}
                        </div>
                        <span className="font-bold text-xs text-foreground">{rev.author}</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-full">
                          Verified
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rev.text}
                    </p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setIsReviewsOpen(true)}
                  className="w-full text-center py-2 text-xs font-semibold text-foreground hover:bg-slate-50 rounded-xl border border-slate-200/70 transition-colors cursor-pointer mt-0.5"
                >
                  View all {product.reviewCount} reviews
                </button>
              </div>
            )}
          </div>

          {/* Delivery & Returns Section */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col gap-3.5 mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Delivery & Returns</h3>
            
            <div className="flex flex-col gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Truck className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Standard Delivery</span>
                  <span className="text-slate-500 mt-0.5">Estimated delivery within 3–5 business days. Free shipping on orders over BDT 5,000.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                <RotateCcw className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">30-Day Hassle-Free Returns</span>
                  <span className="text-slate-500 mt-0.5">
                    Not completely satisfied? Return unworn items within 30 days.{" "}
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
          <div className="bg-black text-white rounded-2xl p-4 flex items-center justify-between mt-1 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-[9px] uppercase tracking-wider text-white">
                {product.brandAvatarText}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {product.brand}
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {product.brandRating}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFollowingBrand(!isFollowingBrand)}
              className={cn(
                "text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer",
                isFollowingBrand
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  : "bg-white text-black hover:bg-neutral-100"
              )}
            >
              {isFollowingBrand ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      {/* "YOU MIGHT ALSO LIKE" SECTION */}
      <div className="w-full mt-14 sm:mt-20 flex flex-col gap-6 pt-10 border-t border-slate-100">
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          You might also like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {RECOMMENDED_PRODUCTS.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                id: item.id,
                title: item.title,
                brand: item.brand,
                imageSrc: item.imageUrl || "",
                price: item.price || "",
                originalPrice: item.originalPrice,
                badge: item.discountBadge,
                rating: item.rating,
                reviewCount: item.reviewCount,
              }}
              onClick={() => {
                router.push(`/product/${item.id}`);
              }}
            />
          ))}
        </div>
      </div>


      {/* FLOATING SEARCH INPUT PILL AT BOTTOM CENTER */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[460px] px-4 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-5 py-2.5 flex items-center justify-between gap-3 w-full transition-shadow hover:shadow-2xl">
          <input
            type="text"
            placeholder="What are you shopping for today?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-slate-400 outline-none font-normal"
          />
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition-all shrink-0 cursor-pointer"
            aria-label="Search"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Return Policy Modal */}
      <ModalRoot isOpen={isReturnPolicyOpen} onOpenChange={setIsReturnPolicyOpen}>
        <ModalBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50" />
        <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <ModalDialog className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 relative">
            <ModalHeader>
              <ModalHeading className="font-bold text-lg text-slate-900">
                Return Policy
              </ModalHeading>
            </ModalHeader>
            <ModalBody className="text-xs text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800 mb-1">
                30-Day Hassle-Free Returns & Exchanges
              </p>
              <p>
                We want you to love your purchase. If you're not completely satisfied, you can return or exchange eligible items within 30 days of delivery.
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Items must be unworn, unwashed, and with tags attached.</li>
                <li>Free return shipping on all domestic exchanges.</li>
                <li>Refunds processed back to your original payment method within 5 business days.</li>
              </ul>
            </ModalBody>
            <ModalFooter className="pt-2 flex justify-end">
              <Button
                variant="primary"
                onPress={() => setIsReturnPolicyOpen(false)}
                className="rounded-full font-semibold bg-black text-white hover:bg-slate-800"
              >
                Got it
              </Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </ModalRoot>

      {/* All Reviews Modal */}
      <ModalRoot isOpen={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
        <ModalBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50" />
        <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <ModalDialog className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl flex flex-col gap-4 relative max-h-[85vh] overflow-hidden">
            <ModalHeader className="flex items-center justify-between">
              <ModalHeading className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <span>Customer Reviews</span>
                <span className="text-sm font-normal text-slate-500">({product.reviewCount})</span>
              </ModalHeading>
              <button
                type="button"
                onClick={() => setIsReviewsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X className="size-4" />
              </button>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-3 overflow-y-auto pr-1">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs", rev.avatarBg)}>
                        {rev.avatarInitial}
                      </div>
                      <span className="font-bold text-xs">{rev.author}</span>
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400 text-xs">
                    {"★".repeat(rev.rating)}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="pt-2 flex justify-end">
              <Button
                variant="tertiary"
                onPress={() => setIsReviewsOpen(false)}
                className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
              >
                Close
              </Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </ModalRoot>
    </div>
  );
}
