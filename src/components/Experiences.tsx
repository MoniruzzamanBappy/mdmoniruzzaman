"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Briefcase, Building2, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import GlowCard from "./GlowCard";
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
      "Integrated data import/export tools for third-party systems, reducing manual workload.",
      "Delivered responsive, mobile-first interfaces with cross-browser compatibility.",
      "Optimized frontend performance, reducing load times and improving user experience.",
      "Collaborated in an Agile/Scrum environment with CI/CD pipelines for reliable deployments.",
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
    ],
  },
  {
    company: "Onito Technologies",
    role: "React Developer",
    location: "Kanpur, India",
    duration: "August 2022 - September 2022",
    type: "Remote",
    points: [
      "Developed and maintained a hospital management system, streamlining patient and administrative workflows.",
      "Built responsive interfaces using React, improving usability for medical staff and administrators.",
      "Implemented modules for patient registration, appointment scheduling, billing, and medical records.",
      "Optimized application performance, reducing load times and improving system responsiveness.",
      "Integrated RESTful APIs to ensure seamless data flow between frontend and backend systems.",
      "Implemented role-based access control for secure handling of sensitive patient data.",
      "Improved code quality through reusable components, best practices, and regular code reviews.",
    ],
  },
];

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

// On tab switch: bullets only fade in (no x movement) since
// the parent contentVariants already handles the y transition
const pointVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experiences() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experiences" className="relative scroll-mt-16 py-24">
      <SectionHeading
        title="Experiences"
        subtitle="My professional journey and the impact I have made"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-5xl"
      >
        {/* ── Tab strip ────────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row">
          {experiences.map((e, i) => (
            /*
              GlowCard IS the interactive element here.
              - `group` enables the glow overlay inside GlowCard
              - No nested button with duplicate border/padding
              - onClick, role, aria on the GlowCard's root div via className
                isn't possible, so we make GlowCard a button via `as` pattern —
                instead, we wrap minimally: GlowCard handles glow, button is
                the only child with no extra border (border is on GlowCard).
            */
            <GlowCard
              key={e.company}
              className={cn(
                "group relative flex-1 cursor-pointer rounded-2xl border transition-all duration-300",
                active === i
                  ? "border-teal-300/40 bg-teal-400/10"
                  : "border-white/8 bg-white/5 hover:border-white/15 hover:bg-white/8",
              )}
            >
              <button
                onClick={() => setActive(i)}
                className="flex w-full flex-col items-start gap-0.5 px-5 py-4 text-left cursor-pointer"
              >
                {/* Active indicator bar */}
                <motion.span
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-teal-300"
                />

                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300",
                    active === i ? "text-teal-300" : "text-white/35",
                  )}
                >
                  {e.duration.split(" - ")[1] ?? "Present"}
                </span>

                <span
                  className={cn(
                    "text-sm font-semibold leading-tight transition-colors duration-300",
                    active === i ? "text-white" : "text-white/50",
                  )}
                >
                  {e.company}
                </span>

                <span
                  className={cn(
                    "text-xs transition-colors duration-300",
                    active === i ? "text-white/60" : "text-white/30",
                  )}
                >
                  {e.role}
                </span>
              </button>
            </GlowCard>
          ))}
        </div>

        {/* ── Content card ─────────────────────────────────────────────────── */}
        <GlowCard className="group relative rounded-3xl">
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="h-px w-full bg-linear-to-r from-transparent via-teal-300/60 to-transparent" />

            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={contentVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {/* Header */}
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-300/25 bg-teal-400/10">
                          <Briefcase className="h-4 w-4 text-teal-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white md:text-2xl">
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pl-12 text-sm text-white/55">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-teal-300/70" />
                          {exp.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-teal-300/70" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/65">
                        <CalendarDays className="h-3 w-3 text-teal-300/70" />
                        {exp.duration}
                      </span>
                      <span className="rounded-full border border-teal-300/20 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 h-px bg-white/8" />

                  {/* Bullet points */}
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-2.5"
                  >
                    {exp.points.map((point) => (
                      <motion.li
                        key={point}
                        variants={pointVariants}
                        whileHover={{ x: 4, transition: { duration: 0.15 } }}
                        className="group/item flex cursor-default items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors duration-200 hover:border-teal-300/15 hover:bg-white/5"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/40 transition-colors duration-200 group-hover/item:bg-teal-300" />
                        <span className="text-sm leading-7 text-white/65 transition-colors duration-200 group-hover/item:text-white/80">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </GlowCard>

        {/* ── Dot navigation ───────────────────────────────────────────────── */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${experiences[i].company}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                active === i
                  ? "w-8 bg-teal-300"
                  : "w-2 bg-white/20 hover:bg-white/35",
              )}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
