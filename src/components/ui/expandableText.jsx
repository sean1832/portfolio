"use client";
import { useState } from "react";
import { Button } from "./button";
import props from "prop-types";

const ExpandableText = ({ children, breakpoint = "md" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const breakpointVariants = {
    sm: {
      mobile: "sm:hidden block",
      desktop: "hidden sm:block",
    },
    md: {
      mobile: "md:hidden block",
      desktop: "hidden md:block",
    },
    lg: {
      mobile: "lg:hidden block",
      desktop: "hidden lg:block",
    },
    xlg: {
      mobile: "xlg:hidden block",
      desktop: "hidden xlg:block",
    },
  };

  const size = breakpointVariants[breakpoint];

  return (
    <>
      {/* mobile view */}
      <div className={size.mobile}>
        <div className={`relative overflow-hidden ${!isExpanded ? "h-48" : "h-auto"}`}>
          <p>{children}</p>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-background"></div>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <Button onClick={toggleExpansion} className="px-4 py-2">
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>

      {/* desktop view */}
      <div className={size.desktop}>{children}</div>
    </>
  );
};

ExpandableText.propTypes = {
  children: props.node.isRequired,
  breakpoint: props.string.isRequired,
};

export default ExpandableText;
