import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

export default async function getBase64Local(src) {
  const buffer = await fs.readFile(`./public${src}`);
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}
