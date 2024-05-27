"use client";
import { motion } from "framer-motion";

// reference: https://blog.olivierlarose.com/articles/nextjs-page-transition-guide
const anim = (variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const slideIn = {
  initial: {
    x: 0,
  },
  enter: {
    x: "-100%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const slideOut = {
  initial: {
    x: "100%",
  },
  exit: {
    x: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const SlideInPageTransition = ({ children }) => {
  const isBrowser = () => typeof window !== "undefined";

  return (
    <div>
      <motion.div
        className="h-screen top-0 dark:bg-primary bg-black z-50 fixed w-screen"
        {...anim(slideIn)}
      />
      <motion.div
        className="h-screen top-0 dark:bg-primary bg-black z-50 fixed w-screen"
        {...anim(slideOut)}
        onAnimationComplete={() => {
          if (!isBrowser()) return;
          window.scrollTo(0, 0);
        }}
      />
      {children}
    </div>
  );
};

export default SlideInPageTransition;
