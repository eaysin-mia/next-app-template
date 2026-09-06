import React from "react";
import Link from "next/link";
import { PageContainer, ProductRail } from "@/components/shop";

interface CategoryTile {
  readonly label: string;
  readonly image: string;
}

interface CategoryCardItem {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly tiles: readonly [CategoryTile, CategoryTile];
}

const BROWSE_CATEGORIES: readonly CategoryCardItem[] = [
  {
    id: "beauty",
    name: "Beauty",
    href: "/categories/beauty",
    tiles: [
      {
        label: "Lotion",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Serum",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "women",
    name: "Women",
    href: "/categories/women",
    tiles: [
      {
        label: "Top",
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Pants",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "men",
    name: "Men",
    href: "/categories/pants",
    tiles: [
      {
        label: "Shirt",
        image:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Jeans",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "home",
    name: "Home",
    href: "/categories/home",
    tiles: [
      {
        label: "Decor",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Cookware",
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "fitness",
    name: "Fitness & nutrition",
    href: "/categories/beauty",
    tiles: [
      {
        label: "Supplements",
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Gymwear",
        image:
          "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "baby",
    name: "Baby & toddler",
    href: "/categories/beauty",
    tiles: [
      {
        label: "Clothing",
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Stroller",
        image:
          "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "sporting",
    name: "Sporting goods",
    href: "/categories/pants",
    tiles: [
      {
        label: "Sneakers",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Footwear",
        image:
          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "food",
    name: "Food & drinks",
    href: "/categories/home",
    tiles: [
      {
        label: "Sauces",
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Snacks",
        image:
          "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "toys",
    name: "Toys & games",
    href: "/categories/home",
    tiles: [
      {
        label: "Toys",
        image:
          "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Games",
        image:
          "https://images.unsplash.com/photo-1531651008558-ed1740375b39?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "pet",
    name: "Pet supplies",
    href: "/categories/home",
    tiles: [
      {
        label: "Bowl",
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80",
      },
      {
        label: "Bed",
        image:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export default function BrowseCategoriesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Categories" },
  ] as const;

  return (
    <PageContainer maxWidth="full" rightBleed>
      {/* Category Grid bounded with right padding */}
      <div className="w-full pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex flex-col pt-2 sm:pt-4">
        {/* Header */}
        <PageContainer.Header title="Explore" breadcrumbs={breadcrumbs} />

        <PageContainer.Body className="gap-6 sm:gap-8">
          {/* Browse Categories Section */}
          <section className="w-full flex flex-col">
            {/* 2-Column Mobile / 5-Column Desktop Category Card Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full">
              {BROWSE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group flex flex-col justify-between rounded-[22px] sm:rounded-[24px] p-3 sm:p-4 bg-surface border border-border/60 shadow-xs no-underline select-none transition-all duration-200 hover:border-foreground/20 hover:shadow-md cursor-pointer"
                >
                  <span className="text-foreground font-bold text-sm sm:text-base tracking-tight mb-2.5 sm:mb-3 truncate group-hover:opacity-80 transition-opacity leading-snug">
                    {cat.name}
                  </span>

                  {/* 2 Image Tiles inside bg-surface-secondary containers */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                    {cat.tiles.map((tile, idx) => (
                      <div
                        key={`${cat.id}-${idx}-${tile.label}`}
                        className="w-full aspect-square rounded-[16px] sm:rounded-[18px] bg-surface-secondary overflow-hidden p-1.5 sm:p-2 flex items-center justify-center border border-border/30"
                      >
                        <img
                          src={tile.image}
                          alt={tile.label}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </PageContainer.Body>
      </div>

      {/* Bottom Product Rail bleeds 100% to the right edge of screen */}
      <section className="w-full mt-12 sm:mt-16">
        <ProductRail title="Top rated in home" bleed />
      </section>

    </PageContainer>
  );
}
