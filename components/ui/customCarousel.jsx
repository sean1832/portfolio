"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ExternalTextLink from "../ui/external-text-link";

const CustomCarousel = ({ data, className }) => {
  const carouselImages = data.images.filter((image) => image.isCarousel);
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  if (carouselImages.length === 0) return null;
  return (
    <Carousel className={className} plugins={[plugin.current]}>
      <CarouselContent>
        {carouselImages.map((image, i) => (
          <CarouselItem key={i}>
            <div className="flex flex-col items-center">
              <Image
                key={i}
                src={image.src}
                alt={image.alt}
                className="aspect-video object-cover"
                width={1920}
                height={1080}
              />
              <p className="text-sm mt-2.5">{image.caption}</p>
              {image.credit && (
                <>
                  <p className="text-sm mt-2.5 text-gray-500">
                    Credit:{" "}
                    <ExternalTextLink href={image.credit.url}>{image.credit.text}</ExternalTextLink>
                  </p>
                </>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
