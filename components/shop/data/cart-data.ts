export interface CartItemDetail {
  id: string;
  title: string;
  variant: string;
  unitPrice: number;
  unitPriceFormatted: string;
  quantity: number;
  imageUrl: string;
  productId?: string;
}

export interface CartBrandGroup {
  id: string;
  brand: string;
  brandAvatarText: string;
  brandAvatarBg?: string;
  brandAvatarTextColor?: string;
  subtotal: string;
  subtotalValue: number;
  quantity: number;
  imageUrl: string;
  productTitle: string;
  productId?: string;
  variant?: string;
  currencyCode: string;
  currencySymbol: string;
  freeShippingThreshold?: number;
  items: CartItemDetail[];
}

export const IN_YOUR_CART_ITEMS: CartBrandGroup[] = [
  {
    id: "cart-flag-nor-fail",
    brand: "FLAG NOR FAIL",
    brandAvatarText: "FNF",
    brandAvatarBg: "bg-black",
    brandAvatarTextColor: "text-white",
    subtotal: "৳21,000.00",
    subtotalValue: 21000,
    quantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80",
    productTitle: "WOMENS RIBBED HENLEY - TAN",
    productId: "womens-ribbed-henley-tan",
    variant: "LARGE",
    currencyCode: "BDT",
    currencySymbol: "৳",
    freeShippingThreshold: 5000,
    items: [
      {
        id: "fnf-item-1",
        title: "WOMENS RIBBED HENLEY - TAN",
        variant: "LARGE",
        unitPrice: 4200,
        unitPriceFormatted: "৳4,200.00",
        quantity: 5,
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80",
        productId: "womens-ribbed-henley-tan",
      },
    ],
  },
  {
    id: "cart-fly-by-jing",
    brand: "FLY BY JING",
    brandAvatarText: "FLY BY JING",
    brandAvatarBg: "bg-black",
    brandAvatarTextColor: "text-amber-300",
    subtotal: "$120.00",
    subtotalValue: 120,
    quantity: 4,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80",
    productTitle: "Sichuan Chili Crisp",
    variant: "Standard 6 oz",
    currencyCode: "USD",
    currencySymbol: "$",
    freeShippingThreshold: 50,
    items: [
      {
        id: "fbj-item-1",
        title: "Sichuan Chili Crisp",
        variant: "Standard 6 oz",
        unitPrice: 30,
        unitPriceFormatted: "$30.00",
        quantity: 4,
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80",
      },
    ],
  },
];
