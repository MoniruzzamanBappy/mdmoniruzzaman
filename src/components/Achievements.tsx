"use client";

import { motion, type Variants } from "framer-motion";

import AchievementCard from "./AchievementCard";
import SectionHeading from "./SectionHeading";

const achievements = [
  {
    icon: "🏆",
    title: "Smart City Hackathon 2024 – Semifinalist",
    description:
      "Recognized for building scalable solutions with modern web technologies",
  },
  {
    icon: "🥇",
    title: "Frontend Development Specialization – Coursera",
    description:
      "Mastered React, responsive design, and UI/UX fundamentals with distinction",
  },
  {
    icon: "💻",
    title: "Top Contributor – GSSoC 2024",
    description:
      "Made impactful contributions to open-source projects in the frontend ecosystem",
  },
  {
    icon: "☁️",
    title: "Certified – NPTEL Cloud Computing",
    description:
      "Gained hands-on experience with cloud concepts and deployment strategies",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-16 py-20">
      <SectionHeading
        title="Achievements"
        subtitle="Recognition and accomplishments"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {achievements.map((achievement) => (
          <motion.div key={achievement.title} variants={itemVariants}>
            <AchievementCard {...achievement} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
