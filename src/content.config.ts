import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Acts of Defiance article content collection.
// Articles are produced by dime and placed in src/content/articles/ by the AstroAdapter.
// See docs/design/aod-site-architecture.md for schema rationale.

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(["artists", "movements", "organizations", "people"]),
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
