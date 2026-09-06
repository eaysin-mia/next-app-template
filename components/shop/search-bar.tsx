"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchField, Button } from "@heroui/react";
import { ArrowDown, ArrowRight, History, X } from "lucide-react";

const SEARCH_SUGGESTIONS = [
  "Best eco-friendly baby products",
  "Fast-charging portable power bank for iPhone",
  "Gifts for a friend who loves hosting dinner parties",
] as const;

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
  openOnMount?: boolean;
  suggestionsPlacement?: "above" | "below";
  onRequestClose?: () => void;
}

export function ShopSearchBar({
  placeholder = "What are you shopping for today?",
  onSearch,
  className = "",
  autoFocus = false,
  openOnMount = false,
  suggestionsPlacement = "below",
  onRequestClose,
}: SearchBarProps) {
  const searchRootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(openOnMount);
  const suggestionPanelPosition =
    suggestionsPlacement === "above" ? "bottom-full mb-2" : "top-full mt-2";

  const closeSuggestions = () => {
    setIsSuggestionsOpen(false);
    onRequestClose?.();
  };

  const handleFocusOut = () => {
    window.requestAnimationFrame(() => {
      const activeElement = document.activeElement;

      if (!searchRootRef.current?.contains(activeElement)) {
        closeSuggestions();
      }
    });
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !searchRootRef.current?.contains(target)
      ) {
        closeSuggestions();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSuggestions();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (openOnMount) {
      setIsSuggestionsOpen(true);
    }
  }, [openOnMount]);

  const handleSubmit = (query: string) => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length === 0) {
      return;
    }

    onSearch?.(normalizedQuery);
  };

  return (
    <div ref={searchRootRef} className="w-full">
      <SearchField
        name="product-search"
        aria-label="Search products, brands, and categories"
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        onClear={() => setValue("")}
        autoFocus={autoFocus}
        fullWidth
        className={`relative w-full max-w-[510px] mx-auto ${className}`}
      >
      <SearchField.Group
        className={`relative z-10 items-center w-full h-12 sm:h-[60px] overflow-hidden bg-surface rounded-full border border-border shadow-sm hover:border-foreground/20 focus-within:border-foreground/30 focus-within:shadow-md transition-all duration-200 px-2 sm:px-3 ${
          isSuggestionsOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <SearchField.SearchIcon className="ml-1 size-4 shrink-0 text-muted sm:size-[18px]" />

        <SearchField.Input
          placeholder={placeholder}
          onFocus={() => setIsSuggestionsOpen(true)}
          onBlur={handleFocusOut}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-sm sm:text-base text-foreground placeholder:text-muted tracking-[-0.031em] w-full font-normal px-2 sm:px-3"
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

      <>
          <div
            aria-hidden={!isSuggestionsOpen}
            className={`hidden md:flex absolute left-0 right-0 ${suggestionPanelPosition} z-20 flex-col gap-2 rounded-[24px] border border-border bg-surface/95 p-3 shadow-xl backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ease-out ${
              isSuggestionsOpen
                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between px-1 text-xs text-muted">
              <span>Suggestions</span>
              <button
                type="button"
                aria-label="Close suggestions"
                onClick={closeSuggestions}
                className="flex size-7 items-center justify-center rounded-full text-muted hover:bg-surface-secondary hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
            {SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setValue(suggestion)}
                className="flex w-fit max-w-full items-center gap-2 rounded-full bg-surface-secondary px-3 py-2 text-left text-xs text-foreground hover:bg-surface-tertiary cursor-pointer"
              >
                <ArrowDown className="size-3.5 shrink-0 text-muted" />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
            <p className="px-1 text-[11px] leading-relaxed text-muted">
              Recommendations are for informational purposes only.
            </p>
          </div>

          <div
            aria-hidden={!isSuggestionsOpen}
            className={`fixed inset-0 z-[80] flex flex-col bg-surface/95 px-4 pb-[calc(4rem+env(safe-area-inset-bottom)+1.5rem)] pt-6 backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ease-out md:hidden ${
              isSuggestionsOpen
                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                : "invisible translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="Search history"
                className="flex size-11 items-center justify-center rounded-full border border-border bg-surface shadow-sm cursor-pointer"
              >
                <History className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Close search"
                onClick={closeSuggestions}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-surface shadow-sm cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <span className="text-xs text-muted">Suggestions</span>
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setValue(suggestion)}
                  className="flex items-center gap-2 rounded-full bg-surface-secondary px-3 py-2.5 text-left text-sm text-foreground cursor-pointer"
                >
                  <ArrowDown className="size-4 shrink-0 text-muted" />
                  <span className="truncate">{suggestion}</span>
                </button>
              ))}
              <p className="text-xs leading-relaxed text-muted">
                Learn more about how we use your data to personalize your experience. Recommendations are for informational purposes only.
              </p>
            </div>

            <div className="mt-auto">
              <SearchField.Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={handleFocusOut}
                placeholder={placeholder}
                className="w-full h-14 rounded-full bg-surface px-5 text-base text-foreground shadow-lg outline-none border border-border"
              />
            </div>
          </div>
        </>
      </SearchField>
    </div>
  );
}
