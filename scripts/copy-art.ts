/**
 * Sync images from the art/ sibling repo into public/images/articles/
 * so Astro can serve them at /images/articles/{filename}.
 *
 * Run via: bun scripts/copy-art.ts
 * Invoked automatically by `bun run build` and `bun run dev`.
 *
 * In production the AstroAdapter handles image placement; this script
 * is for local development and CI builds only.
 */
import { readdirSync, copyFileSync, mkdirSync } from "fs";
import { join, extname } from "path";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif", ".avif"]);

const srcDir = join(import.meta.dir, "../../art");
const destDir = join(import.meta.dir, "../public/images/articles");

mkdirSync(destDir, { recursive: true });

const files = readdirSync(srcDir);
let copied = 0;
for (const file of files) {
  if (IMAGE_EXTS.has(extname(file).toLowerCase())) {
    copyFileSync(join(srcDir, file), join(destDir, file));
    copied++;
  }
}

console.log(`[copy-art] Synced ${copied} image(s): art/ → public/images/articles/`);
