"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "../page-container";
import { ProductRail } from "../product-rail";
import { getProductData, RECOMMENDED_PRODUCTS } from "../data/products-data";
import type { ProductDetailsViewProps } from "./types";
import { useProductSelection } from "./hooks/use-product-selection";
import { ProductGallery } from "./product-gallery";
import { ProductInfoHeader } from "./product-info-header";
import { ProductVariantSelector } from "./product-variant-selector";
import { ProductPurchaseActions } from "./product-purchase-actions";
import { ProductDescriptionSection } from "./product-description-section";
import { ProductReviewsSection } from "./product-reviews-section";
import { ProductDeliveryReturns } from "./product-delivery-returns";
import { ProductBrandCard } from "./product-brand-card";
import { ProductReturnPolicyModal } from "./product-return-policy-modal";
import { ProductReviewsDrawer } from "./product-reviews-drawer";

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const router = useRouter();
  const product = getProductData(productId);

  const {
    selectedImageIndex,
    setSelectedImageIndex,
    selectedSize,
    setSelectedSize,
    quantity,
    handleQuantityChange,
    isSaved,
    toggleSaved,
    isAddedToCart,
    handleAddToCart,
    isFollowingBrand,
    toggleFollowingBrand,
    isReturnPolicyOpen,
    setIsReturnPolicyOpen,
    isReviewsOpen,
    setIsReviewsOpen,
    handlePrevImage,
    handleNextImage,
  } = useProductSelection({ product, productId });

  const scrollToReviews = () => {
    const reviewsEl = document.getElementById("reviews-section");
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const recommendedItems = RECOMMENDED_PRODUCTS.map((item) => ({
    id: item.id,
    title: item.title,
    brand: item.brand,
    imageSrc: item.imageUrl ?? "",
    price: item.price ?? "",
    originalPrice: item.originalPrice,
    badge: item.discountBadge,
    rating: item.rating,
    reviewCount: item.reviewCount,
  }));

  return (
    <PageContainer maxWidth="full">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10 xl:gap-12 w-full">
          {/* Left Column: Gallery */}
          <ProductGallery
            gallery={product.galleryImages}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={setSelectedImageIndex}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
          />

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-6 pt-0.5 pb-12 lg:pb-8">
            <ProductInfoHeader
              title={product.title}
              rating={product.rating}
              reviewCount={product.reviewCount}
              price={product.price}
              originalPrice={product.originalPrice}
              discountBadge={product.discountBadge}
              onReviewsClick={scrollToReviews}
            />

            <ProductVariantSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />

            <ProductPurchaseActions
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              isAddedToCart={isAddedToCart}
              onAddToCart={handleAddToCart}
              isSaved={isSaved}
              onToggleSaved={toggleSaved}
            />

            <ProductDescriptionSection
              paragraphs={product.descriptionParagraphs}
            />

            <ProductReviewsSection
              product={product}
              onOpenReviews={() => setIsReviewsOpen(true)}
            />

            <ProductDeliveryReturns
              onOpenReturnPolicy={() => setIsReturnPolicyOpen(true)}
            />

            <ProductBrandCard
              brand={product.brand}
              brandAvatarText={product.brandAvatarText}
              brandRating={product.brandRating}
              isFollowing={isFollowingBrand}
              onToggleFollow={toggleFollowingBrand}
            />
          </div>
        </div>
      </div>

      {/* Recommended Products Carousel */}
      <section className="w-full sm:mt-20 border-t border-border/40">
        <ProductRail
          title="You might also like"
          bleed
          products={recommendedItems}
          onProductClick={(p) => router.push(`/product/${p.id}`)}
        />
      </section>

      {/* Modals & Drawers */}
      <ProductReturnPolicyModal
        isOpen={isReturnPolicyOpen}
        onOpenChange={setIsReturnPolicyOpen}
      />

      <ProductReviewsDrawer
        product={product}
        isOpen={isReviewsOpen}
        onOpenChange={setIsReviewsOpen}
      />
    </PageContainer>
  );
}
