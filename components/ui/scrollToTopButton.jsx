"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { ChevronUpIcon } from "@radix-ui/react-icons";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (!isVisible && window.scrollY > 300) {
      setIsVisible(true);
    } else if (isVisible && window.scrollY <= 300) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed md:right-[120px] right-[20px] duration-300 ${
        !isVisible ? "opacity-0 bottom-[60px]" : "opacity-100 bottom-[70px]"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollToTop}
        className={
          "rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground md:border-none md:bg-transparent"
        }
      >
        <ChevronUpIcon className="h-32 w-32" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
