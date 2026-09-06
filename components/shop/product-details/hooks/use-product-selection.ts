"use client";

import { useState, useCallback } from "react";
import type { ProductDetailData } from "../types";

export interface UseProductSelectionProps {
  readonly product: ProductDetailData;
  readonly productId?: string;
}

export function useProductSelection({
  product,
  productId,
}: UseProductSelectionProps) {
  const initialImageIndex = productId === "womens-ribbed-henley-tan" ? 3 : 0;
  const initialQuantity = productId === "womens-ribbed-henley-tan" ? 5 : 1;

  const defaultSize =
    productId === "womens-ribbed-henley-tan"
      ? "MEDIUM"
      : (product.sizes.find((s) => s.available)?.label ??
        product.sizes[0]?.label ??
        "ONE SIZE");

  const [selectedImageIndex, setSelectedImageIndex] =
    useState<number>(initialImageIndex);
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isFollowingBrand, setIsFollowingBrand] = useState<boolean>(false);
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState<boolean>(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState<boolean>(false);

  const galleryLength = product.galleryImages.length;

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? galleryLength - 1 : prev - 1,
    );
  }, [galleryLength]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === galleryLength - 1 ? 0 : prev + 1,
    );
  }, [galleryLength]);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    setIsAddedToCart(true);
    const timer = setTimeout(() => {
      setIsAddedToCart(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSaved = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const toggleFollowingBrand = useCallback(() => {
    setIsFollowingBrand((prev) => !prev);
  }, []);

  return {
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
  };
}
