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

const ZoomBox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenToggle}>
        <DialogTrigger className="cursor-zoom-in">{children}</DialogTrigger>
        <DialogClose asChild>
          <DialogContent className="max-w-screen h-dvh cursor-zoom-out p-0 m-0">
            <div className="flex justify-center items-center">
              {React.cloneElement(children, {
                className: cn(children.props.className, "max-h-screen object-contain"),
              })}
            </div>
          </DialogContent>
        </DialogClose>
      </Dialog>
    </>
  );
};

export default ZoomBox;
