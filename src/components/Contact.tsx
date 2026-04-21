"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  Check,
  GitBranch,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./SectionHeading";

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
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
    copyOnly: true,
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

// Two columns enter simultaneously — no stagger between them
const twoColLayout: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Contact info rows — own whileInView, decoupled from column slide
const infoListVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const infoItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// Form fields — own whileInView, decoupled from column slide
const formStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
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

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(45,212,191,0.16), rgba(34,211,238,0.10) 35%, transparent 70%)`;

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

type CopyFxState = { visible: boolean; x: number; y: number };

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copyFx, setCopyFx] = useState<CopyFxState>({
    visible: false,
    x: 0,
    y: 0,
  });
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

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

  const handleCopyEmail = async (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
    label: string,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      setCopyFx({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      window.setTimeout(
        () => setCopyFx((prev) => ({ ...prev, visible: false })),
        700,
      );
      window.setTimeout(
        () => setCopiedLabel((cur) => (cur === label ? null : cur)),
        1600,
      );
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Background blobs: whileInView so they only animate when section is visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: [0, -18, 0], x: [0, 10, 0] }}
          viewport={{ once: false }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 10, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 10, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
          }}
          className="absolute left-[10%] top-8 h-28 w-28 rounded-full bg-teal-400/10 blur-3xl sm:left-1/4 sm:top-10 sm:h-40 sm:w-40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: [0, 20, 0], x: [0, -12, 0] }}
          viewport={{ once: false }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 12, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 12, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
          }}
          className="absolute right-[8%] top-20 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl sm:right-1/4 sm:top-24 sm:h-52 sm:w-52"
        />
      </div>

      <SectionHeading
        title="Contact Me"
        subtitle="Have a project in mind or just want to say hello? Let's connect."
      />

      {/* Both columns enter simultaneously from opposite sides */}
      <motion.div
        variants={twoColLayout}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Left — contact info */}
        <motion.div variants={slideLeft} className="min-w-0 w-full space-y-6">
          <motion.div
            whileHover={{
              y: -4,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
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

                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                  {/*
                    Contact rows: own whileInView — animate when the list
                    enters view, not when the column slides in.
                  */}
                  <motion.div
                    variants={infoListVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {contactInfo.map((info) => {
                      const Icon = info.icon;
                      return (
                        <motion.div
                          key={info.label}
                          variants={infoItemVariants}
                          whileHover={{
                            y: -3,
                            transition: {
                              duration: 0.18,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }}
                          className="group/item flex w-full min-w-0 items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-3 transition-colors duration-300 hover:border-teal-300/25 hover:bg-white/10 sm:gap-4 sm:p-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-teal-300 backdrop-blur-md transition-transform duration-200 group-hover/item:scale-105 sm:w-11">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 sm:text-xs sm:tracking-[0.18em]">
                              {info.label}
                            </p>

                            {info.copyOnly ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleCopyEmail(e, info.value, info.label)
                                }
                                className="relative mt-1 block w-fit max-w-full cursor-pointer break-all text-left text-sm font-medium text-white/80 transition-colors hover:text-teal-300 sm:text-[15px]"
                              >
                                {info.value}
                                <AnimatePresence>
                                  {copyFx.visible &&
                                    copiedLabel === info.label && (
                                      <>
                                        <motion.span
                                          initial={{
                                            opacity: 0,
                                            scale: 0.3,
                                            x: copyFx.x - 14,
                                            y: copyFx.y - 14,
                                          }}
                                          animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.3, 1.15, 0.6],
                                          }}
                                          exit={{ opacity: 0 }}
                                          transition={{ duration: 0.7 }}
                                          className="pointer-events-none absolute z-20 text-amber-300"
                                          style={{ left: 0, top: 0 }}
                                        >
                                          <Sparkles className="h-6 w-6" />
                                        </motion.span>

                                        <motion.span
                                          initial={{
                                            opacity: 0,
                                            y: 8,
                                            scale: 0.92,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            y: -8,
                                            scale: 1,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            y: -16,
                                            scale: 0.96,
                                          }}
                                          transition={{
                                            duration: 0.45,
                                            ease: [0.22, 1, 0.36, 1],
                                          }}
                                          className="pointer-events-none absolute left-0 top-full z-20 mt-1 inline-flex items-center gap-1 rounded-full border border-teal-300/25 bg-slate-950/90 px-2.5 py-1 text-[11px] font-semibold text-teal-300 shadow-lg backdrop-blur-md"
                                        >
                                          <Check className="h-3.5 w-3.5" />
                                          Copied
                                        </motion.span>

                                        {[...Array(6)].map((_, i) => {
                                          const particles = [
                                            { x: 0, y: -26 },
                                            { x: 22, y: -14 },
                                            { x: 26, y: 10 },
                                            { x: 0, y: 24 },
                                            { x: -24, y: 12 },
                                            { x: -18, y: -16 },
                                          ];
                                          return (
                                            <motion.span
                                              key={i}
                                              initial={{
                                                opacity: 0.9,
                                                x: copyFx.x,
                                                y: copyFx.y,
                                                scale: 0.4,
                                              }}
                                              animate={{
                                                opacity: 0,
                                                x: copyFx.x + particles[i].x,
                                                y: copyFx.y + particles[i].y,
                                                scale: 1,
                                              }}
                                              exit={{ opacity: 0 }}
                                              transition={{ duration: 0.65 }}
                                              className="pointer-events-none absolute z-10 h-1.5 w-1.5 rounded-full bg-teal-300"
                                              style={{ left: 0, top: 0 }}
                                            />
                                          );
                                        })}
                                      </>
                                    )}
                                </AnimatePresence>
                              </button>
                            ) : info.link ? (
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
                              <p className="mt-1 break-all text-sm font-medium text-white/80 sm:text-[15px]">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </CardContent>
              </Card>
            </GlowCard>
          </motion.div>
        </motion.div>

        {/* Right — contact form */}
        <motion.div variants={slideRight} className="min-w-0 w-full">
          <motion.div
            whileHover={{
              y: -4,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
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
                  {/*
                    Form fields: own whileInView stagger — decoupled from
                    the column slide. Fields animate in when the form area
                    itself enters the viewport.
                  */}
                  <motion.form
                    variants={formStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <motion.div
                      variants={formFieldVariants}
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
                        className="mt-2 h-10 w-full min-w-0 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:h-12"
                      />
                    </motion.div>

                    <motion.div
                      variants={formFieldVariants}
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
                        className="mt-2 h-10 w-full min-w-0 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:h-12"
                      />
                    </motion.div>

                    <motion.div
                      variants={formFieldVariants}
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
                        className="mt-2 min-h-32 w-full min-w-0 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20 sm:min-h-40"
                      />
                    </motion.div>

                    {/* Submit button: whileHover/whileTap scoped transitions only */}
                    <motion.div
                      variants={formFieldVariants}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.18 },
                      }}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                      className="w-full"
                    >
                      <Button
                        type="submit"
                        className="h-10 w-full cursor-pointer rounded-xl border border-teal-300/20 bg-linear-to-r from-teal-400/85 to-cyan-300/85 text-slate-950 shadow-[0_10px_30px_rgba(45,212,191,0.22)] transition-all duration-300 hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)] sm:h-12"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </GlowCard>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer copyright */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
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
