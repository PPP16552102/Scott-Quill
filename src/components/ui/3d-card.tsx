import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  shadowColor?: string;
  glareColor?: string;
  backgroundGradient?: string;
  rotationIntensity?: number;
  glareIntensity?: number;
}

const ThreeDCard = ({
  children,
  className,
  rotationIntensity = 15,
  glareIntensity = 0.5,
  borderColor = "rgba(255, 255, 255, 0.1)",
  shadowColor = "rgba(0, 0, 0, 0.3)",
  glareColor = "rgba(255, 255, 255, 0.4)",
  backgroundGradient = "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
}: ThreeDCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    damping: 20,
    stiffness: 300,
  };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [rotationIntensity, -rotationIntensity]),
    springConfig
  );

  const glareX = useSpring(mouseX, springConfig);
  const glareY = useSpring(mouseY, springConfig);
  const glareOpacity = useSpring(useMotionValue(0), {
    damping: 25,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const normalizedX = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / width)
    );
    const normalizedY = Math.max(
      0,
      Math.min(1, (e.clientY - rect.top) / height)
    );

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    glareOpacity.set(glareIntensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-4xl transition-all duration-200",
        className
      )}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        border: `1px solid ${borderColor}`,
        boxShadow: isHovered
          ? `0px 20px 40px ${shadowColor}`
          : `0px 10px 20px ${shadowColor}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className=" absolute inset-0 z-0"
        style={{ background: backgroundGradient }}
      />
      <motion.div
        className="absolute inset-0 z-10 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${useTransform(
            glareX,
            [0, 1],
            ["0%", "100%"]
          )} ${useTransform(
            glareY,
            [0, 1],
            ["0%", "100%"]
          )}, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
          opacity: glareOpacity,
        }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

export default ThreeDCard;
