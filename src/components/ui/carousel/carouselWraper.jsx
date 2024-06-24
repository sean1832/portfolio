"use client";
import OrientationHandler from "./orientationHandler";
import { Carousel } from "./carousel";

const CarouselWraper = ({ children, initIndex, className, carouselOption }) => {
  return (
    <OrientationHandler breakSize={865} maxOrientation="vertical" minOrientation="horizontal">
      {(orientation) => (
        <Carousel
          className={className}
          initIndex={initIndex}
          orientation={orientation}
          carouselOption={carouselOption}
        >
          {children}
        </Carousel>
      )}
    </OrientationHandler>
  );
};

export default CarouselWraper;
