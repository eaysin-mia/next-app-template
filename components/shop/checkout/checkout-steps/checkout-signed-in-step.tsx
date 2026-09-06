"use client";

import React from "react";
import Link from "next/link";
import { Check, CreditCard, Lock, MapPin, Truck } from "lucide-react";
import type { PaymentMethodId, ShippingAddress } from "../types";

export interface CheckoutSignedInStepProps {
  readonly email: string;
  readonly shippingAddress: ShippingAddress;
  readonly paymentMethod: PaymentMethodId;
  readonly totalValueFormatted: string;
  readonly optInSms: boolean;
  readonly onOptInSmsChange: (checked: boolean) => void;
  readonly onSignOut: () => void;
  readonly onChangeShipping: () => void;
  readonly onChangePayment: () => void;
  readonly onCompleteOrder: () => void;
}

export function CheckoutSignedInStep({
  email,
  shippingAddress,
  paymentMethod,
  totalValueFormatted,
  optInSms,
  onOptInSmsChange,
  onSignOut,
  onChangeShipping,
  onChangePayment,
  onCompleteOrder,
}: CheckoutSignedInStepProps) {
  const isCod = paymentMethod === "cod";
  const displayEmail =
    email.trim().length > 0 ? email : "jane.morgan@example.com";

  return (
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
            <span className="text-xs text-muted">{displayEmail}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
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
            onClick={onChangeShipping}
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
            {shippingAddress.area}, {shippingAddress.city},{" "}
            {shippingAddress.postalCode}
          </span>
          <span className="text-muted/80 mt-0.5">{shippingAddress.phone}</span>
        </div>

        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-sm pl-5.5">
          <div className="flex items-center gap-2">
            <Truck className="size-3 text-muted" />
            <span className="font-medium text-foreground">
              Standard Delivery (2–4 days)
            </span>
          </div>
          <span className="font-semibold text-success">Free</span>
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
            onClick={onChangePayment}
            className="text-xs text-accent hover:underline font-semibold cursor-pointer"
          >
            Change
          </button>
        </div>

        <div className="flex items-center justify-between text-sm pl-5.5">
          <div className="flex items-center gap-2">
            <div className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-extrabold text-[9px] tracking-tight">
              {isCod ? "COD" : paymentMethod.toUpperCase()}
            </div>
            <span className="text-foreground font-medium">
              {isCod
                ? "Pay when your order arrives"
                : paymentMethod === "card"
                  ? "VISA ending in 4242"
                  : "Payment selected at checkout"}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50 flex items-center gap-2 text-sm text-muted pl-5.5">
          <Check className="size-3 text-success stroke-[3]" />
          <span>
            {isCod
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
          onChange={(e) => onOptInSmsChange(e.target.checked)}
          className="size-3.5 rounded accent-accent cursor-pointer"
        />
        <span>Text me with delivery and order updates</span>
      </label>

      {/* Primary Pay Action Button */}
      <button
        type="button"
        onClick={onCompleteOrder}
        className="w-full h-12 rounded-full bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground font-semibold text-base transition-all shadow-xs cursor-pointer mt-1 flex items-center justify-center gap-2"
      >
        <Lock className="size-3.5" />
        <span>{isCod ? "Place order" : `Pay ${totalValueFormatted}`}</span>
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
          <a href="#" className="hover:text-foreground">
            Refund policy
          </a>
          <span>·</span>
          <a href="#" className="hover:text-foreground">
            Shipping
          </a>
          <span>·</span>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <span>·</span>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}
