import { useRef } from "react";
import { motion } from "framer-motion";
import ThreeDCard from "../ui/3d-card";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "../ui/magnetic-button";

const FinalSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="final"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-muted/30"
    >
      {/** background */}
      <div className="absolute inset-0 -z-10">
        <div className=" absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div className=" max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center space-x-2 mb-12"
          >
            <div className="h-px w-12 bg-primary/60" />
            <h2 className="text-lg font-medium text-primary">感谢浏览</h2>
            <div className="h-px w-12 bg-primary/60" />
          </motion.div>

          <div ref={contentRef} className="text-center mb-16">
            <motion.h3
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              感谢您的<span className="text-primary">预览</span>
            </motion.h3>
            <motion.p
              className="text-center text-muted-foreground max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              希望我的作品能给您带来启发，期待与您的进一步交流
            </motion.p>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
            >
              <ThreeDCard
                className="card-item p-6 rounded-2xl border-l-4 border-l-blue-500"
                glareColor="rgba(59, 130, 246, 0.3)"
                rotationIntensity={8}
              >
                <div className="h-2 w-16 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 mb-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-blue/10">
                    <Github className="w-6 h-6 text-blue" />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground">
                    开源项目
                  </h4>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  探索我的代码世界
                </p>
                <div className="mt-16">
                  <Link href="#">
                    <MagneticButton className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg px-4 py-3 transition-all duration-300">
                      <span className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        查看项目
                      </span>
                    </MagneticButton>
                  </Link>
                </div>
              </ThreeDCard>
              <ThreeDCard
                className="card-item p-6 rounded-2xl border-l-4 border-l-purple-500"
                glareColor="rgba(147, 51, 234, 0.3)"
                rotationIntensity={8}
              >
                <div className="h-2 w-16 rounded-full bg-linear-to-r from-purple-500 to-pink-500 mb-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-purple/10">
                    <Mail className="w-6 h-6 text-purple" />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground">
                    联系合作
                  </h4>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  开启对话，共创精彩的技术未来
                </p>
                <div className="mt-16">
                  <Link href="#">
                    <MagneticButton className="w-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg px-4 py-3 transition-all duration-300">
                      <span className="flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        查看项目
                      </span>
                    </MagneticButton>
                  </Link>
                </div>
              </ThreeDCard>
              <ThreeDCard
                className="card-item p-6 rounded-2xl border-l-4 border-l-green-500"
                glareColor="rgba(34, 197, 94, 0.3)"
                rotationIntensity={8}
              >
                <div className="h-2 w-16 rounded-full bg-linear-to-r from-green-500 to-emerald-500 mb-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-green/10">
                    <ArrowRight className="w-6 h-6 text-green" />
                  </div>
                  <h4 className="text-xl font-semibold text-card-foreground">
                    个人博客
                  </h4>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  分享思考与见解
                </p>
                <div className="mt-16">
                  <Link href="#">
                    <MagneticButton className="w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg px-4 py-3 transition-all duration-300">
                      <span className="flex items-center justify-center text-green-600 dark:text-green-400 font-medium">
                        <Sparkles className="w-4 h-4 mr-2" />
                        访问博客
                      </span>
                    </MagneticButton>
                  </Link>
                </div>
              </ThreeDCard>
            </div>
          </div>
        </motion.div>
      </div>

      <div ref={footerRef} className="text-center space-y-6">
        <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent"></div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-muted-foreground"
        >
          感谢您的访问，希望我们能保持联系
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
        >
          <span>Made with</span>
          <Heart className="heart-icon w-4 h-4 text-red-500 fill-red-500" />
          <span>by grtsinry43</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalSection;
