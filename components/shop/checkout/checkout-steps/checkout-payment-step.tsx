"use client";

import React from "react";
import {
  Banknote,
  Building2,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";
import { cn } from "@heroui/react";
import type { PaymentMethodId, PaymentOption } from "../types";

export interface CheckoutPaymentStepProps {
  readonly paymentMethod: PaymentMethodId;
  readonly onSelectPaymentMethod: (id: PaymentMethodId) => void;
  readonly totalValueFormatted: string;
  readonly phone: string;
  readonly onSavePaymentMethod: () => void;
}

const PAYMENT_OPTIONS: readonly PaymentOption[] = [
  {
    id: "cod",
    label: "Cash on delivery",
    description: "Pay in cash when your parcel arrives",
    icon: Banknote,
  },
  {
    id: "bkash",
    label: "bKash",
    description: "Pay securely with your bKash account",
    icon: Smartphone,
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Pay securely with your Nagad account",
    icon: Smartphone,
  },
  {
    id: "rocket",
    label: "Rocket",
    description: "Pay securely with your Rocket account",
    icon: Smartphone,
  },
  {
    id: "card",
    label: "Credit or debit card",
    description: "Visa, Mastercard, Amex and local cards",
    icon: CreditCard,
  },
  {
    id: "bank",
    label: "Bank transfer",
    description: "Pay through your bank using the order reference",
    icon: Building2,
  },
];

export function CheckoutPaymentStep({
  paymentMethod,
  onSelectPaymentMethod,
  totalValueFormatted,
  phone,
  onSavePaymentMethod,
}: CheckoutPaymentStepProps) {
  const selectedOption = PAYMENT_OPTIONS.find((o) => o.id === paymentMethod);
  const paymentMethodLabel = selectedOption?.label ?? "Selected payment";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
        <span className="flex items-center gap-1 text-xs sm:text-sm text-muted">
          <Lock className="size-4 text-success" /> Secure
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectPaymentMethod(option.id)}
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
                {isSelected && (
                  <span className="size-2 rounded-full bg-accent" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {paymentMethod === "cod" && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">
          Please keep {totalValueFormatted} ready in cash. Our delivery partner
          may not be able to provide change.
        </div>
      )}

      {(paymentMethod === "bkash" ||
        paymentMethod === "nagad" ||
        paymentMethod === "rocket") && (
        <div className="p-3 rounded-xl bg-surface-secondary border border-border flex flex-col gap-2">
          <p className="text-xs text-muted leading-relaxed">
            You will be redirected to the secure {paymentMethodLabel} payment
            flow. Never share your wallet PIN or OTP with anyone.
          </p>
          <input
            type="tel"
            placeholder="Wallet mobile number"
            defaultValue={phone}
            className="h-10 px-3.5 rounded-lg border border-border bg-surface text-sm outline-none focus:border-accent"
          />
        </div>
      )}

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
          After placing the order, transfer the total to the merchant account
          using your order reference. Your order ships after the transfer is
          verified.
        </div>
      )}

      <button
        type="button"
        onClick={onSavePaymentMethod}
        className="w-full h-11.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm transition-all shadow-xs mt-1 cursor-pointer"
      >
        Save payment method
      </button>
    </div>
  );
}
