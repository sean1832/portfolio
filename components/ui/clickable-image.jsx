import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BlurImage from "./blur";

const ClickableImage = ({ src, alt, className }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <BlurImage src={src} alt={alt} style={{ objectFit: "cover", cursor: "zoom-in" }} fill />
      </DialogTrigger>
      <DialogContent className="max-w-9xl max-h-[95vh] flex justify-center items-center">
        <div className="flex justify-center items-center w-11/12">
          <BlurImage
            src={src}
            alt={alt}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            width={1920}
            height={1080}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClickableImage;
