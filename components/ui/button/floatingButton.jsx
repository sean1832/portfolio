"use client";
import { useState, useEffect } from "react";
import { Button } from "../button";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import props from "prop-types";
import { cn } from "@/lib/utils";

const FloatingButton = ({ scrollOffset, onClick, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (!isVisible && window.scrollY > scrollOffset) {
      setIsVisible(true);
    } else if (isVisible && window.scrollY <= scrollOffset) {
      setIsVisible(false);
    }
  };

  // if scrolled down {scrollOffset}px from the top, show the button
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      className={`fixed md:right-[60px] right-[20px] duration-300 ${
        !isVisible ? "opacity-0 bottom-[60px]" : "opacity-100 bottom-[70px]"
      }`}
    >
      {onClick ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={cn(
            "rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground md:border-none",
            className
          )}
        >
          {children}
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground md:border-none md:bg-transparent",
            className
          )}
        >
          {children}
        </Button>
      )}
    </div>
  );
};

FloatingButton.propTypes = {
  scrollOffset: props.number == 300,
  onClick: props.func,
  children: props.node.isRequired,
};

export default FloatingButton;
