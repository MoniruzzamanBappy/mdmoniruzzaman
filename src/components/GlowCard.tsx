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
  const glowOpacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(
    ${glowSize}px circle at ${mouseX}px ${mouseY}px,
    rgba(45, 212, 191, 0.16),
    rgba(34, 211, 238, 0.10) 35%,
    transparent 70%
  )`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseEnter() {
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    glowOpacity.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {/*
        Opacity is now a MotionValue — animated via Framer's style system,
        not CSS transition. No "group" class dependency on the parent.
        transition prop controls the fade speed.
      */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit]"
        style={{ background, opacity: glowOpacity }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {children}
    </div>
  );
}
