"use client";

import { motion } from "framer-motion";

import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Skills from "@/components/Skills";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { fadeIn, sectionReveal, staggerContainer } from "@/lib/animations";

// Subtle blob animation config
const blob = (duration: number, yRange: number[], xRange: number[]) => ({
  animate: { y: yRange, x: xRange },
  transition: {
    duration,
    repeat: Infinity,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%),linear-gradient(to_bottom,#061018,#0b1220,#0f172a)] text-white">
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          {...blob(8, [0, -20, 0], [0, 10, 0])}
          className="absolute -left-16 top-20 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl sm:-left-20 sm:top-24 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        />
        <motion.div
          {...blob(10, [0, 20, 0], [0, -10, 0])}
          className="absolute -right-12 top-64 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl sm:-right-14 sm:top-72 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        />
        <motion.div
          {...blob(12, [0, -15, 0], [0, 0, 0])}
          className="absolute bottom-16 left-[20%] h-48 w-48 rounded-full bg-white/5 blur-3xl sm:bottom-20 sm:left-[30%] sm:h-64 sm:w-64 lg:left-[35%] lg:h-72 lg:w-72"
        />
      </div>

      <div className="mx-3 pt-20 sm:mx-6 lg:mx-10">
        {/* Navbar fades in immediately */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
        </motion.div>

        {/* Hero: no scroll trigger — animates on load */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Hero />
        </motion.div>

        {/* All sections below: scroll-triggered, staggered delays */}
        <AnimatedSection variants={sectionReveal} delay={0}>
          <About />
        </AnimatedSection>

        <AnimatedSection variants={sectionReveal} delay={0}>
          <Experiences />
        </AnimatedSection>

        <AnimatedSection variants={sectionReveal} delay={0}>
          <Skills />
        </AnimatedSection>

        <AnimatedSection variants={sectionReveal} delay={0}>
          <Projects />
        </AnimatedSection>

        <AnimatedSection variants={sectionReveal} delay={0}>
          <Achievements />
        </AnimatedSection>

        <AnimatedSection variants={sectionReveal} delay={0}>
          <Contact />
        </AnimatedSection>
      </div>

      <ScrollToTopButton />
    </main>
  );
}
