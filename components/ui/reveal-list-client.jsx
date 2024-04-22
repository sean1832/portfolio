"use client";
import React from "react";

import { RevealList } from "next-reveal";

const RevealListClient = ({
  children,
  className,
  origin,
  opacity,
  delay,
  interval,
  duration,
}) => {
  return (
    <RevealList
      className={className}
      origin={origin}
      opacity={opacity}
      delay={delay}
      interval={interval}
      duration={duration}
    >
      {children}
    </RevealList>
  );
};

export default RevealListClient;
