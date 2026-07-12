import { copyFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist", "client");
const shell = join(outDir, "_shell.html");

if (!existsSync(shell)) {
  console.error("Missing dist/client/_shell.html — run build with NITRO_PRESET=github_pages first.");
  process.exit(1);
}

for (const name of ["index.html", "404.html"]) {
  copyFileSync(shell, join(outDir, name));
}

writeFileSync(join(outDir, ".nojekyll"), "");
console.log("GitHub Pages ready: index.html, 404.html, .nojekyll");
