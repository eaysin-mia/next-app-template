import type { ProductDetailData } from "@/components/shop/data/products-data";

export type { ProductDetailData };

export interface ProductDetailsViewProps {
  readonly productId?: string;
}

export type ReviewSortOption = "recent" | "highest" | "lowest";

export type ReviewRatingFilter = number | "all";
