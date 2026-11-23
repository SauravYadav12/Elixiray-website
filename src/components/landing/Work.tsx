"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE, Eyebrow, Reveal, SplitWords } from "../primitives";

// Illustrative case studies — replace with real client work.
const CASES = [
  {
    client: "Halcyon AI",
    sector: "Enterprise AI · Series A",
    title: "An AI compliance copilot, from napkin sketch to 14 enterprise logos.",
    metric: "$2.8M",
    metricLabel: "ARR in 9 months",
    gradient: "from-gold/30 via-ember/10 to-transparent",
  },
  {
    client: "Vertex Health",
    sector: "HealthTech · Corporate venture",
    title: "A remote-monitoring platform spun out of a hospital group's innovation lab.",
    metric: "11 wks",
    metricLabel: "Idea to first paid pilot",
    gradient: "from-iris/30 via-iris/10 to-transparent",
  },
  {
    client: "Quanta Pay",
    sector: "FinTech · Seed",
    title: "Repositioned a payments API for mid-market SaaS and rebuilt the sales motion.",
    metric: "3.4×",
    metricLabel: "Qualified pipeline growth",
    gradient: "from-mint/25 via-mint/5 to-transparent",
  },
];

const QUOTES = [
  {
    quote:
      "Elixiray didn't just build what we asked for — they talked us out of the wrong product, built the right one, and then sold it next to us.",
    name: "Maya R.",
    role: "Co-founder & CEO, Halcyon AI",
  },
  {
    quote:
      "We had an idea and a budget line. Three months later we had paying customers. The handoff between strategy, engineering and sales simply didn't exist.",
    name: "Daniel O.",
    role: "VP Innovation, Vertex Health",
  },
  {
    quote:
      "Their sales team ran our first forty demos and wrote the playbook our own reps use today. Rare to find consultants who carry a number.",
    name: "Priya S.",
    role: "Head of Growth, Quanta Pay",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
      </Reveal>
      <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl">
        <SplitWords inView text="Outcomes, not" />
        <SplitWords inView delay={0.12} text="slide decks." wordClassName="text-mute" />
      </h2>

      <div className="mt-20 grid gap-4 md:grid-cols-2">
        {CASES.map((c, i) => (
          <motion.a
            key={c.client}
            href="#contact"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className={`group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-fg/[0.08] bg-ink-2 p-8 ${
              i === 2 ? "md:col-span-2" : ""
            }`}
          >
            <motion.div
              aria-hidden
              className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`}
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">{c.client}</p>
                <p className="text-sm font-medium text-mute">{c.sector}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-fg/15 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-paper group-hover:text-ink">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div
              className={`relative mt-10 flex flex-col gap-8 ${i === 2 ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}
            >
              <p className="max-w-md text-xl leading-snug text-paper/85 sm:text-2xl">{c.title}</p>
              <div className="shrink-0">
                <p className="text-5xl font-semibold tracking-tight sm:text-6xl">{c.metric}</p>
                <p className="mt-1 text-sm text-mute">{c.metricLabel}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const go = (d: number) => setState(([i]) => [(i + d + QUOTES.length) % QUOTES.length, d]);

  useEffect(() => {
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [index]);

  const q = QUOTES[index];

  return (
    <section className="relative overflow-hidden border-y border-fg/[0.06] py-28 sm:py-40">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Quote className="mx-auto h-10 w-10 text-gold" />
        <div className="relative mt-8 min-h-[260px] sm:min-h-[220px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -40, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <blockquote className="text-2xl font-medium leading-snug text-paper sm:text-3xl">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <span className="font-medium">{q.name}</span>
                <span className="text-mute"> — {q.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition-colors hover:bg-fg/5">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show testimonial ${i + 1}`}
                className="relative h-1.5 w-8 overflow-hidden rounded-full bg-fg/15"
              >
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition-colors hover:bg-fg/5">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
