"use client";

import { getSizeClass } from "@/lib/utils";
import { motion } from "framer-motion";

const KeywordSection = () => {
  const Keywords = [
    {
      name: "React",
      x: "10%",
      y: "20%",
      delay: 0.2,
      size: "lg",
    },
    {
      name: "Vue",
      x: "75%",
      y: "70%",
      delay: 0.5,
      size: "sm",
    },
    {
      name: "TypeScript",
      x: "60%",
      y: "40%",
      delay: 0.8,
      size: "lg",
    },
    {
      name: "Next.js",
      x: "85%",
      y: "50%",
      delay: 1.1,
      size: "md",
    },
  ];

  return (
    <div className="w-full z-10">
      {Keywords.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${getSizeClass(
            item.size
          )} rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center font-bold text-primary`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 10, -5, 0],
            y: [0, -15, 5, 0],
          }}
          transition={{
            scale: { duration: 0.6, delay: item.delay },
            opacity: { duration: 0.6, delay: item.delay },
            x: {
              duration: 5 + index,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: item.delay,
            },
            y: {
              duration: 7 + index,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: item.delay,
            },
          }}
        >
          {item.name}
        </motion.div>
      ))}
    </div>
  );
};

export default KeywordSection;
