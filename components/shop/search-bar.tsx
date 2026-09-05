"use client";

import React, { useState } from "react";
import { SearchField, Button } from "@heroui/react";
import { Camera, ArrowRight } from "lucide-react";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * Shop Search Bar Component
 * Built using official HeroUI semantic theme tokens:
 * - bg-surface (Pure white surface from theme)
 * - border-border (Hairline divider from theme)
 * - text-foreground & text-muted (Theme typography tokens)
 * - bg-default -> hover:bg-accent hover:text-accent-foreground (Theme button states)
 */
export function ShopSearchBar({
  placeholder = "What are you shopping for today?",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-[510px] mx-auto ${className}`}
    >
      <SearchField
        value={value}
        onChange={setValue}
        className="w-full"
      >
        <SearchField.Group className="relative flex items-center w-full h-[60px] sm:h-[64px] bg-surface rounded-full border border-border shadow-sm hover:border-foreground/20 focus-within:border-foreground/30 focus-within:shadow-md transition-all duration-200 pl-4 pr-3">
          {/* Left Camera Button inside Circular Ring */}
          <button
            type="button"
            aria-label="Image search"
            className="w-9 h-9 rounded-full border border-border bg-surface flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer shrink-0 focus:outline-none"
          >
            <Camera className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          {/* Search Input Field — 16px GTStandard-MRegular at -0.031em tracking */}
          <SearchField.Input
            placeholder={placeholder}
            className="flex-1 bg-transparent border-0 outline-none text-[16px] text-foreground placeholder:text-muted tracking-[-0.031em] w-full font-normal pl-3 pr-2"
          />

          {/* Right Circular Submit Button */}
          <Button
            type="submit"
            isIconOnly
            aria-label="Submit search"
            className="group w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-default hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer border-0"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </SearchField.Group>
      </SearchField>
    </form>
  );
}
