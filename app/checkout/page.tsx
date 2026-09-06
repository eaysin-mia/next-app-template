import React, { Suspense } from "react";
import { Metadata } from "next";
import { CheckoutView } from "@/components/shop/checkout-view";

export const metadata: Metadata = {
  title: "Checkout - Shop",
  description: "Secure checkout powered by Shop.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="size-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CheckoutView />
    </Suspense>
  );
}
