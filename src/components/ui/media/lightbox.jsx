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

import BlurImage from "./blur";
import Image from "next/image";
import CustomVideo from "./customVideo";
import { YoutubeVideo } from "./youtube-video";
import { GetYoutubeThumbnail } from "@/lib/getYoutube";
import { ConstructYoutubeAltText } from "@/lib/constructAltText";
import { cn } from "@/lib/utils";

const Lightbox = ({ images, index, children }) => {
  const center = () => {
    if (images.length < 15) {
      return "flex justify-center";
    }
    return "";
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className={"cursor-pointer"}>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-screen h-full p-0 m-0">
          <Carousel className="px-6 grid grid-cols-6" initIndex={index} orientation="vertical">
            <DialogImage className="col-span-5 relative">
              <CloseButton className="right-8 top-8" />
              <CarouselMainContainer className="h-[1080px]">
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
                        className="max-w-full max-h-[80vh] object-contain"
                      />
                    )}
                  </SliderMainItem>
                ))}
              </CarouselMainContainer>
            </DialogImage>
            <DialogHeader className={"col-span-1 flex justify-center align-middle"}>
              <div className="grid grid-cols-6">
                <div className="col-span-5 p-8">
                  {images.map((image, i) => (
                    <CarouselDescription key={i} index={i} className="text-left">
                      <DialogTitle className="text-xl font-bold">
                        {image.alt.toUpperCase()}
                      </DialogTitle>
                      {image.longDescription && (
                        <DialogDescription className="py-3">
                          {image.longDescription}
                        </DialogDescription>
                      )}
                    </CarouselDescription>
                  ))}
                </div>
                <CarouselThumbsContainer className={cn("h-screen", center())}>
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
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Lightbox };
