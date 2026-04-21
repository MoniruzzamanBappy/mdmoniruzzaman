"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number; // override stagger timing per use case
  delayChildren?: number;
  amount?: number; // viewport threshold
};

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // tighter default — callers can override via prop
      delayChildren: 0.05,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // consistent with rest of codebase
    },
  },
};

export default function StaggerContainer({
  children,
  className,
  stagger,
  delayChildren,
  amount = 0.15,
}: Props) {
  // Build variants inline only if caller overrides timing,
  // otherwise use the exported defaults directly (no extra object allocation)
  const variants: Variants =
    stagger !== undefined || delayChildren !== undefined
      ? {
          hidden: {},
          show: {
            transition: {
              staggerChildren: stagger ?? 0.1,
              delayChildren: delayChildren ?? 0.05,
            },
          },
        }
      : staggerParent;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
