"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("HomePage");
  const { scrollYProgress } = useScroll();

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

      <header>123</header>
    </div>
  );
};

export default HomePage;
