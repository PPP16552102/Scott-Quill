"use client";

import { useAnimation, useInView, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface TextRevealEffectProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

const TextRevealEffect = ({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  as: Component = "div",
}: TextRevealEffectProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once,
    amount: 0.5,
  });

  const words = text.split(",");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const wordVariants = {
    hidden: {},
    visible: {},
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: delay + i * duration,
      },
    }),
  };

  return (
    <Component className={className} ref={ref}>
      {words.map((word, wordIndex) => (
        <motion.div
          key={`word-${wordIndex}`}
          className="inline-block whitespace-nowrap"
          variants={wordVariants}
          initial="hidden"
          animate={controls}
          aria-hidden
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`char-${charIndex}`}
              className="inline-block"
              variants={charVariants}
              initial="hidden"
              animate={controls}
              custom={wordIndex * 0.25 + charIndex}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </motion.div>
      ))}
    </Component>
  );
};

export default TextRevealEffect;
