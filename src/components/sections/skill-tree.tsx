"use client ";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ThreeDCard from "../ui/3d-card";
import { useTheme } from "next-themes";
import { MAX_DPR } from "@/constants/client/device";
import AnimatedCounter from "../ui/animated-counter";

const GsapSkillsTree = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const Skills = [
    // Web skill
    { name: "React", level: 95, group: "web", color: "#61DAFB" },
    { name: "Next.js", level: 90, group: "web", color: "#000000" },
    { name: "Vue.js", level: 85, group: "web", color: "#4FC08D" },
    { name: "TypeScript", level: 90, group: "web", color: "#3178C6" },
    { name: "JavaScript", level: 95, group: "web", color: "#F7DF1E" },
    { name: "HTML/CSS", level: 95, group: "web", color: "#E34F26" },

    // backend skill
    { name: "Node", level: 95, group: "backend", color: "#6DB33F" },
    { name: "Golang", level: 90, group: "backend", color: "#6DB33F" },
    { name: "Rust", level: 85, group: "backend", color: "#007396" },
    { name: "MySQL", level: 90, group: "backend", color: "#339933" },
    { name: "PostgreSQL", level: 95, group: "backend", color: "#4479A1" },

    // mobile skill
    { name: "Taro", level: 95, group: "mobile", color: "#007396" },
    { name: "Uniapp", level: 95, group: "mobile", color: "#6DB33F" },
    { name: "React Native", level: 80, group: "mobile", color: "#6DB33F" },
    { name: "Electron", level: 75, group: "mobile", color: "#007396" },
  ];

  const SkillGroups = [
    {
      id: "web",
      name: "web开发",
      color: "from-blue-500 to-violet-500",
      icon: "🌐",
    },
    {
      id: "backend",
      name: "后端开发",
      color: "from-green-500 to-emerald-500",
      icon: "🖥️",
    },
    {
      id: "mobile",
      name: "移动端开发",
      color: "from-amber-500 to-orange-500",
      icon: "📱",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entires) => {
        if (entires[0].isIntersecting) {
          setIsInView(true);
          console.log("in");
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    let isAnimating = true;
    let lastFrameTime = 0;
    let mouseMoveListener: (e: MouseEvent) => void;
    let resizeListener: () => void;
    let autoRotateTimeout: NodeJS.Timeout;
    let intersectionObserver: IntersectionObserver;

    const loadGsapAndAnimation = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas?.getContext("2d", {
          willReadFrequently: false,
          alpha: true,
        });

        if (!ctx) return;

        let cssWidth = 0;
        let cssHeight = 0;

        const setCanvasSize = () => {
          const rect = canvas.getBoundingClientRect();
          cssWidth = rect.width;
          cssHeight = rect.height;

          canvas.width = cssWidth * MAX_DPR;
          canvas.height = cssHeight * MAX_DPR;

          ctx.resetTransform();
          ctx.scale(MAX_DPR, MAX_DPR);
        };

        setCanvasSize();
        resizeListener = setCanvasSize;
        window.addEventListener("resize", resizeListener);

        intersectionObserver = new IntersectionObserver(
          (entries) => {
            isAnimating = entries[0].isIntersecting;
          },
          {
            threshold: 0.1,
          }
        );

        intersectionObserver.observe(canvas);

        const modelSpaceRadius = 100; // abstruct modal space radius

        const skillNodes = Skills.map((skill, index) => {
          const phi = Math.acos(-1 + (2 * index) / Skills.length);
          const theta = Math.sqrt(Skills.length * Math.PI) * phi;

          return {
            ...skill,
            x3d: modelSpaceRadius * Math.cos(theta) * Math.sin(phi),
            y3d: modelSpaceRadius * Math.sin(theta) * Math.sin(phi),
            z3d: modelSpaceRadius * Math.cos(phi),
            x2d: 0,
            y2d: 0,
            scale: 0,
            opacity: 0,
          };
        });

        const rotation = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };
        let autoRotate = true;
        let mouseX = 0;
        let mouseY = 0;

        const throttle = <T extends (...args: any[]) => void>(
          func: T,
          delay: number
        ): T => {
          let timeoutId: NodeJS.Timeout | null = null;
          let lastExecTime = 0;
          return ((...args: any[]) => {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
              func.apply(null, args);
              lastExecTime = currentTime;
            } else {
              if (timeoutId) clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                func.apply(null, args);
                lastExecTime = Date.now();
              }, delay - (currentTime - lastExecTime));
            }
          }) as T;
        };

        const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          if (!rect.width || !rect.height) return;

          const canvasMouseX = e.clientX - rect.left;
          const canvasMouseY = e.clientY - rect.top;

          mouseX = (canvasMouseX / rect.width - 0.5) * 2;
          mouseY = (canvasMouseY / rect.height - 0.5) * 2;

          if (Math.abs(mouseX) > 0.02 || Math.abs(mouseY) > 0.02) {
            autoRotate = false;
            targetRotation.x = mouseY * 0.8;
            targetRotation.y = mouseX * 0.8;
            clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(() => {
              autoRotate = true;
            }, 5000);
          }

          let closestNode = null;
          let closestDistance = Number.POSITIVE_INFINITY;

          for (const node of skillNodes) {
            const dx = node.x2d - canvasMouseX;
            const dy = node.y2d - canvasMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 30 && distance < closestDistance) {
              closestDistance = distance;
              closestNode = node;
            }
          }

          setActiveSkill(closestNode ? closestNode.name : null);
        };

        mouseMoveListener = throttle(handleMouseMove, 16);
        canvas.addEventListener("mousemove", mouseMoveListener);

        const draw = () => {
          const currentTime = Date.now();

          if (!isAnimating) {
            animationFrameId = requestAnimationFrame(() => {
              setTimeout(draw, 100);
            });
            return;
          }

          if (currentTime - lastFrameTime < 33) {
            animationFrameId = requestAnimationFrame(draw);
            return;
          }

          lastFrameTime = currentTime;

          ctx.clearRect(0, 0, cssWidth, cssHeight);

          if (autoRotate) targetRotation.y += 0.002;

          const rotationChanged =
            Math.abs(rotation.x - targetRotation.x) > 0.001 ||
            Math.abs(rotation.y - targetRotation.y) > 0.001;

          if (rotationChanged) {
            rotation.x += (targetRotation.x - rotation.x) * 0.08;
            rotation.y += (targetRotation.y - rotation.y) * 0.08;
          }

          const cosX = Math.cos(rotation.x);
          const sinX = Math.sin(rotation.x);
          const cosY = Math.cos(rotation.y);
          const sinY = Math.sin(rotation.y);

          const currentCssCenter = { x: cssWidth / 2, y: cssHeight / 2 };
          const cssSphereDisplayRadius = Math.min(cssWidth, cssHeight) * 0.35;

          skillNodes.forEach((node) => {
            const y_rotated = node.y3d * cosX - node.z3d * sinX;
            const z_intermediate = node.y3d * sinX + node.z3d * cosX;
            const x_final_model = node.x3d * cosY - z_intermediate * sinY;
            const z_final_model = node.x3d * sinY + z_intermediate * cosY;
            const y_final_model = y_rotated;

            node.scale = (z_final_model / modelSpaceRadius + 2.5) / 3.5;
            node.opacity = Math.max(0, (node.scale - 0.5) * 2);

            if (node.opacity > 0) {
              node.x2d =
                currentCssCenter.x +
                (x_final_model / modelSpaceRadius) *
                  cssSphereDisplayRadius *
                  node.scale;
              node.y2d =
                currentCssCenter.y +
                (y_final_model / modelSpaceRadius) *
                  cssSphereDisplayRadius *
                  node.scale;

              ctx.save();
              ctx.globalAlpha = node.opacity;

              const nodeSize = (8 + node.level / 15) * node.scale;

              // Draw glow effect
              const gradient = ctx.createRadialGradient(
                node.x2d,
                node.y2d,
                0,
                node.x2d,
                node.y2d,
                nodeSize * 2
              );
              gradient.addColorStop(0, node.color + "80"); // Semi-transparent
              gradient.addColorStop(1, node.color + "00"); // Transparent

              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(node.x2d, node.y2d, nodeSize * 1.5, 0, Math.PI * 2);
              ctx.fill();

              // Draw node
              ctx.fillStyle = node.color;
              ctx.beginPath();
              ctx.arc(node.x2d, node.y2d, nodeSize, 0, Math.PI * 2);
              ctx.fill();

              // Add highlight
              ctx.fillStyle = "#ffffff";
              ctx.globalAlpha = 0.3 * node.opacity;
              ctx.beginPath();
              ctx.arc(
                node.x2d - nodeSize * 0.3,
                node.y2d - nodeSize * 0.3,
                nodeSize * 0.3,
                0,
                Math.PI * 2
              );
              ctx.fill();

              if (nodeSize > 5) {
                ctx.font = `${Math.min(14, nodeSize * 1) * node.scale}px Arial`;
                ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000";
                ctx.globalAlpha = node.opacity;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(
                  node.name,
                  node.x2d,
                  node.y2d + nodeSize + 5 * node.scale
                );
              }
              ctx.restore();
            }
          });
          animationFrameId = requestAnimationFrame(draw);
        };

        draw();
      } catch (error) {
        throw new Error("Failed to load GSAP or run animation: ");
      }
    };

    loadGsapAndAnimation();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(autoRotateTimeout);
      if (resizeListener) window.removeEventListener("resize", resizeListener);
      if (canvasRef.current && mouseMoveListener)
        canvasRef.current.removeEventListener("mousemove", mouseMoveListener);
      if (intersectionObserver) intersectionObserver.disconnect();
    };
  }, [isInView, theme, Skills]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-muted/30"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center space-x-2 mb-12"
        >
          <div className="h-px w-12 bg-primary/60" />
          <h2 className="text-lg font-medium text-primary">专业技能</h2>
          <div className="h-px w-12 bg-primary/60" />
        </motion.div>

        <motion.h3
          className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          我的<span className="text-primary">技术</span>栈和能力
        </motion.h3>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          探索我的技能宇宙 - 移动鼠标与技能球体互动，查看我的专业技能和熟练程度
        </motion.p>

        <div className="relative w-full max-w-xl md:max-w-2xl aspect-square mx-auto mb-16">
          <canvas
            ref={canvasRef}
            className="w-ful h-full cursor-move"
            style={{ touchAction: "none" }}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg text-xs md:text-sm">
            <p className="text-center"></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SkillGroups.map((group, index) => (
            <ThreeDCard
              key={group.id}
              className={`p-6 rounded-2xl border-l-4 ${
                hoveredGroup === group.id
                  ? "border-l-primary"
                  : `border-l-${group.color.split(" ")[0].replace("from-", "")}`
              }`}
              glareColor={`rgba(${
                group.id === "web"
                  ? "100, 150, 255"
                  : group.id === "backend"
                  ? "100, 200, 150"
                  : "255, 150, 100"
              })`}
              rotationIntensity={10}
              // @ts-ignore
              onMouseEnter={() => setHoveredGroup(group.id)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div
                className={`h-2 w-16 rounded-full bg-linear-to-r ${group.color} mb-4`}
              />
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{group.icon}</span>
                <h4 className="text-xl font-semibold text-card-foreground">
                  {group.name}
                </h4>
              </div>
              <div className="space-y-4">
                {Skills.filter((skill) => skill.group === group.id)
                  .slice(0, 4)
                  .map((skill) => (
                    <div key={skill.name} className=" space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground/80 font-medium">
                          <AnimatedCounter
                            from={0}
                            to={skill.level}
                            duration={1.5}
                            delay={index * 0.2}
                            formatter={(value) => `${Math.round(value)}%`}
                          />
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-linear-to-r ${group.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.2 + 0.2,
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                {Skills.filter((skill) => skill.group === group.id).length >
                  4 && (
                  <motion.div
                    className="text-xs text-right text-muted-foreground/70 mt-2"
                    whileHover={{ x: 5 }}
                  >
                    +{Skills.filter((skill) => skill.group === group.id).length}
                  </motion.div>
                )}
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GsapSkillsTree;
