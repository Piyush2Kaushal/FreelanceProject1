// ─────────────────────────────────────────────────────────────────────────────
// update-imports.mjs
// Saare .png / .jpg imports automatically .webp mein convert karta hai
//
// RUN: node update-imports.mjs
// Project ROOT mein se chalao (jahan vite.config.ts hai)
// ─────────────────────────────────────────────────────────────────────────────

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";

// Yeh folders scan honge — apna src folder structure match karta hai
const SCAN_DIRS = ["./src"];
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];

// Jinke WebP ban chuke hain — inhi ka import badlega
const REPLACE_EXTS = [".png", ".jpg", ".jpeg"];

let totalFiles = 0;
let totalChanges = 0;

function getAllFiles(dir, fileList = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // node_modules skip karo
      if (entry.name === "node_modules") continue;
      getAllFiles(fullPath, fileList);
    } else if (EXTENSIONS.includes(extname(entry.name))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = getAllFiles("./src");

for (const filePath of files) {
  const original = readFileSync(filePath, "utf-8");
  let updated = original;

  for (const ext of REPLACE_EXTS) {
    // Match karo: import xyz from "...assets/abc.png"  ya  '...assets/abc.png'
    const regex = new RegExp(
      `(from\\s+['"][^'"]*assets[^'"]*)(${ext.replace(".", "\\.")})(['"])`,
      "g"
    );
    updated = updated.replace(regex, `$1.webp$3`);
  }

  if (updated !== original) {
    writeFileSync(filePath, updated, "utf-8");
    totalFiles++;

    // Count kitne replacements hue
    const changes =
      (original.match(/\.png|\.jpg|\.jpeg/g) || []).length -
      (updated.match(/\.png|\.jpg|\.jpeg/g) || []).length;
    totalChanges += Math.abs(changes);
    console.log(`✅ Updated: ${filePath}`);
  }
}

console.log(`\n🎉 Done!`);
console.log(`   ${totalFiles} files updated`);
console.log(`   ~${totalChanges} imports changed`);
console.log(`\nAb npm run build karo — production ready! 🚀`);
