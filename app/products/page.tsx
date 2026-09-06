import { Metadata } from "next";
import { CategoryCatalogView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Products - Shop",
  description: "Browse all trending products, accessories, and collections on Shop.",
};

export default function ProductsPage() {
  return <CategoryCatalogView initialCategory="products" />;
}
