import {
  PageContainer,
  PageBody,
  HeroConstellation,
  ShopSearchBar,
  CategoryPills,
  ProductRail,
  CartCard,
  RecentlyViewedRail,
  IN_YOUR_CART_ITEMS,
} from "@/components/shop";

export default function Home() {
  return (
    <PageContainer maxWidth="full" rightBleed>
      <PageBody className="gap-6 lg:gap-8">
        {/* Full-width top bar (Hero constellation) with right-bleed padding */}
        <section className="w-full pr-4 sm:pr-6 md:pr-8 lg:pr-10">
          <HeroConstellation />
        </section>

        {/* Search bar & Category pills centered */}
        <div className="w-full max-w-[1640px] pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex flex-col gap-6 lg:gap-8">
          <section className="w-full pt-2.5 flex justify-center">
            <ShopSearchBar />
          </section>

          <section className="w-full flex justify-center">
            <CategoryPills />
          </section>
        </div>

        {/* In your cart rail */}
        <section className="w-full">
          <ProductRail title="In your cart" headerHref="/cart" bleed>
            {IN_YOUR_CART_ITEMS.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </ProductRail>
        </section>

        {/* Recently viewed rail */}
        <section className="w-full">
          <RecentlyViewedRail />
        </section>

        {/* Bestsellers rail */}
        <section className="w-full">
          <ProductRail title="Bestsellers" bleed />
        </section>
      </PageBody>
    </PageContainer>
  );
}


