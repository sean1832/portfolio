"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "../switch";

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Ensure the component is only rendered on the client side
  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={handleToggle}
        className="bg-primary"
      />
    </div>
  );

  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" size="icon">
  //         <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //         <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //         <span className="sr-only">Toggle theme</span>
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent align="end">
  //       <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
  //       <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
  //       <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
