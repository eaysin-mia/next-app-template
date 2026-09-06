export interface CartItemDetail {
  readonly id: string;
  readonly title: string;
  readonly variant: string;
  readonly unitPrice: number;
  readonly unitPriceFormatted: string;
  readonly quantity: number;
  readonly imageUrl: string;
  readonly productId?: string;
}

export type CartItem = CartItemDetail;

export interface CartBrandGroup {
  readonly id: string;
  readonly brand: string;
  readonly brandAvatarText: string;
  readonly brandAvatarBg?: string;
  readonly brandAvatarTextColor?: string;
  readonly subtotal: string;
  readonly subtotalValue: number;
  readonly quantity: number;
  readonly imageUrl: string;
  readonly productTitle: string;
  readonly productId?: string;
  readonly variant?: string;
  readonly currencyCode: string;
  readonly currencySymbol: string;
  readonly freeShippingThreshold?: number;
  readonly items: readonly CartItemDetail[];
}

export const IN_YOUR_CART_ITEMS: readonly CartBrandGroup[] = [
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
