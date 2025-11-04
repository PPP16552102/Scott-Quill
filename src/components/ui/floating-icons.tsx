"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface FloatingIconsProps {
  icons: ReactNode[];
  className?: string;
}

const FloatingIcons = ({ icons, className }: FloatingIconsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const loadGsap = async () => {
      const { gsap } = await import("gsap");

      const iconElements =
        containerRef.current?.querySelectorAll(".floating-icon");

      iconElements?.forEach((icon, index) => {
        gsap.set(icon, {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          rotation: Math.random() * 20 - 10,
          opacity: 0.7 + Math.random() * 0.3,
          scale: 0.8 + Math.random() * 0.4,
        });

        gsap.to(icon, {
          x: `+=${Math.random() * 40 - 20}`,
          y: `+=${Math.random() * 40 - 20}`,
          rotation: `+=${Math.random() * 20 - 10}`,
          opacity: 0.7 + Math.random() * 0.3,
          scale: 0.8 + Math.random() * 0.4,
          duration: 3 + Math.random() * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
        });
      });
    };

    loadGsap();
  }, [icons.length, theme]);

  return (
    <div ref={containerRef} className={className}>
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="floating-icon absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
