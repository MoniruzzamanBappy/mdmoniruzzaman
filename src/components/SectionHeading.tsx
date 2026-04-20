"use client";

import { motion, type Variants } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
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
      viewport={{ once: true, amount: 0.6 }}
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

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-teal-300 to-cyan-200"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}
