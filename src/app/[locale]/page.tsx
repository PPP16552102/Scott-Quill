"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NavigationMenu from "@/components/navigation-menu";
import CreativeCanvas from "@/components/creative-canvas";
import GsapPersonalIntro from "@/components/sections/personal-intro";
import ThreeDCard from "@/components/ui/3d-card";

const HomePage = () => {
  const t = useTranslations("HomePage");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    damping: 25,
    stiffness: 700,
  };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="">
      <motion.div
        className=" fixed top-0 left-0 right-0 h-px bg-[#333333] z-60 origin-left"
        style={{ scaleX }}
      />

      <motion.div
        className=" fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary flex"
        >
          <img
            className="w-12 h-12 mr-4 rounded-full"
            src={"https://dogeoss.grtsinry43.com/img/author.jpeg"}
            alt="photo"
          />
          <div>{t("greeting")}</div>
        </motion.div>
      </motion.div>

      <header
        className={cn(
          "fixed top-0 right-0 z-50 transition-all duration-500 w-full",
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border/30"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/public" className="text-xl font-bold tracking-tight">
              {t("title")}
            </Link>
          </motion.div>
          <NavigationMenu scrolled={scrolled} />
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <CreativeCanvas mouseX={mouseXSpring} mouseY={mouseYSpring} />
          </div>
          <GsapPersonalIntro />
          <div></div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
