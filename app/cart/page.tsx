import { Metadata } from "next";
import { CartView } from "@/components/shop/cart-view";

export const metadata: Metadata = {
  title: "Cart - Shop",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return <CartView />;
}
