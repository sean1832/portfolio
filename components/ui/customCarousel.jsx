import * as React from "react";
import Gallery from "./gallery";

const CustomCarousel = ({ data }) => {
  const carouselImages = data.images.filter((image) => image.isCarousel);
  if (carouselImages.length === 0) return null;
  return <Gallery images={carouselImages} />;
};

export default CustomCarousel;
