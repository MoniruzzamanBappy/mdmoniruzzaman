"use client";

import { motion, type Variants } from "framer-motion";

import GlowCard from "@/components/GlowCard";
import { Card, CardContent } from "@/components/ui/card";

interface AchievementCardProps {
  icon: string;
  title: string;
  description?: string;
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AchievementCard({
  icon,
  title,
  description,
}: AchievementCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <GlowCard className="group relative h-full rounded-2xl">
        <Card className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-teal-400/10 blur-3xl"
          />

          <CardContent className="relative z-10 p-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={contentVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={{ duration: 0.2 }}
                className="text-2xl"
              >
                {icon}
              </motion.div>

              <div>
                <motion.h3
                  variants={contentVariants}
                  className="text-lg font-semibold text-white transition-colors group-hover:text-teal-300"
                >
                  {title}
                </motion.h3>

                {description && (
                  <motion.p
                    variants={contentVariants}
                    className="mt-1 text-sm text-white/60"
                  >
                    {description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </GlowCard>
    </motion.div>
  );
}
