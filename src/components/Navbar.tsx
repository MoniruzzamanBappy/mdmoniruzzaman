"use client";

import { motion, type Variants } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experiences", href: "#experiences" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

// Header slides down once on load
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Nav links stagger in after header settles
const navListVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35, // waits for header to finish
    },
  },
};

const navLinkVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Logo fades in with a slight delay
const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

// Mobile: re-animates every time the sheet opens (animate prop is key-driven)
const mobileListVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={headerVariants}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-slate-950/55 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-15 sm:px-4 lg:px-6">
        {/* Logo — its own variant, not inheriting stagger */}
        <motion.div variants={logoVariants} initial="hidden" animate="show">
          <Link href="/" className="flex items-center">
            <span className="sr-only">Md. Moniruzzaman</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-300/20 bg-white/8 shadow-[0_8px_24px_rgba(45,212,191,0.14)] backdrop-blur-xl md:hidden">
              <span className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-xs font-bold tracking-wide text-transparent">
                MB
              </span>
            </div>
            <div className="hidden bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-lg font-bold text-transparent transition-opacity hover:opacity-80 md:block">
              MB
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav — separate stagger orchestration */}
        <motion.nav
          initial="hidden"
          animate="show"
          variants={navListVariants}
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => (
            <motion.div key={item.name} variants={navLinkVariants}>
              <Link
                href={item.href}
                className="group relative text-sm font-medium text-white/70 transition-colors duration-200 hover:text-teal-300"
              >
                {item.name}
                {/* Underline slide-in on hover */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-300/60 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile menu trigger */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="show"
          className="lg:hidden"
        >
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-white/75 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-teal-300"
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-4.5 w-4.5" />
                </motion.div>
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[84%] border-l border-white/10 bg-slate-950/70 p-0 backdrop-blur-2xl sm:max-w-sm">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

              <div className="relative flex h-full flex-col">
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/20 bg-white/8 shadow-[0_8px_24px_rgba(45,212,191,0.12)] backdrop-blur-xl">
                      <span className="bg-linear-to-r from-teal-300 to-cyan-200 bg-clip-text text-xs font-bold tracking-wide text-transparent">
                        MB
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Md. Moniruzzaman
                      </p>
                      <p className="text-xs text-white/45">
                        Frontend Developer
                      </p>
                    </div>
                  </div>
                </div>

                {/*
                  KEY CHANGE: `animate` uses `open` as a key trigger so
                  Framer Motion re-runs the stagger every time the sheet opens.
                  Without this, items only animate on the very first open.
                */}
                <motion.div
                  key={open ? "open" : "closed"}
                  initial="hidden"
                  animate={open ? "show" : "hidden"}
                  variants={mobileListVariants}
                  className="flex flex-1 flex-col px-4 py-5"
                >
                  <div className="mb-3 px-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Navigation
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={mobileItemVariants}
                        whileHover={{ x: 5, transition: { duration: 0.15 } }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-sm font-medium text-white/75 transition-all duration-300 hover:border-teal-300/20 hover:bg-white/10 hover:text-teal-300"
                        >
                          <span>{item.name}</span>
                          <span className="text-white/25">/</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  );
}
