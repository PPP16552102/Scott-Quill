"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const MagneticButton = ({
  children,
  className,
  strength = 40,
  onClick,
  disabled = false,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isMagnetic, setIsMagnetic] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    damping: 15,
    stiffness: 150,
  };
  const x = useSpring(
    useTransform(mouseX, [0, 1], [-strength, strength]),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, [0, 1], [-strength, strength]),
    springConfig
  );

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled || !isMagnetic) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX / (rect.width / 2));
    mouseY.set(distanceY / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleButtonClick = () => {
    if (disabled) return;

    setIsMagnetic(false);
    mouseX.set(0);
    mouseY.set(0);

    setTimeout(() => {
      setIsMagnetic(true);
    }, 500);

    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-colors",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleButtonClick}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
