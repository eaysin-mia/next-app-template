import type { LucideIcon } from "lucide-react";

export type CheckoutStep =
  | "signin"
  | "signedin"
  | "shipping"
  | "payment"
  | "success";

export type PaymentMethodId =
  | "cod"
  | "bkash"
  | "nagad"
  | "rocket"
  | "card"
  | "bank";

export interface ShippingAddress {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly area: string;
  readonly city: string;
  readonly postalCode: string;
  readonly country: string;
  readonly phone: string;
}

export interface PaymentOption {
  readonly id: PaymentMethodId;
  readonly label: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

export interface CheckoutViewProps {
  readonly initialBrandId?: string;
}
