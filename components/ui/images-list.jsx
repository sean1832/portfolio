import React from "react";
import { cn } from "@/utils/cn";
import BlurImage from "./blur";
import Image from "next/image";

const ImageLists = ({ data }) => {
  const showHero = data.video && data.video.src; // Show hero image if there is no video

  // Filter images to exclude the hero image if a video is present
  const imagesToShow = showHero ? data.images : data.images.filter((image) => !image.hero);

  return (
    <>
      {imagesToShow && imagesToShow.length > 0 && (
        <div className="grid gap-5 grid-cols-2">
          {imagesToShow.map((image, i) => {
            // Conditional rendering based on data.imageAttributes.adaptive
            if (image.adaptive) {
              // Perform the adaptive action
              return (
                <div key={i} className={cn("relative w-full col-span-2", image.className)}>
                  {/* if image is external link, do not use BlurImage */}
                  {image.external ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      width={image.width || 1920} // Use image width if available, otherwise default
                      height={image.height || 1080} // Use image height if available, otherwise default
                    />
                  ) : (
                    <BlurImage
                      src={image.src}
                      alt={image.alt}
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      width={image.width || 1920} // Use image width if available, otherwise default
                      height={image.height || 1080} // Use image height if available, otherwise default
                    />
                  )}
                </div>
              );
            } else {
              // Perform the non-adaptive action
              return (
                <div
                  key={i}
                  className={cn("relative h-[600px] md:col-span-2 col-span-2", image.className)}
                >
                  {/* if image is external link, do not use BlurImage */}
                  {image.external ? (
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
          })}
        </div>
      )}
    </>
  );
};

export default ImageLists;
