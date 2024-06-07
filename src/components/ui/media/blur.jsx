import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import path from "node:path";
import props from "prop-types";

const LocalBlurImage = async (image) => {
  try {
    const dir = path.resolve(process.cwd(), `public`);
    const filePath = path.join(dir, image.src);
    const buffer = await fs.readFile(filePath);
    const { base64 } = await getPlaiceholder(buffer);
    return (
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
    );
  } catch (error) {
    console.error("[LocalBlurImage]: ", error);
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <p className="text-red-500 font-bold">ERROR FETCHING LOCAL IMAGE: {error.message}</p>
      </div>
    );
  }
};

const RemoteBlurImage = async (image) => {
  try {
    const buffer = await fetch(image.src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer);
    return (
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
    );
  } catch (error) {
    console.error("[RemoteBlurImage]: ", error);
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background">
        <p className="text-red-500 font-bold">ERROR FETCHING REMOTE IMAGE:</p>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
};

const BlurImage = async (image) => {
  try {
    if (image.isExternal) {
      return (
        <RemoteBlurImage
          src={image.src}
          alt={image.alt}
          fill={image.fill}
          sizes={image.sizes}
          style={image.style}
          className={image.className}
          width={image.width}
          height={image.height}
        />
      );
    }
    return (
      <LocalBlurImage
        src={image.src}
        alt={image.alt}
        fill={image.fill}
        sizes={image.sizes}
        style={image.style}
        className={image.className}
        width={image.width}
        height={image.height}
      />
    );
  } catch (error) {
    console.error("[BlurImage]: ", error);
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <p className="text-red-500 font-bold">ERROR FETCHING IMAGE: {error.message}</p>
      </div>
    );
  }
};

BlurImage.propTypes = {
  src: props.string.isRequired,
  alt: props.string.isRequired,
  fill: props.bool,
  sizes: props.string,
  style: props.object,
  className: props.string,
  width: props.number,
  height: props.number,
  isExternal: props.bool,
};

export default BlurImage;
