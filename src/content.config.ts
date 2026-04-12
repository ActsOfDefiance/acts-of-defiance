import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Acts of Defiance article content collection.
// In production, articles flow from dime via the AstroAdapter.
// For local dev and build, content is read directly from the compendium/ repo
// (one level above this repo). README.md is excluded via the [!R]*.md pattern.

const articles = defineCollection({
  loader: glob({ pattern: "[!R]*.md", base: "../compendium" }),
  schema: z.object({
    title: z.string(),
    // description may be absent in compendium drafts — empty string is a safe fallback.
    description: z.string().default(""),
    // Compendium dates may be strings like "1920-present" rather than ISO dates.
    // Extract the first 4-digit year and use Jan 1 of that year.
    date: z
      .string()
      .or(z.coerce.date())
      .transform((val) => {
        if (val instanceof Date) return val;
        const match = String(val).match(/(\d{4})/);
        return match ? new Date(parseInt(match[1]), 0, 1) : new Date();
      }),
    // Articles without a category build fine but won't appear on category pages
    // until category is added to compendium frontmatter.
    category: z
      .enum(["artists", "movements", "organizations", "people"])
      .optional(),
    tags: z.array(z.string()).default([]),
    images: z
      .object({
        hero: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// Static pages — about / manifesto. Single-entry collection so the
// page body is editable in markdown without touching the .astro file.
const about = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
  }),
});

export const collections = { articles, about };
