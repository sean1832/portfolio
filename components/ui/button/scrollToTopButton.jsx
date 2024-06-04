"use client";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import FloatingButton from "./floatingButton";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FloatingButton scrollOffset={300} onClick={scrollToTop} className="md:w-16 md:h-16 w-8 h-8">
      <ChevronUpIcon className="h-16 w-16" />
    </FloatingButton>
  );
};

export default ScrollToTopButton;
