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
  CloseButton,
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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer";

import Image from "next/image";
import { YoutubeVideo } from "./youtube-video";
import { GetYoutubeThumbnail } from "@/lib/getYoutube";
import { ConstructYoutubeAltText } from "@/lib/constructAltText";
import { cn } from "@/lib/utils";
import CarouselWraper from "../carousel/carouselWraper";

const Lightbox = ({ images, index, children }) => {
  const center = () => {
    if (images.length < 15) {
      return "flex justify-center";
    }
    return "";
  };

  const desktopInfoBlock = ({ className }) => {
    return (
      <DialogHeader className={className}>
        <div className="flex justify-end">
          <div className="p-8 w-[300px]">
            {images.map((image, i) => (
              <CarouselDescription key={i} index={i} className="text-left">
                <DialogTitle className="text-xl font-bold">{image.alt.toUpperCase()}</DialogTitle>
                {image.longDescription && (
                  <DialogDescription className="py-3">{image.longDescription}</DialogDescription>
                )}
              </CarouselDescription>
            ))}
          </div>
          <CarouselThumbsContainer className={cn("h-screen w-[76px]", center())}>
            {images.map((image, i) => (
              <SliderThumbItem key={i} index={i} className="flex w-full basis-1">
                {image.isVideo ? (
                  <Image
                    className={`cursor-pointer`}
                    src={GetYoutubeThumbnail(image.src, "sd")}
                    fill
                    alt={`Carousel Thumbnail Image ${i + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    className={`cursor-pointer`}
                    src={image.src}
                    fill
                    alt={`Carousel Thumbnail Image ${i + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </SliderThumbItem>
            ))}
          </CarouselThumbsContainer>
        </div>
      </DialogHeader>
    );
  };

  const mobileInfoBlock = ({ className }) => {
    return (
      <>
        <DialogHeader className={className}>
          <Drawer>
            {images.map((image, i) => (
              <CarouselDescription key={i} index={i} className="">
                <DrawerTrigger className=" font-bold text-center">
                  {image.alt.toUpperCase()}
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{image.alt.toUpperCase()}</DrawerTitle>
                    {image.longDescription && (
                      <DrawerDescription className="py-3 text-left">
                        {image.longDescription}
                      </DrawerDescription>
                    )}
                  </DrawerHeader>

                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </CarouselDescription>
            ))}
          </Drawer>
        </DialogHeader>
      </>
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild className={"cursor-pointer"}>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-screen h-full p-0 m-0">
          <CarouselWraper className="px-6 flex flex-col md:flex-row" initIndex={index}>
            <DialogImage className="relative w-full h-auto md:h-screen">
              <CloseButton className="right-8 top-8" />
              <CarouselMainContainer className="h-[1080px]">
                {images.map((image, i) => (
                  <SliderMainItem key={i} className="flex items-center justify-center">
                    {image.isVideo ? (
                      <YoutubeVideo
                        src={image.src}
                        alt={image.alt || ConstructYoutubeAltText(image.src)}
                        className={"relative md:w-full w-[95%] md:max-h-[80vh] max-h-[60vh]"}
                      />
                    ) : (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width || 1920}
                        height={image.height || 1080}
                        className="max-w-full max-h-[80vh] object-contain"
                      />
                    )}
                  </SliderMainItem>
                ))}
              </CarouselMainContainer>
            </DialogImage>
            {desktopInfoBlock({ className: "md:block hidden" })}
            {mobileInfoBlock({ className: "md:hidden block" })}
          </CarouselWraper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Lightbox };
