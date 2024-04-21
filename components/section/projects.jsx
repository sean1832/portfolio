import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import projects from "@/data/projects.json";
import Link from "next/link";
import BlurImage from "../ui/blur";

const Projects = async () => {
  return (
    <section>
      <BentoGrid className={`auto-rows-[50rem] md:auto-rows-[50rem] md:grid-cols-6`}>
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
      className="rounded-xl"
    />
  </Link>
);

export default Projects;
