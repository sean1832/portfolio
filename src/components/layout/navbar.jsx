"use client";
import React, { useState } from "react";
import { ZekeLogoIcon } from "../svg";
import { Separator } from "../ui/separator";
import { ModeToggle } from "@/components/ui/theme/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/utils/cn";
import CapitalizeFirstLetter from "@/lib/capitalizeFirstLetter";

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

const navbar = [{ title: "home" }, { title: "projects" }];

const NavbarLinks = ({ navbarData, className }) =>
  navbarData.map((item, i) => (
    <Link
      key={`navbar-link-${i}`}
      href={`/#${item.title}`}
      className={cn(
        `text-xl font-medium transition-colors dark:hover:text-primary dark:text-muted-foreground hover:text-gray-500 dark:text-gray-300 text-primary`,
        className
      )}
    >
      {CapitalizeFirstLetter(item.title)}
    </Link>
  ));

const NavBar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // if the user is scrolling down and the scroll position is greater than 100px
    setHidden(latest > previous && latest > 350);
  });

  return (
    <motion.div
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-background"
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6 w-full">
        <div className="w-full mx-auto flex justify-between items-center max-w-[1920px]">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/#home">
            <ZekeLogoIcon className="w-8 h-8" />
          </Link>

          {/* Desktop navigation */}
          <nav className="items-center gap-4">
            <div className="hidden md:flex items-center gap-10">
              <NavbarLinks navbarData={navbar} className="" />
              <ModeToggle />
            </div>

            {/* Burger menu */}
            <div className="md:hidden flex justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <button>
                    <MenuIcon className="h-8 w-8" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col justify-center">
                  <div className="flex flex-col gap-8 items-center">
                    <NavbarLinks navbarData={navbar} className="text-2xl" />
                    <ModeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </div>
      <Separator className="w-full" />
    </motion.div>
  );
};

export default NavBar;
