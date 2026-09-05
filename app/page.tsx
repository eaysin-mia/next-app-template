import {
  HeroConstellation,
  ShopWordmark,
  ShopSearchBar,
  CategoryPills,
} from "@/components/shop";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 sm:gap-5 pt-0 pb-12">
      {/* 1. Top Dynamic Hero Constellation */}
      <section className="w-full flex justify-center">
        <HeroConstellation />
      </section>

      {/* 2. Official Brand Identity Wordmark */}
      <section className="w-full flex justify-center -mt-1 sm:-mt-2">
        <ShopWordmark />
      </section>

      {/* 3. Main Search Discovery Bar */}
      <section className="w-full px-3">
        <ShopSearchBar />
      </section>

      {/* 4. Category Pills Navigation Bar */}
      <section className="w-full px-2 pt-0.5">
        <CategoryPills />
      </section>
    </div>
  );
}
