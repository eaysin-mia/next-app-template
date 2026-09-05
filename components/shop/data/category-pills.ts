import {
  ShoppingBag,
  Shirt,
  Sparkles,
  Home,
  Dumbbell,
  Baby,
  Coffee,
} from "lucide-react";
import type { CategoryItem } from "@/types";

/**
 * Tailwind bg-color classes must be complete strings for the JIT scanner to detect them.
 * Centralising them here as named constants prevents magic-string scatter.
 */
const ICON_BG = {
  women: "bg-slate-500",
  men: "bg-blue-600",
  beauty: "bg-rose-800",
  home: "bg-emerald-600",
  fitness: "bg-red-800",
  baby: "bg-amber-500",
  food: "bg-violet-400",
} as const;

export const CATEGORIES: readonly CategoryItem[] = [
  { id: "women",   label: "Women",             icon: ShoppingBag, iconBgClass: ICON_BG.women   },
  { id: "men",     label: "Men",               icon: Shirt,       iconBgClass: ICON_BG.men     },
  { id: "beauty",  label: "Beauty",            icon: Sparkles,    iconBgClass: ICON_BG.beauty  },
  { id: "home",    label: "Home",              icon: Home,        iconBgClass: ICON_BG.home    },
  { id: "fitness", label: "Fitness & nutrition", icon: Dumbbell,  iconBgClass: ICON_BG.fitness },
  { id: "baby",    label: "Baby & toddler",    icon: Baby,        iconBgClass: ICON_BG.baby    },
  { id: "food",    label: "Food & drinks",     icon: Coffee,      iconBgClass: ICON_BG.food    },
];
