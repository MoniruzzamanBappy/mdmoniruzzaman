"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, Building2, CalendarDays, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    company: "Ampec Technologies",
    role: "Software Engineer",
    location: "Dhaka, Bangladesh",
    duration: "May 2024 - Present",
    type: "Onsite",
    points: [
      "Engineered a scalable ERP platform (TEC-ERP) to streamline project management, workforce operations, and scheduling.",
      "Created procurement, invoicing, and automated reminder modules, improving cash flow by 20%.",
      "Designed KPI dashboards and real-time notification systems to support data-driven decision-making.",
      "Established role-based access control (RBAC), improving system security and usability.",
      "Integrated data import/export tools for third-party systems, reducing manual workload and improving efficiency.",
      "Delivered responsive, mobile-first interfaces with cross-browser compatibility.",
      "Optimized frontend performance, reducing load times and improving user experience.",
      "Collaborated in an Agile/Scrum environment with CI/CD pipelines for faster, more reliable deployments.",
    ],
  },
  {
    company: "HealthOS",
    role: "Frontend Engineer",
    location: "Dhaka, Bangladesh",
    duration: "September 2022 - April 2024",
    type: "Hybrid",
    points: [
      "Delivered an e-commerce platform and order processing system, improving operational efficiency.",
      "Created a procurement application for medicine purchasing, increasing revenue by 15%.",
      "Launched a delivery tracking application, reducing inventory discrepancies and payment errors.",
      "Integrated push notifications and promotional banners, increasing sales by 20%.",
      "Introduced cart abandonment notifications, recovering lost sales and boosting revenue by 12%.",
      "Enabled deep linking features, contributing to a 10% increase in revenue.",
      "Designed a role-based admin dashboard for managing orders, products, and promotions.",
      "Strengthened application security through a two-step authentication system.",
      "Mentored junior developers and performed code reviews.",
      "Applied unit testing practices using Jest to improve code reliability and maintainability.",
      "Improved application speed and responsiveness through performance optimization.",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pointContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const pointVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Experiences() {
  return (
    <section id="experiences" className="relative scroll-mt-16 py-24">
      <SectionHeading
        title="Experiences"
        subtitle="My professional journey and the impact I have made"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-teal-300/30 to-transparent md:block" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-8"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.company}
              variants={cardVariants}
              className="relative"
            >
              <div className="md:pl-14">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-8 hidden h-8 w-8 items-center justify-center rounded-full border border-teal-300/30 bg-white/10 backdrop-blur-xl md:flex"
                >
                  <Briefcase className="h-4 w-4 text-teal-300" />
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 hover:border-teal-300/25 hover:bg-white/10">
                    <div className="h-px w-full bg-linear-to-r from-transparent via-teal-300/60 to-transparent" />

                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-semibold text-white">
                              {experience.role}
                            </h3>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                              <span className="inline-flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-teal-300" />
                                {experience.company}
                              </span>

                              <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-teal-300" />
                                {experience.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/75">
                              <CalendarDays className="h-3.5 w-3.5 text-teal-300" />
                              {experience.duration}
                            </span>

                            <span className="rounded-full border border-teal-300/20 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
                              {experience.type}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          variants={pointContainerVariants}
                          className="grid gap-3"
                        >
                          {experience.points.map((point) => (
                            <motion.div
                              key={point}
                              variants={pointVariants}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                              className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-7 text-white/75 transition-all duration-300 hover:border-teal-300/20 hover:bg-white/10"
                            >
                              {point}
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
