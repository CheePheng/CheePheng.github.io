import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const PROJECTS_DIR = join(import.meta.dirname, "..", "public", "generated", "projects");
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 55;

const files = (await readdir(PROJECTS_DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();
console.log(`Optimizing ${files.length} JPEGs → WebP + AVIF`);

for (const file of files) {
  const src = join(PROJECTS_DIR, file);
  const base = file.replace(/\.jpe?g$/i, "");
  const webpDst = join(PROJECTS_DIR, `${base}.webp`);
  const avifDst = join(PROJECTS_DIR, `${base}.avif`);

  const srcStat = await stat(src);

  await sharp(src).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpDst);
  await sharp(src).avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avifDst);

  const webpStat = await stat(webpDst);
  const avifStat = await stat(avifDst);
  const kb = (b) => (b / 1024).toFixed(1);
  const pct = (b) => ((b / srcStat.size) * 100).toFixed(0);

  console.log(
    `  ${file.padEnd(22)} jpg ${kb(srcStat.size).padStart(6)}kb  →  webp ${kb(webpStat.size).padStart(5)}kb (${pct(webpStat.size)}%)  avif ${kb(avifStat.size).padStart(5)}kb (${pct(avifStat.size)}%)`,
  );
}

console.log("Done.");
