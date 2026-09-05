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
    <div className="w-full mx-auto flex flex-col gap-3 sm:gap-5 pt-0 pb-12">
      {/* 1. Top Dynamic Hero Constellation */}
      <section className="w-full flex justify-center pr-6 sm:pr-8 md:pr-10 lg:pr-12">
        <HeroConstellation />
      </section>

      {/* 2. Main Search Discovery Bar */}
      <section className="w-full px-3 pr-6 sm:pr-8 md:pr-10 lg:pr-12 flex justify-center">
        <ShopSearchBar />
      </section>

      {/* 3. Category Pills Navigation Bar */}
      <section className="w-full pt-0.5 pr-6 sm:pr-8 md:pr-10 lg:pr-12 flex justify-center">
        <CategoryPills />
      </section>

      {/* 4. Horizontal Category Grid Rail (starts flush on left, bleeds right with no gap) */}
      <section className="w-full pt-1 sm:pt-2">
        <CategoryGrid />
      </section>

      {/* 5. Bestsellers Horizontal Product Rail (starts flush on left, bleeds right with no gap) */}
      <section className="w-full pt-2 sm:pt-4">
        <ProductRail />
      </section>
    </div>
  );
}
