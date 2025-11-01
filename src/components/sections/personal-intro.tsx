import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import TextRevealEffect from "../ui/text-reveal-effect";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { useTypeWriter } from "@/hooks/use-type-writer";

const GsapPersonalIntro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["前端开发者", "设计者", "创造者"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ y, scale, opacity }}
    >
      <div className="absolute inset-0 -z-10">
        <div className=" absolute inset-0 bg-linear-to-b from-background via-background/80 to-background opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            className="parallax absolute top-10 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="parallax absolute bottom-20 right-1/5 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="parallax absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 mt-12 lg:grid-cols-2 lg:mt-0 gap-12 items-center">
          <div ref={textRef} className="space-y-8">
            <TextRevealEffect
              text="你好，我是"
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              delay={1.5}
            />
            <AnimatedGradientText
              text="Scopter"
              className="text-7xl font-bold tracking-tight pb-2"
              gradient="from-blue-600 via-purple-600 to-blue-600"
              delay={3.5}
            />
            <h4 className=" text-2xl md:text-3xl font-semibold text-foreground/80 mt-4">
              热爱生活的{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  className=" inline-block relative text-primary"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  key={"key-" + currentWordIndex}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: 1.5,
                  }}
                >
                  {useTypeWriter({ texts: words, speed: 200, delay: 500 })}
                </motion.span>
              </AnimatePresence>
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GsapPersonalIntro;
