"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 0.3,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-14 sm:pt-15"
    >
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="show"
        className="absolute h-72 w-72 rounded-full bg-teal-400/20 blur-[100px] sm:h-96 sm:w-96 lg:h-128 lg:w-lg lg:blur-[120px]"
      />

      <div className="flex min-h-[calc(100svh-3.5rem)] w-full items-center justify-center sm:min-h-[calc(100svh-3.75rem)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6"
        >
          <div className="space-y-5 sm:space-y-6">
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(45,212,191,0.35)]">
                Md. Moniruzzaman
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-3xl text-base font-light leading-7 text-white/70 sm:text-lg md:text-2xl"
            >
              Software Engineer · Frontend Developer · React Developer
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-4"
            >
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full border border-teal-200/20 bg-linear-to-r from-teal-400/80 to-cyan-300/80 px-6 text-slate-950 shadow-[0_8px_30px_rgba(45,212,191,0.25)] hover:from-teal-300 hover:to-cyan-200 sm:h-12 sm:w-auto"
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-6 text-teal-300 backdrop-blur-xl hover:border-teal-400/30 hover:bg-white/10 sm:h-12 sm:w-auto"
                >
                  <a href="/files/Resume-of-md-moniruzzaman.pdf" download>
                    <FileText className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1 },
          y: {
            duration: 1.8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8 md:bottom-10"
      >
        <Link href="#about" aria-label="Scroll to About section">
          <ArrowDown className="h-7 w-7 text-teal-300 sm:h-8 sm:w-8" />
        </Link>
      </motion.div>
    </section>
  );
}
