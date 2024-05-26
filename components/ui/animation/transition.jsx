"use client";
import { motion, AnimatePresence } from "framer-motion";

const Transition = ({ children }) => {
  const animateUp = {
    initial: {
      y: 0,
    },
    animate: {
      y: "-100%",
    },
    exit: {
      y: 0,
    },
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  };

  const animateDown = {
    initial: {
      y: 0,
    },
    animate: {
      y: "100%",
    },
    exit: {
      y: 0,
    },
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`banner-1`}
          className="h-1/2 top-0 dark:bg-primary bg-black z-50 fixed w-screen"
          initial={animateUp.initial}
          animate={animateUp.animate}
          exit={animateUp.exit}
          transition={animateUp.transition}
        />
        <motion.div
          key={`banner-2`}
          className="h-1/2 top-1/2 dark:bg-primary bg-black z-50 fixed w-screen"
          initial={animateDown.initial}
          animate={animateDown.animate}
          exit={animateDown.exit}
          transition={animateDown.transition}
        />
      </AnimatePresence>
      {children}
    </>
  );
};

export default Transition;
