"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { EASE, Logo } from "../primitives";
import { ThemeToggle } from "../ThemeToggle";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#method", label: "Method" },
  { href: "#work", label: "Work" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-fg/10 bg-ink/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)] light:shadow-[0_8px_40px_-16px_rgb(20_18_31/0.15)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" aria-label="Elixiray home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-paper/70 transition-colors hover:bg-fg/5 hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            className="rounded-lg p-2 text-paper md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-fg/10 bg-ink-2/95 p-3 backdrop-blur-xl md:hidden"
          >
            {[...LINKS, { href: "#contact", label: "Book a call" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="block rounded-xl px-4 py-3 text-paper/80 hover:bg-fg/5"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-gold via-ember to-iris"
      />
    </motion.header>
  );
}
