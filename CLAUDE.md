# Acts of Defiance — Claude Context

## Session start

Read `docs/memory/MEMORY.md` to load project context and preferences.

## Active issues

- `docs/issues/set-up-acts-of-defiance-site.md` — current issue checklist
- `docs/issues/epic-acts-of-defiance.md` — epic and order of work

## Stack

- **Astro 6** with file-based routing (`src/pages/`)
- **Svelte 5** for interactive islands (`.svelte` files); static UI uses `.astro`
- **Tailwind 4** via `@tailwindcss/vite` — design tokens in `src/styles/global.css`
- **Bun** as runtime and package manager

## Commands

```bash
bun run dev      # dev server at http://localhost:4321
bun run build    # static build to dist/
bun run preview  # preview the production build
bun run check    # TypeScript + Astro type check
```

## Directory Structure

```
src/
  pages/            # File-based routing (.astro)
  components/       # Shared components (.astro and .svelte)
  layouts/          # BaseLayout.astro wraps every page
  content/
    articles/       # Markdown articles — populated by dime's AstroAdapter
    about/          # Static about content
  styles/
    global.css      # Tailwind + design tokens (@theme block)
public/
  images/
    articles/       # Hero images placed here by AstroAdapter (not in git)
astro.config.mjs
src/content.config.ts   # Content collection schema
```

## Content Collections

Articles live in `src/content/articles/`. Schema defined in `src/content.config.ts`:

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `description` | string | required |
| `date` | date | required, coerced |
| `category` | enum | `artists` \| `movements` \| `organizations` \| `people` |
| `tags` | string[] | default `[]` |
| `images.hero` | string? | filename only — resolved from `/images/articles/` |
| `draft` | boolean | default `false` — drafts excluded from build |
| `featured` | boolean | default `false` |

Articles are produced by **dime** and placed here via the **AstroAdapter**. Do not manually edit production articles.

## Design Tokens

All tokens defined as Tailwind `@theme` vars in `src/styles/global.css`:

| Token | Value | Use |
|---|---|---|
| `warm-gold` / `secondary` | `#d4a843` | Logo, footer, sunburst |
| `revolutionary-red` / `primary` | `#c23b22` | CTA, Movements badge, hover |
| `movement-teal` / `tertiary` | `#2a7b88` | Organizations badge |
| `deep-charcoal` | `#1a1a1a` | Header/footer bg, body text |
| `parchment` / `surface` | `#f5edd6` | Page background |
| `earth-brown` | `#6b4226` | People badge, muted text |

Category accent colors are the single source of truth in `src/lib/categories.ts`. There are no `bg-category-*` Tailwind classes — apply category color via the `badgeStyle(slug)` helper or read `CATEGORIES[slug].accent` directly.

## Typography

**Full spec:** [`docs/specs/typography.md`](docs/specs/typography.md). Read it before changing any text size or adding a new heading.

Quick reference:

- **Type scale:** Augmented Fourth (√2 ≈ 1.4142), fluid `clamp()`, 320–1440px viewport range. Tokens: `--text-caption`, `--text-body`, `--text-body-lg`, `--text-h4`, `--text-h3`, `--text-h2`, `--text-h1`, `--text-display`.
- **Section heads:** use `<SectionHead variant="editorial|structural">` — never inline `<h2>`. The `editorial` variant is italic Newsreader, the `structural` variant is Montserrat black uppercase. Pick by voice; default to editorial.
- **Prose:** wrap rendered Markdown in `<Prose><Content /></Prose>` — single source of truth in `src/styles/prose.css`. Don't write page-level scoped CSS for body styles.
- **Forbidden patterns:** breakpoint stacks like `text-4xl md:text-6xl lg:text-8xl`, hardcoded sizes like `text-[10px]`, page-level scoped prose styles. The spec is enforced through tokens and components.

Fonts:
- `font-headline`: Montserrat (700/800/900) — uppercase, tight tracking, headings
- `font-body`: Inter (400/500/600) — prose and UI
- `font-label`: Newsreader (serif, italic) — section labels, pullquotes, captions

