"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, Eyebrow, Reveal, SplitWords } from "../primitives";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    time: "Week 1–2",
    copy: "We immerse in your market, customers and constraints. Twenty-plus buyer conversations replace guesswork with evidence.",
    out: "Opportunity brief",
  },
  {
    n: "02",
    title: "Distill",
    time: "Week 3–4",
    copy: "The idea is reduced to its most valuable core: a sharp problem, a must-have solution, a price a buyer will sign for.",
    out: "Product thesis + pricing",
  },
  {
    n: "03",
    title: "Develop",
    time: "Week 5–10",
    copy: "Our build pods ship an MVP in tight two-week cycles, with design partners using it from the first demo.",
    out: "Launch-ready MVP",
  },
  {
    n: "04",
    title: "Deploy & Sell",
    time: "Week 8 → ongoing",
    copy: "Go-to-market runs in parallel with the build. We open doors, run demos and close the first deals — then hand you the playbook.",
    out: "Repeatable revenue motion",
  },
];

export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="method" className="relative border-t border-fg/[0.06] bg-ink-3/60">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-28 sm:px-6 sm:py-40 md:grid-cols-[1fr_1.25fr]">
        <div className="md:sticky md:top-32 md:h-fit">
          <Reveal>
            <Eyebrow>The Elixiray method</Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl">
            <SplitWords inView text="From spark to" />
            <SplitWords inView delay={0.15} text="signed contract." wordClassName="text-ray" />
          </h2>
          <Reveal delay={0.2} className="mt-6 max-w-sm text-paper/60">
            A four-stage process we&apos;ve refined across 60+ launches. Sales starts before the product is finished —
            that&apos;s how we compress time-to-revenue.
          </Reveal>
        </div>

        <div ref={ref} className="relative pl-10">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-fg/10" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-gold via-ember to-iris"
          />
          <ol className="space-y-14">
            {STEPS.map((s) => (
              <li key={s.n} className="relative">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-gold/50 bg-ink"
                >
                  <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_var(--color-gold)]" />
                </motion.span>
                <Reveal>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-sm text-gold">{s.n}</span>
                    <h3 className="text-3xl font-semibold tracking-tight">{s.title}</h3>
                    <span className="text-sm font-medium text-mute">{s.time}</span>
                  </div>
                  <p className="mt-4 max-w-lg leading-relaxed text-paper/65">{s.copy}</p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-xs text-paper/75"
                  >
                    <span className="text-mute">Output →</span> {s.out}
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
