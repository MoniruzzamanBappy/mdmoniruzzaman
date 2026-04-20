"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type React from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
}

export default function GlowCard({
  children,
  className,
  glowSize = 240,
}: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      ${glowSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(45, 212, 191, 0.16),
      rgba(34, 211, 238, 0.10) 35%,
      transparent 70%
    )
  `;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div onMouseMove={handleMouseMove} className={className}>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
