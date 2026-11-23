"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { EASE } from "../primitives";

const ROWS = [
  { n: "I", t: "Formulate", d: "Discovery, validation, pricing" },
  { n: "II", t: "Implement", d: "Product, design, engineering" },
  { n: "III", t: "Sell", d: "GTM, pipeline, closing" },
];

const line = (delay: number) => ({
  initial: { y: "105%" },
  animate: { y: "0%" },
  transition: { duration: 1.1, ease: EASE, delay },
});

/** Sample B — warm editorial: big serif type, magazine grid, rotating seal. */
export default function Editorial() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#f3eee4] text-[#14120f]">
      <header className="flex items-center justify-between border-b border-black/10 px-6 py-5 sm:px-10">
        <span className="font-serif text-2xl italic">Elixiray</span>
        <nav className="hidden gap-8 text-sm sm:flex">
          {["Practice", "Method", "Work", "Journal"].map((l) => (
            <span key={l} className="cursor-pointer hover:underline hover:underline-offset-4">{l}</span>
          ))}
        </nav>
        <span className="rounded-full bg-[#14120f] px-4 py-2 text-sm text-[#f3eee4]">Book a call</span>
      </header>

      <div className="grid grid-cols-12 gap-x-6 px-6 pt-10 sm:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 font-mono text-xs uppercase tracking-[0.2em] text-black/50 md:col-span-3"
        >
          Vol. 01 — Tech sales consulting
          <br />
          Est. for founders &amp; innovators
        </motion.p>

        <h1 className="col-span-12 mt-6 font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.86] tracking-[-0.03em] md:col-span-9 md:mt-0">
          <span className="block overflow-hidden"><motion.span className="block" {...line(0.1)}>Ideas, distilled.</motion.span></span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(0.25)}>
              Products,{" "}
              <span className="relative inline-block italic">
                sold.
                <svg viewBox="0 0 300 30" className="absolute -bottom-2 left-0 w-full" aria-hidden>
                  <motion.path
                    d="M4 20 C 80 4, 200 4, 296 18"
                    fill="none"
                    stroke="#e0582b"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: 1.1 }}
                  />
                </svg>
              </span>
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-6 px-6 pb-16 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
          className="col-span-12 max-w-sm text-lg leading-relaxed text-black/70 md:col-span-4"
        >
          Elixiray partners with founders and enterprise teams to shape new technology ideas, build them, and take
          them to market — under one roof, with one accountable team.
        </motion.p>

        <div className="col-span-12 border-t border-black/15 md:col-span-6 md:col-start-5">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.12 }}
              className="group flex items-baseline justify-between gap-4 border-b border-black/15 py-5"
            >
              <span className="w-10 font-serif italic text-black/40">{r.n}</span>
              <span className="flex-1 font-serif text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{r.t}</span>
              <span className="hidden text-sm text-black/50 sm:block">{r.d}</span>
              <ArrowDownRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
            </motion.div>
          ))}
        </div>

        {/* rotating seal */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.2 }}
          className="col-span-12 hidden justify-end md:col-span-2 md:flex"
        >
          <div className="relative h-32 w-32">
            <motion.svg viewBox="0 0 100 100" className="h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9.5" letterSpacing="3" className="fill-current font-mono uppercase">
                <textPath href="#circle">Book a strategy call • Book a call •</textPath>
              </text>
            </motion.svg>
            <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-[#e0582b] text-[#f3eee4]">
              <ArrowDownRight className="h-5 w-5" />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
