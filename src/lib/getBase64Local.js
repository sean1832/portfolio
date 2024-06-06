import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

export default async function getBase64Local(src) {
  try {
    const filePath = path.join(process.cwd(), `/public${src}`);
    const buffer = await fs.readFile(filePath);
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
