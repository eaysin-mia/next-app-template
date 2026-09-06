"use client";

import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@heroui/react";
import { PageContainer } from "../page-container";
import type { CheckoutViewProps } from "./types";
import { useCheckout } from "./hooks/use-checkout";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import { CheckoutContactStep } from "./checkout-steps/checkout-contact-step";
import { CheckoutSignedInStep } from "./checkout-steps/checkout-signed-in-step";
import { CheckoutShippingStep } from "./checkout-steps/checkout-shipping-step";
import { CheckoutPaymentStep } from "./checkout-steps/checkout-payment-step";
import { CheckoutSuccessStep } from "./checkout-steps/checkout-success-step";

export function CheckoutView({ initialBrandId }: CheckoutViewProps) {
  const {
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
    totalValue,
    formatCurrency,
    handleApplyDiscount,
    handleContinueWithShop,
    handlePasskey,
    handleCompleteOrder,
  } = useCheckout({ initialBrandId });

  const totalValueFormatted = formatCurrency(totalValue);

  return (
    <PageContainer
      fullHeight
      maxWidth="full"
      className="h-auto min-h-full overflow-y-auto overscroll-contain lg:h-full lg:overflow-hidden"
    >
      {/* Mobile Top Collapsible Order Summary Bar */}
      <CheckoutOrderSummary
        brandGroup={brandGroup}
        discountCode={discountCode}
        onDiscountCodeChange={setDiscountCode}
        onApplyDiscount={handleApplyDiscount}
        discountError={discountError}
        discountSuccess={discountSuccess}
        appliedDiscount={appliedDiscount}
        discountAmount={discountAmount}
        baseSubtotal={baseSubtotal}
        totalValue={totalValue}
        formatCurrency={formatCurrency}
        showMobileSummary={showMobileSummary}
        onToggleMobileSummary={() => setShowMobileSummary(!showMobileSummary)}
      />

      {/* Main 2-Column Split Layout */}
      <div className="flex-1 w-full max-w-none mx-auto grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-full min-h-0 items-start lg:items-center overflow-visible lg:overflow-hidden">
        <div className="h-auto lg:h-full flex flex-col justify-start lg:justify-center items-center lg:items-end px-4 sm:px-10 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-visible lg:overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col items-center my-auto">
            {/* Merchant Header Bar */}
            <div className="flex items-center justify-between w-full pb-3 mb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "size-7.5 rounded-full flex items-center justify-center font-bold text-[8px] uppercase tracking-tighter shrink-0 border border-border/70",
                    brandGroup.brandAvatarBg ?? "bg-foreground",
                    brandGroup.brandAvatarTextColor ?? "text-background",
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
                <Lock className="size-3.5 text-success" />
                <span>Shop Pay · 256-bit SSL</span>
              </div>
            </div>

            {/* Dynamic Step Rendering */}
            {step === "signin" && (
              <CheckoutContactStep
                brandName={brandGroup.brand}
                email={email}
                onEmailChange={setEmail}
                isProcessingShop={isProcessingShop}
                onContinueWithShop={handleContinueWithShop}
                isProcessingPasskey={isProcessingPasskey}
                onPasskey={handlePasskey}
                onViewSignedIn={() => {
                  setEmail("jane.morgan@example.com");
                  setStep("signedin");
                }}
              />
            )}

            {step === "signedin" && (
              <CheckoutSignedInStep
                email={email}
                shippingAddress={shippingAddress}
                paymentMethod={paymentMethod}
                totalValueFormatted={totalValueFormatted}
                optInSms={optInSms}
                onOptInSmsChange={setOptInSms}
                onSignOut={() => setStep("signin")}
                onChangeShipping={() => setStep("shipping")}
                onChangePayment={() => setStep("payment")}
                onCompleteOrder={handleCompleteOrder}
              />
            )}

            {step === "shipping" && (
              <CheckoutShippingStep
                shippingAddress={shippingAddress}
                onShippingAddressChange={setShippingAddress}
                onSaveAndReturn={() => setStep("signedin")}
                onCancel={() => setStep("signedin")}
              />
            )}

            {step === "payment" && (
              <CheckoutPaymentStep
                paymentMethod={paymentMethod}
                onSelectPaymentMethod={setPaymentMethod}
                totalValueFormatted={totalValueFormatted}
                phone={shippingAddress.phone}
                onSavePaymentMethod={() => setStep("signedin")}
              />
            )}

            {step === "success" && (
              <CheckoutSuccessStep
                email={email}
                brandName={brandGroup.brand}
              />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
