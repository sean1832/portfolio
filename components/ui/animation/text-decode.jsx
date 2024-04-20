"use client";
import { useState, useEffect } from "react";

const TextDecode = ({
  text,
  blockChar = {
    enabled: false,
    random: false,
    char: "█",
  },
  hideAfter = false,
  interval = 150,
  delay = 0,
  onCompleted,
  initChar = "#&*0d@",
}) => {
  const [displayedText, setDisplayedText] = useState(initChar);
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    const currentText = Array(text.length).fill(" ");
    const revealed = Array(text.length).fill(false);

    const revealText = () => {
      const updatedText = currentText.map((_char, index) => {
        if (revealed[index]) {
          return text[index];
        } else if (revealed[index - 1] && blockChar.enabled) {
          if (blockChar.random) {
            return randomChars[Math.floor(Math.random() * randomChars.length)];
          } else {
            return blockChar.char;
          }
        } else if (hideAfter) {
          return "";
        } else {
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        }
      });

      setDisplayedText(updatedText.join(""));

      const revealIndex = revealed.findIndex((val) => val === false);
      if (revealIndex !== -1) {
        revealed[revealIndex] = true;
        setTimeout(revealText, interval);
      } else {
        onCompleted && onCompleted();
      }
    };

    setTimeout(revealText, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, hideAfter, interval, blockChar.enabled, blockChar.random, blockChar.char]);

  return <div>{displayedText}</div>;
};

export default TextDecode;
