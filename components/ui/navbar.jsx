import React from "react";
import navbarData from "@/data/navbar";
import { ZekeLogoIcon } from "./svg";
import { Separator } from "./separator";
import { ModeToggle } from "@/components/ui/theme/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 w-full">
        <div
          style={{ maxWidth: "1920px" }}
          className="w-full mx-auto flex justify-between items-center"
        >
          <Link className="flex items-center gap-2" href="/#">
            <ZekeLogoIcon className="w-8 h-8" />
          </Link>
          <nav className="items-center gap-4">
            <div className="hidden md:flex items-center gap-10">
              {navbarData.map((item, i) => (
                <Link
                  key={`navbar ${i}`}
                  href={item.url}
                  className="text-xl font-medium transition-colors dark:hover:text-primary dark:text-muted-foreground hover:text-gray-500 dark:text-gray-300 text-primary"
                >
                  {item.title}
                </Link>
              ))}
              <ModeToggle />
            </div>

            <div className="md:hidden flex justify-end">
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
                        key={`item ${item.id}`}
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
          </nav>
        </div>
      </div>
      <Separator className="w-full" /> {/* Add the Separator here */}
    </header>
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
