"use client";
import { useState } from "react";
import { Button } from "./button";

const ExpandableText = ({ maxLength, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const text = children;

  // if text is less than maxLength, show the full text without the "Show More" button
  if (text.length <= maxLength) {
    return <div>{text}</div>;
  }

  return (
    <div>
      <div className={`relative overflow-hidden ${!isExpanded ? "h-48" : "h-auto"}`}>
        <p>{isExpanded ? text : `${text.substring(0, maxLength)}...`}</p>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-white"></div>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <Button onClick={toggleExpansion} className="px-4 py-2">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default ExpandableText;
