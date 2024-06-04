"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carouselLegacy";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import ExternalTextLink from "../external-text-link";

// Reference
// https://www.reddit.com/r/nextjs/comments/1cgktu9/shadcnui_image_carousel_with_thumbnail_images/
const Gallery = ({ images }) => {
  const [mainApi, setMainApi] = useState(null);
  const [thumbnailApi, setThumbnailApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className={`${
            image.caption || image.credit
              ? "relative w-full sm:h-[550px] h-[300px]"
              : "relative w-full sm:h-[600px] h-[300px]"
          }`}
        >
          <Image
            src={image.src}
            alt={`Carousel Main Image ${index + 1}`}
            fill
            style={{ objectFit: "contain" }}
          />
        </CarouselItem>
      )),
    [images]
  );

  const descriptionText = useMemo(
    () =>
      images.map((image, index) => (
        <div key={index} className="text-center">
          {index === current && image.caption && (
            <p className="text-sm text-gray-500">{image.caption}</p>
          )}
          {index === current && image.credit && (
            <ExternalTextLink href={image.credit.url} className="text-sm text-gray-500 italic">
              Image credit: {image.credit.text}
            </ExternalTextLink>
          )}
        </div>
      )),
    [images, current]
  );

  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-square w-full md:basis-1/6 basis-1/4"
          onClick={() => handleClick(index)}
        >
          <Image
            className={`${
              index === current
                ? "scale-100 duration-300"
                : "opacity-70 hover:opacity-90 scale-90 duration-300 "
            } p-1 cursor-pointer`}
            src={image.src}
            fill
            alt={`Carousel Thumbnail Image ${index + 1}`}
            style={{ objectFit: "cover" }}
          />
        </CarouselItem>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, current]
  );

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on("select", handleTopSelect);
    thumbnailApi.on("select", handleBottomSelect);

    return () => {
      mainApi.off("select", handleTopSelect);
      thumbnailApi.off("select", handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  const handleClick = (index) => {
    if (!mainApi || !thumbnailApi) {
      return;
    }
    thumbnailApi.scrollTo(index);
    mainApi.scrollTo(index);
    setCurrent(index);
  };

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const center = () => {
    if (images.length < 5) {
      return "flex justify-center";
    }
    return "";
  };

  return (
    <div className="py-4">
      <Carousel
        setApi={setMainApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <div className="sm:h-[600px] h-[300px]">
          <CarouselContent className="m-1">{mainImage}</CarouselContent>
          <div className="hidden lg:block">{descriptionText}</div>
        </div>
      </Carousel>

      <Carousel setApi={setThumbnailApi}>
        <CarouselContent className={`m-1 pt-4 ${center()}`}>{thumbnailImages}</CarouselContent>
        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default Gallery;
