import React from "react";
import FloatingButton from "./floatingButton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import manifest from "@/data/manifest";

const GithubFloatingButton = () => {
  return (
    <Link href={manifest.repository.url} target="_blank">
      <FloatingButton
        scrollOffset={300}
        className="h-8 md:w-[152px] w-8 opacity-80 hover:opacity-100"
      >
        <GitHubLogoIcon className="h-6 w-6 md:h-4 md:w-4 md:mr-2" />
        <div className="hidden md:block"> View on GitHub</div>
      </FloatingButton>
    </Link>
  );
};

export default GithubFloatingButton;
