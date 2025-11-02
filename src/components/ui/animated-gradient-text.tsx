import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  isAnimate?: boolean;
  delay?: number;
}

export const AnimatedGradientText = ({
  text,
  className,
  gradient = "from-blue-600 via-purple-600 to-blue-600",
  isAnimate = true,
  delay = 0,
}: AnimatedGradientTextProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAnimate || !textRef.current) return;

    const loadGsap = async () => {
      const { gsap } = await import("gsap");

      gsap.to(textRef.current, {
        backgroundPosition: "-200% center",
        ease: "linear",
        duration: 15,
        repeat: -1,
        delay,
      });

      loadGsap();
    };
  }, [isAnimate, delay]);

  return (
    <motion.div
      ref={textRef}
      className={cn(
        "inline-block font-bold bg-clip-text text-transparent",
        `bg-linear-to-r ${gradient}`,
        "bg-size-[200%_auto]",
        className
      )}
      style={{ backgroundPosition: "0% center" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedGradientText;
