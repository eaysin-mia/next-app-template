import {
  HeroConstellation,
  ShopSearchBar,
  CategoryPills,
  ProductRail,
  CartCard,
  IN_YOUR_CART_ITEMS,
} from "@/components/shop";

export default function Home() {
  return (
    <div className="w-full mx-auto flex flex-col gap-6 lg:gap-8 pb-20 md:pb-12">
      <section className="w-full flex justify-center px-6 sm:px-8 md:px-10 lg:px-12">
        <HeroConstellation />
      </section>

      <section className="w-full pt-2.5 px-6 sm:px-8 md:px-10 lg:px-12 flex justify-center">
        <ShopSearchBar />
      </section>

      <section className="w-full px-6 sm:px-8 md:px-10 lg:px-12 flex justify-center">
        <CategoryPills />
      </section>

      <section className="w-full px-6 sm:px-8 md:px-10 lg:px-12">
        <ProductRail title="In your cart" headerHref="/cart">
          {IN_YOUR_CART_ITEMS.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </ProductRail>
      </section>

      <section className="w-full px-6 sm:px-8 md:px-10 lg:px-12">
        <ProductRail title="Bestsellers" />
      </section>
    </div>
  );
}

