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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
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

const badgeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category) => {
          const Icon = category.icon;

          return (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <GlowCard className="group relative h-full rounded-2xl">
                <Card className="h-full rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 6, scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-lg bg-white/10 p-2 backdrop-blur-md"
                      >
                        <Icon className="h-6 w-6 text-teal-300" />
                      </motion.div>

                      <CardTitle className="text-lg text-white">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <motion.div
                      variants={badgeContainerVariants}
                      className="flex flex-wrap gap-2"
                    >
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          variants={badgeVariants}
                          whileHover={{ y: -2, scale: 1.04 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="secondary"
                            className="border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/80 hover:border-teal-400/30 hover:bg-white/15"
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
