import { use } from "react";
import { ProductDetailsView } from "@/components/shop";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductSingularDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  return <ProductDetailsView productId={resolvedParams.id} />;
}
