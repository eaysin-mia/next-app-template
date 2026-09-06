"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingSearchBar } from "./floating-search-bar";
import { ShopSearchBar } from "./search-bar";

export function HomeSearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [isTopSearchHidden, setIsTopSearchHidden] = useState(false);

  useEffect(() => {
    const searchBar = searchBarRef.current;

    if (!searchBar) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsTopSearchHidden(!entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(searchBar);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={searchBarRef} className="w-full flex justify-center">
        <ShopSearchBar />
      </div>

      <div
        aria-hidden={!isTopSearchHidden}
        className={`pointer-events-none fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom)+1rem)] z-30 flex justify-center px-4 transition-all duration-300 ease-out md:bottom-12 ${
          isTopSearchHidden
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
      >
        <div
          className={`pointer-events-auto w-full max-w-[510px] transition-transform duration-300 ease-out ${
            isTopSearchHidden ? "scale-100" : "scale-95"
          }`}
        >
          <FloatingSearchBar />
        </div>
      </div>
    </>
  );
}