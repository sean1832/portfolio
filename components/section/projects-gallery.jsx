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
          {projects.map((project, i) => (
            <BentoGridItem
              key={i}
              title={project.name}
              description={project.description}
              header={
                <ImageHeader
                  src={project.hero.src}
                  alt={project.hero.alt}
                  sizes={project.hero.sizes}
                  href={project.bentoAttributes.href}
                />
              }
              className={`${project.bentoAttributes.className} uppercase`}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
};

const ImageHeader = ({ src, alt, href, sizes }) => (
  <Link
    className="relative w-full h-full dark:opacity-80 dark:hover:opacity-100 transition duration-200"
    href={href}
  >
    <BlurImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      style={{ objectFit: "cover", objectPosition: "bottom" }}
      className="rounded-xl dark:hover:scale-[1.02] transition duration-500"
    />
  </Link>
);

export default ProjectsGallery;
