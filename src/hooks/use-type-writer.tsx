import { useEffect, useState } from "react";

export interface UseTypeWriterConfig {
  texts: string | string[];
  speed?: number;
  delay?: number;
  isCursorShow?: boolean;
  cursorChar?: string;
  cursorBlinkSpeed?: number;
  isEllipsisShow?: boolean;
  ellipsisSpeed?: number;
}

export const useTypeWriter = ({
  texts,
  speed = 100,
  delay = 200,
  isCursorShow = true,
  cursorChar = "|",
  cursorBlinkSpeed = 500,
  isEllipsisShow = true,
  ellipsisSpeed = 400,
}: UseTypeWriterConfig) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [ellipsis, setEllipsis] = useState("");

  const textArray = Array.isArray(texts) ? texts : [texts];

  // cursor blink effect
  useEffect(() => {
    if (!isCursorShow) return;

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [isCursorShow, cursorBlinkSpeed]);

  // ellipsis effect
  useEffect(() => {
    if (!isEllipsisShow) return;

    const shouldShowEllipsis =
      !isDeleting && charIndex < textArray[textIndex].length;

    if (!shouldShowEllipsis) {
      setEllipsis("");
      return;
    }

    const ellipsisInterval = setInterval(() => {
      setEllipsis((prev) => {
        const count = (prev.length % 3) + 1;
        return ".".repeat(count);
      });
    }, ellipsisSpeed);

    return () => clearInterval(ellipsisInterval);
  }, [isEllipsisShow, ellipsisSpeed]);

  useEffect(() => {
    const currentText = textArray[textIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.substring(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.substring(0, charIndex - 1));
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearInterval(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, delay]);

  const finalText =
    displayText + ellipsis + (isCursorShow && cursorVisible ? cursorChar : "");

  return {
    text: displayText,
    fullText: finalText,
    ellipsis,
    cursorVisible,
    isDeleting,
    currentIndex: textIndex,
    isTyping: !isDeleting && charIndex < textArray[textIndex].length,
    isComplete: !isDeleting && charIndex === textArray[textIndex].length,
  };
};
