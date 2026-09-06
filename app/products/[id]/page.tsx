import { Metadata } from "next";
import { ProductDetailsView } from "@/components/shop";
import { getProductData } from "@/components/shop/data/products-data";

interface PageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.id);

  return {
    title: `${product.title} - ${product.brand} - Shop`,
    description: product.descriptionParagraphs[0] ?? `Buy ${product.title} on Shop.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductDetailsView productId={resolvedParams.id} />;
}
