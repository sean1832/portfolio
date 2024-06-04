import React from "react";
import FloatingButton from "./floatingButton";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const GithubFloatingButton = () => {
  return (
    <Link href="https://github.com/sean1832/portfolio" target="_blank">
      <FloatingButton scrollOffset={300} className="h-8 w-[152px] ">
        <GitHubLogoIcon className="mr-2 h-4 w-4 " /> View on GitHub
      </FloatingButton>
    </Link>
  );
};

export default GithubFloatingButton;
