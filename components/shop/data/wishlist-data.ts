import type { ProductItem } from "../product-card";

export const INITIAL_SAVED_PRODUCTS: ProductItem[] = [
  {
    id: "freesia-gown-saffron",
    brand: "Ulla Johnson",
    title: "Freesia Gown - Saffron",
    price: "BDT 125,300.00",
    variant: "Saffron / 00",
    imageSrc:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
    isWishlisted: true,
  },
  {
    id: "samar-silk-dress-geode",
    brand: "Ulla Johnson",
    title: "Samar Silk Dress - Geode",
    rating: 5,
    reviewCount: 5,
    price: "BDT 87,300.00",
    variant: "Geode / 6",
    imageSrc:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
    isWishlisted: true,
  },
  {
    id: "original-sichuan-chili-crisp",
    brand: "FLY BY JING",
    title: "Original Sichuan Chili Crisp",
    rating: 5,
    reviewCount: 392,
    price: "$30.00",
    variant: "2-Pack",
    imageSrc:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
    isWishlisted: true,
  },
];
