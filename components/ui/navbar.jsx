import React from "react";
import navbarData from "@/data/navbar";
import { ZekeLogoIcon } from "./svg";
import { Separator } from "./separator";
import { ModeToggle } from "@/components/ui/theme/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex fixed z-20 ">
      <div className="fixed w-full bg-background">
        <div className="flex justify-center max-w-[1920px] flex-col mx-auto">
          <div className="flex items-center justify-between px-10 py-3">
            <div className="flex items-center">
              <a href="/#">
                <ZekeLogoIcon className="h-8 w-8" />
              </a>
            </div>
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-10">
              {navbarData.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className="text-m font-medium transition-colors dark:hover:text-primary dark:text-muted-foreground hover:text-gray-500 dark:text-gray-300 text-primary"
                >
                  {item.title}
                </Link>
              ))}

              <ModeToggle />
            </div>

            {/* Mobile Nav */}
            <div className="sm:hidden flex justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <button>
                    <MenuIcon className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-8 justify-center items-center text-2xl">
                    {navbarData.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        className="text-m font-medium transition-colors dark:hover:text-primary dark:text-muted-foreground hover:text-primary text-gray-600"
                      >
                        {item.title}
                      </a>
                    ))}
                    <ModeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <Separator />
      </div>
    </nav>
  );
};

export default NavBar;

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
