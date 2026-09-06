"use client";

import React, { useState } from "react";
import { SearchField, Button } from "@heroui/react";
import { Camera, ArrowRight } from "lucide-react";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function ShopSearchBar({
  placeholder = "What are you shopping for today?",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (query: string) => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length === 0) {
      return;
    }

    onSearch?.(normalizedQuery);
  };

  return (
    <SearchField
      name="product-search"
      aria-label="Search products, brands, and categories"
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      onClear={() => setValue("")}
      fullWidth
      className={`w-full max-w-[510px] mx-auto ${className}`}
    >
      <SearchField.Group className="relative flex items-center w-full h-12 sm:h-[60px] overflow-hidden bg-surface rounded-full border border-border shadow-sm hover:border-foreground/20 focus-within:border-foreground/30 focus-within:shadow-md transition-all duration-200 px-2 sm:px-3">
        <button
          type="button"
          aria-label="Search by image"
          className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <Camera className="size-4 sm:size-[18px] stroke-[1.8]" />
        </button>

        <SearchField.Input
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-sm sm:text-base text-foreground placeholder:text-muted tracking-[-0.031em] w-full font-normal px-2 sm:px-3"
        />

        <SearchField.ClearButton
          aria-label="Clear search"
          className="size-8 shrink-0 text-muted hover:text-foreground"
        />

        <Button
          type="submit"
          isIconOnly
          isDisabled={value.trim().length === 0}
          aria-label="Search"
          className="group flex size-9 min-w-9 sm:size-10 sm:min-w-10 items-center justify-center rounded-full bg-default hover:bg-accent text-foreground hover:text-accent-foreground disabled:opacity-50 disabled:hover:bg-default disabled:hover:text-foreground transition-all duration-200 shrink-0 cursor-pointer border-0"
        >
          <ArrowRight className="size-4 sm:size-[18px] stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </SearchField.Group>
    </SearchField>
  );
}
