import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import path from "node:path";

const BlurImage = async (image) => {
  const dir = path.resolve(process.cwd(), `public`);
  const filePath = path.join(dir, image.src);
  const buffer = await fs.readFile(filePath);
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill={image.fill}
        sizes={image.sizes}
        style={image.style}
        className={image.className}
        placeholder="blur"
        blurDataURL={base64}
        width={image.width}
        height={image.height}
      />
    </>
  );
};

export default BlurImage;
