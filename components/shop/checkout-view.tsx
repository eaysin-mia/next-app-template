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
} from "lucide-react";
import { cn } from "@heroui/react";
import { IN_YOUR_CART_ITEMS } from "./data/cart-data";
import type { CartBrandGroup } from "./data/cart-data";

export interface CheckoutViewProps {
  initialBrandId?: string;
}

export function CheckoutView({ initialBrandId }: CheckoutViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") || initialBrandId || "cart-flag-nor-fail";

  // Selected brand group from cart data or fallback to FLAG NOR FAIL
  const brandGroup: CartBrandGroup =
    IN_YOUR_CART_ITEMS.find((b) => b.id === brandParam) || IN_YOUR_CART_ITEMS[0];

  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Checkout multi-step state: signin | signedin | shipping | payment | success
  const [step, setStep] = useState<"signin" | "signedin" | "shipping" | "payment" | "success">("signin");
  const [isProcessingPasskey, setIsProcessingPasskey] = useState(false);
  const [isProcessingShop, setIsProcessingShop] = useState(false);

  // Shipping form fields
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "Jane",
    lastName: "Morgan",
    address: "123 Fashion Blvd",
    city: "Dhaka",
    postalCode: "1212",
    country: "Bangladesh",
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
    }, 500);
  };

  const handlePasskey = () => {
    setIsProcessingPasskey(true);
    setTimeout(() => {
      setIsProcessingPasskey(false);
      setEmail("jane.morgan@example.com");
      setStep("signedin");
    }, 600);
  };

  const handleCompleteOrder = () => {
    setStep("success");
  };

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
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden bg-surface select-none">
      {/* Mobile Top Collapsible Order Summary Bar */}
      <div className="lg:hidden border-b border-border/80 bg-surface-secondary/50 px-4 py-3 shrink-0">
        <button
          type="button"
          onClick={() => setShowMobileSummary(!showMobileSummary)}
          className="w-full flex items-center justify-between text-xs sm:text-sm font-medium text-foreground cursor-pointer"
        >
          <div className="flex items-center gap-2 text-[#2f5cf6] font-semibold">
            <ShoppingBag className="size-4" />
            <span>{showMobileSummary ? "Hide order summary" : "Show order summary"}</span>
            {showMobileSummary ? (
              <ChevronUp className="size-3.5 stroke-[2.5]" />
            ) : (
              <ChevronDown className="size-3.5 stroke-[2.5]" />
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-muted">{brandGroup.currencyCode}</span>
            <span className="font-bold text-foreground">{formatCurrency(totalValue)}</span>
          </div>
        </button>

        {showMobileSummary && (
          <div className="mt-3 pt-3 border-t border-border/60 flex flex-col gap-3">
            {/* Clickable Product Detail in mobile summary */}
            <div className="flex items-center justify-between gap-3">
              <Link
                href={productHref}
                className="flex items-center gap-3 group no-underline"
              >
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 z-10 size-4.5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {primaryItem.quantity}
                  </span>
                  <div className="size-12 rounded-xl overflow-hidden bg-surface border border-border/60 group-hover:scale-102 transition-transform">
                    <img
                      src={primaryItem.imageUrl}
                      alt={primaryItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground uppercase tracking-tight group-hover:text-[#2f5cf6] transition-colors">
                    {primaryItem.title}
                  </span>
                  <span className="text-xs text-muted uppercase">
                    {primaryItem.variant}
                  </span>
                </div>
              </Link>
              <span className="text-xs font-semibold text-foreground">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {/* Discount row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg border border-border/80 bg-surface text-foreground text-xs outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                className="h-9 px-3 rounded-lg bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800 text-foreground text-xs font-semibold"
              >
                Apply
              </button>
            </div>

            {/* Cost breakdown */}
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">{formatCurrency(baseSubtotal)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount (10% off)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-1.5 border-t border-border/60">
                <span>Total</span>
                <span>{formatCurrency(totalValue)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Split Layout - Fits screen height without scrolling */}
      <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 h-full min-h-0 items-center overflow-hidden">
        {/* Left Column: Sign In or Signed-In Flow */}
        <div className="lg:col-span-7 h-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 py-4 sm:py-6 overflow-y-auto">
          <div className="w-full max-w-[380px] flex flex-col items-center my-auto">
            {/* 1. Sign In Step */}
            {step === "signin" && (
              <>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight text-center">
                  Sign in
                </h1>
                <p className="text-xs sm:text-sm text-muted text-center mt-1 font-normal">
                  Or create an account
                </p>

                <div className="mt-6 w-full flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-4 rounded-full bg-[#f4f4f5] dark:bg-zinc-800/80 border border-transparent focus:border-blue-500 focus:bg-surface text-foreground text-sm placeholder:text-muted/80 outline-none transition-all shadow-2xs"
                  />

                  <button
                    type="button"
                    onClick={handleContinueWithShop}
                    disabled={isProcessingShop}
                    className="w-full h-11 rounded-full bg-[#2f5cf6] hover:bg-[#254edb] active:scale-[0.99] text-white font-medium text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-75"
                  >
                    {isProcessingShop ? (
                      <span className="text-xs">Connecting...</span>
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
                    className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:opacity-80 transition-opacity mt-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Key className="size-4 stroke-[2.2] text-foreground" />
                    <span>
                      {isProcessingPasskey ? "Authenticating passkey..." : "Use a passkey"}
                    </span>
                  </button>

                  <p className="text-xs text-muted text-center leading-relaxed mt-4 px-1 font-normal">
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

                  <div className="mt-5 text-center flex items-center justify-center gap-4">
                    <Link
                      href="/cart"
                      className="text-xs font-medium text-[#2f5cf6] hover:underline cursor-pointer"
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
              </>
            )}

            {/* 2. Signed-In User Checkout View */}
            {step === "signedin" && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">Account</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">
                      {email || "jane.morgan@example.com"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("signin")}
                    className="text-xs font-medium text-[#2f5cf6] hover:underline cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>

                {/* Delivery Information Card */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-surface flex flex-col gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Ship to
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-xs text-[#2f5cf6] hover:underline font-medium cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex flex-col text-xs text-muted leading-tight">
                    <span className="font-semibold text-foreground">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </span>
                    <span>{shippingAddress.address}</span>
                    <span>
                      {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                    </span>
                  </div>
                </div>

                {/* Delivery Method Card */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-surface flex items-center justify-between shadow-xs text-xs">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">Standard Delivery</span>
                    <span className="text-muted">Estimated 2-4 business days</span>
                  </div>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>

                {/* Payment Information Card */}
                <div className="p-3.5 rounded-xl border border-border/80 bg-surface flex flex-col gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Payment
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("payment")}
                      className="text-xs text-[#2f5cf6] hover:underline font-medium cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] tracking-tight">
                      SHOP PAY
                    </div>
                    <span className="text-foreground font-medium">VISA ending in 4242</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="w-full h-11 rounded-full bg-[#2f5cf6] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer mt-1"
                >
                  Pay {formatCurrency(totalValue)}
                </button>

                <div className="text-center pt-1">
                  <Link
                    href="/cart"
                    className="text-xs font-medium text-muted hover:text-foreground cursor-pointer"
                  >
                    Return to cart
                  </Link>
                </div>
              </div>
            )}

            {/* 3. Shipping Step */}
            {step === "shipping" && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Shipping Address</h2>
                  <button
                    type="button"
                    onClick={() => setStep("signedin")}
                    className="text-xs text-[#2f5cf6] hover:underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="First name"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                      }
                      className="h-10 px-3 rounded-xl border border-border bg-surface text-xs outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                      }
                      className="h-10 px-3 rounded-xl border border-border bg-surface text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address: e.target.value })
                    }
                    className="h-10 px-3 rounded-xl border border-border bg-surface text-xs outline-none focus:border-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      className="h-10 px-3 rounded-xl border border-border bg-surface text-xs outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                      className="h-10 px-3 rounded-xl border border-border bg-surface text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("signedin")}
                  className="w-full h-11 rounded-full bg-[#2f5cf6] hover:bg-[#254edb] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs mt-1"
                >
                  Save & return
                </button>
              </div>
            )}

            {/* 4. Payment Step */}
            {step === "payment" && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Payment Method</h2>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Lock className="size-3.5 text-emerald-600" /> Secure
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                      <CreditCard className="size-4 text-[#2f5cf6]" /> Credit / Debit Card
                    </span>
                    <span className="text-xs font-bold text-blue-600">Selected</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Card number"
                    defaultValue="•••• •••• •••• 4242"
                    className="h-9 px-3 rounded-lg border border-border bg-surface text-xs outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="12/28"
                      className="h-9 px-3 rounded-lg border border-border bg-surface text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      defaultValue="737"
                      className="h-9 px-3 rounded-lg border border-border bg-surface text-xs outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("signedin")}
                  className="w-full h-11 rounded-full bg-[#2f5cf6] hover:bg-[#254edb] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs mt-1"
                >
                  Save payment method
                </button>
              </div>
            )}

            {/* 5. Success Step */}
            {step === "success" && (
              <div className="w-full flex flex-col items-center text-center gap-3 py-4">
                <div className="size-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Check className="size-7 stroke-[2.5]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Thank you for your order!
                </h2>
                <p className="text-xs text-muted max-w-xs">
                  Confirmation email sent to{" "}
                  <span className="font-semibold text-foreground">
                    {email || "jane.morgan@example.com"}
                  </span>
                  .
                </p>
                <div className="mt-3 flex flex-col sm:flex-row gap-2.5 w-full">
                  <Link
                    href="/"
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#2f5cf6] text-white font-semibold text-xs text-center no-underline hover:bg-[#254edb]"
                  >
                    Continue shopping
                  </Link>
                  <Link
                    href="/cart"
                    className="flex-1 py-2.5 px-4 rounded-full bg-surface-secondary text-foreground font-semibold text-xs text-center no-underline hover:opacity-90 border border-border"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary with Clickable Product View */}
        <div className="hidden lg:flex lg:col-span-5 h-full border-l border-border/70 bg-[#fafafa]/50 dark:bg-zinc-900/30 flex-col justify-center py-6 px-10 xl:px-12 overflow-y-auto">
          <div className="w-full max-w-[390px] flex flex-col gap-5 my-auto">
            {/* Clickable Product Line Item linking to Product View */}
            <div className="flex items-start justify-between gap-4">
              <Link
                href={productHref}
                className="flex items-start gap-3.5 min-w-0 group no-underline"
                title="View product details"
              >
                {/* Thumbnail with quantity badge */}
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 z-10 size-4.5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
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
                  <span className="text-xs font-bold text-foreground uppercase tracking-tight leading-snug truncate group-hover:text-[#2f5cf6] transition-colors flex items-center gap-1">
                    {primaryItem.title}
                    <ExternalLink className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </span>
                  <span className="text-xs text-muted uppercase mt-0.5">
                    {primaryItem.variant}
                  </span>
                </div>
              </Link>

              {/* Price */}
              <span className="text-xs font-semibold text-foreground whitespace-nowrap pt-0.5">
                {formatCurrency(baseSubtotal)}
              </span>
            </div>

            {/* Discount Code Input Box */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()}
                  className="flex-1 h-10 px-3.5 rounded-xl border border-border/80 bg-surface text-foreground text-xs placeholder:text-muted outline-none focus:border-blue-500 transition-colors shadow-2xs"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="h-10 px-4 rounded-xl bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-zinc-800 text-foreground text-xs font-semibold transition-colors cursor-pointer shrink-0"
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
            <div className="flex flex-col gap-2.5 pt-1 text-xs sm:text-sm">
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
                <div className="flex items-center gap-1 text-muted">
                  <span>Shipping</span>
                  <Info className="size-3 text-muted/60" />
                </div>
                <span className="text-muted text-xs">Enter shipping address</span>
              </div>
            </div>

            {/* Total Row */}
            <div className="flex items-baseline justify-between pt-3 border-t border-border/70">
              <span className="text-sm font-bold text-foreground">Total</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-muted font-normal">
                  {brandGroup.currencyCode}
                </span>
                <span className="text-lg font-black text-foreground tracking-tight">
                  {formatCurrency(totalValue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
