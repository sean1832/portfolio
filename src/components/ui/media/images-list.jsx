import React from "react";
import CustomImage from "./customImage";
import CustomVideo from "./customVideo";
import { Lightbox } from "./lightbox";

const ImageLists = ({ data }) => {
  const showHero = data.video && data.video.src;

  // Instead of filtering, get the indices of the items to show
  const indicesToShow = data.media.reduce((acc, media, index) => {
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
        <div className="grid gap-5 grid-cols-2">
          {indicesToShow.map((index) => {
            const media = data.media[index];
            return media.isVideo ? (
              <CustomVideo key={index} video={media} />
            ) : (
              <Lightbox key={index} images={data.media} index={index}>
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
