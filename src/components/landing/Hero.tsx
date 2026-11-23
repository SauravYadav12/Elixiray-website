"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { EASE, Eyebrow, Magnetic, SplitWords } from "../primitives";

const STAGES = [
  { icon: Lightbulb, step: "01", title: "Formulate", meta: "Idea validated", value: "12 interviews · 3 pivots", color: "text-gold" },
  { icon: Rocket, step: "02", title: "Implement", meta: "MVP shipped", value: "Week 9 · 2 pilots live", color: "text-ember" },
  { icon: TrendingUp, step: "03", title: "Sell", meta: "Pipeline built", value: "$4.2M qualified", color: "text-iris" },
];

/** Slowly rotating conic beams — the "rays" in Elixiray. */
function Rays() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute left-1/2 top-[-55vh] h-[150vh] w-[150vh] -translate-x-1/2">
        <motion.div
          className="h-full w-full rounded-full opacity-50 blur-3xl light:opacity-20"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgb(255 181 71 / .55) 18deg, transparent 48deg, transparent 100deg, rgb(139 124 255 / .5) 130deg, transparent 170deg, transparent 220deg, rgb(255 122 69 / .4) 250deg, transparent 290deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44">
      <Rays />

      <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex rounded-full border border-fg/10 bg-fg/[0.03] px-4 py-1.5 backdrop-blur"
        >
          <Eyebrow>
            Tech sales consulting<span className="hidden sm:inline"> · idea → build → revenue</span>
          </Eyebrow>
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.5rem,6.2vw,5.25rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
          <SplitWords text="We distill bold ideas" delay={0.15} />
          <br />
          <SplitWords text="into" delay={0.45} />
          <SplitWords
            text="products that sell."
            delay={0.5}
            wordClassName="text-ray"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-paper/65 sm:text-xl"
        >
          Elixiray is the partner founders and enterprise innovators call when a tech idea needs
          sharpening, building and selling — by one team that owns the outcome end to end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold via-ember to-iris px-7 py-4 font-medium text-ink shadow-[0_10px_50px_-10px_rgb(255_122_69/0.7)]"
            >
              <span className="relative z-10">Book a strategy call</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <a
            href="#method"
            className="inline-flex items-center gap-2 rounded-full border border-fg/15 px-7 py-4 text-paper/85 transition-colors hover:border-fg/30 hover:bg-fg/5"
          >
            See how we work
          </a>
        </motion.div>
      </motion.div>

      {/* Idea → Product → Pipeline panel */}
      <motion.div style={{ y: panelY }} className="relative mx-auto mt-20 max-w-5xl px-4 [perspective:1200px] sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 18 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
          className="relative rounded-3xl border border-fg/10 bg-ink-2/70 p-3 shadow-[0_40px_120px_-30px_rgb(139_124_255/0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-1.5 px-3 pb-3 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="ml-3 text-[11px] text-mute">elixiray / engagement-0427</span>
          </div>

          <div className="relative grid gap-3 md:grid-cols-3">
            {/* a pulse of light flowing through the three stages */}
            <div aria-hidden className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-fg/10 md:block">
              <motion.span
                className="absolute -top-[3px] h-[7px] w-24 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent blur-[1px]"
                animate={{ left: ["-10%", "100%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
              />
            </div>

            {STAGES.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.4 + i * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-fg/[0.07] bg-ink-3/80 p-5 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-fg/[0.04] ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs text-mute">{s.step}</span>
                </div>
                <p className="mt-6 text-sm text-mute">{s.meta}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{s.title}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-fg/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold via-ember to-iris"
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + i * 20}%` }}
                    transition={{ duration: 1.4, ease: EASE, delay: 1.8 + i * 0.2 }}
                  />
                </div>
                <p className="mt-3 text-xs text-paper/60">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
