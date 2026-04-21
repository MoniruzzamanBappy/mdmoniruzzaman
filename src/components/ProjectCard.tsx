"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { useState } from "react";

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

// Badges: own whileInView per card, decoupled from parent stagger
const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    /*
      No motion.div wrapper, no whileInView here.
      Projects.tsx owns the reveal (itemVariants) and hover lift (whileHover).
      This component is purely presentational.
    */
    <GlowCard className="group relative h-full rounded-3xl">
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative h-full overflow-hidden rounded-3xl p-0 gap-0",
          "border border-white/10 bg-white/5 backdrop-blur-xl",
          "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
          "transition-colors duration-500",
          "hover:border-teal-400/30 hover:bg-white/10",
          "hover:shadow-[0_12px_40px_rgba(45,212,191,0.14)]",
        )}
      >
        {imageSrc && (
          <div className="relative h-80 w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: isHovered ? "100%" : "0%",
                backgroundSize: "100% auto",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
                transition:
                  "background-position 2200ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(45,212,191,0.10),transparent,transparent)]" />

            {/* Date badge on image — plain span, no animation needed */}
            <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
              {date}
            </span>
          </div>
        )}

        <CardContent className="relative p-6">
          {!imageSrc && (
            <div className="mb-4">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md">
                {date}
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              {/* Plain elements — reveal is handled by parent Projects.tsx itemVariants */}
              <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-teal-300 md:text-2xl">
                {title}
              </h3>
              <p className="text-sm leading-7 text-white/65 md:text-[15px]">
                {description}
              </p>
            </div>

            {/*
              Badges: own whileInView — animate when the badge row enters view,
              not as part of the card entrance stagger.
            */}
            <motion.div
              variants={badgeContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <motion.div
                  key={tech}
                  variants={badgeVariants}
                  whileHover={{
                    y: -2,
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                >
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full border border-white/10 bg-white/8 px-3 py-1",
                      "text-xs font-medium text-white/75 backdrop-blur-md",
                      "transition-colors duration-300",
                      "hover:border-teal-400/25 hover:bg-white/12 hover:text-teal-200",
                    )}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center gap-3 bg-transparent py-6">
          {demoUrl && (
            <motion.div
              whileHover={{ scale: 1.04, transition: { duration: 0.16 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
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
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </motion.div>
          )}

          {codeUrl && (
            <motion.div
              whileHover={{ scale: 1.04, transition: { duration: 0.16 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
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
                <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            </motion.div>
          )}
        </CardFooter>

        {/*
          Bottom line: moved to CSS group-hover instead of Framer whileHover.
          The original motion.div was 1px tall — its own hover area was
          nearly impossible to trigger. CSS group-hover fires from anywhere
          on the card.
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-teal-300/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
      </Card>
    </GlowCard>
  );
}
