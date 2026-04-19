"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
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

export default function Achievements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section id="achievements" className="relative scroll-mt-16 py-20">
      <SectionHeading
        title="Achievements"
        subtitle="Recognition and accomplishments"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.title}
            className={cn(
              "translate-y-8 opacity-0 transition-all duration-700",
              mounted && "translate-y-0 opacity-100",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <AchievementCard {...achievement} />
          </div>
        ))}
      </div>
    </section>
  );
}
