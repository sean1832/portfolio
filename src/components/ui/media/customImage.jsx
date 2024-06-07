import React from "react";
import BlurImage from "./blur";
import { cn } from "@/utils/cn";

const CustomImage = ({ image }) => {
  if (image.isAdaptive) {
    return (
      <div className={cn("relative w-full col-span-2", image.className)}>
        <BlurImage
          src={image.src}
          alt={image.alt}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          width={image.width || 1920}
          height={image.height || 1080}
          isExternal={image.isExternal}
        />
      </div>
    );
  } else {
    return (
      <div
        className={cn("relative h-[300px] md:h-[600px] md:col-span-2 col-span-2", image.className)}
      >
        <BlurImage
          src={image.src}
          alt={image.alt}
          className={cn("object-cover object-center w-full h-full", image.className)}
          fill
          isExternal={image.isExternal}
        />
      </div>
    );
  }
};

export default CustomImage;
