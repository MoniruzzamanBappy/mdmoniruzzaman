"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpen, Code, Laptop, MapPin } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const quickFacts = [
  {
    icon: Laptop,
    title: "Frontend Engineer",
    description: "Crafting modern UIs with React, Next.js & TypeScript",
  },
  {
    icon: Code,
    title: "Language Expert",
    description:
      "Deep understanding of JavaScript & TypeScript & UI performance",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learner",
    description: "Exploring new frontend tools and frameworks daily",
  },
  {
    icon: MapPin,
    title: "Dhaka, BD",
    description: "Building from Bangladesh with global impact",
  },
];

// Both columns enter together, no stagger between them
const twoColLayout: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0, // simultaneous
      delayChildren: 0,
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Standalone stagger for the right column's internal content
const rightColStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15, // slight delay after column slides in
    },
  },
};

// Card grid stagger — separate from rightColStagger
const cardGridStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 py-20">
      <SectionHeading title="About Me" subtitle="Get to know me better" />

      <motion.div
        variants={twoColLayout}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid items-center gap-10 md:grid-cols-2"
      >
        {/* Left column — photo */}
        <motion.div variants={slideLeft} className="relative">
          <motion.div
            whileHover={{ y: -5, scale: 1.015 }}
            // whileHover gets its own transition so it doesn't conflict with variants
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            {/*
              Rotating glow: use whileInView so it only starts when visible,
              not on page load before the section scrolls into view.
              initial/animate replaced with whileInView + animate keyframes.
            */}
            <motion.div
              initial={{ rotate: -6, scale: 0.95, opacity: 0 }}
              whileInView={{
                rotate: [-6, -3, -6],
                scale: [0.95, 1, 0.95],
                opacity: 1,
              }}
              viewport={{ once: false }} // re-runs if user scrolls away and back
              transition={{
                opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 6,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="absolute inset-0 rounded-2xl bg-linear-to-tr from-teal-400/20 to-cyan-300/20"
            />

            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" />

            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/profile.png"
                alt="Md. Moniruzzaman"
                width={400}
                height={400}
                priority
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/*
          Right column — its own stagger context, completely decoupled
          from the twoColLayout stagger above.
        */}
        <motion.div
          variants={rightColStagger}
          // Inherits show/hidden from twoColLayout but controls its own children
          className="space-y-6"
        >
          {/* Bio card */}
          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <CardContent className="p-6">
                <p className="leading-relaxed text-white/75">
                  Hi, I am a passionate Software Engineer and Frontend Developer
                  who thrives on turning ideas into clean, elegant, and
                  responsive digital experiences.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  Whether it is building sleek interfaces with modern frameworks
                  or diving into AI-powered solutions, I am driven by curiosity
                  and a commitment to continuous learning.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  From interactive dashboards to scalable web apps, my work
                  blends technical skill with thoughtful design.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  My journey in tech is fueled by curiosity and a drive to
                  create meaningful solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fact cards grid — its own isolated stagger */}
          <motion.div
            variants={cardGridStagger}
            // Does NOT inherit from rightColStagger; acts as a new stagger root
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={fact.title}
                  variants={cardItem}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-lg border border-teal-400/20 bg-teal-400/10 p-1.5">
                          <Icon className="h-4 w-4 text-teal-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {fact.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {fact.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
