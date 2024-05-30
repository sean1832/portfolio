import React from "react";
import ExternalTextLink from "../ui/external-text-link";
import ImageLists from "../ui/images-list";
import { YoutubeVideo } from "../ui/youtube-video";
import BlurImage from "../ui/blur";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CustomImage from "../ui/customImage";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const ProjectDetails = ({ data, className }) => (
  <div className={className}>
    <div className="flex flex-col gap-y-4">
      {data.location.url ? (
        <div>
          <strong className="text-primary">Location: </strong>
          <ExternalTextLink href={data.location.url}>{data.location.name}</ExternalTextLink>
        </div>
      ) : (
        <div>
          <strong className="text-primary">Location: </strong>
          {data.location.name}
        </div>
      )}
      {data.group && data.group.length > 0 && (
        <div>
          <strong className="text-primary">Group: </strong>
          {data.group.join(", ")}
        </div>
      )}
      {data.tutors && data.tutors.length > 0 && (
        <div>
          <strong className="text-primary">Supervisors: </strong>
          {data.tutors.map((tutor, i) => (
            <React.Fragment key={i}>
              {i > 0 && ", "}
              <ExternalTextLink href={tutor.url}>{tutor.name}</ExternalTextLink>
            </React.Fragment>
          ))}
        </div>
      )}
      {data.awards && data.awards.length > 0 && (
        <div>
          <strong className="text-primary">Awards: </strong>
          {data.awards.map((award, i) => (
            <div key={i}>
              <ExternalTextLink href={award.url}>
                {"- "}
                {award.name}
              </ExternalTextLink>
            </div>
          ))}
        </div>
      )}
      {data.publications && data.publications.length > 0 && (
        <div>
          <strong className="text-primary">Publications: </strong>
          {data.publications.map((link, i) => (
            <div key={i}>
              <ExternalTextLink href={link.url}>
                {"- "}
                {link.name}
              </ExternalTextLink>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const CarouselSection = ({ data, className }) => {
  const carouselImages = data.images.filter((image) => image.isCarousel);
  if (carouselImages.length === 0) return null;
  return (
    // <Carousel className={className}>
    //   <CarouselContent>
    //     <CarouselItem>
    //       <div className="flex flex-col items-center p-2">
    //         <Image
    //           alt="Landscape"
    //           className="aspect-video object-cover rounded-lg"
    //           src="https://freight.cargo.site/w/2750/i/b49c1c726655b2f18f70364355b986d0d9071d531af1fcc672461fa5706e88bd/MONGREL-ASSEMBLIES_ANIMATION_PROVINANCE-MAPPING_V04.jpg"
    //           height={1920}
    //           width={1080}
    //         />
    //         <p className="text-sm mt-2.5">Landscape</p>
    //       </div>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <div className="flex flex-col items-center p-2">
    //         <Image
    //           alt="Portrait"
    //           className="aspect-video object-cover rounded-lg"
    //           height={1920}
    //           src="https://freight.cargo.site/w/1500/i/bb98ce4c2b6276122c92a6bd7d0dd32fbb4becdfc980d8d32e690d7266b6b9f2/foreoi-website-copy2.jpg"
    //           width={1080}
    //         />
    //         <p className="text-sm mt-2.5">Portrait</p>
    //       </div>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <div className="flex flex-col items-center p-2">
    //         <Image
    //           alt="Abstract"
    //           className="aspect-video object-cover rounded-lg"
    //           height={1920}
    //           src="https://freight.cargo.site/w/2750/i/82664724a75fd3347e92384ec19a0836d270a341c7c1096c086922ecaaf3d5a1/A-Wild-Hope_-material-schedule-3-copy.jpg"
    //           width={1080}
    //         />
    //         <p className="text-sm mt-2.5">Abstract</p>
    //       </div>
    //     </CarouselItem>
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
    <Carousel className={className}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const ProjectInfo = ({ data }) => {
  const heroImage = data.images.find((image) => image.isHero == true);
  return (
    <section className="flex flex-col gap-10">
      {/* Hero image */}
      <div className="pt-32">
        <div className="flex relative max-w-[2560px] mx-auto md:h-[800px] h-[300px]">
          {/* If there is no video, show the image; otherwise, show the video */}
          {data.video ? (
            <YoutubeVideo src={data.video.src} alt={data.video.alt} mute />
          ) : (
            <a href={heroImage.src} target="_blank" rel="noopener noreferrer">
              <BlurImage
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </a>
          )}
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 max-w-9xl mx-auto gap-4 px-4">
        <div className="flex flex-col gap-5 col-span-3 dark:text-gray-300 text-gray-700">
          <div>
            <div className="text-2xl lg:text-3xl font-semibold text-primary">
              {data.name.toUpperCase()}
            </div>
            <div className="font-bold text-primary">
              {data.type} - {data.year}
            </div>
          </div>

          {/* Description for mobile */}
          <div className="lg:hidden">
            <div className="text-primary">
              <strong>Description: </strong>
              {data.longDescription}
            </div>
          </div>

          {/* Other info for Desktop */}
          <ProjectDetails data={data} className="hidden lg:block" />

          {/* Details for desktop */}
          <div className="hidden lg:block">
            <div className="text-primary">
              <strong>Description: </strong>
              {data.longDescription}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="col-span-9">
          <ImageLists data={data} />
          <CarouselSection data={data} className={"w-full py-4"} />
        </div>

        {/* Other info for mobile */}
        <ProjectDetails
          data={data}
          className={`lg:hidden flex flex-col gap-5 dark:text-gray-300 text-gray-700`}
        />
      </div>
    </section>
  );
};

export default ProjectInfo;
