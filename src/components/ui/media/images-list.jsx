import React from "react";
import CustomImage from "./customImage";
import CustomVideo from "./customVideo";

const ImageLists = ({ data }) => {
  const showHero = data.video && data.video.src;
  const imagesToShow = showHero
    ? data.images.filter((image) => !image.isCarousel)
    : data.images.filter((image) => !image.isHero && !image.isCarousel);

  return (
    <>
      {imagesToShow && imagesToShow.length > 0 && (
        <div className="grid gap-5 grid-cols-2">
          {imagesToShow.map((image, i) =>
            image.isVideo ? (
              <CustomVideo key={i} video={image} />
            ) : (
              <CustomImage key={i} image={image} />
            )
          )}
        </div>
      )}
    </>
  );
};

export default ImageLists;
