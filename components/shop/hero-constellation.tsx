// "use client";

// import React from "react";
// import Image from "next/image";
// import { ProductCard } from "./product-card";

// export interface HeroConstellationProps {
//   className?: string;
// }

// /**
//  * Hero Constellation Component
//  * Perfectly balanced to match the Shop app layout:
//  * - Left Product Card: 140px wide, 26px radius, real product image in 18px radius
//  * - Left Tile: 88px rounded brand tile (Owala FreeSip)
//  * - Center: Dynamic hero bottles showcase (OSEA, Salt & Stone, fragrance)
//  * - Right Product Card: 140px wide, 26px radius, real product image in 18px radius
//  * - Right Tile: 88px rounded brand tile (TRUFF)
//  */
// export function HeroConstellation({ className = "" }: HeroConstellationProps) {
//   return (
//     <div
//       className={`relative w-full max-w-5xl mx-auto flex items-center justify-center pt-1 pb-2 px-2 ${className}`}
//     >
//       {/* Desktop Floating Constellation */}
//       <div className="hidden md:flex items-center justify-between w-full gap-3 lg:gap-6">
//         {/* Left Floating Card: Kale Chips */}
//         <div className="w-[136px] lg:w-[142px] shrink-0 transition-transform duration-300 hover:-translate-y-1">
//           <ProductCard
//             title="Kale Chips | Raw Ranch"
//             rating={4}
//             reviewCount={24}
//             className="p-2.5 rounded-[26px] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
//           >
//             <div className="relative w-full h-[98px] rounded-[18px] bg-surface-secondary overflow-hidden flex items-center justify-center">
//               <Image
//                 src="/images/products/kale-chips-product.png"
//                 alt="Kale Chips"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </ProductCard>
//         </div>

//         {/* Left Secondary Brand Tile: Owala */}
//         <div className="w-[84px] h-[84px] lg:w-[90px] lg:h-[90px] rounded-[24px] bg-gradient-to-br from-orange-500 via-rose-500 to-emerald-400 p-3 flex flex-col items-center justify-center text-background shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] shrink-0 transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
//           <span className="text-sm font-extrabold tracking-tight lowercase select-none">
//             owala
//           </span>
//           <span className="text-[10px] text-background/85 font-medium pt-0.5">FreeSip</span>
//         </div>

//         {/* Center Dynamic Product Showcase */}
//         <div className="flex-1 max-w-[270px] lg:max-w-[300px] mx-auto flex items-center justify-center px-2">
//           <div className="relative w-full h-[115px] lg:h-[125px] transition-transform duration-300 hover:scale-105">
//             <Image
//               src="/images/shop-hero-poster-clean.png"
//               alt="Curated Daily Essentials"
//               fill
//               priority
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Right Floating Card: Seeded Bar */}
//         <div className="w-[136px] lg:w-[142px] shrink-0 transition-transform duration-300 hover:-translate-y-1">
//           <ProductCard
//             title="Seeded Bar | 2oz"
//             brand="Elissa Goodman"
//             rating={5}
//             reviewCount={11}
//             className="p-2.5 rounded-[26px] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
//           >
//             <div className="relative w-full h-[98px] rounded-[18px] bg-surface-secondary overflow-hidden flex items-center justify-center">
//               <div className="relative w-[52px] h-[78px]">
//                 <Image
//                   src="/images/products/seeded-bar-product.png"
//                   alt="Seeded Bar"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </ProductCard>
//         </div>

//         {/* Right Secondary Brand Tile: TRUFF */}
//         <div className="w-[84px] h-[84px] lg:w-[90px] lg:h-[90px] rounded-[24px] bg-foreground p-3 flex flex-col items-center justify-center text-background shadow-[0_4px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] shrink-0 transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
//           <span className="text-sm font-black tracking-widest uppercase select-none text-background">
//             truff
//           </span>
//           <span className="text-[10px] text-background/70 font-medium pt-0.5">Hot Sauce</span>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="flex md:hidden items-center justify-center w-full py-1">
//         <div className="relative w-[260px] h-[105px]">
//           <Image
//             src="/images/shop-hero-poster-clean.png"
//             alt="Curated Daily Essentials"
//             fill
//             priority
//             className="object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




import {Avatar, Button, Card, CloseButton, Link} from "@heroui/react";
import { CircleDollarSign } from "lucide-react";

export function HeroConstellation() {
  return (
    <div className="hidden md:flex w-full items-center justify-center">
      <div className="grid w-full grid-cols-12 gap-2 px-2">

        {/* Row 2 */}
        <div className="col-span-12 grid grid-cols-12 gap-2">
          {/* Left Column */}
          <div className="col-span-12 grid grid-cols-12 gap-2 lg:col-span-6">
            {/* Top Card */}
            <Card className="col-span-12">
              <div className="absolute end-3 top-3 z-10">
                <CloseButton aria-label="Close notification" />
              </div>
              <Card.Header className="gap-2">
                <CircleDollarSign
                  aria-label="Dollar sign icon"
                  className="text-primary size-6 shrink-0"
                  role="img"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted uppercase">PAYMENT</span>
                  <Card.Title className="pe-8 text-sm sm:text-base">
                    You can now withdraw on crypto
                  </Card.Title>
                </div>
              </Card.Header>
              <Card.Footer>
                <Link aria-label="Go to settings" href="#" rel="noopener noreferrer">
                  Go to settings
                  <Link.Icon aria-hidden="true" />
                </Link>
              </Card.Footer>
            </Card>
            {/* Bottom cards */}
            <div className="col-span-12 grid grid-cols-12 gap-2">
              {/* Left Card */}
              <Card className="col-span-12 gap-1 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[32px] rounded-lg">
                    <Avatar.Image
                      alt="Demo 1"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-0">
                  <p className="text-sm leading-4 font-medium">Indie Hackers</p>
                  <p className="text-xs text-muted">148 members</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="John"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">By John</p>
                </Card.Footer>
              </Card>
              {/* Right Card */}
              <Card className="col-span-12 gap-1 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[32px] rounded-lg">
                    <Avatar.Image
                      alt="Demo 2"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                    />
                    <Avatar.Fallback>AB</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-0">
                  <p className="text-sm leading-4 font-medium">AI Builders</p>
                  <p className="text-xs text-muted">362 members</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="John"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                    />
                    <Avatar.Fallback>M</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">By Martha</p>
                </Card.Footer>
              </Card>
            </div>
          </div>
          {/* Right Column */}
          <Card className="col-span-12 min-h-[100px] overflow-hidden rounded-3xl lg:col-span-6">
            {/* Background image */}
            <img
              alt="NEO Home Robot"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg"
            />

            {/* Header */}
            <Card.Header className="z-10 text-white">
              <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
                NEO
              </Card.Title>
              <Card.Description className="text-sm leading-5 font-medium text-black/50">
                Home Robot
              </Card.Description>
            </Card.Header>

            {/* Footer */}
            <Card.Footer className="z-10 mt-auto flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-black">Available soon</div>
                <div className="text-xs text-black/60">Get notified</div>
              </div>
              <Button className="bg-white text-black" size="sm" variant="tertiary">
                Notify me
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}