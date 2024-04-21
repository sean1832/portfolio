import React from "react";
import profile from "@/data/profile.json";
import { buttonVariants } from "../ui/buttons/button";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { IoLogoYoutube } from "react-icons/io5";
import Link from "next/link";
import BlurImage from "../ui/blur";

const About = () => {
  return (
    <div id="about">
      <section className="flex flex-col justify-center items-center h-screen w-full">
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="max-w-2xl w-full flex justify-center">
            <BlurImage
              src={profile.image.src}
              alt={profile.image.alt}
              style={{ width: "auto", objectFit: "cover", objectPosition: "bottom" }}
              className="rounded-xl"
              width={400}
              height={350}
            />
          </div>
          <div className="max-w-2xl w-full px-4 flex flex-col gap-3">
            <h2 className="text-4xl font-bold">ZEKE ZHANG</h2>
            <p>{profile.about}</p>
            <div className="py-4 gap-9 flex justify-left">
              <Link href={profile.social.github} className={buttonVariants({ variant: "ghost" })}>
                <GitHubLogoIcon />
              </Link>
              <Link
                href={profile.social.instagram}
                className={buttonVariants({ variant: "ghost" })}
              >
                <InstagramLogoIcon />
              </Link>
              <Link href={profile.social.youtube} className={buttonVariants({ variant: "ghost" })}>
                <IoLogoYoutube />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
