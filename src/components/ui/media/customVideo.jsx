import { YoutubeVideo } from "./youtube-video";
import { cn } from "@/utils/cn";
import { ConstructYoutubeAltText } from "@/lib/constructAltText";

const CustomVideo = ({ video }) => {
  return (
    <div className={cn("relative w-full col-span-2 h-[300px] md:h-[600px]", video.className)}>
      <YoutubeVideo
        src={video.src}
        alt={video.alt || ConstructYoutubeAltText(video.src)}
        isMuted={video.videoSettings?.isMuted || true}
        isAutoPlay={video.videoSettings?.isAutoPlay || false}
        startTime={video.videoSettings?.startTime || 0}
      />
    </div>
  );
};

export default CustomVideo;
