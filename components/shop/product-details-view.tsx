"use client";

import React, { useState } from "react";
import {
  Heart,
  Share2,
  MoreHorizontal,
  MapPin,
  Package,
  ArrowRight,
  ExternalLink,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
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
import { getProductData } from "./data/products-data";

export interface ProductDetailsViewProps {
  productId?: string;
}

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const product = getProductData(productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[3]?.label || product.colors[0].label : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.available)?.label || product.sizes[0].label
  );
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [zipCode, setZipCode] = useState("1000");
  const [searchValue, setSearchValue] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

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
    reviewsEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-full pb-28 pt-2 px-3 sm:px-5 lg:px-6 max-w-[1560px] mx-auto text-foreground">
      {/* Main 2-Column Flexible Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start w-full">
        
        {/* LEFT COLUMN: Gallery View (Vertical Thumbnails + Edge-to-Edge Main Image) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col sm:flex-row items-start gap-3 relative sticky top-4 w-full">
          
          {/* 1. Vertical Thumbnail Strip (8 items) */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] shrink-0 w-full sm:w-auto py-1 scrollbar-none">
            {gallery.map((img, idx) => {
              const isSelected = idx === selectedImageIndex;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-xl overflow-hidden shrink-0 transition-all duration-200 focus:outline-none cursor-pointer",
                    isSelected
                      ? "ring-2 ring-black border-2 border-black p-0.5 shadow-xs"
                      : "border border-transparent hover:border-slate-300 opacity-85 hover:opacity-100 bg-[#f0f1f3]"
                  )}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              );
            })}
          </div>

          {/* 2. Main Featured Display Image Container (Matches Red Shoe screenshot aspect ratio & full width) */}
          <div className="flex-1 w-full bg-[#f0f1f3] rounded-[28px] md:rounded-[32px] overflow-hidden relative aspect-[1.1/1] sm:aspect-[1.18/1] min-h-[440px] max-h-[620px] flex items-center justify-center shadow-2xs group">
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-102"
            />

            {/* Overlaid Left Arrow Button (<) */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200/80 flex items-center justify-center text-slate-800 transition-all duration-150 active:scale-95 cursor-pointer hover:bg-white"
            >
              <ChevronLeft className="size-5 stroke-[2.5]" />
            </button>

            {/* Overlaid Right Arrow Button (>) */}
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200/80 flex items-center justify-center text-slate-800 transition-all duration-150 active:scale-95 cursor-pointer hover:bg-white"
            >
              <ChevronRight className="size-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Metadata, Action Buttons & Details */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5 pt-0.5 w-full">
          
          {/* Brand Header & More Menu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Brand Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden font-bold text-xs text-slate-700">
                <span className="text-[10px] uppercase">{product.brandAvatarText}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground leading-tight">
                  {product.brand}
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  {product.brandRating}
                </span>
              </div>
            </div>

            {/* Overflow Menu */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  aria-label="More options"
                  className="rounded-full text-slate-600 hover:bg-slate-100"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Brand Actions">
                <DropdownItem id="visit-store">Visit Store</DropdownItem>
                <DropdownItem id="copy-link">Copy Link</DropdownItem>
                <DropdownItem id="report" className="text-danger">
                  Report Item
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Title & Star Ratings */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold text-foreground tracking-tight leading-tight uppercase">
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
                className="text-xs text-foreground font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer ml-0.5"
              >
                {product.reviewCount} ratings
              </button>
            </div>

            {/* Sales & Stock Badges */}
            <div className="flex items-center gap-2 mt-1">
              {product.boughtBadge && (
                <span className="bg-[#f2f3f5] text-slate-600 text-xs font-medium px-3 py-1 rounded-full inline-block">
                  {product.boughtBadge}
                </span>
              )}
              {product.stockBadge && (
                <span className="bg-[#fff0f0] text-[#e53935] text-xs font-semibold px-2.5 py-1 rounded-full inline-block">
                  {product.stockBadge}
                </span>
              )}
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl sm:text-[28px] font-extrabold text-foreground tracking-tight">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through font-normal">
                  {product.originalPrice}
                </span>
              )}
              {product.discountBadge && (
                <span className="bg-black text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-1">
                  {product.discountBadge}
                </span>
              )}
            </div>
          </div>

          {/* Color Selection (if applicable) */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <span>Color</span>
                <span className="font-normal text-slate-600">{selectedColor}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((col) => {
                  const isSelected = selectedColor === col.label;
                  if (!col.available) {
                    return (
                      <span
                        key={col.id}
                        className="bg-[#f5f6f8] text-slate-400 border border-slate-200/70 text-xs rounded-full px-3 py-1 cursor-not-allowed select-none line-through"
                      >
                        ~{col.label}~
                      </span>
                    );
                  }

                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColor(col.label)}
                      className={cn(
                        "text-xs rounded-full px-3.5 py-1.5 transition-all duration-150 cursor-pointer focus:outline-none select-none",
                        isSelected
                          ? "bg-white border-2 border-black font-bold text-foreground shadow-2xs"
                          : "bg-white border border-slate-200 hover:border-slate-400 font-medium text-slate-800"
                      )}
                    >
                      {col.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <span>Size</span>
              <span className="font-normal text-slate-600">{selectedSize}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz.label;
                if (!sz.available) {
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      disabled
                      className="w-9 h-9 rounded-full bg-[#f5f6f8] text-slate-400 text-xs font-medium flex items-center justify-center cursor-not-allowed select-none"
                    >
                      {sz.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz.label)}
                    className={cn(
                      "w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-none select-none",
                      isSelected
                        ? "bg-white border-2 border-black text-foreground shadow-2xs"
                        : "bg-[#f2f3f5] text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {sz.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-xs font-bold text-foreground">Quantity</span>
            <div className="bg-[#f2f3f5] rounded-full px-3.5 py-1 flex items-center gap-4 w-fit select-none">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="text-slate-600 hover:text-black font-semibold text-base px-1 focus:outline-none cursor-pointer"
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
                className="text-slate-600 hover:text-black font-semibold text-base px-1 focus:outline-none cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col gap-2.5 pt-2">
            {/* Add to Cart */}
            <Button
              size="lg"
              onPress={handleAddToCart}
              className={cn(
                "w-full rounded-full font-semibold text-base py-6 shadow-md transition-all duration-200 cursor-pointer",
                isAddedToCart
                  ? "bg-emerald-600 text-white"
                  : "bg-[#5238f2] hover:bg-[#4326e0] active:scale-[0.99] text-white"
              )}
            >
              {isAddedToCart ? (
                <span className="flex items-center gap-2">
                  <Check className="size-5" /> Added to Cart!
                </span>
              ) : (
                "Add to cart"
              )}
            </Button>

            {/* Buy Now */}
            <Button
              size="lg"
              className="w-full bg-black hover:bg-slate-900 active:scale-[0.99] text-white font-semibold text-base py-6 rounded-full shadow-sm cursor-pointer"
            >
              Buy now
            </Button>

            {/* Save & Share Pill Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "flex-1 bg-white hover:bg-slate-50 border text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer",
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
                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
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
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-extrabold text-foreground">Description</h3>
            
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {product.descriptionParagraphs[0]}
            </p>

            {product.descriptionParagraphs.length > 1 && (
              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                {isDescriptionExpanded ? (
                  <p className="mt-1">{product.descriptionParagraphs.slice(1).join(" ")}</p>
                ) : (
                  <p className="mt-1">
                    {product.descriptionParagraphs[1].slice(0, 75)}...{" "}
                    <button
                      type="button"
                      onClick={() => setIsDescriptionExpanded(true)}
                      className="font-bold text-foreground hover:underline cursor-pointer"
                    >
                      View more
                    </button>
                  </p>
                )}
              </div>
            )}

            {product.externalLinkText && (
              <button
                type="button"
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs py-2 px-4 rounded-full w-fit flex items-center gap-1.5 shadow-2xs mt-2 transition-colors cursor-pointer"
              >
                <ExternalLink className="size-3" />
                {product.externalLinkText}
              </button>
            )}
          </div>

          {/* Reviews Card Section */}
          <div
            id="reviews-section"
            className="bg-[#fcfdfe] sm:bg-slate-50/60 rounded-[24px] p-5 border border-slate-200/70 flex flex-col gap-4 mt-2"
          >
            <h3 className="text-sm font-extrabold text-foreground">Reviews</h3>

            {/* Rating Overview & Histogram */}
            <div className="flex items-center gap-6">
              {/* Score summary */}
              <div className="flex flex-col items-start">
                <span className="text-3xl font-extrabold text-foreground tracking-tight">
                  {product.rating}.0
                </span>
                <div className="flex items-center text-amber-400 text-xs tracking-tighter mt-0.5">
                  {"★".repeat(product.rating)}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  {product.reviewCount} ratings
                </span>
              </div>

              {/* Histogram rating bars */}
              <div className="flex-1 flex flex-col gap-1 max-w-[200px]">
                {[
                  { star: "5", width: "w-[94%]" },
                  { star: "4", width: "w-[16%]" },
                  { star: "3", width: "w-[5%]" },
                  { star: "2", width: "w-[2%]" },
                  { star: "1", width: "w-[1%]" },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-medium w-2">
                      {item.star}
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={cn("h-full bg-slate-900 rounded-full", item.width)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Photos Row */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {product.customerPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-2xs"
                >
                  <img
                    src={photo}
                    alt={`Customer photo ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

            {/* Review Cards (2 columns / stacked) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-2.5"
                >
                  <div>
                    <div className="flex items-center text-amber-400 text-xs tracking-tighter mb-1.5">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]",
                        rev.avatarBg
                      )}
                    >
                      {rev.avatarInitial}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {rev.author} · {rev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Reviews Button */}
            <button
              type="button"
              onClick={() => setIsReviewsOpen(true)}
              className="bg-[#f0f1f3] hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-6 rounded-full w-full text-center transition-colors cursor-pointer"
            >
              Read more reviews
            </button>
          </div>

          {/* Delivery & Returns Card Section */}
          <div className="bg-[#fcfdfe] sm:bg-slate-50/60 rounded-[24px] p-5 border border-slate-200/70 flex flex-col gap-3 mt-1">
            <h3 className="text-sm font-extrabold text-foreground">Delivery & Returns</h3>

            <div className="flex flex-col gap-2 pt-1">
              {/* Ships to Location */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <MapPin className="size-4 text-slate-700" />
                  <span>Ships to {zipCode}</span>
                </div>
                <PopoverRoot>
                  <PopoverTrigger>
                    <button
                      type="button"
                      className="text-xs text-slate-500 font-medium hover:text-black flex items-center gap-1 cursor-pointer"
                    >
                      Change <ChevronDown className="size-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-xl shadow-lg border border-slate-200 bg-white text-slate-800 z-50">
                    <PopoverDialog className="p-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold">Enter ZIP Code</span>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="border border-slate-300 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-black"
                        />
                      </div>
                    </PopoverDialog>
                  </PopoverContent>
                </PopoverRoot>
              </div>

              {/* Shipping calculated */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-normal">
                <Package className="size-4 text-slate-500" />
                <span>Shipping calculated at checkout</span>
              </div>
            </div>

            {/* Return Policy Button */}
            <button
              type="button"
              onClick={() => setIsReturnPolicyOpen(true)}
              className="bg-[#f0f1f3] hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-6 rounded-full w-full text-center transition-colors mt-2 cursor-pointer"
            >
              Return policy
            </button>
          </div>
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
