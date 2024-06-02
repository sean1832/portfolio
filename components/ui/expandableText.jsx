"use client";
import { useState } from "react";
import { Button } from "./button";

const ExpandableText = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const text = children;

  return (
    <>
      {/* mobile view */}
      <div className="lg:hidden block">
        <div className={`relative overflow-hidden ${!isExpanded ? "h-48" : "h-auto"}`}>
          <p>{text}</p>
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
      <div className="hidden lg:block">{text}</div>
    </>
  );
};

export default ExpandableText;
