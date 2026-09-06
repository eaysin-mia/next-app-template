"use client";

import React from "react";
import { Avatar, Button, cn } from "@heroui/react";

export interface ProductBrandCardProps {
  readonly brand: string;
  readonly brandAvatarText: string;
  readonly brandRating: string;
  readonly isFollowing: boolean;
  readonly onToggleFollow: () => void;
}

export function ProductBrandCard({
  brand,
  brandAvatarText,
  brandRating,
  isFollowing,
  onToggleFollow,
}: ProductBrandCardProps) {
  return (
    <div className="bg-foreground text-background rounded-2xl p-4 flex items-center justify-between mt-1 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar
          size="md"
          className="size-9 rounded-full bg-background text-foreground font-bold text-[9px] uppercase tracking-wider shrink-0"
        >
          <Avatar.Fallback>{brandAvatarText}</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background">
            {brand}
          </span>
          <span className="text-xs text-background/70 font-medium">
            {brandRating}
          </span>
        </div>
      </div>

      <Button
        size="sm"
        variant="secondary"
        onPress={onToggleFollow}
        className={cn(
          "rounded-full text-xs font-semibold px-4 cursor-pointer transition-all",
          isFollowing
            ? "bg-background/20 text-background border border-background/30 hover:bg-background/30"
            : "bg-background text-foreground hover:bg-background/90",
        )}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
