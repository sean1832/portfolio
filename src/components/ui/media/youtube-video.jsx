import React from "react";
import { cn } from "@/utils/cn";
import { SetYoutubeUrl } from "@/lib/youtubeUtil";
import propTypes from "prop-types";

const YoutubeVideo = ({ src, alt, className, startTime, isAutoplay, isLoop, isMutted }) => {
  return (
    <iframe
      src={SetYoutubeUrl(src, startTime, isAutoplay, isMutted, isLoop)}
      title={alt}
      className={cn("absolute inset-0 w-full h-full", className)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
      allowFullScreen
    />
  );
};

YoutubeVideo.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  className: propTypes.string,
  startTime: propTypes.number,
  isAutoPlay: propTypes.bool,
  isLoop: propTypes.bool,
  isMuted: propTypes.bool,
};

export { YoutubeVideo };
