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
    <FloatingButton scrollOffset={300} onClick={scrollToTop}>
      <ChevronUpIcon className="h-32 w-32" />
    </FloatingButton>
  );
};

export default ScrollToTopButton;
