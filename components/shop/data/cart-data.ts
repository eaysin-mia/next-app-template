export interface CartBrandGroup {
  id: string;
  brand: string;
  brandAvatarText: string;
  brandAvatarBg?: string;
  brandAvatarTextColor?: string;
  subtotal: string;
  quantity: number;
  imageUrl: string;
  productTitle: string;
  productId?: string;
}

export const IN_YOUR_CART_ITEMS: CartBrandGroup[] = [
  {
    id: "cart-fly-by-jing",
    brand: "FLY BY JING",
    brandAvatarText: "FLY BY JING",
    brandAvatarBg: "bg-black",
    brandAvatarTextColor: "text-amber-300",
    subtotal: "$120.00",
    quantity: 4,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80",
    productTitle: "Sichuan Chili Crisp",
  },
  {
    id: "cart-flag-nor-fail",
    brand: "FLAG NOR FAIL",
    brandAvatarText: "FNF",
    brandAvatarBg: "bg-black",
    brandAvatarTextColor: "text-white",
    subtotal: "BDT 21,000.00",
    quantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80",
    productTitle: "WOMENS RIBBED HENLEY - TAN",
    productId: "womens-ribbed-henley-tan",
  },
];
