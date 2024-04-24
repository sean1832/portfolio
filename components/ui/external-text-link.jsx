import React from "react";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const ExternalTextLink = ({ children, href, key, className }) => {
  return (
    <Link target="_blank" href={href} key={key}>
      <span className={cn("hover:underline inline-block items-center", className)}>
        {children}
        <ExternalLinkIcon className="ml-1 w-4 h-4 inline-block" />
      </span>
    </Link>
  );
};

export default ExternalTextLink;
