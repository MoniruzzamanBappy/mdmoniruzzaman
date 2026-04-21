"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.25,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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
      {/* Glow: fades in, then gently pulses indefinitely */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 0.28, 0.22, 0.28], // fade in then pulse between two values
          scale: [0.85, 1, 1.04, 1],
        }}
        transition={{
          duration: 4,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.3, 0.65, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
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
            {/* Greeting line — new subtle touch */}
            <motion.p
              variants={fadeUp}
              className="text-sm font-medium uppercase tracking-[0.2em] text-teal-400/70"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="-mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-teal-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(45,212,191,0.35)] bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                Md. Moniruzzaman
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-3xl text-base font-light leading-7 text-white/60 sm:text-lg md:text-2xl"
            >
              Software Engineer · Frontend Developer · React Developer
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-4"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full rounded-full border border-teal-200/20 bg-linear-to-r from-teal-400/80 to-cyan-300/80 px-6 text-slate-950 shadow-[0_8px_30px_rgba(45,212,191,0.25)] transition-shadow duration-300 hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_8px_40px_rgba(45,212,191,0.4)] sm:h-12 sm:w-auto"
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-6 text-teal-300 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(45,212,191,0.15)] sm:h-12 sm:w-auto"
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

      {/*
        Scroll arrow: opacity fades in after content settles (delay: 1.4s),
        then the bounce loop starts only after that fade completes (delay: 2.2s).
        Two separate motion.divs let us sequence them cleanly.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8 md:bottom-10"
      >
        <Link href="#about" aria-label="Scroll to About section">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8, // relative delay after parent fade-in
            }}
          >
            <ArrowDown className="h-7 w-7 text-teal-300/70 sm:h-8 sm:w-8" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
