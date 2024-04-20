"use client";
import { useState, useEffect } from "react";
import TextDecode from "./text-decode";

const TextDecodeCycle = ({ texts, interval = 150, cycleInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textCompleted, setTextCompleted] = useState(false);

  const handleTextCompleted = () => {
    if (!textCompleted) {
      setTextCompleted(true);
    }
  };

  useEffect(() => {
    if (textCompleted) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTextCompleted(false); // reset textCompleted
      }, cycleInterval);

      return () => clearTimeout(timer); // Use clearTimeout to clean up
    }
  }, [textCompleted, texts.length, cycleInterval]);

  return (
    <TextDecode text={texts[currentIndex]} interval={interval} onCompleted={handleTextCompleted} />
  );
};

export default TextDecodeCycle;
