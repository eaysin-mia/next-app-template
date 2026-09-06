import { Button, cn } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ScrollDirection } from "@/types";

interface CarouselNavButtonProps {
  readonly direction: ScrollDirection;
  readonly onPress: () => void;
  readonly className?: string;
}

interface DirectionConfig {
  readonly ariaLabel: string;
  readonly Icon: LucideIcon;
  readonly positionClass: string;
}

const DIRECTION_CONFIG: Record<ScrollDirection, DirectionConfig> = {
  right: {
    ariaLabel: "Next",
    Icon: ChevronRight,
    positionClass: "right-2 sm:right-3",
  },
  left: {
    ariaLabel: "Previous",
    Icon: ChevronLeft,
    positionClass: "left-2 sm:left-3",
  },
};

export function CarouselNavButton({ direction, onPress, className }: CarouselNavButtonProps) {
  const { ariaLabel, Icon, positionClass } = DIRECTION_CONFIG[direction];

  return (
    <Button
      isIconOnly
      onPress={onPress}
      aria-label={ariaLabel}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 min-w-9 sm:min-w-10 rounded-full",
        "bg-surface text-foreground border border-border/60 shadow-md hover:shadow-lg",
        "flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95",
        positionClass,
        className
      )}
    >
      <Icon className="size-4.5 text-foreground stroke-[2.5]" aria-hidden="true" />
    </Button>
  );
}
