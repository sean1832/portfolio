import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import ConstructProjectHref from "@/lib/constructProjectHref";

const ProjectNavigationButton = ({ name, href, direction }) => {
  return (
    <div>
      {direction === "next" ? (
        <Button variant="ghost" asChild>
          <Link href={href} className=" md:text-xl font-light text-wrap text-right">
            {name.toUpperCase()} <ChevronRightIcon className="ml-2 h-5 w-5 md:h-8 md:w-8" />
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" asChild>
          <Link href={href} className=" md:text-xl font-light text-wrap text-left">
            <ChevronLeftIcon className="mr-2 h-5 w-5 md:h-8 md:w-8" /> {name.toUpperCase()}
          </Link>
        </Button>
      )}
    </div>
  );
};

// Define prop types for the button component
ProjectNavigationButton.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["next", "last"]).isRequired,
};

const ProjectNavigation = ({ projectData, index }) => {
  return (
    <div className="w-full mx-auto flex justify-between items-center max-w-[2048px] ">
      <div className="flex justify-between w-full lg:p-10 pt-10 ">
        {index > 0 && (
          <ProjectNavigationButton
            name={projectData[index - 1].name}
            href={ConstructProjectHref(projectData[index - 1].id)}
            direction="last"
          />
        )}
        {index === 0 && <div className="flex-grow"></div>}{" "}
        {/* Placeholder to push "next" button to the right */}
        {index < projectData.length - 1 && (
          <ProjectNavigationButton
            name={projectData[index + 1].name}
            href={ConstructProjectHref(projectData[index + 1].id)}
            direction="next"
            className={index === 0 ? "ml-auto" : ""}
          />
        )}
      </div>
    </div>
  );
};

// Define prop types for the navigation component
ProjectNavigation.propTypes = {
  projectData: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export { ProjectNavigation, ProjectNavigationButton };
