import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = fileURLToPath(new URL("../design/quiet-desk.svg", import.meta.url));
const outputDirectory = fileURLToPath(
  new URL("../public/images/", import.meta.url)
);
const output = fileURLToPath(
  new URL("../public/images/quiet-desk.png", import.meta.url)
);

await mkdir(outputDirectory, { recursive: true });
await sharp(source).png({ compressionLevel: 9 }).toFile(output);

console.log("Rendered public/images/quiet-desk.png");
