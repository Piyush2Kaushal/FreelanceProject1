import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = "./src/assets";
const QUALITY = 85;

const files = readdirSync(ASSETS_DIR).filter((f) =>
  [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const input = join(ASSETS_DIR, file);
  const output = join(ASSETS_DIR, basename(file, extname(file)) + ".webp");
  await sharp(input).webp({ quality: QUALITY }).toFile(output);
  const before = statSync(input).size;
  const after = statSync(output).size;
  const saved = Math.round((1 - after / before) * 100);
  console.log(`✅ ${file} → ${saved}% smaller`);
}
