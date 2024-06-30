import React from "react";
import CustomImage from "./customImage";
import CustomVideo from "./customVideo";
import { Lightbox } from "./lightbox";
import { cn } from "@/utils/cn";

const ImageLists = ({ data }) => {
  const showHero = data.video && data.video.src;
  const mediaContainer = data.mediaContainer;

  // Instead of filtering, get the indices of the items to show
  const indicesToShow = mediaContainer.media.reduce((acc, media, index) => {
    if (showHero) {
      if (!media.isCarousel) {
        acc.push(index);
      }
    } else {
      if (!media.isHero && !media.isCarousel) {
        acc.push(index);
      }
    }
    return acc;
  }, []);

  return (
    <>
      {indicesToShow.length > 0 && (
        <div
          className={cn(
            "grid gap-5 grid-cols-2",
            mediaContainer.className || ""
          )}
        >
          {indicesToShow.map((index) => {
            const media = mediaContainer.media[index];
            return media.isVideo ? (
              <CustomVideo key={index} video={media} />
            ) : (
              <Lightbox key={index} images={mediaContainer.media} index={index}>
                <CustomImage key={index} image={media} />
              </Lightbox>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ImageLists;
