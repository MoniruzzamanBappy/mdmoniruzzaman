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

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%),linear-gradient(to_bottom,#061018,#0b1220,#0f172a)] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -left-16 top-20 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl sm:-left-20 sm:top-24 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        />

        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-12 top-64 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl sm:-right-14 sm:top-72 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        />

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-16 left-[20%] h-48 w-48 rounded-full bg-white/5 blur-3xl sm:bottom-20 sm:left-[30%] sm:h-64 sm:w-64 lg:left-[35%] lg:h-72 lg:w-72"
        />
      </div>

      <div className="mx-3 pt-20 sm:mx-6 lg:mx-10">
        <Navbar />
        <Hero />
        <About />
        <Experiences />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>

      <ScrollToTopButton />
    </main>
  );
}
