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

const navContainer: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileMenuContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const mobileMenuItem: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
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
      variants={navContainer}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-slate-950/55 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-15 sm:px-4 lg:px-6">
        <motion.div variants={navItem}>
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

        <motion.nav
          variants={navContainer}
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              variants={navItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-teal-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div variants={navItem} className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-white/75 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-teal-300"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.2 }}
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

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={mobileMenuContainer}
                  className="flex flex-1 flex-col px-4 py-5"
                >
                  <div className="mb-3 px-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Navigation
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={mobileMenuItem}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
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
