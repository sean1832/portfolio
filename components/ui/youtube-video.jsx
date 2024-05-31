import React from "react";
import { cn } from "@/utils/cn";

const YoutubeVideo = ({ src, alt, mute, className }) => {
  return (
    <iframe
      src={src + (mute ? "&mute=1" : "")}
      title={alt}
      className={cn("absolute inset-0 w-full h-full", className)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};

export { YoutubeVideo };
