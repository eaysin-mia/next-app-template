"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { RefObject } from "react";
import type { ScrollDirection } from "@/types";

const SCROLL_DETECTION_THRESHOLD_PX = 10;
const SCROLL_PAGE_FRACTION = 0.85;

interface ScrollRailControls {
  readonly scrollRef: RefObject<HTMLDivElement | null>;
  readonly canScrollLeft: boolean;
  readonly canScrollRight: boolean;
  readonly scroll: (direction: ScrollDirection) => void;
}

export function useScrollRail(): ScrollRailControls {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > SCROLL_DETECTION_THRESHOLD_PX);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_DETECTION_THRESHOLD_PX,
    );
  }, []);

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", checkScroll, { passive: true });
    ref.addEventListener("scrollend", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      ref.removeEventListener("scroll", checkScroll);
      ref.removeEventListener("scrollend", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((direction: ScrollDirection) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const multiplier = direction === "right" ? 1 : -1;
    container.scrollBy({
      left: multiplier * container.clientWidth * SCROLL_PAGE_FRACTION,
      behavior: "smooth",
    });
  }, []);

  return { scrollRef, canScrollLeft, canScrollRight, scroll };
}
