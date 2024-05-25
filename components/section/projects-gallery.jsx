import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import projects from "@/data/projects.json";
import Link from "next/link";
import BlurImage from "../ui/blur";

const ProjectsGallery = async () => {
  return (
    <div id="projects">
      <section>
        <BentoGrid className={`auto-rows-[30rem] md:auto-rows-[50rem] md:grid-cols-6`}>
          {projects.map((project, i) => {
            let heroImage = null;
            try {
              if (!project.images) {
                throw new Error(`Project "${project.name}" does not have images property.`);
              }
              heroImage = project.images.find((image) => image.hero);
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
                  <ImageHeader src={heroImage?.src} alt={heroImage?.alt} href={project.href} />
                }
                className={`${project.bentoAttributes.className} uppercase rounded-none border dark:border-background hover:dark:border-primary hover:border-black shadow-none`}
              />
            );
          })}
        </BentoGrid>
      </section>
    </div>
  );
};

const ImageHeader = ({ src, alt, href }) => (
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
    />
  </Link>
);

export default ProjectsGallery;
