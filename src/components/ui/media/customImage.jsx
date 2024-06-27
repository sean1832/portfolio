import React from "react";
import BlurImage from "./blur";
import { cn } from "@/utils/cn";
import { ConstructImageAltText } from "@/lib/constructAltText";

const CustomImage = ({ image }) => {
  let inverted = image.isInverted ? "dark:invert" : "";
  if (image.isAdaptive) {
    return (
      <div className={cn("relative w-full col-span-2", image.className, inverted)}>
        <BlurImage
          src={image.src}
          alt={image.alt || ConstructImageAltText(image.src)}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          width={image.width || 1920}
          height={image.height || 1080}
          isExternal={image.isExternal}
          blurDataURL={image.blurDataURL}
        />
      </div>
    );
  } else {
    return (
      <div className={cn("relative h-[300px] md:h-[600px] col-span-full", image.className)}>
        <BlurImage
          src={image.src}
          alt={image.alt || ConstructImageAltText(image.src)}
          className={cn("object-cover object-center w-full h-full", image.className, inverted)}
          fill
          isExternal={image.isExternal}
          blurDataURL={image.blurDataURL}
        />
      </div>
    );
  }
};

export default CustomImage;
