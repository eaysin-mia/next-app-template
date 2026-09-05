"use client";

import React from "react";

export function AppBanner() {
  return (
    <div
      role="banner"
      aria-label="Download Shop app"
      className="w-full h-9 bg-foreground text-background flex items-center justify-center gap-2.5 px-4 rounded-none md:rounded-t-2xl select-none cursor-pointer hover:opacity-95 transition-opacity shrink-0"
    >
      {/* Shop App Droplet Badge */}
      <div className="flex items-center justify-center px-1.5 py-0.5 rounded-md bg-accent text-accent-foreground shrink-0 shadow-xs">
        <span className="text-[10px] font-semibold tracking-tight lowercase">shop</span>
      </div>

      {/* Announcement Message — 14px link label, 10px subtext at -0.023em tracking */}
      <div className="flex items-center gap-1.5 text-[13px] sm:text-[14px] tracking-[-0.023em]">
        <span className="font-medium text-background">Download Shop app.</span>
        <span className="text-background/70 text-[10px] sm:text-[11px] font-normal hidden xs:inline sm:inline tracking-[-0.023em]">
          Available on iOS & Android
        </span>
      </div>

      {/* Forward Arrow */}
      <span className="text-background text-xs font-normal shrink-0">→</span>
    </div>
  );
}
