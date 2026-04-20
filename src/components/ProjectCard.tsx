"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";

import GlowCard from "@/components/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;
  imageSrc?: string;
}

const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProjectCard({
  title,
  description,
  date,
  techStack,
  demoUrl,
  codeUrl,
  imageSrc,
}: ProjectCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28 }}
        className="h-full"
      >
        <GlowCard className="group relative h-full rounded-3xl">
          <Card
            className={cn(
              "group relative h-full overflow-hidden rounded-3xl",
              "border border-white/10 bg-white/5 backdrop-blur-xl",
              "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
              "transition-all duration-500",
              "hover:border-teal-400/30 hover:bg-white/10",
              "hover:shadow-[0_12px_40px_rgba(45,212,191,0.14)]",
            )}
          >
            {imageSrc && (
              <div className="relative h-56 w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7 }}
                  className="h-full w-full"
                >
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(45,212,191,0.10),transparent,transparent)]" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-4 top-4"
                >
                  <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                    {date}
                  </span>
                </motion.div>
              </div>
            )}

            <CardContent className="relative p-6">
              {!imageSrc && (
                <motion.div
                  variants={contentVariants}
                  className="mb-4 flex items-start justify-between gap-4"
                >
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md">
                    {date}
                  </span>
                </motion.div>
              )}

              <motion.div variants={contentVariants} className="space-y-4">
                <div className="space-y-2">
                  <motion.h3
                    variants={contentVariants}
                    className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-teal-300 md:text-2xl"
                  >
                    {title}
                  </motion.h3>

                  <motion.p
                    variants={contentVariants}
                    className="text-sm leading-7 text-white/65 md:text-[15px]"
                  >
                    {description}
                  </motion.p>
                </div>

                <motion.div
                  variants={badgeContainerVariants}
                  className="flex flex-wrap gap-2"
                >
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech}
                      variants={badgeVariants}
                      whileHover={{ y: -2, scale: 1.04 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-full border border-white/10 bg-white/8 px-3 py-1",
                          "text-xs font-medium text-white/75 backdrop-blur-md",
                          "transition-all duration-300",
                          "hover:border-teal-400/25 hover:bg-white/12 hover:text-teal-200",
                        )}
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </CardContent>

            <motion.div variants={contentVariants}>
              <CardFooter className="flex flex-wrap items-center gap-3 bg-transparent py-6">
                {demoUrl && (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      asChild
                      size="sm"
                      className={cn(
                        "rounded-full border border-teal-300/20",
                        "bg-linear-to-r from-teal-400/80 to-cyan-300/80",
                        "text-slate-950 shadow-[0_8px_24px_rgba(45,212,191,0.18)]",
                        "transition-all duration-300",
                        "hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_8px_30px_rgba(45,212,191,0.30)]",
                      )}
                    >
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </motion.div>
                )}

                {codeUrl && (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn(
                        "rounded-full border border-white/12 bg-white/5 text-white/80 backdrop-blur-md",
                        "transition-all duration-300",
                        "hover:border-teal-400/30 hover:bg-white/10 hover:text-teal-200",
                      )}
                    >
                      <a
                        href={codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              whileHover={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center bg-linear-to-r from-transparent via-teal-300/60 to-transparent"
            />
          </Card>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
}
