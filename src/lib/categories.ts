// Category metadata — single source of truth used by the dynamic
// /categories/[category] route, the home page card grid, and the
// article page badges. Slugs match the article frontmatter enum
// in src/content.config.ts.

export type CategorySlug = "artists" | "movements" | "organizations" | "people";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  /** Hex color used for the chip background and the category landing title. */
  accent: string;
  /** Foreground color to pair with the accent for accessible contrast. */
  accentText: string;
  /** Material Symbols Outlined icon name used by the CategoryTiles grid. */
  icon: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  artists: {
    slug: "artists",
    name: "Artists",
    tagline: "Art is a hammer to shape reality.",
    accent: "#795900",
    accentText: "#ffffff",
    icon: "brush",
  },
  movements: {
    slug: "movements",
    name: "Movements",
    tagline: "Every movement started with someone who refused.",
    accent: "#c23b22",
    accentText: "#ffffff",
    icon: "groups",
  },
  organizations: {
    slug: "organizations",
    name: "Organizations",
    tagline: "Structure is how survival becomes strategy.",
    accent: "#2a7b88",
    accentText: "#ffffff",
    icon: "account_balance",
  },
  people: {
    slug: "people",
    name: "People",
    tagline: "Memory is itself an act of resistance.",
    accent: "#795548",
    accentText: "#ffffff",
    icon: "person",
  },
};

export const CATEGORY_LIST: Category[] = Object.values(CATEGORIES);

/** Inline-style string for badge chips: `style={badgeStyle("people")}`. */
export function badgeStyle(slug: string): string {
  const cat = CATEGORIES[slug as CategorySlug];
  // Fallback uses the deep-charcoal CSS var so there's no hardcoded
  // brand color; the category `accent` literals above are intentionally
  // not token references because this file is the source of truth.
  if (!cat) return "background:var(--color-deep-charcoal);color:#fff";
  return `background:${cat.accent};color:${cat.accentText}`;
}
