import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogImage,
} from "@/components/ui/dialog";

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

import BlurImage from "./blur";
import Image from "next/image";
import CustomVideo from "./customVideo";
import { YoutubeVideo } from "./youtube-video";
import { GetYoutubeThumbnail } from "@/lib/getYoutube";

const Lightbox = ({ images, index, children }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className={"cursor-pointer"}>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-screen h-full p-0 m-0">
          <Carousel className="p-8 grid grid-cols-6" initIndex={index}>
            <DialogImage className="col-span-5">
              <CarouselMainContainer>
                {images.map((image, i) => (
                  <SliderMainItem key={i} className="flex items-center justify-center">
                    {image.isVideo ? (
                      <YoutubeVideo
                        src={image.src}
                        alt={image.alt || ConstructYoutubeAltText(image.src)}
                        className={"relative w-full h-full"}
                      />
                    ) : (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width || 1920}
                        height={image.height || 1080}
                        className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
                      />
                    )}
                  </SliderMainItem>
                ))}
              </CarouselMainContainer>

              <DialogClose className="cursor-pointer" />
            </DialogImage>
            <DialogHeader className={"col-span-1 flex justify-center align-middle"}>
              <DialogTitle>this is a title</DialogTitle>
              <DialogDescription>this is a description</DialogDescription>
              <CarouselThumbsContainer>
                {images.map((image, i) => (
                  <SliderThumbItem
                    key={i}
                    index={i}
                    className="relative aspect-square w-full md:basis-1/6 basis-1/4 "
                  >
                    {image.isVideo ? (
                      <Image
                        className={`p-1 cursor-pointer`}
                        src={GetYoutubeThumbnail(image.src, "hq")}
                        fill
                        alt={`Carousel Thumbnail Image ${i + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        className={`p-1 cursor-pointer`}
                        src={image.src}
                        fill
                        alt={`Carousel Thumbnail Image ${i + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </SliderThumbItem>
                ))}
              </CarouselThumbsContainer>
            </DialogHeader>
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Lightbox };
