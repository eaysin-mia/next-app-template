"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Key,
  Check,
  ShoppingBag,
  CreditCard,
  Lock,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Truck,
  Banknote,
  Smartphone,
  Building2,
} from "lucide-react";
import { cn } from "@heroui/react";
import { PageContainer } from "./page-container";
import { IN_YOUR_CART_ITEMS } from "./data/cart-data";
import type { CartBrandGroup } from "./data/cart-data";

export interface CheckoutViewProps {
  readonly initialBrandId?: string;
}

export function CheckoutView({ initialBrandId }: CheckoutViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") ?? initialBrandId ?? "cart-flag-nor-fail";

  // Selected brand group from cart data or fallback to FLAG NOR FAIL
  const brandGroup: CartBrandGroup =
    IN_YOUR_CART_ITEMS.find((b) => b.id === brandParam) ?? IN_YOUR_CART_ITEMS[0];

  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [optInSms, setOptInSms] = useState(true);

  // Checkout multi-step state: signin | signedin | shipping | payment | success
  const [step, setStep] = useState<"signin" | "signedin" | "shipping" | "payment" | "success">("signin");
  const [isProcessingPasskey, setIsProcessingPasskey] = useState(false);
  const [isProcessingShop, setIsProcessingShop] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "bkash" | "nagad" | "rocket" | "card" | "bank"
  >("cod");

  // Shipping form fields
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "Jane",
    lastName: "Morgan",
    address: "123 Fashion Blvd, Apt 4B",
    area: "Gulshan",
    city: "Dhaka",
    postalCode: "1212",
    country: "Bangladesh",
    phone: "+880 1712-345678",
  });

  const baseSubtotal = brandGroup.subtotalValue;
  const discountAmount = appliedDiscount ? Math.round(baseSubtotal * appliedDiscount) : 0;
  const shippingFee = 0; // Free shipping
  const totalValue = Math.max(0, baseSubtotal - discountAmount + shippingFee);

  const formatCurrency = (amount: number) => {
    return `${brandGroup.currencySymbol}${amount.toLocaleString()}.00`;
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    const code = discountCode.trim().toUpperCase();
    if (code === "SAVE10" || code === "SHOP10" || code === "FNF") {
      setAppliedDiscount(0.1); // 10% off
      setDiscountSuccess("10% discount applied!");
      setDiscountError("");
    } else {
      setDiscountError("Invalid discount code. Try 'SAVE10'");
      setDiscountSuccess("");
    }
  };

  const handleContinueWithShop = () => {
    setIsProcessingShop(true);
    setTimeout(() => {
      setIsProcessingShop(false);
      setEmail("jane.morgan@example.com");
      setStep("signedin");
    }, 450);
  };

  const handlePasskey = () => {
    setIsProcessingPasskey(true);
    setTimeout(() => {
      setIsProcessingPasskey(false);
      setEmail("jane.morgan@example.com");
      setStep("signedin");
    }, 500);
  };

  const handleCompleteOrder = () => {
    setStep("success");
  };

  const paymentMethodLabel = {
    cod: "Cash on delivery",
    bkash: "bKash",
    nagad: "Nagad",
    rocket: "Rocket",
    card: "Card",
    bank: "Bank transfer",
  }[paymentMethod];

  const paymentOptions = [
    {
      id: "cod" as const,
      label: "Cash on delivery",
      description: "Pay in cash when your parcel arrives",
      icon: Banknote,
    },
    {
      id: "bkash" as const,
      label: "bKash",
      description: "Pay securely with your bKash account",
      icon: Smartphone,
    },
    {
      id: "nagad" as const,
      label: "Nagad",
      description: "Pay securely with your Nagad account",
      icon: Smartphone,
    },
    {
      id: "rocket" as const,
      label: "Rocket",
      description: "Pay securely with your Rocket account",
      icon: Smartphone,
    },
    {
      id: "card" as const,
      label: "Credit or debit card",
      description: "Visa, Mastercard, Amex and local cards",
      icon: CreditCard,
    },
    {
      id: "bank" as const,
      label: "Bank transfer",
      description: "Pay through your bank using the order reference",
      icon: Building2,
    },
  ];

  const primaryItem = brandGroup.items?.[0] || {
    id: "default-item",
    productId: brandGroup.productId || "womens-ribbed-henley-tan",
    title: brandGroup.productTitle,
    variant: brandGroup.variant || "LARGE",
    unitPriceFormatted: brandGroup.subtotal,
    quantity: brandGroup.quantity,
    imageUrl: brandGroup.imageUrl,
  };

  const productHref = `/product/${primaryItem.productId || brandGroup.productId || "womens-ribbed-henley-tan"}`;

  return (
    <PageContainer
      fullHeight
      maxWidth="full"
      className="h-auto min-h-full overflow-y-auto overscroll-contain lg:h-full lg:overflow-hidden"
    >
      {/* Mobile Top Collapsible Order Summary Bar */}
      <div className="lg:hidden border-b border-border/80 bg-surface-secondary/50 px-4 py-3.5 shrink-0">
        <button
          type="button"
          onClick={() => setShowMobileSummary(!showMobileSummary)}
          className="w-full flex items-center justify-between text-sm font-medium text-foreground cursor-pointer"
        >
          <div className="flex items-center gap-2 text-accent font-semibold">
            <ShoppingBag className="size-4.5" />
            <span>{showMobileSummary ? "Hide order summary" : "Show order summary"}</span>
            {showMobileSummary ? (
              <ChevronUp className="size-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="size-4 stroke-[2.5]" />
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted">{brandGroup.currencyCode}</span>
            <span className="font-bold text-base text-foreground">{formatCurrency(totalValue)}</span>
          </div>
        </button>

        {showMobileSummary && (
          <div className="mt-3.5 pt-3.5 border-t border-border/60 flex flex-col gap-3.5">
            {/* Clickable Product Detail in mobile summary */}
            <div className="flex items-center justify-between gap-3">
              <Link
                href={productHref}
                className="flex items-center gap-3.5 group no-underline"
              >
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 z-10 size-5 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    {primaryItem.quantity}
                  </span>
                  <div className="size-14 rounded-xl overflow-hidden bg-surface border border-border/60 group-hover:scale-102 transition-transform">
                    <img
                      src={primaryItem.imageUrl}
                      alt={primaryItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                    {primaryItem.title}
                  </span>
                  <span className="text-xs text-muted uppercase mt-0.5">
                    {primaryItem.variant}
                  </span>
                </div>
              </Link>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {/* Discount row */}
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 h-10 px-3.5 rounded-xl border border-border/80 bg-surface text-foreground text-xs sm:text-sm outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="h-10 px-4 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800 text-foreground text-xs sm:text-sm font-semibold"
              >
                Apply
              </button>
            </div>

            {/* Cost breakdown */}
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatCurrency(baseSubtotal)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (10% off)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border/60">
                <span>Total</span>
                <span>{formatCurrency(totalValue)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Split Layout - Fits screen height without scrolling */}
      <div className="flex-1 w-full max-w-none mx-auto grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-full min-h-0 items-start lg:items-center overflow-visible lg:overflow-hidden">
        {/* Left Column: Sign In or Signed-In Flow */}
        <div className="h-auto lg:h-full flex flex-col justify-start lg:justify-center items-center lg:items-end px-4 sm:px-10 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-visible lg:overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col items-center my-auto">
            {/* Merchant Header Bar */}
            <div className="flex items-center justify-between w-full pb-3 mb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "size-7.5 rounded-full flex items-center justify-center font-bold text-[8px] uppercase tracking-tighter shrink-0 border border-border/70",
                    brandGroup.brandAvatarBg || "bg-black",
                    brandGroup.brandAvatarTextColor || "text-white"
                  )}
                >
                  <span className="truncate px-0.5 text-center leading-tight">
                    {brandGroup.brandAvatarText}
                  </span>
                </div>
                <span className="text-sm font-bold text-foreground uppercase tracking-wide">
                  {brandGroup.brand}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                <Lock className="size-3.5 text-emerald-600" />
                <span>Shop Pay · 256-bit SSL</span>
              </div>
            </div>

            {/* 1. Sign In Step */}
            {step === "signin" && (
              <div className="w-full flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight text-center">
                  Sign in
                </h1>
                <p className="text-xs sm:text-sm text-muted text-center mt-1 font-normal">
                  Or create an account
                </p>

                <div className="mt-5 w-full flex flex-col gap-2.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-surface-secondary border border-transparent focus:border-accent focus:bg-surface text-foreground text-sm placeholder:text-muted outline-none transition-all shadow-2xs"
                  />

                  <button
                    type="button"
                    onClick={handleContinueWithShop}
                    disabled={isProcessingShop}
                    className="w-full h-11 rounded-full bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-75"
                  >
                    {isProcessingShop ? (
                      <span className="text-xs sm:text-sm">Connecting...</span>
                    ) : (
                      <>
                        <span>Continue with</span>
                        <span className="font-extrabold text-base tracking-tight italic lowercase">
                          shop
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePasskey}
                    disabled={isProcessingPasskey}
                    className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-foreground hover:opacity-80 transition-opacity mt-1 cursor-pointer disabled:opacity-60"
                  >
                    <Key className="size-4 stroke-[2] text-foreground" />
                    <span>
                      {isProcessingPasskey ? "Authenticating passkey..." : "Use a passkey"}
                    </span>
                  </button>

                  <p className="text-xs text-muted text-center leading-relaxed mt-3 px-1 font-normal">
                    By continuing, you agree to Shop&apos;s{" "}
                    <a href="#" className="underline hover:text-foreground">
                      terms
                    </a>
                    ,{" "}
                    <a href="#" className="underline hover:text-foreground">
                      privacy policy
                    </a>
                    , and to sharing your name and email with {brandGroup.brand}. See their{" "}
                    <a href="#" className="underline hover:text-foreground">
                      terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-foreground">
                      privacy policy
                    </a>
                    .
                  </p>

                  <div className="mt-4 text-center flex items-center justify-center gap-2.5">
                    <Link
                      href="/cart"
                      className="text-xs font-medium text-accent hover:underline cursor-pointer"
                    >
                      Back
                    </Link>
                    <span className="text-muted/40">·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("jane.morgan@example.com");
                        setStep("signedin");
                      }}
                      className="text-xs font-medium text-muted hover:text-foreground underline cursor-pointer"
                    >
                      View signed in
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Signed-In User Checkout View */}
            {step === "signedin" && (
              <div className="w-full flex flex-col gap-4">
                {/* Account / Contact Card */}
                <div className="p-4 rounded-xl border border-border/80 bg-surface flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-accent/15 text-accent font-bold text-xs flex items-center justify-center">
                      JM
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        Jane Morgan
                      </span>
                      <span className="text-xs text-muted">
                        {email || "jane.morgan@example.com"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("signin")}
                    className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>

                {/* Delivery Information Card */}
                <div className="p-4 rounded-xl border border-border/80 bg-surface flex flex-col gap-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                      <MapPin className="size-3.5 text-muted" />
                      <span>Ship to</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-xs text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex flex-col text-sm text-muted leading-relaxed pl-5.5">
                    <span className="font-semibold text-foreground">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </span>
                    <span>{shippingAddress.address}</span>
                    <span>
                      {shippingAddress.area}, {shippingAddress.city}, {shippingAddress.postalCode}
                    </span>
                    <span className="text-muted/80 mt-0.5">{shippingAddress.phone}</span>
                  </div>

                  {/* Delivery Method line */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-sm pl-5.5">
                    <div className="flex items-center gap-2">
                      <Truck className="size-3 text-muted" />
                      <span className="font-medium text-foreground">Standard Delivery (2–4 days)</span>
                    </div>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                </div>

                {/* Payment Information Card */}
                <div className="p-4 rounded-xl border border-border/80 bg-surface flex flex-col gap-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                      <CreditCard className="size-3.5 text-muted" />
                      <span>Payment</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("payment")}
                      className="text-xs text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm pl-5.5">
                    <div className="flex items-center gap-2">
                      <div className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-extrabold text-[9px] tracking-tight">
                        {paymentMethod === "cod" ? "COD" : paymentMethodLabel.toUpperCase()}
                      </div>
                      <span className="text-foreground font-medium">
                        {paymentMethod === "cod"
                          ? "Pay when your order arrives"
                          : paymentMethod === "card"
                            ? "VISA ending in 4242"
                            : "Payment selected at checkout"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center gap-2 text-sm text-muted pl-5.5">
                    <Check className="size-3 text-emerald-600 stroke-[3]" />
                    <span>
                      {paymentMethod === "cod"
                        ? "No payment is collected until delivery"
                        : "Billing address same as shipping address"}
                    </span>
                  </div>
                </div>

                {/* SMS Updates Checkbox */}
                <label className="flex items-center gap-2 text-sm text-muted cursor-pointer select-none px-0.5">
                  <input
                    type="checkbox"
                    checked={optInSms}
                    onChange={(e) => setOptInSms(e.target.checked)}
                    className="size-3.5 rounded accent-accent cursor-pointer"
                  />
                  <span>Text me with delivery and order updates</span>
                </label>

                {/* Primary Pay Action Button */}
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="w-full h-12 rounded-full bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground font-semibold text-base transition-all shadow-xs cursor-pointer mt-1 flex items-center justify-center gap-2"
                >
                  <Lock className="size-3.5" />
                  <span>
                    {paymentMethod === "cod" ? "Place order" : `Pay ${formatCurrency(totalValue)}`}
                  </span>
                </button>

                {/* Return & Policies Footer */}
                <div className="flex flex-col items-center gap-2 text-center pt-1">
                  <Link
                    href="/cart"
                    className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    Return to cart
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted/70">
                    <a href="#" className="hover:text-foreground">Refund policy</a>
                    <span>·</span>
                    <a href="#" className="hover:text-foreground">Shipping</a>
                    <span>·</span>
                    <a href="#" className="hover:text-foreground">Privacy</a>
                    <span>·</span>
                    <a href="#" className="hover:text-foreground">Terms</a>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Shipping Step */}
            {step === "shipping" && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">Edit Shipping Address</h2>
                  <button
                    type="button"
                    onClick={() => setStep("signedin")}
                    className="text-xs sm:text-sm text-accent hover:underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="First name"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                      }
                      className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                      }
                      className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address: e.target.value })
                    }
                    className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile number (e.g. 01XXXXXXXXX)"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, phone: e.target.value })
                    }
                    className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Area / thana"
                      value={shippingAddress.area}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, area: e.target.value })
                      }
                      className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                      className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("signedin")}
                  className="w-full h-11.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm transition-all shadow-xs mt-1"
                >
                  Save & return
                </button>
              </div>
            )}

            {/* 4. Payment Step */}
            {step === "payment" && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-muted">
                    <Lock className="size-4 text-emerald-600" /> Secure
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = paymentMethod === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setPaymentMethod(option.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer",
                          isSelected
                            ? "border-accent bg-accent/5"
                            : "border-border bg-surface hover:bg-surface-secondary",
                        )}
                      >
                        <span
                          className={cn(
                            "size-8 rounded-full flex items-center justify-center shrink-0",
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "bg-surface-secondary text-muted",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-semibold text-foreground">
                            {option.label}
                          </span>
                          <span className="text-xs text-muted leading-snug">
                            {option.description}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "size-4 rounded-full border flex items-center justify-center shrink-0",
                            isSelected ? "border-accent" : "border-border",
                          )}
                        >
                          {isSelected && <span className="size-2 rounded-full bg-accent" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "cod" && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">
                    Please keep {formatCurrency(totalValue)} ready in cash. Our delivery partner may not be able to provide change.
                  </div>
                )}

                {paymentMethod === "bkash" ||
                  paymentMethod === "nagad" ||
                  paymentMethod === "rocket" ? (
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border flex flex-col gap-2">
                    <p className="text-xs text-muted leading-relaxed">
                      You will be redirected to the secure {paymentMethodLabel} payment flow. Never share your wallet PIN or OTP with anyone.
                    </p>
                    <input
                      type="tel"
                      placeholder="Wallet mobile number"
                      defaultValue={shippingAddress.phone}
                      className="h-10 px-3.5 rounded-lg border border-border bg-surface text-sm outline-none focus:border-accent"
                    />
                  </div>
                ) : null}

                {paymentMethod === "card" && (
                  <div className="p-3 rounded-xl border border-border bg-surface flex flex-col gap-2.5">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="h-10 px-3.5 rounded-lg border border-border bg-surface-secondary text-sm outline-none focus:border-accent"
                    />
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="h-10 px-3.5 rounded-lg border border-border bg-surface-secondary text-sm outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="h-10 px-3.5 rounded-lg border border-border bg-surface-secondary text-sm outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border text-xs text-muted leading-relaxed">
                    After placing the order, transfer the total to the merchant account using your order reference. Your order ships after the transfer is verified.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep("signedin")}
                  className="w-full h-11.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm transition-all shadow-xs mt-1"
                >
                  Save payment method
                </button>
              </div>
            )}

            {/* 5. Success Step */}
            {step === "success" && (
              <div className="w-full flex flex-col items-center text-center gap-3.5 py-6">
                <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Check className="size-8 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  Thank you for your order!
                </h2>
                <p className="text-sm text-muted max-w-sm leading-relaxed">
                  Confirmation email sent to{" "}
                  <span className="font-semibold text-foreground">
                    {email || "jane.morgan@example.com"}
                  </span>
                  . Your order with {brandGroup.brand} is confirmed.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <Link
                    href="/"
                    className="flex-1 py-3 px-5 rounded-full bg-accent text-accent-foreground font-bold text-sm text-center no-underline hover:bg-accent/90"
                  >
                    Continue shopping
                  </Link>
                  <Link
                    href="/cart"
                    className="flex-1 py-3 px-5 rounded-full bg-surface-secondary text-foreground font-bold text-sm text-center no-underline hover:opacity-90 border border-border"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary with Clickable Product View */}
        <div className="hidden lg:flex lg:min-h-full border-l border-border/70 bg-surface-secondary/40 flex-col items-start justify-center py-8 px-4 sm:px-10 lg:px-8 xl:px-10 overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col gap-5 my-auto">
            {/* Clickable Product Line Item linking to Product View */}
            <div className="flex items-start justify-between gap-3.5">
              <Link
                href={productHref}
                className="flex items-start gap-3.5 min-w-0 group no-underline"
                title="View product details"
              >
                {/* Thumbnail with quantity badge */}
                <div className="relative shrink-0">
                  <span className="absolute -top-2 -right-2 z-10 size-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    {primaryItem.quantity}
                  </span>
                  <div className="size-16 rounded-xl overflow-hidden bg-surface-secondary border border-border/60 group-hover:scale-102 group-hover:border-foreground/30 transition-all">
                    <img
                      src={primaryItem.imageUrl}
                      alt={primaryItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Product Title & Variant with hover affordance */}
                <div className="flex flex-col pt-0.5 min-w-0">
                  <span className="text-sm font-bold text-foreground uppercase tracking-tight leading-snug truncate group-hover:text-accent transition-colors flex items-center gap-1">
                    {primaryItem.title}
                    <ExternalLink className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </span>
                  <span className="text-xs text-muted uppercase mt-0.5 font-medium">
                    {primaryItem.variant}
                  </span>
                </div>
              </Link>

              {/* Price */}
              <span className="text-sm font-semibold text-foreground whitespace-nowrap pt-0.5">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {/* Discount Code Input Box */}
            <div className="flex flex-col gap-1.5 pt-0.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()}
                  className="flex-1 h-10 px-3.5 rounded-xl border border-border/80 bg-surface text-foreground text-xs sm:text-sm placeholder:text-muted outline-none focus:border-blue-500 transition-colors shadow-2xs"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="h-10 px-4 rounded-xl bg-surface-secondary hover:bg-surface-tertiary text-foreground text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>

              {discountError && (
                <span className="text-xs text-red-500 font-medium">{discountError}</span>
              )}
              {discountSuccess && (
                <span className="text-xs text-emerald-600 font-medium">
                  {discountSuccess}
                </span>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="flex flex-col gap-3 pt-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted font-normal">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(baseSubtotal)}
                </span>
              </div>

              {appliedDiscount && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Discount (10% off)</span>
                  <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted">
                  <span>Shipping</span>
                  <Info className="size-3 text-muted/60" />
                </div>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted font-normal">Estimated taxes</span>
                <span className="text-xs text-muted">Included in price</span>
              </div>
            </div>

            {/* Total Row */}
            <div className="flex items-baseline justify-between pt-3 border-t border-border/70">
              <span className="text-base sm:text-lg font-bold text-foreground">Total</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-muted font-normal">
                  {brandGroup.currencyCode}
                </span>
                <span className="text-xl font-bold text-foreground tracking-tight">
                  {formatCurrency(totalValue)}
                </span>
              </div>
            </div>

            {/* Trust Assurance Section */}
            <div className="pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>Shop Guarantee · 30-day free returns and buyer protection</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
