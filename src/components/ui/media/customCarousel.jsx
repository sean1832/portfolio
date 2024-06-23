import React, { useMemo } from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
  CarouselDescription,
} from "@/components/ui/carousel/carousel";
import BlurImage from "../media/blur";
import ExternalTextLink from "@/components/ui/external-text-link";

const CustomCarousel = ({ data, className }) => {
  const { carouselImages, indexMap } = useMemo(() => {
    const images = [];
    const indexMap = new Map();
    data.media.forEach((image, originalIndex) => {
      if (image.isCarousel) {
        indexMap.set(images.length, originalIndex);
        images.push(image);
      }
    });
    return { carouselImages: images, indexMap };
  }, [data.media]);

  if (carouselImages.length === 0) return null;

  const center = () => {
    if (carouselImages.length < 5) {
      return "flex justify-center";
    }
    return "";
  };

  return (
    <Carousel className={className}>
      <div className="relative">
        <div className="hidden sm:block">
          <CarouselNext className="border-none absolute right-0 top-1/2 transform -translate-y-1/2 shadow-none" />
          <CarouselPrevious className="border-none absolute left-0 top-1/2 transform -translate-y-1/2 shadow-none" />
        </div>

        <CarouselMainContainer>
          {carouselImages.map((image, index) => (
            <SliderMainItem
              key={indexMap.get(index)}
              className={`${
                image.caption || image.credit
                  ? "relative w-full sm:h-[550px] h-[300px]"
                  : "relative w-full sm:h-[600px] h-[300px]"
              }`}
            >
              <BlurImage
                src={image.src}
                alt={`Carousel Main Image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
                isExternal={image.isExternal}
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        {carouselImages.map((image, index) => (
          <CarouselDescription
            key={indexMap.get(index)}
            index={index}
            className={`${
              image.credit || image.caption ? "h-[40px]" : "hidden"
            } hidden sm:block pt-1`}
          >
            {image.caption && <p className="text-sm text-gray-500 ">{image.caption}</p>}
            {image.credit && (
              <ExternalTextLink href={image.credit.url} className="text-sm text-gray-500 italic">
                Image credit: {image.credit.text}
              </ExternalTextLink>
            )}
          </CarouselDescription>
        ))}
      </div>

      <CarouselThumbsContainer className={center()}>
        {carouselImages.map((image, index) => (
          <SliderThumbItem
            key={indexMap.get(index)}
            index={index}
            className="relative aspect-square w-full md:basis-1/6 basis-1/4 "
          >
            <BlurImage
              className={`cursor-pointer`}
              src={image.src}
              fill
              alt={`Carousel Thumbnail Image ${index + 1}`}
              style={{ objectFit: "cover" }}
              isExternal={image.isExternal}
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default CustomCarousel;
