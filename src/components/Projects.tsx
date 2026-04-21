"use client";

import { motion, type Variants } from "framer-motion";

import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Grain Marketplace",
    description:
      "A multi-role grain trading marketplace for farmers, buyers, and agents to manage offers, bids, GRN verification, orders, deliveries, and real-time notifications across web and mobile.",
    date: "2025",
    techStack: [
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Push Notifications",
    ],
    demoUrl: "https://play.google.com/store/apps/details?id=com.grainx.mobile",
    codeUrl: "",
    imageSrc: "/images/grainx.png",
  },
  {
    title: "Light House",
    description:
      "An e-commerce admin dashboard for managing orders, products, offers, and employees with secure access, advanced filtering, 2-step login, and CSV export.",
    date: "2022-2024",
    techStack: [
      "Next.js",
      "NextAuth.js",
      "MobX",
      "TanStack Query",
      "TanStack Table",
      "Recharts",
      "i18next",
    ],
    demoUrl: "https://lh.healthosbd.com/",
    codeUrl: "",
    imageSrc: "/images/light.png",
  },
  {
    title: "Reporter",
    description:
      "A delivery management mobile app for tracking deliveries, collecting payments, handling returns, and updating inventory in real time.",
    date: "2022-2024",
    techStack: ["React Native", "Expo", "MobX", "NativeBase"],
    demoUrl: "https://reporter.healthosbd.com/",
    codeUrl: "",
    imageSrc: "/images/reporter.png",
  },
  {
    title: "TEC-PORTAL",
    description:
      "A cloud-based operations portal that automates warehouse workflows, quotations, sales, work orders, scheduling, inventory, and invoicing with real-time operational visibility.",
    date: "2024-2026",
    techStack: [
      "React",
      "Vite",
      "MobX",
      "TanStack Query",
      "TanStack Table",
      "Chart.js",
      "Shadcn UI",
    ],
    demoUrl: "https://tec.ampecportal.com/",
    codeUrl: "",
    imageSrc: "/images/tec.png",
  },
  {
    title: "Crafty Soft UI",
    description:
      "A modern, open-source frontend toolkit offering ready-to-use components, templates, and theming tools to build responsive UIs quickly.",
    date: "Jul 2025",
    techStack: ["React", "Tailwind CSS"],
    demoUrl: "https://craft-soft-ui.vercel.app/",
    codeUrl: "",
    imageSrc: "/images/craftysoft-ui.png",
  },
  {
    title: "Drag Dashboard",
    description:
      "A drag-and-drop admin dashboard built with React, Next.js, and Tailwind. Includes dynamic components and a smooth UI experience.",
    date: "Jun 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://drag-dashboard.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/drag-dashboard",
    imageSrc: "/images/drag-dashboard.png",
  },
  {
    title: "Hotel Dashboard",
    description:
      "An intuitive dashboard for hotel management with booking and analytics UI, built using modern web stack.",
    date: "May 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://hotel-dashboard-liart.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/Hotel-Dashboard",
    imageSrc: "/images/hotel-dashboard.png",
  },
  {
    title: "Kanban Board",
    description:
      "A Trello-style task management board with drag-and-drop features, clean layout, and responsive design.",
    date: "Apr 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://kanban-board-sigma-blond.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/kanban-board",
    imageSrc: "/images/kanban-board.png",
  },
  {
    title: "Calendar App",
    description:
      "A calendar-based scheduling and event app with clean visuals, fast performance, and modern stack integration.",
    date: "Apr 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://calendar-app-seven-chi.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/Calendar-APP",
    imageSrc: "/images/calendar-app.png",
  },
  {
    title: "Restaurant POS System",
    description:
      "A Point-of-Sale web app for restaurant order and billing management, with a sleek and intuitive interface.",
    date: "Mar 2025",
    techStack: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    demoUrl: "https://restaurant-pos-web.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/restaurant-pos-web",
    imageSrc: "/images/restaurant-pos.png",
  },
  {
    title: "Student Dashboard",
    description:
      "A fully featured dashboard for student profile and activity tracking, with responsive design and real data layout.",
    date: "Mar 2025",
    techStack: ["Next.js", "Tailwind CSS"],
    demoUrl: "https://student-dashboard-psi-indol.vercel.app/",
    codeUrl: "https://github.com/MoniruzzamanBappy/student-dashboard",
    imageSrc: "/images/student-dashboard.png",
  },
];

// Row-level stagger: only 2 children per row, so max wait = 1 × 0.12 = 0.12s
const rowVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

// Card enters with a short, snappy animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Chunk projects into rows of 2 for row-level viewport triggering
function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

export default function Projects() {
  const rows = chunkArray(projects, 2);

  return (
    <section id="projects" className="relative scroll-mt-16 py-20">
      <SectionHeading title="Projects" subtitle="Some of my recent work" />

      <div className="space-y-6">
        {rows.map((row, rowIndex) => (
          /*
            Each row is its own whileInView stagger context.
            Max stagger per row = 1 card × 0.12s = 0.12s.
            Rows trigger independently as the user scrolls down,
            so cards always feel immediate regardless of grid position.
          */
          <motion.div
            key={rowIndex}
            variants={rowVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {row.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                // whileHover has its own scoped transition — doesn't affect enter
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
