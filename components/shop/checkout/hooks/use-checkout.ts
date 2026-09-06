"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { IN_YOUR_CART_ITEMS } from "@/components/shop/data/cart-data";
import type { CartBrandGroup } from "@/components/shop/data/cart-data";
import type { CheckoutStep, PaymentMethodId, ShippingAddress } from "../types";

const INITIAL_SHIPPING_ADDRESS: ShippingAddress = {
  firstName: "Jane",
  lastName: "Morgan",
  address: "123 Fashion Blvd, Apt 4B",
  area: "Gulshan",
  city: "Dhaka",
  postalCode: "1212",
  country: "Bangladesh",
  phone: "+880 1712-345678",
};

export interface UseCheckoutProps {
  readonly initialBrandId?: string;
}

export function useCheckout({ initialBrandId }: UseCheckoutProps = {}) {
  const searchParams = useSearchParams();
  const brandParam =
    searchParams.get("brand") ?? initialBrandId ?? "cart-flag-nor-fail";

  const brandGroup: CartBrandGroup =
    IN_YOUR_CART_ITEMS.find((b) => b.id === brandParam) ??
    IN_YOUR_CART_ITEMS[0];

  const [email, setEmail] = useState<string>("");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState<string>("");
  const [discountSuccess, setDiscountSuccess] = useState<string>("");
  const [showMobileSummary, setShowMobileSummary] = useState<boolean>(false);
  const [optInSms, setOptInSms] = useState<boolean>(true);
  const [step, setStep] = useState<CheckoutStep>("signin");
  const [isProcessingPasskey, setIsProcessingPasskey] =
    useState<boolean>(false);
  const [isProcessingShop, setIsProcessingShop] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("cod");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    INITIAL_SHIPPING_ADDRESS,
  );

  const baseSubtotal = brandGroup.subtotalValue;
  const discountAmount = appliedDiscount
    ? Math.round(baseSubtotal * appliedDiscount)
    : 0;
  const shippingFee = 0;
  const totalValue = Math.max(0, baseSubtotal - discountAmount + shippingFee);

  const formatCurrency = useCallback(
    (amount: number): string => {
      return `${brandGroup.currencySymbol}${amount.toLocaleString()}.00`;
    },
    [brandGroup.currencySymbol],
  );

  const handleApplyDiscount = useCallback(() => {
    const trimmed = discountCode.trim();
    if (trimmed.length === 0) {
      return;
    }

    const code = trimmed.toUpperCase();
    if (code === "SAVE10" || code === "SHOP10" || code === "FNF") {
      setAppliedDiscount(0.1);
      setDiscountSuccess("10% discount applied!");
      setDiscountError("");
      return;
    }

    setDiscountError("Invalid discount code. Try 'SAVE10'");
    setDiscountSuccess("");
  }, [discountCode]);

  const handleContinueWithShop = useCallback(() => {
    setIsProcessingShop(true);
    setTimeout(() => {
      setIsProcessingShop(false);
      setEmail("jane.morgan@example.com");
      setStep("signedin");
    }, 450);
  }, []);

  const handlePasskey = useCallback(() => {
    setIsProcessingPasskey(true);
    setTimeout(() => {
      setIsProcessingPasskey(false);
      setEmail("jane.morgan@example.com");
      setStep("signedin");
    }, 500);
  }, []);

  const handleCompleteOrder = useCallback(() => {
    setStep("success");
  }, []);

  return {
    brandGroup,
    email,
    setEmail,
    discountCode,
    setDiscountCode,
    appliedDiscount,
    discountError,
    discountSuccess,
    showMobileSummary,
    setShowMobileSummary,
    optInSms,
    setOptInSms,
    step,
    setStep,
    isProcessingPasskey,
    isProcessingShop,
    paymentMethod,
    setPaymentMethod,
    shippingAddress,
    setShippingAddress,
    baseSubtotal,
    discountAmount,
    shippingFee,
    totalValue,
    formatCurrency,
    handleApplyDiscount,
    handleContinueWithShop,
    handlePasskey,
    handleCompleteOrder,
  };
}
