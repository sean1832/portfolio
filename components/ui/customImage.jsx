import React from "react";
import Image from "next/image";
import BlurImage from "./blur";
import { cn } from "@/utils/cn";
import { YoutubeVideo } from "./youtube-video";

const CustomImage = ({ image }) => {
  if (image.isVideo) {
    return (
      <div className={cn("relative w-full col-span-2 h-[300px] md:h-auto", image.className)}>
        <YoutubeVideo src={image.src} alt={image.alt} />
      </div>
    );
  }
  if (image.isAdaptive) {
    return (
      <div className={cn("relative w-full col-span-2", image.className)}>
        {image.isExternal ? (
          <Image
            src={image.src}
            alt={image.alt}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            width={image.width || 1920}
            height={image.height || 1080}
          />
        ) : (
          <BlurImage
            src={image.src}
            alt={image.alt}
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
            width={image.width || 1920}
            height={image.height || 1080}
          />
        )}
      </div>
    );
  } else {
    return (
      <div
        className={cn("relative h-[300px] md:h-[600px] md:col-span-2 col-span-2", image.className)}
      >
        {image.isExternal ? (
          <Image
            src={image.src}
            alt={image.alt}
            className={cn("object-cover object-center w-full h-full", image.className)}
            fill
          />
        ) : (
          <BlurImage
            src={image.src}
            alt={image.alt}
            className={cn("object-cover object-center w-full h-full", image.className)}
            fill
          />
        )}
      </div>
    );
  }
};

export default CustomImage;
