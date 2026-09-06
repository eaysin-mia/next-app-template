"use client";

import React from "react";
import { Truck, RotateCcw } from "lucide-react";

export interface ProductDeliveryReturnsProps {
  readonly onOpenReturnPolicy: () => void;
}

export function ProductDeliveryReturns({
  onOpenReturnPolicy,
}: ProductDeliveryReturnsProps) {
  return (
    <div className="flex flex-col gap-3 pt-3.5 border-t border-border/60 text-foreground">
      <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
        Delivery & Returns
      </p>

      <div className="flex flex-col gap-3 text-[14px] text-muted leading-[1.29]">
        <div className="flex items-start gap-3">
          <Truck className="size-4.5 text-foreground shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-[14px]">
              Standard Delivery
            </span>
            <span className="text-muted mt-0.5 leading-[1.29] text-[14px]">
              Estimated delivery within 3–5 business days. Free shipping on
              orders over BDT 5,000.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-border/40">
          <RotateCcw className="size-4.5 text-foreground shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-[14px]">
              30-Day Hassle-Free Returns
            </span>
            <span className="text-muted mt-0.5 leading-[1.29] text-[14px]">
              Not completely satisfied? Return unworn items within 30 days.{" "}
              <button
                type="button"
                onClick={onOpenReturnPolicy}
                className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80 inline ml-0.5 cursor-pointer"
              >
                Read policy
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
