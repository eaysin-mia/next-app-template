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
        <span className="text-[10px] font-bold tracking-tight lowercase">shop</span>
      </div>

      {/* Announcement Message */}
      <div className="flex items-center gap-1 text-[11px] sm:text-xs">
        <span className="font-semibold text-background">Download Shop app.</span>
        <span className="text-background/70 font-normal hidden xs:inline sm:inline">Available on iOS & Android</span>
      </div>

      {/* Forward Arrow */}
      <span className="text-background text-xs font-semibold shrink-0">→</span>
    </div>
  );
}
