"use client";

import { usePathname } from "next/navigation";
import { FloatingSearchBar } from "@/components/shop/floating-search-bar";

export function GlobalSearchBar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom)+1rem)] z-30 flex justify-center px-4 transition-all duration-300 ease-out md:bottom-12">
      <div className="pointer-events-auto w-full max-w-[510px]">
        <FloatingSearchBar />
      </div>
    </div>
  );
}