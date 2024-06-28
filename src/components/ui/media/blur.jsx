import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import path from "node:path";
import props from "prop-types";

const LocalBlurImage = async ({ src, alt, className, ...props }) => {
  try {
    const dir = path.resolve(process.cwd(), `public`);
    const filePath = path.join(dir, src);
    const buffer = await fs.readFile(filePath);
    const { base64 } = await getPlaiceholder(buffer);
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        placeholder="blur"
        blurDataURL={base64}
        {...props}
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

const RemoteBlurImage = async ({ src, alt, className, ...props }) => {
  try {
    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer);
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        placeholder="blur"
        blurDataURL={base64}
        {...props}
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

const BlurImage = async ({ src, alt, className, blurDataURL, isExternal, ...props }) => {
  try {
    if (blurDataURL) {
      return (
        <Image
          src={src}
          alt={alt}
          className={className}
          placeholder="blur"
          blurDataURL={blurDataURL}
          {...props}
        />
      );
    }
    if (isExternal) {
      return <RemoteBlurImage src={src} alt={alt} className={className} {...props} />;
    } else {
      return <LocalBlurImage src={src} alt={alt} className={className} {...props} />;
    }
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
