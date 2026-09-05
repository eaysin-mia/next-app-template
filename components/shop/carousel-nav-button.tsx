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
      size="sm"
      variant="secondary"
      onPress={onPress}
      aria-label={ariaLabel}
      className={cn(
        "absolute -translate-y-1/2 z-20 rounded-full bg-surface",
        "shadow-[rgba(0,0,0,0.12)_0px_4px_24px_0px] border-0",
        "transition-all duration-150 hover:scale-105 active:scale-95",
        positionClass,
        className
      )}
    >
      <Icon className="size-4 text-foreground stroke-[2.2]" aria-hidden="true" />
    </Button>
  );
}
