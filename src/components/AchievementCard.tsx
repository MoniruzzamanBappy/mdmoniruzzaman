"use client";

import { motion } from "framer-motion";

import GlowCard from "@/components/GlowCard";
import { Card, CardContent } from "@/components/ui/card";

interface AchievementCardProps {
  icon: string;
  title: string;
  description?: string;
}

export default function AchievementCard({
  icon,
  title,
  description,
}: AchievementCardProps) {
  return (
    /*
      No whileHover here — the parent Achievements.tsx motion.div
      already handles the y: -5 lift. Adding it here would double-lift.
    */
    <GlowCard className="group relative h-full rounded-2xl">
      <Card className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
        {/*
          Glow blob: starts transparent, fades in on hover.
          Duration 0.35s is more responsive than 0.6s.
          No `initial` needed — default opacity: 0 via Tailwind is enough,
          but we use motion for the scale effect.
        */}
        <motion.div
          className="absolute inset-0 rounded-full bg-teal-400/8 blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <CardContent className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            {/*
              Icon: whileHover with scoped transition.
              Rotate + scale on the emoji gives it personality
              without affecting the card-level hover.
            */}
            <motion.div
              whileHover={{
                scale: 1.15,
                rotate: 8,
                transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
              }}
              className="shrink-0 text-2xl"
            >
              {icon}
            </motion.div>

            {/*
              Content: single animation on the wrapper only.
              No variants on h3/p — they're static children,
              the parent's whileInView handles the reveal.
            */}
            <div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-teal-300">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-white/60">{description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </GlowCard>
  );
}
