"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useTheme } from "next-themes";

interface Project {
  _id: number;
  name: string;
  description: string;
  techStack: string;
  cover: any; // Sanity image object
  githubUrl?: string;
  deployUrl?: string;
}

const PROJECTS_QUERY = `*[_type == "project"]|order(publishedAt desc)[0...12]
{_id,name,description,githubUrl,deployUrl,progress,techStack,publishedAt,cover}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) => {
  return projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
};

const GsapProjectShowCase = () => {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // init projects data
    const fetchData = async () => {
      const data = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
      setProjects(data);
    };
    fetchData();
  }, []);

  // in view status
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entrie]) => {
        if (entrie.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // horizontal container width
  useEffect(() => {
    if (horizontalRef.current) {
      const totalWidth =
        projects.length * 600 + (projects.length - 1) * 40 + 300 + 40 + 800;
      setContainerWidth(totalWidth);
    }
  }, [projects.length]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full py-24 z-10 pointer-events-none">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center space-x-2 mb-8 pointer-events-auto"
          >
            <div className="h-px w-12 bg-primary/60" />
            <h2 className="text-lg font-medium text-primary">我的项目</h2>
            <div className="h-px w-12 bg-primary/60" />
          </motion.div>

          <motion.h3
            className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12 pointer-events-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              以往项目展示
            </span>
          </motion.h3>

          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 pointer-events-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            向下滚动探索我的项目作品集，包含了多个领域的探索~
          </motion.p>
        </div>
      </div>

      {/** 水平滚动容器 */}
      <div
        ref={horizontalRef}
        className="absolute top-0 left-0 h-screen w-fit flex items-center gap-10 pl-[calc(50vw-300px)] pr-[100px] pt-[250px]"
      >
        {projects.map((project, index) => {
          const coverUrl = project.cover
            ? urlFor(project.cover)?.width(600).height(600).url()
            : "/placeholder.svg";
          return (
            <div
              key={project._id}
              className="project-card shrink-0 w-[600px] h-[500px] bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/50 relative"
            >
              <div className="project-image absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/80 to-transparent z-10" />
                <img
                  src={coverUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-20 flex flex-col justify-end h-full p-8">
                <h4 className="project-title text-3xl font-bold mb-4">
                  {project.name}
                </h4>
                <p className="project-desc text-lg text-muted-foreground mb-6">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GsapProjectShowCase;
