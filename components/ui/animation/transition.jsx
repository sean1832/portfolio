"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import projectData from "@/data/projects";

const titles = projectData.reduce((acc, project) => {
  acc[project.href] = project.name;
  return acc;
}, {});

const Transition = ({ children }) => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(titles[pathname] || null);
  }, [pathname]);

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
        {pageTitle && (
          <motion.h1
            className="text-4xl dark:text-black text-white z-[60] fixed text-center flex justify-center items-center w-screen h-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transitionEnd: { display: "none" } }}
            transition={{ duration: 2 }}
          >
            {pageTitle.toUpperCase()}
          </motion.h1>
        )}
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
