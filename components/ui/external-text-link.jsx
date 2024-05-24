import React from "react";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import LinkPreview from "./link-preview";

const ExternalTextLink = ({ children, href, key, className }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link target="_blank" href={href} key={key}>
          <span
            className={cn(
              "underline inline-block items-center hover:text-primary hover:no-underline",
              className
            )}
          >
            {children}
            <ExternalLinkIcon className="ml-1 w-4 h-4 inline-block" />
          </span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-[620px] text-sm">
        <LinkPreview url={href} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ExternalTextLink;
