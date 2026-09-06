"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@heroui/react";
import { ShopSearchBar } from "./search-bar";

export interface FloatingSearchBarProps {
  readonly className?: string;
}

export function FloatingSearchBar({ className = "" }: FloatingSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`w-full max-w-[510px] ${className}`}>
      <div className="hidden lg:block">
        <ShopSearchBar suggestionsPlacement="above" />
      </div>
      <div className="flex justify-end lg:hidden">
        {isExpanded ? (
          <div className="w-full">
            <ShopSearchBar
              autoFocus
              openOnMount
              suggestionsPlacement="above"
              onRequestClose={() => setIsExpanded(false)}
            />
          </div>
        ) : (
          <Button
            isIconOnly
            aria-label="Open search"
            onPress={() => setIsExpanded(true)}
            className="size-12 rounded-full bg-surface text-foreground shadow-lg border border-border cursor-pointer"
          >
            <Search className="size-5" />
          </Button>
        )}
      </div>
    </div>
  );
}