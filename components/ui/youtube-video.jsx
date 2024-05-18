import React from "react";

export const YoutubeVideo = ({ src, alt, mute }) => {
  return (
    <iframe
      src={src + (mute ? "&mute=1" : "")}
      title={alt}
      className="absolute inset-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
