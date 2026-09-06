import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export interface CheckoutSuccessStepProps {
  readonly email: string;
  readonly brandName: string;
}

export function CheckoutSuccessStep({
  email,
  brandName,
}: CheckoutSuccessStepProps) {
  const displayEmail =
    email.trim().length > 0 ? email : "jane.morgan@example.com";

  return (
    <div className="w-full flex flex-col items-center text-center gap-3.5 py-6">
      <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-success flex items-center justify-center">
        <Check className="size-8 stroke-[2.5]" />
      </div>
      <h2 className="text-2xl font-bold text-foreground tracking-tight">
        Thank you for your order!
      </h2>
      <p className="text-sm text-muted max-w-sm leading-relaxed">
        Confirmation email sent to{" "}
        <span className="font-semibold text-foreground">{displayEmail}</span>.
        Your order with {brandName} is confirmed.
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
  );
}
