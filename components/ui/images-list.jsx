import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

const ImageLists = ({ data }) => {
  return (
    <>
      {data.images && data.images.length > 0 && (
        <div className="grid gap-5">
          {data.images.map((image, i) => {
            // Conditional rendering based on data.imageAttributes.adaptive
            if (data.imageAttributes && data.imageAttributes.adaptive) {
              // Perform the adaptive action
              return (
                <div key={i} className={cn("relative w-full", image.className)}>
                  <Image
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
                <div key={i} className={cn("relative h-[600px]", image.className)}>
                  <Image src={image.src} alt={image.alt} style={{ objectFit: "cover" }} fill />
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
