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
import { Code, Coffee, ExternalLink, Github, Heart, Mail } from "lucide-react";
import MagneticButton from "../ui/magnetic-button";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import FloatingIcons from "../ui/floating-icons";

const GsapPersonalIntro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const { theme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [resolvedTheme]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const loadGsap = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { TextPlugin } = await import("gsap/TextPlugin");

        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        if (!containerRef.current) return;

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        const container = containerRef.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            toggleClass: "play none none reverse",
          },
        });

        if (textRef.current) {
          const headings = textRef.current.querySelectorAll("h3, h4");
          const paragraphs = textRef.current.querySelectorAll("p");
          const buttons = textRef.current.querySelectorAll("button, a");
          const icons = textRef.current.querySelectorAll(".icon-item");

          tl.from(headings, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          })
            .from(paragraphs, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              stagger: 0.2,
              ease: "power2.out",
            })
            .from(
              buttons,
              {
                opacity: 0,
                y: 20,
                scale: 0.9,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
              },
              "-=0.3"
            )
            .from(
              icons,
              {
                opacity: 0,
                scale: 0,
                rotation: -30,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(2)",
              },
              "-=0.4"
            );
        }
      } catch (error) {}
    };

    loadGsap();
  }, [theme, resolvedTheme]);

  const words = ["前端开发者. ", "设计者. ", "创造者. "];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const { fullText } = useTypeWriter({
    texts: words,
    speed: 200,
    delay: 500,
    isEllipsisShow: false,
  });

  const floatingIcons = [
    <Code key="code" className="h-6 w-6 text-blue-500" />,
    <Heart key="heart" className="h-6 w-6 text-pink-500" />,
    <Coffee key="coffee" className="h-6 w-6 text-amber-500" />,
    <Github key="github" className="h-6 w-6 text-purple-500" />,
    <Mail key="mail" className="h-6 w-6 text-green-500" />,
  ];

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
                  animate={{ opacity: 1 }}
                  key={"key-" + currentWordIndex}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: 1.5,
                  }}
                >
                  {fullText}
                </motion.span>
              </AnimatePresence>
            </h4>
            <p className="text-lg text-muted-foreground">
              我是一名全栈开发者，热衷于创造出色的用户体验和高效的代码。
              <br />
              喜欢探索新技术，分享见解，合作学习
            </p>
            <div className="flex flex-wrap gap-4 items-center pb-4">
              <motion.div
                className="flex items-center gap-2 icon-item opacity-0"
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  type: "tween",
                  stiffness: 400,
                  damping: 10,
                  duration: 1.5,
                }}
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span>Developer</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 icon-item opacity-0"
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  type: "tween",
                  stiffness: 400,
                  damping: 10,
                  duration: 1.5,
                }}
              >
                <div className="p-2 rounded-full bg-pink-500/10">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <span>热爱创造</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 icon-item opacity-0"
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  type: "tween",
                  stiffness: 400,
                  damping: 10,
                  duration: 1.5,
                }}
              >
                <div className="p-2 rounded-full bg-amber-500/10">
                  <Coffee className="h-5 w-5 text-amber-500" />
                </div>
                <span>咖啡爱好者</span>
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-4 ml-2">
              <MagneticButton strength={20}>
                <Button asChild variant="outline" className="rounded-full">
                  <a
                    href="https://github.com/PPP16552102"
                    target="_blank"
                    rel="noopener noreferer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    Github
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={20}>
                <Button asChild variant="outline" className="rounded-full">
                  <a
                    href="https://github.com/PPP16552102"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    联系我
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={20}>
                <Button asChild variant="outline" className="rounded-full">
                  <a
                    href="https://github.com/PPP16552102"
                    target="_blank"
                    rel="noopener noreferer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    博客
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 mx-auto max-w-md">
              <motion.div
                className="profile-image relative rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src="https://dogeoss.grtsinry43.com/img/author-removebg.png"
                  alt="scopter"
                  style={isDark ? { filter: "brightness(0.8)" } : {}}
                  className="w-full h-auto"
                />
                {isDark && (
                  <div className=" absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                )}
              </motion.div>
              <FloatingIcons
                icons={floatingIcons}
                className={"absolute inset-0 z-20 pointer-events-none"}
              />
              <div className="shape absolute -top-6 -right-6 w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 rotate-12 shadow-lg" />
              <div className="shape absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-green-500 shadow-lg" />
              <div className="shape absolute top-1/2 -right-12 w-10 h-10 rounded-md bg-linear-to-br from-amber-500 to-orange-500 rotate-45 shadow-lg" />
            </div>
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GsapPersonalIntro;
