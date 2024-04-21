import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

const BlurImage = async (image) => {
  const buffer = await fs.readFile(`./public${image.src}`);
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
