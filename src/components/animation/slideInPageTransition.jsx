"use client";
import { motion } from "framer-motion";
import NavBar from "../layout/navbar";

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
    y: 0,
  },
  enter: {
    y: "-100%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const slideOut = {
  initial: {
    y: "100%",
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const perspective = {
  initial: {
    scale: 1,
    y: 0,
  },

  enter: {
    scale: 1,
    y: 0,
  },

  exit: {
    scale: 0.9,
    y: 0,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },

  enter: {
    opacity: 1,
  },

  exit: {
    opacity: 0.4,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const SlideInPageTransition = ({ children }) => {
  const isBrowser = () => typeof window !== "undefined";

  return (
    <div className="bg-black">
      <motion.div className="h-screen top-0 bg-background z-50 fixed w-screen" {...anim(slideIn)} />
      <motion.div
        className="h-screen top-0 bg-background z-50 fixed w-screen"
        {...anim(slideOut)}
        onAnimationComplete={() => {
          if (!isBrowser()) return;
          window.scrollTo(0, 0);
        }}
      />
      <motion.div {...anim(perspective)} className="origin-top">
        <motion.div {...anim(opacity)} className="bg-background">
          <NavBar />
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SlideInPageTransition;
