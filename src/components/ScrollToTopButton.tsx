"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.88 }}
          // Enter/exit transition only — hover/tap use their own scoped transitions
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -3,
            scale: 1.06,
            transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          }}
          whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-teal-300/20 bg-slate-950/70 text-teal-300 shadow-[0_10px_30px_rgba(45,212,191,0.18)] backdrop-blur-xl transition-colors hover:border-teal-300/40 hover:bg-slate-900/80 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
