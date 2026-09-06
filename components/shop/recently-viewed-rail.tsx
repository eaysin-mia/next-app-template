"use client";

import React from "react";
import { ProductRail } from "./product-rail";
import { ProductCard } from "./product-card";
import type { ProductItem } from "./product-card";

export const RECENTLY_VIEWED_PRODUCTS: readonly ProductItem[] = [
  {
    id: "vital-proteins-collagen",
    brand: "Vital Proteins",
    title: "Collagen Peptides",
    price: "$36.99",
    imageSrc: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
  {
    id: "fly-by-jing-chili",
    brand: "FLY BY JING",
    title: "Sichuan Chili Crisp",
    price: "$30.00",
    imageSrc: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
    imageFit: "contain",
  },
  {
    id: "elwood-cap",
    brand: "Elwood Clothing",
    title: "TRADEMARK CAP",
    price: "$50.00",
    imageSrc: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "dedcool-taunt",
    brand: "DedCool",
    title: "Fragrance 01 - Taunt",
    price: "$90.00",
    imageSrc: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "buck-mason-coat",
    brand: "Buck Mason",
    title: "Felted Chore Coat",
    price: "$268.00",
    imageSrc: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "kith-salomon",
    brand: "Kith",
    title: "Salomon XT-EVO Black",
    price: "$210.00",
    imageSrc: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
  {
    id: "bylt-polo",
    brand: "BYLT Basics",
    title: "Drop-Cut: LUX Polo",
    price: "$68.00",
    imageSrc: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=80",
    imageFit: "cover",
  },
];

export interface RecentlyViewedRailProps {
  readonly products?: readonly ProductItem[];
  readonly className?: string;
  readonly onProductClick?: (product: ProductItem) => void;
}

export function RecentlyViewedRail({
  products = RECENTLY_VIEWED_PRODUCTS,
  className = "",
  onProductClick,
}: RecentlyViewedRailProps) {
  return (
    <ProductRail title="Recently viewed" bleed className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          minimal
          onClick={onProductClick}
          className="snap-start snap-always shrink-0 w-[140px] sm:w-[155px] md:w-[170px]"
        />
      ))}
    </ProductRail>
  );
}
