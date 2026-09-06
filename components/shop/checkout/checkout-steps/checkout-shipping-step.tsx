"use client";

import React from "react";
import type { ShippingAddress } from "../types";

export interface CheckoutShippingStepProps {
  readonly shippingAddress: ShippingAddress;
  readonly onShippingAddressChange: (address: ShippingAddress) => void;
  readonly onSaveAndReturn: () => void;
  readonly onCancel: () => void;
}

export function CheckoutShippingStep({
  shippingAddress,
  onShippingAddressChange,
  onSaveAndReturn,
  onCancel,
}: CheckoutShippingStepProps) {
  const updateField = (field: keyof ShippingAddress, value: string) => {
    onShippingAddressChange({
      ...shippingAddress,
      [field]: value,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          Edit Shipping Address
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs sm:text-sm text-accent hover:underline cursor-pointer"
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
            onChange={(e) => updateField("firstName", e.target.value)}
            className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="Last name"
            value={shippingAddress.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
          />
        </div>
        <input
          type="text"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
        />
        <input
          type="tel"
          placeholder="Mobile number (e.g. 01XXXXXXXXX)"
          value={shippingAddress.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
        />
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Area / thana"
            value={shippingAddress.area}
            onChange={(e) => updateField("area", e.target.value)}
            className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Postal code"
            value={shippingAddress.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
            className="h-11 px-3.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onSaveAndReturn}
        className="w-full h-11.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm transition-all shadow-xs mt-1 cursor-pointer"
      >
        Save & return
      </button>
    </div>
  );
}
