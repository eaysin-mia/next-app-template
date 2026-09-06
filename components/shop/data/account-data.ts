import type { ProductItem } from "@/components/shop/product-card";

export interface AccountUserProfile {
  readonly email: string;
  readonly initial: string;
}

export interface AccountNavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const ACCOUNT_USER: AccountUserProfile = {
  email: "eaysin.dev@gmail.com",
  initial: "E",
};

export const ACCOUNT_SAVED_PRODUCTS: readonly ProductItem[] = [
  {
    id: "vital-proteins-collagen",
    brand: "Vital Proteins",
    title: "Collagen Peptides",
    price: "$36.99",
    isWishlisted: true,
    imageSrc:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
  {
    id: "freesia-gown-saffron",
    brand: "Ulla Johnson",
    title: "Freesia Gown - Saffron",
    price: "BDT 125,300.00",
    variant: "Saffron / 00",
    isWishlisted: true,
    imageSrc:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "samar-silk-dress-geode",
    brand: "Ulla Johnson",
    title: "Samar Silk Dress - Geode",
    price: "BDT 87,300.00",
    variant: "Geode / 6",
    isWishlisted: true,
    imageSrc:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "original-sichuan-chili-crisp",
    brand: "FLY BY JING",
    title: "Original Sichuan Chili Crisp",
    price: "$30.00",
    variant: "2-Pack",
    isWishlisted: true,
    imageSrc:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
];

export const ACCOUNT_RECENTLY_VIEWED: readonly ProductItem[] = [
  {
    id: "daydream-sweatshirt",
    brand: "Born Primitive",
    title: "Everyday Long Sleeve",
    price: "BDT 3,300.00",
    imageSrc:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "aesop-cleanser",
    brand: "Aesop",
    title: "Botanical Body Cleanser",
    price: "BDT 4,500.00",
    imageSrc:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
  {
    id: "bgv-collagen-powder",
    brand: "black girl vitamins",
    title: "BGV Collagen Powder",
    price: "$36.99",
    originalPrice: "$45.00",
    badge: "18% off",
    isWishlisted: true,
    imageSrc:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
];

export const ACCOUNT_DESKTOP_NAV_ITEMS: readonly AccountNavItem[] = [
  { id: "profile", label: "Profile", href: "/account/profile" },
  { id: "orders", label: "Orders", href: "/account/orders" },
  {
    id: "sign-in-security",
    label: "Sign in & security",
    href: "/account/security",
  },
  { id: "connections", label: "Connections", href: "/account/connections" },
  {
    id: "data-privacy",
    label: "Data & privacy",
    href: "/account/data-privacy",
  },
];

export const ACCOUNT_MOBILE_NAV_ITEMS: readonly AccountNavItem[] = [
  { id: "profile", label: "Profile", href: "/account/profile" },
  { id: "orders", label: "Orders", href: "/account/orders" },
  {
    id: "sign-in-security",
    label: "Sign in & security",
    href: "/account/security",
  },
  { id: "connections", label: "Connections", href: "/account/connections" },
  {
    id: "data-privacy",
    label: "Data & privacy",
    href: "/account/data-privacy",
  },
];
