import { useEffect, useState } from "react";

export interface UseTypeWriterConfig {
  texts: string | string[];
  speed?: number;
  delay?: number;
}

export const useTypeWriter = ({
  texts,
  speed = 100,
  delay = 200,
}: UseTypeWriterConfig) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

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
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearInterval(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, delay]);

  return displayText;
};
