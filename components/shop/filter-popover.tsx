"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverDialog,
  Button,
  cn,
} from "@heroui/react";

export interface FilterPopoverProps {
  label: string;
  isActive?: boolean;
  valueLabel?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onReset?: () => void;
  onDone?: () => void;
}

export function FilterPopover({
  label,
  isActive = false,
  valueLabel,
  children,
  isOpen,
  onOpenChange,
  onReset,
  onDone,
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const isPopoverOpen = isOpen !== undefined ? isOpen : open;
  const setIsPopoverOpen = onOpenChange || setOpen;

  const handleDone = () => {
    onDone?.();
    setIsPopoverOpen(false);
  };

  const handleReset = () => {
    onReset?.();
  };

  return (
    <PopoverRoot isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <Button
          size="sm"
          variant={isActive ? "primary" : "outline"}
          className={cn(
            "rounded-full px-4 h-9 font-medium text-xs sm:text-sm shrink-0 transition-all shadow-xs gap-1.5 cursor-pointer",
            isActive
              ? "bg-foreground text-background border-transparent font-semibold"
              : "bg-surface text-foreground border border-border hover:bg-surface-secondary"
          )}
        >
          <span>{valueLabel || label}</span>
          <ChevronDown className="size-3.5 opacity-70 stroke-[2.5]" aria-hidden="true" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 rounded-2xl shadow-xl border border-border bg-surface text-foreground overflow-hidden min-w-[280px] sm:min-w-[300px] z-50">
        <PopoverDialog className="p-5 flex flex-col gap-3.5 outline-none">
          <div className="flex flex-col gap-1.5">{children}</div>

          <div className="h-px w-full bg-border my-1" />

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              variant="tertiary"
              onPress={handleReset}
              className="flex-1 rounded-full bg-surface-secondary text-foreground hover:bg-surface-tertiary font-semibold text-xs sm:text-sm h-9 cursor-pointer transition-colors"
            >
              Reset
            </Button>
            <Button
              size="sm"
              variant="primary"
              onPress={handleDone}
              className="flex-1 rounded-full bg-foreground text-background hover:opacity-90 font-semibold text-xs sm:text-sm h-9 cursor-pointer transition-opacity"
            >
              Done
            </Button>
          </div>
        </PopoverDialog>
      </PopoverContent>
    </PopoverRoot>
  );
}
