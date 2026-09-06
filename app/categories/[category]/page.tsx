import { Metadata } from "next";
import { CategoryCatalogView } from "@/components/shop";

interface CategoryPageProps {
  readonly params: Promise<{ readonly category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawCategory = resolvedParams.category ?? "products";
  const title =
    rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  return {
    title: `${title} - Shop`,
    description: `Explore ${title} items and trending collections on Shop.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  return <CategoryCatalogView initialCategory={resolvedParams.category} />;
}
