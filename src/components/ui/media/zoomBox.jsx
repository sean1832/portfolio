"use client";
import { useState } from "react";
import { cn } from "@/utils/cn";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const ZoomBox = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <Dialog onOpenChange={handleOpenToggle}>
        <DialogTrigger className="cursor-zoom-in">{children}</DialogTrigger>
        <DialogClose asChild>
          <DialogContent className="max-w-screen h-dvh cursor-zoom-out p-0 m-0 overflow-auto">
            <div className="flex justify-center items-center ">
              {React.cloneElement(children, {
                className: cn(children.props.className, "max-w-screen max-h-none"),
              })}
            </div>
          </DialogContent>
        </DialogClose>
      </Dialog>
    </div>
  );
};

export default ZoomBox;