Apply families via `style="font-family: var(--font-headline)"` (Tailwind 4 doesn't support `font-headline` as a utility directly).

## Motion

**Full spec:** [`docs/specs/motion.md`](docs/specs/motion.md). Read it before adding or changing any transition, animation, hover, focus, or active state.

Quick reference:

- **Durations** (off-grid, hand-tuned): `--duration-snap` (90ms), `--duration-quick` (180ms), `--duration-arrive` (320ms), `--duration-declare` (560ms).
- **Easings** (brand-named cubic-beziers): `--ease-stamp` (press feedback), `--ease-manifesto` (DEFAULT — hovers, lifts, color swaps), `--ease-ink` (reversible states), `--ease-defiant` (single overshoot, sparingly).
- **Helper classes** in `src/styles/global.css`:
  - `.aod-brand-link` — link color swap + sweeping warm-gold underline. Active state via `aria-current="page"`.
  - `.aod-brand-btn` — button letterpress press (2px bottom shadow plate, presses down on `:active`).
  - `.aod-brand-card` + `.aod-brand-card__image` + `.aod-brand-card__title` — card lift + image zoom + risograph headline misregistration on hover.
  - `.aod-focus-ring` — instant warm-gold outline + outward pulse on any `:focus` (click or Tab).
  - `.motion-stamp-in` — defiant overshoot scale-in for badge arrivals.
- **Forbidden patterns:** `transition-colors`/`transition-all`/`duration-300`/`ease-in-out` (or any Tailwind default transition utility). Hardcoded ms values. `cubic-bezier(...)` literals outside `global.css`. Bare `:hover` color swaps without going through `.aod-brand-link` for nav links.
- **Reduced motion:** global `@media (prefers-reduced-motion: reduce)` rule in `global.css` collapses all transitions and animations to `0.01ms`.

## Spacing & rhythm

**Full spec:** [`docs/specs/spacing.md`](docs/specs/spacing.md). Read it before adding any margin, padding, or gap.

Quick reference:

- **Scale:** `--spacing-3xs` (4px) through `--spacing-4xl` (128px), plus a pinned `--spacing-rhythm` (28px) for prose paragraph gaps. Tailwind utilities: `p-sm`, `gap-md`, `mt-lg`, `py-section-y`, etc. — all generated from the `@theme` tokens.
- **Semantic tokens:** `--spacing-section-y` (between major sections), `--spacing-stack` (default vertical rhythm), `--spacing-inline` (inline gap), `--spacing-container-x` / `-x-lg` (horizontal page padding), `--spacing-card-gap`, `--spacing-hero-pb`. Use these over raw scale values when intent matters.
- **Containers:** `max-w-reading` (700px prose), `max-w-hero` (896px hero text blocks), `max-w-content` (1280px grid). These replace `max-w-2xl/3xl/4xl/7xl/screen-xl` literals.
- **Forbidden patterns:** raw numeric Tailwind spacing (`mt-12`, `px-6`, `py-24`, `gap-8`), arbitrary values (`mt-[72px]`), raw pixel/rem in inline styles. Use tokens or documented exceptions.
- **Documented exceptions:** `p-0`/`m-0`/`gap-0` (explicit resets), `pb-0.5` (sub-pixel typography alignment), `max-w-[12ch]` (character-based constraint), `pt-[var(--header-height)]` (bespoke layout constants).

## Publishing Integration

Content flows: `dime → compendium/ repo → AstroAdapter → src/content/articles/`

Images are artifacts from GCS — placed in `public/images/articles/` by the adapter, never committed to git.

## Gitflow

- Never work in `main` directly — feature branches only (`feature/`, `hotfix/`)
- PRs required to merge; commit messages in imperative mood ("Add article route")

## Design Comps

Reference comps at `../art/comps/v2/` (relative to this repo): `home.html`, `article.html`, `category.html`.
