"use client";

import { motion, type Variants } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

// Container: pure orchestration — no y/opacity on itself, just staggers children
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Text items: slide up and fade in
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Underline: scale in from center — distinct from the text animation
const underlineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="mb-12 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-3 max-w-2xl text-sm text-white/60 md:text-base"
        >
          {subtitle}
        </motion.p>
      )}

      {/*
        No explicit initial/whileInView here — underlineVariants is picked up
        via the parent's stagger propagation, so it animates in sequence
        after the title and subtitle, not independently.
      */}
      <motion.div
        variants={underlineVariants}
        style={{ transformOrigin: "center" }}
        className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-teal-300 to-cyan-200"
      />
    </motion.div>
  );
}
