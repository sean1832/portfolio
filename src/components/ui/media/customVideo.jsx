import { YoutubeVideo } from "./youtube-video";
import { cn } from "@/utils/cn";

const CustomVideo = ({ video }) => {
  return (
    <div className={cn("relative w-full col-span-2 h-[300px] md:h-[600px]", video.className)}>
      <YoutubeVideo src={video.src} alt={video.alt} />
    </div>
  );
};

export default CustomVideo;
