import { cn } from "@/utils/cn";
import RevealListClient from "@/components/ui/reveal-list-client";

export const BentoGrid = ({ className, children }) => {
  return (
    <RevealListClient
      origin="bottom"
      opacity={0}
      delay={0}
      interval={0}
      duration={500}
      className={cn("grid md:auto-rows-[18rem] grid-cols-1 lg:grid-cols-3 gap-4 ", className)}
    >
      {children}
    </RevealListClient>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={`row-span-1 border dark:border-background hover:dark:border-primary hover:border-black rounded-none group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4  border-transparent justify-between flex flex-col space-y-4 ${className}`}
    >
      {header}

      <div className="group-hover/bento:translate-x-2 transition duration-500">
        {icon}
        <div className="font-sans font-bold mb-2 mt-2">{title}</div>
        <div className="font-sans font-normal text-xs text-gray-600 dark:text-gray-300">
          {description}
        </div>
      </div>
    </div>
  );
};
