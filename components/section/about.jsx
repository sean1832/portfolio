import React from "react";
import RevealListClient from "../ui/reveal-list-client";
import profile from "@/data/profile.json";
import { buttonVariants } from "@/components/ui/buttons/button";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { IoLogoYoutube } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div id="about">
      <section className="flex flex-col justify-center items-center h-screen w-full">
        <RevealListClient
          className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4"
          origin="bottom"
          opacity={0}
          delay={200}
          interval={300}
          duration={1500}
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
            <h2 className="text-2xl md:text-4xl font-bold">ZEKE ZHANG</h2>
            <p>{profile.about}</p>
            <div className="py-4 gap-9 flex justify-left ">
              <Link
                href={profile.social.github}
                className={buttonVariants({ variant: "ghost" })}
                target="_blank"
              >
                <GitHubLogoIcon />
              </Link>
              <Link
                href={profile.social.instagram}
                className={buttonVariants({ variant: "ghost" })}
                target="_blank"
              >
                <InstagramLogoIcon />
              </Link>
              <Link
                href={profile.social.youtube}
                className={buttonVariants({ variant: "ghost" })}
                target="_blank"
              >
                <IoLogoYoutube />
              </Link>
            </div>
          </div>
        </RevealListClient>
      </section>
    </div>
  );
};

export default About;
