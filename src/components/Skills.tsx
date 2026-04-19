"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  MonitorSmartphone,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="relative scroll-mt-16 py-20">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and abilities I've acquired"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;

          return (
            <Card
              key={category.title}
              className={cn(
                "translate-y-8 opacity-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]",
                mounted && "translate-y-0 opacity-100",
              )}
              style={{
                transitionDelay: mounted ? `${index * 100}ms` : "0ms",
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2 backdrop-blur-md">
                    <Icon className="h-6 w-6 text-teal-300" />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/80 hover:border-teal-400/30 hover:bg-white/15"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
