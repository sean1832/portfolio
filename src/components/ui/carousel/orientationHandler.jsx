"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const OrientationHandler = ({
  children,
  breakSize = 768,
  maxOrientation = "horizontal",
  minOrientation = "horizontal",
}) => {
  const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    const handleOrientation = () => {
      if (window.innerWidth < breakSize) {
        setOrientation(minOrientation);
      } else {
        setOrientation(maxOrientation);
      }
    };

    // Run once immediately
    handleOrientation();

    // Set up event listener for future resizes
    window.addEventListener("resize", handleOrientation);

    // Clean up
    return () => window.removeEventListener("resize", handleOrientation);
  }, [breakSize, minOrientation, maxOrientation]);

  // Don't render children until orientation is determined
  if (orientation === null) {
    return null;
  }

  return children(orientation);
};

OrientationHandler.propTypes = {
  children: PropTypes.func.isRequired,
  breakSize: PropTypes.number,
  maxOrientation: PropTypes.oneOf(["horizontal", "vertical"]),
  minOrientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default OrientationHandler;
