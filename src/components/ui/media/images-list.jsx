import React from "react";
import CustomImage from "./customImage";
import CustomVideo from "./customVideo";
import { Lightbox } from "./lightbox";

const ImageLists = ({ data }) => {
  const showHero = data.video && data.video.src;
  const imagesToShow = showHero
    ? data.media.filter((image) => !image.isCarousel)
    : data.media.filter((image) => !image.isHero && !image.isCarousel);

  return (
    <>
      {imagesToShow && imagesToShow.length > 0 && (
        <div className="grid gap-5 grid-cols-2">
          {imagesToShow.map((media, i) =>
            media.isVideo ? (
              <CustomVideo key={i} video={media} />
            ) : (
              <Lightbox key={i} images={imagesToShow} index={i}>
                <CustomImage key={i} image={media} />
              </Lightbox>
            )
          )}
        </div>
      )}
    </>
  );
};

export default ImageLists;
