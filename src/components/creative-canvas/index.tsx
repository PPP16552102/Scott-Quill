"use client";

import { useEffect, useRef, useState } from "react";
import { CreativeCanvasProps, Point } from "./interface";
import { useTheme } from "next-themes";

const CreativeCanvas = ({ mouseX, mouseY }: CreativeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef<number>(0);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: false,
      alpha: true,
    });

    if (!ctx) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(container);

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const gridSize = 60;
    const points: Point[] = [];

    for (let x = 0; x < window.innerWidth / devicePixelRatio; x += gridSize) {
      for (
        let y = 0;
        y < window.innerHeight / devicePixelRatio;
        y += gridSize
      ) {
        points.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: 0,
          vy: 0,
        });
      }
    }

    let mouseXValue = 0;
    let mouseYValue = 0;

    const unsubscribeX = mouseX.on("change", (latest) => {
      mouseXValue = latest;
    });

    const unsubscribeY = mouseY.on("change", (latest) => {
      mouseYValue = latest;
    });

    const animate = () => {
      const currentTime = Date.now();

      if (!isVisible) {
        ctx.clearRect(
          0,
          0,
          canvas.width / devicePixelRatio,
          canvas.height / devicePixelRatio
        );
        return;
      }

      if (currentTime - lastFrameTime.current < 50) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime.current = currentTime;

      ctx.clearRect(
        0,
        0,
        canvas.width / devicePixelRatio,
        canvas.height / devicePixelRatio
      );

      const primaryColor =
        theme === "dark"
          ? "rgba(100, 150, 255, 0.3)"
          : "rgba(0, 100, 255, 0.3)";

      const secondaryColor =
        theme === "dark"
          ? "rgba(100, 150, 255, 0.1)"
          : "rgba(0, 100, 255, 0.1)";

      const maxDistance = 200;
      const connectionDistance = gridSize * 1.2;

      for (const point of points) {
        const dx = mouseXValue - point.x;
        const dy = mouseYValue - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02;
          point.vx += dx * force;
          point.vy += dy * force;
        }

        point.vx += (point.originalX - point.x) * 0.03;
        point.vy += (point.originalY - point.y) * 0.03;

        point.vx *= 0.85;
        point.vy *= 0.85;

        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];

          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = secondaryColor;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsInitialized(true);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      observer.disconnect();
      unsubscribeX();
      unsubscribeY();
      cancelAnimationFrame(animationRef.current);
    };
  }, [mouseX, mouseY, theme]);

  useEffect(() => {
    if (isInitialized && isVisible && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const animate = () => {
        const currentTime = Date.now();

        if (!isVisible) return;

        if (currentTime - lastFrameTime.current < 50) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        lastFrameTime.current = currentTime;

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      />
    </div>
  );
};

export default CreativeCanvas;
