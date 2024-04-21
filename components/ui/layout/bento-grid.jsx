import { cn } from "@/utils/cn";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 ", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={`row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:border-white/[0.2] border-transparent justify-between flex flex-col space-y-4 ${className}`}
    >
      {header}

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold mb-2 mt-2">{title}</div>
        <div className="font-sans font-normal text-xs text-gray-600 dark:text-gray-300">
          {description}
        </div>
      </div>
    </div>
  );
};
