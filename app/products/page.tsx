"use client";

import CategoryPage from "../categories/[category]/page";

export default function ProductsPage() {
  return <CategoryPage params={Promise.resolve({ category: "products" })} />;
}
