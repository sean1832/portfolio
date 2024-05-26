import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ProjectNavigationButton = ({ name, href, direction }) => {
  return (
    <div>
      {direction === "next" ? (
        <Link
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          scroll={false}
        >
          {name.toUpperCase()} →
        </Link>
      ) : (
        <Link
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          scroll={false}
        >
          ← {name.toUpperCase()}
        </Link>
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
    <div className="flex justify-between w-full p-10">
      {index > 0 && (
        <ProjectNavigationButton
          name={projectData[index - 1].name}
          href={projectData[index - 1].href}
          direction="last"
        />
      )}
      {index === 0 && <div className="flex-grow"></div>}{" "}
      {/* Placeholder to push "next" button to the right */}
      {index < projectData.length - 1 && (
        <ProjectNavigationButton
          name={projectData[index + 1].name}
          href={projectData[index + 1].href}
          direction="next"
          className={index === 0 ? "ml-auto" : ""}
        />
      )}
    </div>
  );
};

// Define prop types for the navigation component
ProjectNavigation.propTypes = {
  projectData: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export { ProjectNavigation, ProjectNavigationButton };
