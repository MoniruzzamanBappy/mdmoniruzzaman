"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  GitBranch,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./SectionHeading";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+8801521431212",
    link: "tel:+8801521431212",
  },
  {
    icon: Mail,
    label: "Email",
    value: "mdmoniruzzamanbappy@gmail.com",
    link: "mailto:mdmoniruzzamanbappy@gmail.com",
  },
  {
    icon: LinkIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/mdmoniruzzamanbappy",
    link: "https://www.linkedin.com/in/mdmoniruzzamanbappy/",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/MoniruzzamanBappy",
    link: "https://github.com/MoniruzzamanBappy",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      240px circle at ${mouseX}px ${mouseY}px,
      rgba(45, 212, 191, 0.16),
      rgba(34, 211, 238, 0.10) 35%,
      transparent 70%
    )
  `;

  return (
    <motion.div onMouseMove={handleMouseMove} className={className}>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent successfully!");
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-[10%] top-8 h-28 w-28 rounded-full bg-teal-400/10 blur-3xl sm:left-1/4 sm:top-10 sm:h-40 sm:w-40"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-[8%] top-20 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl sm:right-1/4 sm:top-24 sm:h-52 sm:w-52"
        />
      </div>

      <SectionHeading
        title="Contact Me"
        subtitle="Have a project in mind or just want to say hello? Let’s connect."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-4 px-1 min-[380px]:gap-5 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8"
      >
        <motion.div
          variants={leftVariants}
          className="min-w-0 w-full space-y-6"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 w-full"
          >
            <GlowCard className="group relative w-full min-w-0 max-w-full rounded-2xl sm:rounded-3xl">
              <Card className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:rounded-3xl">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-300/70 to-transparent" />
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal-400/10 blur-3xl sm:h-40 sm:w-40" />

                <CardHeader className="px-4 pb-4 sm:px-6">
                  <CardTitle className="text-xl font-semibold text-white sm:text-2xl">
                    Contact Information
                  </CardTitle>
                  <p className="text-sm leading-6 text-white/55">
                    I am open to frontend roles, freelance work, and
                    product-focused collaborations.
                  </p>
                </CardHeader>

                <CardContent className="space-y-3 px-4 pb-4 sm:space-y-4 sm:px-6 sm:pb-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;

                    return (
                      <motion.div
                        key={info.label}
                        variants={itemVariants}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="group/item flex w-full min-w-0 items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-3 transition-all duration-300 hover:border-teal-300/25 hover:bg-white/10 sm:gap-4 sm:p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-teal-300 backdrop-blur-md transition-transform duration-300 group-hover/item:scale-105 sm:h-10 sm:w-11">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 sm:text-xs sm:tracking-[0.18em]">
                            {info.label}
                          </p>

                          {info.link ? (
                            <a
                              href={info.link}
                              target={
                                info.link.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                info.link.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="mt-1 block break-all text-sm font-medium text-white/80 transition-colors hover:text-teal-300 sm:text-[15px]"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="mt-1 break-words text-sm font-medium text-white/80 sm:text-[15px]">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </GlowCard>
          </motion.div>
        </motion.div>

        <motion.div variants={rightVariants} className="min-w-0 w-full">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 w-full"
          >
            <GlowCard className="group relative w-full min-w-0 max-w-full rounded-2xl sm:rounded-3xl">
              <Card className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:rounded-3xl">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
                <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl sm:h-52 sm:w-52" />

                <CardHeader className="px-4 pb-4 sm:px-6">
                  <CardTitle className="text-xl font-semibold text-white sm:text-2xl">
                    Send Me a Message
                  </CardTitle>
                  <p className="text-sm leading-6 text-white/55">
                    Fill out the form and I will get back to you as soon as
                    possible.
                  </p>
                </CardHeader>

                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <motion.div
                        variants={itemVariants}
                        className="min-w-0 space-y-2"
                      >
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-white/65"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="h-10 w-full min-w-0 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:h-12"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="min-w-0 space-y-2"
                      >
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-white/65"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="h-10 w-full min-w-0 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:h-12"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      variants={itemVariants}
                      className="min-w-0 space-y-2"
                    >
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-white/65"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, idea, or opportunity..."
                        required
                        className="min-h-32 w-full min-w-0 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:min-h-40"
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Button
                        type="submit"
                        className="h-10 cursor-pointer w-full rounded-xl border border-teal-300/20 bg-linear-to-r from-teal-400/85 to-cyan-300/85 text-slate-950 shadow-[0_10px_30px_rgba(45,212,191,0.22)] transition-all duration-300 hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] sm:h-12"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </GlowCard>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 px-2 text-center text-xs text-white/40 sm:mt-16 sm:text-sm lg:mt-20"
      >
        <p>
          © {new Date().getFullYear()} Md. Moniruzzaman. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}
