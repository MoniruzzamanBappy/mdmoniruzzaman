"use client";

import { motion, type Variants } from "framer-motion";
import {
  Code,
  MonitorSmartphone,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";

import GlowCard from "@/components/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend Development",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Cross-Browser Compatibility",
      "UI/UX Optimization",
      "Performance Optimization",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile Development",
    skills: [
      "React Native",
      "Expo",
      "Mobile-First Development",
      "Push Notifications",
      "Deep Linking",
    ],
  },
  {
    icon: Users,
    title: "State Management & Data Handling",
    skills: [
      "Redux",
      "Zustand",
      "MobX",
      "TanStack Query",
      "TanStack Table",
      "REST API Integration",
      "Real-Time Data Handling",
    ],
  },
  {
    icon: Settings2,
    title: "Backend & Authentication",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "NextAuth.js",
      "Role-Based Access Control (RBAC)",
      "Authentication",
      "Authorization",
    ],
  },
  {
    icon: Wrench,
    title: "Tools, Libraries & Practices",
    skills: [
      "Git",
      "Postman",
      "Jest",
      "Unit Testing",
      "CI/CD",
      "Agile/Scrum",
      "Vite",
      "Shadcn UI",
      "Chart.js",
      "Recharts",
      "i18next",
      "NativeBase",
    ],
  },
];

// Cards stagger in
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Card enter — no transition prop here so whileHover can own its own
const cardVariants: Variants = {
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

// Badges: own whileInView per card, decoupled from card entrance
const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-16 py-20">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and abilities I've acquired"
      />

      {/*
        5 cards in a 4-col grid leaves an orphan.
        Wrapping in a flex-based centering container on lg fixes the last row.
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          // Last card (index 4) gets centered on lg when it's alone in its row
          const isLast = index === skillCategories.length - 1;

          return (
            <motion.div
              key={category.title}
              variants={cardVariants}
              // whileHover gets its own transition — doesn't touch cardVariants
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full ${isLast ? "md:col-span-2 lg:col-span-2 lg:col-start-2" : ""}`}
            >
              <GlowCard className="group relative h-full rounded-2xl">
                <Card className="h-full rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      {/*
                        Icon wrapper is NOT a motion.div — avoids the hover
                        bubble issue where parent whileHover triggered icon rotation.
                        CSS transition handles the subtle icon lift instead.
                      */}
                      <div className="rounded-lg border border-teal-400/20 bg-white/10 p-2 backdrop-blur-md transition-transform duration-200 group-hover:scale-105">
                        <Icon className="h-5 w-5 text-teal-300" />
                      </div>

                      <CardTitle className="text-base font-semibold text-white">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/*
                      Each card's badges get their own whileInView — they animate
                      when the badge area enters the viewport, not when the card does.
                      This prevents a simultaneous explosion of badge animations
                      across all 5 cards at once.
                    */}
                    <motion.div
                      variants={badgeContainerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          variants={badgeVariants}
                          whileHover={{
                            y: -2,
                            scale: 1.06,
                            transition: { duration: 0.15 },
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="cursor-default border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 transition-colors duration-200 hover:border-teal-400/30 hover:bg-white/15 hover:text-teal-200"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
