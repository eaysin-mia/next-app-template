import { Metadata } from "next";
import { WishlistView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Saved - Shop",
  description: "View and manage your saved products and wishlists on Shop.",
};

export default function SavedPage() {
  return <WishlistView />;
}
