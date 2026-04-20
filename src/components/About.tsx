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

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
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

const cardStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 py-20">
      <SectionHeading title="About Me" subtitle="Get to know me better" />

      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid items-center gap-10 md:grid-cols-2"
      >
        <motion.div variants={slideLeft} className="relative">
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <motion.div
              animate={{ rotate: [-6, -3, -6], scale: [0.95, 1, 0.95] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
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
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={slideRight} className="space-y-6">
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

          <motion.div
            variants={cardStagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {quickFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <motion.div
                  key={fact.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Icon className="h-5 w-5 text-teal-300" />
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
