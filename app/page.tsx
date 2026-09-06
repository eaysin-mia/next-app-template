import {
  HeroConstellation,
  ShopSearchBar,
  CategoryPills,
  CategoryGrid,
  ProductRail,
} from "@/components/shop";

export default function Home() {
  return (
    <div className="w-full mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10 pt-2 pb-20 md:pt-3 md:pb-12">
      <section className="w-full flex justify-center px-6 sm:px-8 md:px-10 lg:px-12">
        <HeroConstellation />
      </section>

      <section className="w-full px-6 sm:px-8 md:px-10 lg:px-12 flex justify-center">
        <ShopSearchBar />
      </section>

      <section className="w-full pt-0.5 px-6 sm:px-8 md:px-10 lg:px-12 flex justify-center">
        <CategoryPills />
      </section>

      <section className="w-full pt-1 sm:pt-2 px-6 sm:px-8 md:px-10 lg:px-12">
        <CategoryGrid />
      </section>

      <section className="w-full pt-2 sm:pt-4 px-6 sm:px-8 md:px-10 lg:px-12">
        <ProductRail />
      </section>
    </div>
  );
}
