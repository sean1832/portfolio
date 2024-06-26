import React from "react";
import RevealListClient from "../animation/reveal-list-client";
import profile from "@data/profile.json";
import { buttonVariants } from "@/components/ui/button";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { IoLogoYoutube } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section id="about" className="flex flex-col justify-center items-center md:h-screen w-full">
      <RevealListClient
        className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4"
        origin="bottom"
        distance={"35px"}
        opacity={0}
        delay={0}
        interval={300}
        duration={800}
      >
        <div className="max-w-2xl w-full flex justify-center">
          <Image
            src={profile.image.src}
            alt={profile.image.alt}
            style={{ width: "auto", objectFit: "cover", objectPosition: "bottom" }}
            width={400}
            height={350}
          />
        </div>
        <div className="max-w-2xl w-full px-4 flex flex-col gap-3">
          <h2 className="text-responsive2xl-4xl font-bold">ZEKE ZHANG</h2>
          <p>{profile.about}</p>
          <div className="py-4 gap-9 flex justify-left ">
            <Link
              href={profile.social.github}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
            >
              <GitHubLogoIcon className="h-6 w-6" />
            </Link>
            <Link
              href={profile.social.instagram}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
            >
              <InstagramLogoIcon className="h-6 w-6" />
            </Link>
            <Link
              href={profile.social.youtube}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
            >
              <IoLogoYoutube className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </RevealListClient>
    </section>
  );
};

export default AboutSection;
