import type { ComponentType, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ScrollDirection = "left" | "right";

export interface CategoryTile {
  readonly label: string;
  readonly image: string;
}

export interface CategoryBlock {
  readonly id: string;
  readonly name: string;
  readonly tiles: readonly [CategoryTile, CategoryTile, CategoryTile, CategoryTile];
}

export interface CategoryItem {
  readonly id: string;
  readonly label: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly iconBgClass: string;
}

