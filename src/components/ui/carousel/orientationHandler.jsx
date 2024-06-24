"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const OrientationHandler = ({
  children,
  breakSize = 768,
  maxOrientation = "horizontal",
  minOrientation = "horizontal",
}) => {
  const [orientation, setOrientation] = useState(maxOrientation);

  useEffect(() => {
    const handleOrientation = () => {
      if (window.innerWidth < breakSize) {
        setOrientation(minOrientation);
      } else {
        setOrientation(maxOrientation);
      }
    };
    handleOrientation();
    window.addEventListener("resize", handleOrientation);
    return () => window.removeEventListener("resize", handleOrientation);
  }, [breakSize, minOrientation, maxOrientation]);

  return children(orientation);
};

OrientationHandler.propTypes = {
  children: PropTypes.func.isRequired,
  breakSize: PropTypes.number,
  maxOrientation: PropTypes.oneOf(["horizontal", "vertical"]),
  minOrientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default OrientationHandler;
