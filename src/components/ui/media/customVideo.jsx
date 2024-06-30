import { YoutubeVideo } from "./youtube-video";
import { cn } from "@/utils/cn";
import { ConstructYoutubeAltText } from "@/lib/constructAltText";

const CustomVideo = ({ video }) => {
  return (
    <div className={cn("relative w-full col-span-2 h-[300px] md:h-[600px]", video.className)}>
      <YoutubeVideo
        src={video.src}
        alt={video.alt || ConstructYoutubeAltText(video.src)}
        isMutted={video.videoSettings?.isMutted || true}
        isAutoplay={video.videoSettings?.isAutoplay || false}
        startTime={video.videoSettings?.startAt || 0}
        isLoop={video.videoSettings?.isLoop || false}
      />
    </div>
  );
};

export default CustomVideo;
