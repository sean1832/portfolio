import React from "react";
import profile from "@/data/profile.json";
import { buttonVariants } from "@/components/ui/buttons/button";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { IoLogoYoutube } from "react-icons/io5";
import Image from "next/image";
import profileImage from "@/public/profile/zeke.webp";
import Link from "next/link";

const AboutReveal = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    visibleDelayed: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } },
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4">
      <div className="max-w-2xl w-full flex justify-center">
        <Image
          src={profileImage}
          alt={profile.image.alt}
          style={{ width: "auto", objectFit: "cover", objectPosition: "bottom" }}
          className="rounded-xl"
          placeholder="blur"
          width={400}
          height={350}
        />
      </div>
      <div className="max-w-2xl w-full px-4 flex flex-col gap-3">
        <h2 className="text-4xl font-bold">ZEKE ZHANG</h2>
        <p>{profile.about}</p>
        <div className="py-4 gap-9 flex justify-left">
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
    </div>
  );
};

export default AboutReveal;
