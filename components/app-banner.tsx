"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function AppBanner() {
  const pathname = usePathname();

  if (pathname.startsWith("/product")) {
    return null;
  }
  return (
    <div
      role="banner"
      aria-label="Download Shop app"
      className="w-full h-9 bg-foreground text-background flex items-center justify-center gap-2 px-4 select-none cursor-pointer hover:opacity-95 transition-opacity shrink-0 z-20"
    >
      <div className="flex items-center justify-center px-1.5 py-0.5 rounded-md bg-accent text-accent-foreground shrink-0 shadow-xs">
        <span className="text-[10px] font-bold tracking-tight lowercase">shop</span>
      </div>

      <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] tracking-[-0.014em] text-background font-medium">
        <span>Download Shop app.</span>
        <span className="text-background/70 text-[11px] font-normal hidden xs:inline sm:inline">
          Available on iOS & Android
        </span>
      </div>

      <span className="text-background text-xs font-semibold shrink-0 ml-0.5">→</span>
    </div>
  );
}
