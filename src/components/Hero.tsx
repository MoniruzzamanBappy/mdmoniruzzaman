"use client";

import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
    >
      <div
        className={cn(
          "absolute h-125 w-125 rounded-full bg-teal-400/20 blur-[120px] opacity-0 transition-opacity duration-1000",
          mounted && "opacity-30",
        )}
      />

      <div
        className={cn(
          "relative z-10 max-w-4xl px-4 text-center transition-all duration-1000",
          "translate-y-8 opacity-0",
          mounted && "translate-y-0 opacity-100",
        )}
      >
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(45,212,191,0.35)]">
              Md. Moniruzzaman
            </span>
          </h1>

          <p className="text-xl font-light text-white/70 md:text-2xl">
            Software Engineer · Frontend Developer · React Developer
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="rounded-full border border-teal-200/20 bg-linear-to-r from-teal-400/80 to-cyan-300/80 px-6 text-slate-950 shadow-[0_8px_30px_rgba(45,212,191,0.25)] hover:from-teal-300 hover:to-cyan-200"
            >
              <Link href="#projects">View Projects</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border border-white/10 bg-white/5 px-6 text-teal-300 backdrop-blur-xl hover:bg-white/10 hover:border-teal-400/30"
            >
              <a href="/files/Resume-of-md-moniruzzaman.pdf" download>
                <FileText className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <Link href="#about" aria-label="Scroll to About section">
          <ArrowDown className="h-8 w-8 text-teal-300" />
        </Link>
      </div>
    </section>
  );
}
