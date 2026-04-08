# Acts of Defiance

A publication for those who refuse to forget. Stories of artists, movements, organizations, and people whose existence was itself a form of resistance.

This repo is the static publication site. Content is produced and pushed in by [dime](https://github.com/ActsOfDefiance/dime) — the agentic content pipeline — via its `AstroAdapter`. The site itself just renders what dime emits.

## Stack

- **[Astro 6](https://astro.build/)** with file-based routing in `src/pages/`
- **[Svelte 5](https://svelte.dev/)** for any future interactive islands (`.svelte` files); static UI is `.astro`
- **[Tailwind 4](https://tailwindcss.com/)** via `@tailwindcss/vite`, design tokens in `src/styles/global.css` `@theme` block
- **[Bun](https://bun.sh/)** as runtime and package manager
- **TypeScript** strict, with Astro's `astro/tsconfigs/strict` base

## Commands

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Start the dev server at `http://localhost:4321` |
| `bun run build` | Static build to `./dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run check` | Astro + TypeScript type check |

## Project structure

```
src/
  pages/                       # File-based routes (.astro)
    index.astro                # /
    about.astro                # /about
    articles/[slug].astro      # /articles/<slug>
    categories/[category].astro # /categories/<artists|movements|organizations|people>
  components/                  # Shared components (.astro and .svelte)
  layouts/
    BaseLayout.astro           # HTML shell — head, fonts, header, footer, slot
  content/
    articles/                  # Markdown articles, populated by dime's AstroAdapter
    about/                     # Static about/manifesto content
  lib/
    categories.ts              # Single source of truth for the four categories
  styles/
    global.css                 # Tailwind + design tokens (@theme)
    prose.css                  # Shared body prose styles for rendered Markdown
public/                        # Static assets served as-is (favicons, fonts, hero images)
astro.config.mjs
src/content.config.ts          # Content collection schemas
```

## Design system

Specs live in `docs/specs/` (the docs directory is symlinked from a sibling repo and tracked there, not in this repo). Key reference docs:

- **`docs/specs/typography.md`** — full type system: scale tokens, fluid `clamp()` philosophy, `SectionHead` variant rules, prose contract
- **`docs/specs/design-standards.md`** — accessibility (WCAG 2.2 AA) and performance baselines
- **`docs/specs/page-templates.md`** — template/component vocabulary

The site uses an **Augmented Fourth modular type scale** (√2 ≈ 1.4142) with fluid `clamp()` values across the 320–1440px viewport range. Body steps (`--text-caption`, `--text-body`, `--text-body-lg`) keep both endpoints on the modular scale. Heading steps (`--text-h4` through `--text-display`) use aggressive clamps where the **max** stays on the scale but the **min** is sized empirically to fit headline text at 320px viewport without overflow.

When adding any new heading or section head, use `<SectionHead variant="editorial|structural">` rather than an inline `<h2>`. When rendering Markdown bodies, wrap in `<Prose><Content /></Prose>` rather than writing page-level scoped CSS.

## Content flow

1. **dime** runs an agentic pipeline (research → write → edit → publish) that produces a Markdown article + frontmatter conforming to the schema in `src/content.config.ts`
2. dime's **`AstroAdapter`** writes the article to `src/content/articles/`
3. dime downloads any associated images from GCS into `public/images/articles/` (these are build artifacts, not committed to git)
4. The next site build picks up the new content automatically — no manual step here

The Markdown frontmatter is validated by Astro's content collections at build time. See `src/content.config.ts` for the schema.

## Design comps

The visual reference comps live at `../art/comps/v2/` and `../art/comps/v3/` (relative to this repo) — `home.html`, `article.html`, `category.html`. They're the source of truth for layout and typographic decisions.

## Accessibility

WCAG 2.2 AA is a hard requirement, not aspirational. Every component must:

- Use semantic HTML and proper ARIA
- Support keyboard navigation (tab order, focus indicators visible via `focus-visible`)
- Meet contrast minimums (4.5:1 normal text, 3:1 large text)
- Respect `prefers-reduced-motion`
- Provide minimum 24×24 CSS pixel touch targets

See `docs/specs/design-standards.md` for the full checklist.

## Deployment

CI builds on push to `main` via `.github/workflows/build.yml`. The hosting target is TBD (decision lives in the epic-acts-of-defiance ticket — choices are GCP Cloud Storage + CDN, Netlify, or Vercel).

## Contributing

This repo follows Gitflow:

- Never commit to `main` directly
- Branch off `develop` for features (`feature/<short-description>`)
- PR back to `develop`, squash-merge after review
- Promotion `develop → main` happens at release time

All PRs run a build check and (where configured) automated code review before merging.
