import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import BlurImage from "../ui/media/blur";
import ConstructProjectHref from "@/lib/constructProjectHref";
import { cn } from "@/utils/cn";

const ProjectsGallerySection = async ({ projects }) => {
  return (
    <section id="projects">
      <BentoGrid className={`auto-rows-[30rem] md:auto-rows-[50rem] lg:grid-cols-6`}>
        {projects.map((project, i) => {
          const media = project.mediaContainer.media;
          let heroImage = null;
          try {
            if (!media) {
              throw new Error(`Project "${project.name}" does not have images property.`);
            }
            heroImage = media.find((image) => image.isHero && !image.isVideo);
            if (!heroImage) {
              throw new Error(`Project "${project.name}" does not have a hero image.`);
            }
          } catch (error) {
            console.error(error.message);
            // You can also render a fallback UI here if needed
            return (
              <div key={i} className="text-red-500 font-bold">
                {error.message}
              </div>
            );
          }
          return (
            <BentoGridItem
              key={i}
              title={project.name}
              description={project.description}
              header={
                <ImageHeader
                  src={heroImage?.src}
                  alt={heroImage?.alt}
                  href={ConstructProjectHref(project.id)}
                  blurDataURL={heroImage?.blurDataURL}
                />
              }
              className={cn("lg:col-span-3 uppercase", project.gallery.className)}
            />
          );
        })}
      </BentoGrid>
    </section>
  );
};

const ImageHeader = ({ src, alt, href, blurDataURL }) => (
  <Link
    className="relative w-full h-full dark:opacity-80 dark:hover:opacity-100 transition duration-200"
    href={href}
  >
    <BlurImage
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover", objectPosition: "bottom" }}
      className="transition duration-500"
      blurDataURL={blurDataURL}
    />
  </Link>
);

export default ProjectsGallerySection;
