"use client";

import { GitBranch, Link, Mail, MapPin, Phone, Send } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
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
    icon: Link,
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

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
    <section id="contact" className="relative scroll-mt-16 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-10 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <SectionHeading
        title="Contact Me"
        subtitle="Have a project in mind or just want to say hello? Let’s connect."
      />

      <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className={cn(
            "space-y-6 -translate-x-8 opacity-0 transition-all duration-1000",
            mounted && "translate-x-0 opacity-100",
          )}
        >
          <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-300/70 to-transparent" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />

            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-white">
                Contact Information
              </CardTitle>
              <p className="text-sm leading-6 text-white/55">
                I am open to frontend roles, freelance work, and product-focused
                collaborations.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;

                return (
                  <div
                    key={info.label}
                    className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4 transition-all duration-300 hover:border-teal-300/25 hover:bg-white/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-teal-300 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                        {info.label}
                      </p>

                      {info.link ? (
                        <a
                          href={info.link}
                          target={
                            info.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-1 block wrap-break-word text-sm font-medium text-white/80 transition-colors hover:text-teal-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-white/80">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div
          className={cn(
            "translate-x-8 opacity-0 transition-all duration-1000 delay-300",
            mounted && "translate-x-0 opacity-100",
          )}
        >
          <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-white">
                Send Me a Message
              </CardTitle>
              <p className="text-sm leading-6 text-white/55">
                Fill out the form and I will get back to you as soon as
                possible.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
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
                      className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20"
                    />
                  </div>

                  <div className="space-y-2">
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
                      className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
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
                    className="min-h-37.5 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/35 backdrop-blur-md focus-visible:border-teal-400/40 focus-visible:ring-2 focus-visible:ring-teal-400/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl border border-teal-300/20 bg-linear-to-r from-teal-400/85 to-cyan-300/85 text-slate-950 shadow-[0_10px_30px_rgba(45,212,191,0.22)] transition-all duration-300 hover:from-teal-300 hover:to-cyan-200 hover:shadow-[0_12px_36px_rgba(45,212,191,0.35)]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-20 text-center text-sm text-white/40">
        <p>
          © {new Date().getFullYear()} Md. Moniruzzaman. All rights reserved.
        </p>
      </div>
    </section>
  );
}
