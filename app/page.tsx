import {
  HeroConstellation,
  ShopWordmark,
  ShopSearchBar,
  CategoryPills,
  CategoryGrid,
  ProductRail,
} from "@/components/shop";

export default function Home() {
  return (
    <div className="w-full mx-auto flex flex-col items-center gap-3 sm:gap-5 pt-0 pb-12">
      {/* 1. Top Dynamic Hero Constellation */}
      <section className="w-full flex justify-center">
        <HeroConstellation />
      </section>

      {/* 2. Main Search Discovery Bar */}
      <section className="w-full px-3">
        <ShopSearchBar />
      </section>

      {/* 3. Category Pills Navigation Bar */}
      <section className="w-full md:ps-12 pt-0.5">
        <CategoryPills />
      </section>

      {/* 4. Horizontal Category Grid Rail */}
      <section className="w-full pt-1 sm:pt-2">
        <CategoryGrid />
      </section>

      {/* 5. Bestsellers Horizontal Product Rail */}
      <section className="w-full pt-2 sm:pt-4">
        <ProductRail />
      </section>
    </div>
  );
}
