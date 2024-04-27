import React from "react";
import { cn } from "@/utils/cn";
import BlurImage from "./blur";

const ImageLists = ({ data }) => {
  return (
    <>
      {data.images && data.images.length > 0 && (
        <div className="grid gap-5 grid-cols-2">
          {data.images.map((image, i) => {
            // Conditional rendering based on data.imageAttributes.adaptive
            if (image.adaptive) {
              // Perform the adaptive action
              return (
                <div key={i} className={cn("relative w-full col-span-2", image.containerClassName)}>
                  <BlurImage
                    src={image.src}
                    alt={image.alt}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    width={image.width || 1920} // Use image width if available, otherwise default
                    height={image.height || 1080} // Use image height if available, otherwise default
                  />
                </div>
              );
            } else {
              // Perform the non-adaptive action
              return (
                <div
                  key={i}
                  className={cn(
                    "relative h-[600px] md:col-span-2 col-span-2",
                    image.containerClassName
                  )}
                >
                  <BlurImage
                    src={image.src}
                    alt={image.alt}
                    className={cn("object-cover object-center w-full h-full", image.className)}
                    fill
                  />
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default ImageLists;
