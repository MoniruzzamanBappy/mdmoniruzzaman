"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";

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
    <Card
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-teal-400/30 hover:bg-white/10",
        "hover:shadow-[0_12px_40px_rgba(45,212,191,0.14)]",
      )}
    >
      {imageSrc && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(45,212,191,0.10),transparent,transparent)]" />

          <div className="absolute right-4 top-4">
            <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
              {date}
            </span>
          </div>
        </div>
      )}

      <CardContent className="relative p-6">
        {!imageSrc && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md">
              {date}
            </span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-teal-300 md:text-2xl">
              {title}
            </h3>

            <p className="text-sm leading-7 text-white/65 md:text-[15px]">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
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
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center bg-transparent gap-3 py-6">
        {demoUrl && (
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
        )}

        {codeUrl && (
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
        )}
      </CardFooter>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-teal-300/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  );
}
